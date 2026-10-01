export const MAX_POINTS = 220;
export function packSketch(sketch) {
  validateSketch(sketch);
  const bytes = [];
  let buffer = 0,
    bits = 0;
  for (const line of sketch)
    for (const value of [...line.map(([x, y]) => x * 101 + y), 16383]) {
      buffer = (buffer << 14) | value;
      bits += 14;
      while (bits >= 8) {
        bits -= 8;
        bytes.push((buffer >>> bits) & 255);
        buffer &= (1 << bits) - 1;
      }
    }
  if (bits) bytes.push((buffer << (8 - bits)) & 255);
  return btoa(String.fromCharCode(...bytes))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
export function unpackSketch(token) {
  if (
    typeof token !== "string" ||
    token.length > 600 ||
    !/^[\w-]+$/.test(token)
  )
    throw Error("그림 링크를 확인해 주세요.");
  const bytes = atob(token.replace(/-/g, "+").replace(/_/g, "/"));
  let buffer = 0,
    bits = 0,
    line = [];
  const strokes = [];
  for (const char of bytes) {
    buffer = (buffer << 8) | char.charCodeAt(0);
    bits += 8;
    while (bits >= 14) {
      bits -= 14;
      const value = (buffer >>> bits) & 16383;
      buffer &= (1 << bits) - 1;
      if (value === 16383) {
        strokes.push(line);
        line = [];
      } else {
        if (value > 10200) throw Error("그림 좌표가 올바르지 않아요.");
        line.push([Math.floor(value / 101), value % 101]);
      }
    }
  }
  if (line.length || buffer || bits >= 8) throw Error("그림 링크가 잘렸어요.");
  return validateSketch(strokes);
}
export function validateSketch(value) {
  if (!Array.isArray(value) || !value.length || value.length > 12)
    throw Error("선은 1~12개까지 그릴 수 있어요.");
  let count = 0;
  for (const stroke of value) {
    if (!Array.isArray(stroke) || stroke.length < 2)
      throw Error("조금 더 길게 그려주세요.");
    count += stroke.length;
    for (const p of stroke)
      if (
        !Array.isArray(p) ||
        p.length !== 2 ||
        !p.every((v) => Number.isInteger(v) && v >= 0 && v <= 100)
      )
        throw Error("그림 좌표가 올바르지 않아요.");
  }
  if (count > MAX_POINTS)
    throw Error("그림이 너무 복잡해요. 선을 조금 줄여주세요.");
  const points = value.flat();
  if (
    Math.max(...points.map((p) => p[0])) -
      Math.min(...points.map((p) => p[0])) <
      3 &&
    Math.max(...points.map((p) => p[1])) -
      Math.min(...points.map((p) => p[1])) <
      3
  )
    throw Error("점을 찍는 대신 선을 그려주세요.");
  return value.map((s) => s.map((p) => Object.freeze([...p])));
}
export function analyzeSketch(input) {
  const sketch = validateSketch(input),
    points = sketch.flat();
  const xs = points.map((p) => p[0]),
    ys = points.map((p) => p[1]);
  const width = Math.max(...xs) - Math.min(...xs),
    height = Math.max(...ys) - Math.min(...ys);
  const cx = (Math.max(...xs) + Math.min(...xs)) / 2,
    cy = (Math.max(...ys) + Math.min(...ys)) / 2,
    size = Math.max(width, height);
  const normalized = sketch.map((s) =>
    s.map(([x, y]) => [((x - cx) * 160) / size, ((y - cy) * 160) / size]),
  );
  let closed = 0,
    length = 0;
  const corners = [];
  for (const stroke of normalized) {
    if (
      Math.hypot(
        stroke[0][0] - stroke.at(-1)[0],
        stroke[0][1] - stroke.at(-1)[1],
      ) < 24 &&
      stroke.length >= 5
    )
      closed++;
    for (let i = 1; i < stroke.length; i++)
      length += Math.hypot(
        stroke[i][0] - stroke[i - 1][0],
        stroke[i][1] - stroke[i - 1][1],
      );
    for (let i = 1; i < stroke.length - 1; i++) {
      const a = stroke[i - 1],
        b = stroke[i],
        c = stroke[i + 1];
      const u = [b[0] - a[0], b[1] - a[1]],
        v = [c[0] - b[0], c[1] - b[1]],
        den = Math.hypot(...u) * Math.hypot(...v);
      if (
        den > 25 &&
        Math.acos(
          Math.max(-1, Math.min(1, (u[0] * v[0] + u[1] * v[1]) / den)),
        ) > 1.0 &&
        !corners.some((p) => Math.hypot(p[0] - b[0], p[1] - b[1]) < 22)
      )
        corners.push(b);
    }
  }
  const sharp = corners.length >= 3,
    long = width > height * 1.7 || height > width * 1.7;
  const pattern = long ? 3 : sharp ? 4 : closed ? 0 : 1;
  const secondary =
    sketch.length >= 3 ? 5 : long ? 1 : sharp ? 2 : closed ? 5 : 3;
  const style = long ? 2 : sharp ? 1 : 0;
  const behavior = long
    ? "긴 선 휘두르기"
    : sharp
      ? "가시 탄막"
      : closed
        ? "회전 탄막"
        : "추적 탄막";
  const emitters = (
    corners.length
      ? corners
      : closed
        ? normalized[0].filter(
            (p, i) =>
              i % Math.max(1, Math.floor(normalized[0].length / 8)) === 0,
          )
        : normalized.map((s) => s.at(-1))
  ).slice(0, 8);
  return {
    sketch,
    normalized,
    corners: corners.length,
    closed,
    long,
    length,
    pattern,
    secondary,
    style,
    behavior,
    emitters,
  };
}
export function sampleSketch(kind = 0) {
  if (kind === 1)
    return [
      Array.from({ length: 11 }, (_, i) => {
        const a = -Math.PI / 2 + (i * Math.PI) / 5,
          r = i % 2 ? 20 : 44;
        return [
          Math.round(50 + Math.cos(a) * r),
          Math.round(50 + Math.sin(a) * r),
        ];
      }),
    ];
  if (kind === 2)
    return [
      [
        [8, 48],
        [20, 30],
        [32, 65],
        [44, 32],
        [56, 67],
        [68, 35],
        [80, 62],
        [94, 46],
      ],
      [
        [86, 44],
        [87, 45],
      ],
    ];
  if (kind === 3)
    return [
      [
        [25, 35],
        [75, 35],
        [82, 65],
        [18, 65],
        [25, 35],
      ],
      [
        [25, 40],
        [8, 25],
        [7, 45],
      ],
      [
        [75, 40],
        [92, 25],
        [93, 45],
      ],
      [
        [30, 65],
        [22, 88],
      ],
      [
        [70, 65],
        [78, 88],
      ],
    ];
  return [
    Array.from({ length: 25 }, (_, i) => [
      Math.round(50 + 35 * Math.cos((i * Math.PI) / 12)),
      Math.round(50 + 35 * Math.sin((i * Math.PI) / 12)),
    ]),
  ];
}
export function positionSketchShots(shots, boss, origin, scale = 0.36) {
  if (!boss.geometry) return shots;
  const emitters = boss.geometry.emitters;
  shots.forEach((b, i) => {
    const p = emitters[i % emitters.length];
    b.x += p[0] * scale;
    b.y += p[1] * scale;
    if (boss.geometry.long) b.curve = (i % 2 ? 1 : -1) * 0.65;
  });
  return shots;
}
