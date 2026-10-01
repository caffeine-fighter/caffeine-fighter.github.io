import { W, H, createBoss, packBuild, unpackBuild } from "./core.mjs?v=4";
import { volley, moveProjectile } from "./patterns.mjs?v=4";
export const ROUND_SECONDS = 32;
export const STEP = 1 / 60;
export const MAX_ROSTER = 8;
const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
const directions = [
  [0, 0],
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
  [0.707, 0.707],
  [-0.707, 0.707],
  [0.707, -0.707],
  [-0.707, -0.707],
];
const compare = (a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
function fighter(boss, side) {
  return {
    boss,
    side,
    x: W / 2,
    y: side === 0 ? 165 : 535,
    hp: boss.duelHp,
    hit: 0,
    fire: 0.75,
    wave: 0,
    phase: 1,
    think: 0,
    dx: 0,
    dy: 0,
    vx: 0,
    vy: 0,
    damageDealt: 0,
  };
}

export class Duel {
  constructor(a, b, leg = 0) {
    const ordered = [a, b].sort(compare);
    if (leg % 2) ordered.reverse();
    this.fighters = ordered.map(fighter);
    this.bullets = [];
    this.time = 0;
    this.ticks = 0;
    this.state = "playing";
    this.leg = leg;
  }
  think(f, opponent) {
    const side = f.side,
      mirror = side === 0 ? 1 : -1;
    const ymin = side === 0 ? 85 : 430,
      ymax = side === 0 ? 270 : 615;
    const seed = f.boss.combatSeed;
    const goalX =
      W / 2 +
      Math.sin(this.time * 0.78 + ((seed % 100) / 100) * Math.PI * 2) * 195;
    const goalY =
      (side === 0 ? 175 : 525) +
      Math.cos(this.time * 0.63 + (seed % 17)) * 55 * mirror;
    const threats = this.bullets
      .filter(
        (b) =>
          b.owner !== side &&
          b.delay < 0.16 &&
          Math.abs(b.x - f.x) < 180 &&
          Math.abs(b.y - f.y) < 180,
      )
      .map((b) => ({ b, dist: (b.x - f.x) ** 2 + (b.y - f.y) ** 2 }))
      .sort((a, b) => a.dist - b.dist)
      .slice(0, 12);
    let best = Infinity,
      selected = directions[0];
    for (const [dx, dy] of directions) {
      const x = clamp(f.x + dx * f.boss.moveSpeed * 0.26, 45, W - 45),
        y = clamp(f.y + dy * f.boss.moveSpeed * 0.26, ymin, ymax);
      let cost = Math.hypot(x - goalX, y - goalY) * 0.018;
      for (const { b } of threats)
        for (const future of [0.1, 0.22, 0.34]) {
          const progress = Math.min(future / 0.26, 1),
            px = f.x + (x - f.x) * progress,
            py = f.y + (y - f.y) * progress;
          const bx = b.x + b.vx * Math.max(0, future - b.delay),
            by = b.y + b.vy * Math.max(0, future - b.delay);
          const d2 = (bx - px) ** 2 + (by - py) ** 2;
          cost += 4500 / (d2 + 36);
          if (d2 < 26 ** 2) cost += 45;
        }
      if (cost < best) {
        best = cost;
        selected = [dx, dy];
      }
    }
    f.dx = selected[0];
    f.dy = selected[1];
  }
  update() {
    if (this.state !== "playing") return;
    const dt = STEP;
    this.ticks++;
    this.time = this.ticks * STEP;
    for (const f of this.fighters) {
      const enemy = this.fighters[1 - f.side];
      f.hit = Math.max(0, f.hit - dt);
      f.think -= dt;
      if (f.think <= 0) {
        this.think(f, enemy);
        f.think = 0.12;
      }
      f.vx = f.dx * f.boss.moveSpeed;
      f.vy = f.dy * f.boss.moveSpeed;
      f.x = clamp(f.x + f.vx * dt, 45, W - 45);
      f.y = clamp(
        f.y + f.vy * dt,
        f.side === 0 ? 85 : 430,
        f.side === 0 ? 270 : 615,
      );
    }
    // Both fighters move before either fires or takes damage.
    for (const f of this.fighters) {
      const enemy = this.fighters[1 - f.side];
      const phase =
        f.hp / f.boss.duelHp < 0.25 ? 3 : f.hp / f.boss.duelHp < 0.55 ? 2 : 1;
      if (phase > f.phase) {
        f.phase = phase;
        f.fire = Math.max(f.fire, 0.65);
      }
      f.fire -= dt;
      if (f.fire <= 0) {
        const pattern = f.wave % 3 === 2 ? f.boss.secondary : f.boss.pattern;
        const shots = volley({
          pattern,
          origin: f,
          target: enemy,
          wave: f.wave++,
          phase: f.phase,
          speed: 190 + (f.phase - 1) * 18,
          seed: f.boss.combatSeed,
          delay: 0.16,
        });
        for (const b of shots) {
          b.owner = f.side;
          b.damage = f.boss.damage;
        }
        this.bullets.push(...shots);
        f.fire =
          f.boss.reload * (f.phase === 3 ? 0.73 : f.phase === 2 ? 0.86 : 1);
      }
    }
    const damage = [0, 0];
    for (const b of this.bullets) {
      const enemy = this.fighters[1 - b.owner];
      moveProjectile(b, dt, enemy);
      if (b.delay <= 0 && Math.hypot(b.x - enemy.x, b.y - enemy.y) < b.r + 26) {
        b.dead = true;
        if (enemy.hit <= 0 && damage[enemy.side] === 0)
          damage[enemy.side] = b.damage * (this.time >= 22 ? 2.8 : 1.6);
      }
    }
    for (const f of this.fighters)
      if (damage[f.side]) {
        f.hp = Math.max(0, f.hp - damage[f.side]);
        f.hit = 0.14;
        this.fighters[1 - f.side].damageDealt += damage[f.side];
      }
    this.bullets = this.bullets.filter(
      (b) =>
        !b.dead &&
        b.x > -30 &&
        b.x < W + 30 &&
        b.y > -30 &&
        b.y < H + 30 &&
        b.age < 8,
    );
    if (
      this.fighters.some((f) => f.hp <= 0) ||
      this.ticks >= ROUND_SECONDS / STEP
    )
      this.state = "complete";
  }
  result() {
    const hp = this.fighters.map((f) => Math.max(0, f.hp / f.boss.duelHp));
    const winner =
      Math.abs(hp[0] - hp[1]) < 0.005
        ? null
        : this.fighters[hp[0] > hp[1] ? 0 : 1].boss.id;
    return {
      leg: this.leg,
      time: Number(this.time.toFixed(2)),
      timeout: this.time >= ROUND_SECONDS,
      winner,
      combatants: this.fighters.map((f, i) => ({
        id: f.boss.id,
        hp: Number((hp[i] * 100).toFixed(4)),
        damage: Number(f.damageDealt.toFixed(4)),
      })),
    };
  }
}

export function simulateDuel(a, b, leg = 0) {
  const duel = new Duel(a, b, leg);
  while (duel.state === "playing") duel.update();
  return duel.result();
}
export function schedule(bosses) {
  if (bosses.length < 2 || bosses.length > MAX_ROSTER)
    throw new Error("보스 2~8명을 등록해 주세요.");
  if (new Set(bosses.map((b) => b.id)).size !== bosses.length)
    throw new Error("같은 보스는 한 번만 등록할 수 있어요.");
  const ordered = [...bosses].sort(compare),
    pairs = [];
  for (let a = 0; a < ordered.length; a++)
    for (let b = a + 1; b < ordered.length; b++)
      pairs.push([ordered[a], ordered[b]]);
  return pairs;
}
export function standings(bosses, rounds) {
  const rows = new Map(
    bosses.map((b) => [
      b.id,
      {
        boss: packBuild(b),
        id: b.id,
        name: b.name,
        played: 0,
        wins: 0,
        draws: 0,
        losses: 0,
        points: 0,
        difference: 0,
      },
    ]),
  );
  for (const round of rounds)
    for (const f of round.combatants) {
      const row = rows.get(f.id);
      if (!row) throw new Error("리그 참가자와 결과가 일치하지 않아요.");
      row.played++;
      const enemy = round.combatants.find((e) => e.id !== f.id);
      row.difference += f.hp - enemy.hp;
      if (round.winner === f.id) {
        row.wins++;
        row.points += 3;
      } else if (round.winner === null) {
        row.draws++;
        row.points++;
      } else row.losses++;
    }
  const sorted = [...rows.values()]
    .map((r) => ({ ...r, difference: Number(r.difference.toFixed(3)) }))
    .sort(
      (a, b) =>
        b.points - a.points || b.difference - a.difference || compare(a, b),
    );
  let rank = 0;
  sorted.forEach((r, i) => {
    const prev = sorted[i - 1];
    if (!prev || r.points !== prev.points || r.difference !== prev.difference)
      rank = i + 1;
    r.rank = rank;
  });
  return sorted;
}
export function runLeague(bosses, onProgress = () => {}) {
  const pairs = schedule(bosses),
    matches = [],
    rounds = [];
  pairs.forEach(([a, b], i) => {
    const legs = [simulateDuel(a, b, 0), simulateDuel(a, b, 1)];
    rounds.push(...legs);
    matches.push({ a: packBuild(a), b: packBuild(b), legs });
    onProgress({
      completed: i + 1,
      total: pairs.length,
      rows: standings(bosses, rounds),
      match: matches.at(-1),
    });
  });
  return { rows: standings(bosses, rounds), matches };
}
