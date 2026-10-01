import { W, H, random, PATTERNS, STYLES } from "./core.mjs?v=5";
export function portrait(c, boss, x, y, scale = 1, t = 0, rage = false) {
  if (boss.geometry) {
    c.save();
    c.translate(x, y);
    c.scale(scale, scale);
    const spin = boss.geometry.closed ? t * 0.55 : 0;
    c.rotate(spin);
    c.lineCap = "round";
    c.lineJoin = "round";
    c.strokeStyle = rage ? "#ff719b" : "#d5ff60";
    c.lineWidth = 7;
    c.shadowColor = c.strokeStyle;
    c.shadowBlur = rage ? 20 : 9;
    for (const stroke of boss.geometry.normalized) {
      c.beginPath();
      stroke.forEach(([a, b], i) => {
        const bend = boss.geometry.long ? Math.sin(t * 4 + a * 0.035) * 10 : 0;
        i ? c.lineTo(a, b + bend) : c.moveTo(a, b + bend);
      });
      c.stroke();
    }
    c.shadowBlur = 0;
    c.fillStyle = "#f5f3e9";
    for (const a of [-13, 13]) {
      c.beginPath();
      c.ellipse(a, -4, 6, 8, 0, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#101014";
      c.beginPath();
      c.arc(a + Math.sin(t) * 2, -3, 3, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = "#f5f3e9";
    }
    c.strokeStyle = "#ff719b";
    c.lineWidth = 3;
    c.beginPath();
    c.arc(0, 14, 9, 0, Math.PI);
    c.stroke();
    c.restore();
    return;
  }
  const color = `hsl(${boss.hue} 78% 65%)`,
    light = `hsl(${boss.hue} 90% 82%)`;
  c.save();
  c.translate(x, y);
  c.scale(scale, scale);
  const halo = c.createRadialGradient(0, 0, 20, 0, 0, 130);
  halo.addColorStop(0, `hsla(${boss.hue} 80% 65% / .22)`);
  halo.addColorStop(1, "transparent");
  c.fillStyle = halo;
  c.fillRect(-140, -140, 280, 280);
  c.strokeStyle = `hsla(${boss.hue} 80% 65% / .3)`;
  c.lineWidth = 1;
  c.save();
  c.rotate(t * 0.15);
  c.setLineDash([5, 12]);
  c.beginPath();
  c.arc(0, 0, 106, 0, Math.PI * 2);
  c.stroke();
  c.restore();
  c.fillStyle = `hsl(${boss.hue} 35% 23%)`;
  c.strokeStyle = color;
  c.lineWidth = 3;
  const path = (points) => {
    c.beginPath();
    points.forEach(([a, b], i) => (i ? c.lineTo(a, b) : c.moveTo(a, b)));
    c.closePath();
    c.fill();
    c.stroke();
  };
  if (boss.type === 5)
    for (const side of [-1, 1])
      path([
        [side * 36, -20],
        [side * 125, -74],
        [side * 108, 20],
        [side * 82, 8],
        [side * 64, 35],
      ]);
  if (boss.type === 1) {
    c.lineWidth = 9;
    for (let i = -2; i <= 2; i++) {
      c.beginPath();
      c.moveTo(i * 22, 30);
      c.bezierCurveTo(
        i * 22 + Math.sin(t * 2 + i) * 28,
        70,
        i * 24 - 20,
        75,
        i * 25 + Math.sin(t * 2 + i) * 15,
        105,
      );
      c.stroke();
    }
    c.lineWidth = 3;
    c.beginPath();
    c.arc(0, -5, 68, Math.PI, 0);
    c.quadraticCurveTo(80, 56, 0, 48);
    c.quadraticCurveTo(-80, 56, -68, -5);
    c.fill();
    c.stroke();
  } else if (boss.type === 0) {
    c.beginPath();
    c.arc(0, 0, 66, 0, Math.PI * 2);
    c.fill();
    c.stroke();
    for (const s of [-1, 1])
      path([
        [s * 45, -45],
        [s * 58, -83],
        [s * 68, -16],
      ]);
  } else if (boss.type === 2) {
    path([
      [-62, -46],
      [-35, -69],
      [35, -69],
      [62, -46],
      [62, 35],
      [34, 68],
      [-34, 68],
      [-62, 35],
    ]);
    c.strokeRect(-44, -41, 88, 72);
    path([
      [-28, -68],
      [-38, -96],
      [0, -78],
      [38, -96],
      [28, -68],
    ]);
  } else if (boss.type === 3) {
    const points = [];
    for (let i = 0; i < 16; i++) {
      const a = (i * Math.PI) / 8,
        r = i % 2 ? 56 : 86;
      points.push([Math.cos(a) * r, Math.sin(a) * r]);
    }
    path(points);
  } else if (boss.type === 4) {
    c.beginPath();
    c.moveTo(-62, 68);
    c.lineTo(-62, -10);
    c.bezierCurveTo(-62, -95, 62, -95, 62, -10);
    c.lineTo(62, 68);
    for (let i = 3; i >= -3; i--) c.lineTo(i * 20, i % 2 ? 52 : 72);
    c.closePath();
    c.fill();
    c.stroke();
    path([
      [-30, -65],
      [-42, -98],
      [-6, -82],
      [12, -102],
      [38, -70],
    ]);
  } else
    path([
      [-58, -46],
      [-28, -76],
      [0, -45],
      [28, -76],
      [58, -46],
      [53, 42],
      [0, 68],
      [-53, 42],
    ]);
  const eyes = boss.type === 0 ? 1 : boss.eyes,
    gap = eyes === 1 ? 0 : 32;
  for (let i = 0; i < eyes; i++) {
    const ex = (i - (eyes - 1) / 2) * gap,
      r = eyes === 1 ? 25 : 13;
    c.fillStyle = light;
    c.beginPath();
    c.ellipse(ex, -7, r, r * 0.85, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#101014";
    c.beginPath();
    c.ellipse(ex + Math.sin(t) * 2, -5, r * 0.34, r * 0.57, 0, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = "#fff";
    c.fillRect(ex + 1, -12, 4, 4);
    if (rage) {
      c.strokeStyle = color;
      c.lineWidth = 5;
      c.beginPath();
      c.moveTo(ex - r, -24);
      c.lineTo(ex + r, -13);
      c.stroke();
    }
  }
  c.fillStyle = "#101014";
  c.fillRect(-21, 28, 42, 11);
  c.fillStyle = light;
  for (let i = 0; i < 3; i++) c.fillRect(-16 + i * 13, 28, 6, 5);
  c.restore();
}
export function background(c, seed, t, reduced) {
  c.fillStyle = "#111116";
  c.fillRect(0, 0, W, H);
  c.strokeStyle = "#22222c";
  c.lineWidth = 1;
  for (let x = 0; x < W; x += 40) {
    c.beginPath();
    c.moveTo(x, 0);
    c.lineTo(x, H);
    c.stroke();
  }
  for (let y = 0; y < H; y += 40) {
    c.beginPath();
    c.moveTo(0, y);
    c.lineTo(W, y);
    c.stroke();
  }
  const rng = random(seed);
  for (let i = 0; i < 34; i++) {
    const x = rng() * W,
      y = (rng() * H + (reduced ? 0 : t * (3 + rng() * 8))) % H;
    c.fillStyle = i % 3 ? "#555564" : "#d5ff6066";
    c.fillRect(x, y, 2, 2);
  }
  const shade = c.createLinearGradient(0, 0, 0, H);
  shade.addColorStop(0, "#15151b00");
  shade.addColorStop(1, "#15151b99");
  c.fillStyle = shade;
  c.fillRect(0, 0, W, H);
}
export function fitText(
  c,
  text,
  x,
  y,
  maxWidth,
  size,
  color = "#f5f3e9",
  weight = 900,
) {
  c.fillStyle = color;
  let s = size;
  do {
    c.font = `${weight} ${s}px "Noto Sans KR", sans-serif`;
    if (c.measureText(text).width <= maxWidth) break;
    s -= 1;
  } while (s > 12);
  c.fillText(text, x, y);
}
export function drawCard(c, boss, result) {
  c.canvas.width = 1080;
  c.canvas.height = 1350;
  c.fillStyle = "#101014";
  c.fillRect(0, 0, 1080, 1350);
  c.strokeStyle = "#34343d";
  c.lineWidth = 2;
  c.strokeRect(40, 40, 1000, 1270);
  c.textAlign = "left";
  fitText(c, "DOODLE BOSS / 도전장", 80, 112, 900, 25, "#d5ff60", 700);
  c.textAlign = "right";
  fitText(c, "#" + boss.code, 1000, 112, 400, 20, "#9999aa", 400);
  c.textAlign = "center";
  fitText(c, "내 낙서가 최종 보스가 됐다.", 540, 230, 930, 45);
  portrait(c, boss, 540, 480, 2.15, 0.7);
  fitText(c, boss.title, 540, 740, 900, 28, "#d5ff60", 700);
  fitText(c, boss.name, 540, 830, 900, 76);
  fitText(c, "“" + boss.quote + "”", 540, 894, 900, 25, "#b8b8c8", 400);
  c.fillStyle = "#22222b";
  c.fillRect(80, 956, 920, 192);
  if (result?.won) {
    fitText(
      c,
      `${result.rank} 등급  /  ${result.time.toFixed(2)}초 격파`,
      540,
      1033,
      850,
      47,
      "#d5ff60",
    );
    fitText(c, "이 기록, 네가 깰 수 있어?", 540, 1091, 850, 27);
  } else {
    fitText(
      c,
      result ? "나는 당했다. 너는?" : "너는 이 친구를 이길 수 있어?",
      540,
      1033,
      850,
      42,
      "#d5ff60",
    );
    fitText(
      c,
      `${STYLES[boss.style]} · ${PATTERNS[boss.pattern]} + ${PATTERNS[boss.secondary]}`,
      540,
      1091,
      850,
      24,
      "#b8b8c8",
      400,
    );
  }
  fitText(c, "내 낙서가 보스.", 540, 1220, 900, 36);
  fitText(
    c,
    "caffeine-fighter.github.io/doodle-boss",
    540,
    1270,
    920,
    22,
    "#b8b8c8",
    400,
  );
}
