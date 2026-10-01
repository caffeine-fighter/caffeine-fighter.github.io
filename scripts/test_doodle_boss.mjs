import test from "node:test";
import assert from "node:assert/strict";
import {
  analyzeSketch,
  sampleSketch,
  validateSketch,
  positionSketchShots,
} from "../static/doodle-boss/sketch.mjs";
import {
  createBoss,
  encodeBuild,
  decodeBuild,
  encodeRoster,
  decodeRoster,
  Battle,
} from "../static/doodle-boss/core.mjs";
import { runLeague } from "../static/doodle-boss/league.mjs";
test("visible shape controls attack, style and distinct emitters", () => {
  const circle = analyzeSketch(sampleSketch(0)),
    star = analyzeSketch(sampleSketch(1)),
    worm = analyzeSketch(sampleSketch(2));
  assert.equal(circle.closed, 1);
  assert.equal(circle.corners, 0);
  assert.equal(circle.pattern, 0);
  assert.ok(circle.emitters.length >= 4);
  assert.ok(star.corners >= 5);
  assert.equal(star.pattern, 4);
  assert.equal(star.style, 1);
  assert.ok(worm.long);
  assert.equal(worm.pattern, 3);
  assert.equal(worm.style, 2);
  assert.equal(
    analyzeSketch([
      [
        [10, 20],
        [45, 40],
        [85, 60],
      ],
    ]).pattern,
    3,
  );
});
test("geometry normalization preserves aspect ratio and bounds", () => {
  const g = analyzeSketch([
    [
      [10, 40],
      [90, 40],
      [90, 60],
      [10, 60],
      [10, 40],
    ],
  ]);
  const xs = g.normalized.flat().map((p) => p[0]),
    ys = g.normalized.flat().map((p) => p[1]);
  assert.equal(Math.max(...xs) - Math.min(...xs), 160);
  assert.equal(Math.max(...ys) - Math.min(...ys), 40);
});
test("untrusted drawings have bounded strokes, points and finite coordinates", () => {
  for (const input of [
    [],
    [[[1, 1]]],
    [
      [
        [NaN, 1],
        [2, 2],
      ],
    ],
    [
      [
        [1, 1],
        [101, 2],
      ],
    ],
    Array(13).fill([
      [1, 1],
      [90, 90],
    ]),
    [Array(221).fill([20, 20])],
    [
      [
        [20, 20],
        [20, 20],
      ],
    ],
  ])
    assert.throws(() => validateSketch(input));
});
test("shared drawings are exact, deterministic and independent of alleged pattern values", () => {
  const a = createBoss("친구 😈", { sketch: sampleSketch(1) }),
    b = createBoss("친구 😈", { sketch: sampleSketch(0) });
  assert.notEqual(a.id, b.id);
  assert.deepEqual(decodeBuild(encodeBuild(a)), a);
  const fake = Buffer.from(
    JSON.stringify(["5", [a.name, 0, 1, 2, a.sketch]]),
  ).toString("base64url");
  assert.deepEqual(decodeBuild(fake), a);
  const roster = Array.from({ length: 8 }, (_, i) =>
    createBoss("친구" + i, { sketch: sampleSketch(i % 4) }),
  );
  assert.deepEqual(decodeRoster(encodeRoster(roster)), roster);
});
test("shots come from actual sketch vertices and long shapes sweep", () => {
  const star = createBoss("별", { sketch: sampleSketch(1) }),
    worm = createBoss("지렁이", { sketch: sampleSketch(2) });
  const shots = [
    { x: 300, y: 150 },
    { x: 300, y: 150 },
  ];
  positionSketchShots(shots, star, { x: 300, y: 150 }, 1);
  assert.ok(Math.abs(shots[0].x - 300 - star.geometry.emitters[0][0]) < 1e-8);
  assert.ok(Math.abs(shots[0].y - 150 - star.geometry.emitters[0][1]) < 1e-8);
  const curved = positionSketchShots(
    [
      { x: 0, y: 0 },
      { x: 0, y: 0 },
    ],
    worm,
    {},
    1,
  );
  assert.equal(curved[0].curve, -curved[1].curve);
});
test("all sample drawings play bounded battles and share reproducible league results", () => {
  const roster = Array.from({ length: 4 }, (_, i) =>
    createBoss("낙서" + i, { sketch: sampleSketch(i) }),
  );
  for (const boss of roster) {
    const b = new Battle(boss);
    for (let i = 0; i < 2100 && b.state === "playing"; i++) {
      b.player.invincible = 10;
      b.update(1 / 60);
      assert.ok(b.bullets.length < 600);
      assert.ok(
        b.bullets.every((p) => Number.isFinite(p.x) && Number.isFinite(p.y)),
      );
    }
    assert.equal(b.state, "won");
  }
  assert.deepEqual(
    runLeague(roster),
    runLeague(decodeRoster(encodeRoster(roster)).reverse()),
  );
});

test("maximum roster drawings fit in a shareable URL", () => {
  const sketch = [
    Array.from({ length: 220 }, (_, i) => [
      Math.round(50 + 40 * Math.cos(i * 0.3)),
      Math.round(50 + 40 * Math.sin(i * 0.3)),
    ]),
  ];
  const roster = Array.from({ length: 8 }, (_, i) =>
    createBoss("친구" + i, { sketch }),
  );
  const token = encodeRoster(roster);
  assert.ok(token.length < 7500);
  assert.deepEqual(decodeRoster(token), roster);
});
