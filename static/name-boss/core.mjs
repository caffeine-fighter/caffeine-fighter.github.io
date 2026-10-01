import { volley, moveProjectile, PATTERN_NAMES } from "./patterns.mjs?v=3";
export const VERSION = "3";
export const W = 600,
  H = 700;
export const PATTERNS = PATTERN_NAMES;
export const STYLES = ["균형형", "압박형", "회피형"];
const PROFILES = [
  { duelHp: 110, moveSpeed: 125, reload: 0.94, damage: 4.4 },
  { duelHp: 92, moveSpeed: 113, reload: 0.76, damage: 4.7 },
  { duelHp: 100, moveSpeed: 155, reload: 1.05, damage: 4.0 },
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
export function createBoss(raw, config = {}) {
  const name = normalizeName(raw) || "월요일",
    seed = hashName(name),
    rng = random(seed);
  const pick = (n) => Math.floor(rng() * n),
    type = pick(6),
    title = pick(TITLES.length),
    defaultPattern = pick(6);
  const choice = (value, fallback, count) =>
    Number.isInteger(value) && value >= 0 && value < count ? value : fallback;
  const pattern = choice(config.pattern, defaultPattern, 6);
  let secondary = choice(
    config.secondary,
    (pattern + 1 + ((seed >>> 8) % 5)) % 6,
    6,
  );
  if (secondary === pattern) secondary = (pattern + 3) % 6;
  const style = choice(config.style, seed % 3, 3);
  const id = JSON.stringify([name, pattern, secondary, style]);
  return Object.freeze({
    name,
    seed,
    type,
    pattern,
    secondary,
    style,
    id,
    combatSeed: hashName(id),
    ...PROFILES[style],
    title: TITLES[title],
    quote: QUOTES[title],
    hue: pick(360),
    eyes: 1 + pick(3),
    horns: pick(3),
    hp: 480,
    speed: 185 + pick(25),
    ego: 65 + pick(36),
    patience: 1 + pick(30),
    menace: 70 + pick(31),
    code: hashName(id).toString(36).toUpperCase().padStart(7, "0"),
    skill: PATTERNS[pattern],
  });
}
const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export function packBuild(boss) {
  return [boss.name, boss.pattern, boss.secondary, boss.style];
}
export function unpackBuild(value) {
  if (
    !Array.isArray(value) ||
    value.length !== 4 ||
    typeof value[0] !== "string" ||
    !normalizeName(value[0]) ||
    !value.slice(1).every(Number.isInteger) ||
    value[1] < 0 ||
    value[1] > 5 ||
    value[2] < 0 ||
    value[2] > 5 ||
    value[1] === value[2] ||
    value[3] < 0 ||
    value[3] > 2
  )
    throw new Error("유효한 보스 구성이 아니에요.");
  return createBoss(value[0], {
    pattern: value[1],
    secondary: value[2],
    style: value[3],
  });
}
function encode(value) {
  return btoa(
    String.fromCharCode(...new TextEncoder().encode(JSON.stringify(value))),
  )
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
function decode(token) {
  if (
    typeof token !== "string" ||
    token.length > 6000 ||
    !/^[\w-]+$/.test(token)
  )
    throw new Error("링크 형식이 올바르지 않아요.");
  try {
    return JSON.parse(
      new TextDecoder("utf-8", { fatal: true }).decode(
        Uint8Array.from(
          atob(token.replace(/-/g, "+").replace(/_/g, "/")),
          (c) => c.charCodeAt(0),
        ),
      ),
    );
  } catch {
    throw new Error("링크를 다시 확인해 주세요.");
  }
}
export function encodeBuild(boss) {
  return encode([VERSION, packBuild(boss)]);
}
export function decodeBuild(token) {
  const data = decode(token);
  if (data[0] !== VERSION) throw new Error("현재 버전의 보스 링크가 아니에요.");
  return unpackBuild(data[1]);
}
export function encodeRoster(bosses) {
  return encode([VERSION, bosses.map(packBuild)]);
}
export function decodeRoster(token) {
  const data = decode(token);
  if (
    data[0] !== VERSION ||
    !Array.isArray(data[1]) ||
    data[1].length < 2 ||
    data[1].length > 8
  )
    throw new Error("리그에는 보스 2~8명이 필요해요.");
  const bosses = data[1].map(unpackBuild);
  if (new Set(bosses.map((b) => b.id)).size !== bosses.length)
    throw new Error("같은 보스가 중복 등록됐어요.");
  return bosses;
}
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
    const wave = this.waves++;
    const pattern = wave % 3 === 2 ? this.boss.secondary : this.boss.pattern;
    const options = {
      pattern,
      origin: { x: W / 2, y: 150 },
      target: {
        ...this.player,
        vx: this.player.dx * 300,
        vy: this.player.dy * 300,
      },
      wave,
      phase: this.phase,
      speed: this.boss.speed + (this.phase - 1) * 26,
      seed: this.boss.combatSeed,
    };
    this.bullets.push(...volley(options));
    if (this.phase === 3 && wave % 2 === 0)
      this.bullets.push(
        ...volley({
          ...options,
          pattern: this.boss.secondary,
          wave: wave + 1,
          speed: options.speed * 0.78,
          delay: 0.3,
        }),
      );
    if (wave % 2 === 1 && pattern !== 1) {
      const aim = Math.atan2(this.player.y - 150, this.player.x - W / 2);
      for (let i = -1; i <= 1; i++)
        this.bullets.push({
          x: W / 2,
          y: 150,
          vx: Math.cos(aim + i * 0.16) * 245,
          vy: Math.sin(aim + i * 0.16) * 245,
          r: 5,
          delay: 0.24,
          age: 0,
          grazed: false,
        });
    }
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
      this.attack = this.phase === 3 ? 0.49 : this.phase === 2 ? 0.66 : 0.88;
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
    const nextPhase =
      this.hp <= this.boss.hp * 0.25
        ? 3
        : this.hp <= this.boss.hp * 0.55
          ? 2
          : 1;
    if (this.phase < nextPhase && this.hp > 0) {
      this.phase = nextPhase;
      this.warning = 1.2;
      this.attack = 1.2;
      this.bullets = [];
      this.events.push({ type: "rage" });
    }
    for (const b of this.bullets) {
      moveProjectile(b, dt, p);
      if (b.delay > 0) continue;
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
