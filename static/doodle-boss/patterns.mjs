export const TAU = Math.PI * 2;
export const PATTERN_NAMES = [
  "나선 감옥",
  "예측 추적탄",
  "겹가시 폭발",
  "교차 장벽",
  "오각 폭풍",
  "쌍성 궤도",
];

// The same projectile rules drive solo fights and boss-versus-boss matches.
export function volley({
  pattern,
  origin,
  target,
  wave,
  phase = 1,
  speed = 200,
  seed = 0,
  delay = 0.2,
}) {
  const aim = Math.atan2(target.y - origin.y, target.x - origin.x);
  const spin = (((seed >>> 3) % 100) / 100) * TAU + wave * 0.37;
  const count = phase === 3 ? 24 : phase === 2 ? 20 : 16;
  const result = [];
  const add = (x, y, angle, scale = 1, extra = {}) =>
    result.push({
      x,
      y,
      vx: Math.cos(angle) * speed * scale,
      vy: Math.sin(angle) * speed * scale,
      r: 5,
      delay,
      age: 0,
      grazed: false,
      ...extra,
    });
  if (pattern === 0) {
    for (let i = 0; i < count; i++) {
      const angle = aim + spin + (i * TAU) / count;
      add(origin.x, origin.y, angle, 1, { curve: (wave % 2 ? -1 : 1) * 0.2 });
      if (phase > 1 && i % 2 === 0)
        add(origin.x, origin.y, angle + 0.075, 0.72);
    }
  } else if (pattern === 1) {
    const future = {
      x: target.x + (target.vx || 0) * 0.32,
      y: target.y + (target.vy || 0) * 0.32,
    };
    const prediction = Math.atan2(future.y - origin.y, future.x - origin.x);
    const n = phase === 1 ? 4 : 5;
    for (let i = -n; i <= n; i++)
      add(origin.x, origin.y, prediction + i * 0.12, 1.08, {
        homing: 0.58,
        turn: 0.72,
      });
    if (wave % 2 === 1)
      for (const offset of [-0.7, 0.7])
        add(origin.x, origin.y, aim + offset, 0.82);
  } else if (pattern === 2) {
    for (let layer = 0; layer < (phase > 1 ? 3 : 2); layer++) {
      for (let i = 0; i < 12; i++)
        add(
          origin.x,
          origin.y,
          aim + (i * TAU) / 12 + layer * 0.15 + spin * 0.35,
          0.65 + layer * 0.24,
          { delay: delay + layer * 0.1 },
        );
    }
  } else if (pattern === 3) {
    // Broad, crossing fans leave lanes rather than random full-screen walls.
    const gap = (wave % 5) - 2;
    for (let i = -7; i <= 7; i++) {
      if (Math.abs(i - gap) <= 1) continue;
      for (const side of [-1, 1])
        add(
          origin.x + side * 38,
          origin.y,
          aim + i * 0.095 + side * 0.14,
          0.95 + (i % 2 ? 0.12 : 0),
        );
    }
  } else if (pattern === 4) {
    for (let arm = 0; arm < 5; arm++)
      for (let layer = 0; layer < (phase > 1 ? 4 : 3); layer++) {
        add(
          origin.x,
          origin.y,
          aim + spin * -0.8 + (arm * TAU) / 5 + layer * 0.065,
          0.8 + layer * 0.13,
          { curve: -0.14 },
        );
      }
  } else if (pattern === 5) {
    for (const side of [-1, 1])
      for (let i = 0; i < (phase > 1 ? 12 : 9); i++) {
        add(
          origin.x + side * 40,
          origin.y,
          aim + (i * TAU) / (phase > 1 ? 12 : 9) + spin * side,
          0.92,
          { curve: side * 0.24 },
        );
      }
  }
  return result;
}

export function moveProjectile(b, dt, target) {
  if (b.delay > 0) {
    b.delay = Math.max(0, b.delay - dt);
    return;
  }
  b.age = (b.age || 0) + dt;
  let angle = Math.atan2(b.vy, b.vx),
    speed = Math.hypot(b.vx, b.vy);
  if (b.homing && b.age < b.homing) {
    const wanted = Math.atan2(target.y - b.y, target.x - b.x);
    const delta = Math.atan2(
      Math.sin(wanted - angle),
      Math.cos(wanted - angle),
    );
    const turn = (b.turn || 0.6) * dt;
    angle += Math.max(-turn, Math.min(turn, delta));
  }
  if (b.curve && b.age < 1.4) angle += b.curve * dt;
  b.vx = Math.cos(angle) * speed;
  b.vy = Math.sin(angle) * speed;
  b.x += b.vx * dt;
  b.y += b.vy * dt;
}
