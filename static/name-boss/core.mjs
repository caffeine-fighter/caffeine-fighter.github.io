export const VERSION = "2";
export const W = 600,
  H = 700;
export const PATTERNS = [
  "소용돌이",
  "집요한 추적",
  "가시꽃",
  "엇갈린 파도",
  "별의 폭풍",
  "쌍둥이 궤도",
];
export const TYPES = [
  "외눈 감시자",
  "심연의 해파리",
  "철갑 군주",
  "가시 악마",
  "유령 왕",
  "우주 박쥐",
];
const TITLES = [
  "읽씹의 지배자",
  "지각의 마왕",
  "마감의 파괴자",
  "퇴근의 봉인자",
  "새벽의 폭주자",
  "잔소리의 군주",
  "핑계의 연금술사",
  "약속의 파괴자",
  "잠수의 달인",
  "승부욕의 화신",
  "배고픔의 사도",
  "평화로운 척하는 자",
];
const QUOTES = [
  "읽었어. 답장은 안 했지만.",
  "5분 뒤 도착. 아직 침대지만.",
  "내일까지 가능하지?",
  "잠깐만. 진짜 마지막 하나만.",
  "자는 거야? 이제 시작인데.",
  "내가 뭐라고 했어.",
  "아니, 그게 아니라.",
  "우리 언제 한 번 보자.",
  "알림을 꺼놔서 몰랐어.",
  "진 게 아니라 봐준 거야.",
  "한 입만. 진짜 한 입만.",
  "난 화 안 났는데?",
];
export function normalizeName(value) {
  return Array.from(
    String(value)
      .normalize("NFC")
      .replace(/[\p{Cc}\p{Cf}]/gu, "")
      .trim()
      .replace(/\s+/g, " "),
  )
    .slice(0, 16)
    .join("");
}
export function hashName(name) {
  let h = 2166136261;
  for (const c of name) {
    h ^= c.codePointAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}
export function random(seed) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
export function createBoss(raw) {
  const name = normalizeName(raw) || "월요일",
    seed = hashName(name),
    rng = random(seed);
  const pick = (n) => Math.floor(rng() * n),
    type = pick(6),
    title = pick(TITLES.length),
    pattern = pick(6);
  return Object.freeze({
    name,
    seed,
    type,
    pattern,
    title: TITLES[title],
    quote: QUOTES[title],
    hue: pick(360),
    eyes: 1 + pick(3),
    horns: pick(3),
    hp: 480,
    speed: 115 + pick(30),
    ego: 65 + pick(36),
    patience: 1 + pick(30),
    menace: 70 + pick(31),
    code: seed.toString(36).toUpperCase().padStart(7, "0"),
    skill: [
      "회전문 지옥",
      "어딜 도망가",
      "친절한 가시밭",
      "답장 폭격",
      "별 볼 일 있다",
      "둘이서 괴롭히기",
    ][pattern],
  });
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export class Battle {
  constructor(boss) {
    this.boss = boss;
    this.hp = boss.hp;
    this.time = 0;
    this.phase = 1;
    this.state = "playing";
    this.player = {
      x: W / 2,
      y: H - 95,
      hp: 5,
      invincible: 0,
      cooldown: 0,
      dx: 0,
      dy: -1,
    };
    this.bullets = [];
    this.shots = [];
    this.events = [];
    this.grazes = 0;
    this.hits = 0;
    this.waves = 0;
    this.fire = 0.2;
    this.attack = 1.3;
    this.warning = 0;
  }
  dash() {
    if (this.state !== "playing" || this.player.cooldown > 0) return false;
    const p = this.player;
    p.cooldown = 2.5;
    p.invincible = Math.max(p.invincible, 0.38);
    p.x = clamp(p.x + p.dx * 92, 18, W - 18);
    p.y = clamp(p.y + p.dy * 92, 240, H - 24);
    this.events.push({ type: "dash", x: p.x, y: p.y });
    return true;
  }
  spawn() {
    const p = this.phase,
      k = this.boss.pattern,
      n = p === 2 ? 13 : 10,
      speed = this.boss.speed + (p === 2 ? 28 : 0),
      wave = this.waves++;
    const add = (x, angle, scale = 1) =>
      this.bullets.push({
        x,
        y: 150,
        vx: Math.cos(angle) * speed * scale,
        vy: Math.sin(angle) * speed * scale,
        r: 5.5,
        grazed: false,
      });
    const aim = Math.atan2(this.player.y - 150, this.player.x - W / 2);
    if (k === 0)
      for (let i = 0; i < n; i++)
        add(W / 2, wave * 0.48 + (i * Math.PI * 2) / n);
    if (k === 1)
      for (let i = -3; i <= 3; i++)
        add(W / 2, aim + i * (p === 2 ? 0.15 : 0.2));
    if (k === 2)
      for (let i = 0; i < n; i++)
        add(W / 2, (i * Math.PI * 2) / n + wave * 0.16, i % 2 ? 1 : 0.7);
    if (k === 3)
      for (let i = 0; i < n; i++)
        add(
          70 + (i * (W - 140)) / (n - 1),
          Math.PI / 2 + Math.sin(wave + i * 0.5) * 0.4,
        );
    if (k === 4)
      for (let i = 0; i < 5; i++)
        for (let j = 0; j < 2; j++)
          add(
            W / 2,
            wave * -0.35 + (i * Math.PI * 2) / 5 + j * 0.13,
            1 + j * 0.2,
          );
    if (k === 5)
      for (const side of [-1, 1])
        for (let i = 0; i < 6; i++)
          add(W / 2 + side * 70, (i * Math.PI) / 3 + wave * 0.3 * side);
    // Periodic aimed volleys prevent idle clears while leaving readable escape lanes.
    if (k !== 1 && wave % 3 === 2)
      for (let i = -1; i <= 1; i++) add(W / 2, aim + i * 0.22, 1.15);
    this.events.push({ type: "attack" });
  }
  update(dt, input = {}) {
    if (this.state !== "playing") return;
    this.time += dt;
    const p = this.player;
    p.cooldown = Math.max(0, p.cooldown - dt);
    p.invincible = Math.max(0, p.invincible - dt);
    this.warning = Math.max(0, this.warning - dt);
    let dx = input.x || 0,
      dy = input.y || 0;
    if (input.target) {
      dx = input.target.x - p.x;
      dy = input.target.y - p.y;
    }
    const distance = Math.hypot(dx, dy);
    if (distance > 0.5) {
      p.dx = dx / distance;
      p.dy = dy / distance;
      const step = input.target ? Math.min(distance, 300 * dt) : 300 * dt;
      p.x += p.dx * step;
      p.y += p.dy * step;
    }
    p.x = clamp(p.x, 18, W - 18);
    p.y = clamp(p.y, 240, H - 24);
    this.fire -= dt;
    this.attack -= dt;
    if (this.fire <= 0) {
      this.fire += 0.14;
      const a = Math.atan2(150 - p.y, W / 2 - p.x);
      this.shots.push({
        x: p.x,
        y: p.y,
        vx: Math.cos(a) * 650,
        vy: Math.sin(a) * 650,
        damage: 2.6 + Math.min(1.4, this.grazes * 0.065),
      });
    }
    if (this.attack <= 0) {
      this.spawn();
      this.attack = this.phase === 2 ? 0.73 : 1.08;
    }
    for (const s of this.shots) {
      s.x += s.vx * dt;
      s.y += s.vy * dt;
      if (Math.hypot(s.x - W / 2, s.y - 150) < 55) {
        this.hp = Math.max(0, this.hp - s.damage);
        s.dead = true;
        this.events.push({ type: "spark", x: s.x, y: s.y });
      }
    }
    this.shots = this.shots.filter((s) => !s.dead && s.y > -20);
    if (this.phase === 1 && this.hp <= this.boss.hp / 2) {
      this.phase = 2;
      this.warning = 1.6;
      this.attack = 1.6;
      this.bullets = [];
      this.events.push({ type: "rage" });
    }
    for (const b of this.bullets) {
      b.x += b.vx * dt;
      b.y += b.vy * dt;
      const dist = Math.hypot(b.x - p.x, b.y - p.y);
      if (dist < b.r + 7 && p.invincible <= 0) {
        p.hp--;
        this.hits++;
        p.invincible = 1.2;
        b.dead = true;
        this.events.push({ type: "hit", x: p.x, y: p.y });
      } else if (dist < b.r + 23 && !b.grazed && p.invincible <= 0) {
        b.grazed = true;
        this.grazes++;
        this.events.push({ type: "graze", x: p.x, y: p.y });
      }
    }
    this.bullets = this.bullets.filter(
      (b) => !b.dead && b.x > -25 && b.x < W + 25 && b.y > -25 && b.y < H + 25,
    );
    if (p.hp <= 0) this.state = "lost";
    else if (this.hp <= 0) this.state = "won";
  }
  result() {
    return {
      won: this.state === "won",
      time: Number(this.time.toFixed(2)),
      hp: this.player.hp,
      grazes: this.grazes,
      rank:
        this.state !== "won"
          ? "RETRY"
          : this.hits === 0
            ? "S+"
            : this.hits <= 1
              ? "S"
              : this.hits <= 3
                ? "A"
                : "B",
    };
  }
}
