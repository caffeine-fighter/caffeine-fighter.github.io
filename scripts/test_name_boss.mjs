import test from "node:test";
import assert from "node:assert/strict";
import {
  Battle,
  createBoss,
  normalizeName,
  W,
  H,
} from "../static/name-boss/core.mjs";
test("Unicode names are normalized, bounded, deterministic and diverse", () => {
  assert.equal(normalizeName("  김\n개발  "), "김개발");
  assert.equal(normalizeName("가".normalize("NFD")), "가");
  assert.equal(Array.from(normalizeName("😀".repeat(30))).length, 16);
  assert.deepEqual(createBoss("  김개발 "), createBoss("김개발"));
  const bosses = Array.from({ length: 500 }, (_, i) => createBoss("보스" + i));
  assert.equal(new Set(bosses.map((b) => b.type)).size, 6);
  assert.equal(new Set(bosses.map((b) => b.pattern)).size, 6);
  assert.ok(new Set(bosses.map((b) => b.type + ":" + b.pattern)).size >= 34);
});
test("movement is bounded; diagonal motion has the same speed", () => {
  const a = new Battle(createBoss("a")),
    b = new Battle(createBoss("a"));
  a.update(1 / 60, { x: 1 });
  b.update(1 / 60, { x: 1, y: -1 });
  assert.ok(
    Math.abs(
      Math.hypot(b.player.x - W / 2, b.player.y - (H - 95)) -
        (a.player.x - W / 2),
    ) < 1e-8,
  );
  for (let i = 0; i < 300; i++) {
    b.player.invincible = 100;
    b.update(1 / 60, { x: -1, y: -1 });
    b.events = [];
  }
  assert.ok(b.player.x >= 18 && b.player.y >= 240);
});
test("dash grants invulnerability and cannot be spammed", () => {
  const b = new Battle(createBoss("a"));
  assert.equal(b.dash(), true);
  assert.equal(b.dash(), false);
  b.bullets = [{ x: b.player.x, y: b.player.y, vx: 0, vy: 0, r: 6 }];
  b.update(1 / 60);
  assert.equal(b.player.hp, 5);
  b.player.cooldown = 0;
  assert.equal(b.dash(), true);
});
test("hit, graze, rage transition, loss and win resolve correctly", () => {
  const b = new Battle(createBoss("a"));
  b.bullets = [{ x: b.player.x + 22, y: b.player.y, vx: 0, vy: 0, r: 6 }];
  b.update(1 / 60);
  b.update(1 / 60);
  assert.equal(b.grazes, 1);
  b.bullets = [{ x: b.player.x, y: b.player.y, vx: 0, vy: 0, r: 6 }];
  b.update(1 / 60);
  assert.equal(b.player.hp, 4);
  b.hp = 200;
  b.update(1 / 60);
  assert.equal(b.phase, 2);
  assert.equal(b.bullets.length, 0);
  assert.ok(b.attack > 1);
  b.hp = 1;
  b.shots = [{ x: 300, y: 150, vx: 0, vy: 0, damage: 3 }];
  b.update(1 / 60);
  assert.equal(b.state, "won");
  assert.equal(b.result().rank, "S");
  const c = new Battle(createBoss("a"));
  c.player.hp = 1;
  c.bullets = [{ x: c.player.x, y: c.player.y, vx: 0, vy: 0, r: 6 }];
  c.update(1 / 60);
  assert.equal(c.state, "lost");
});
test("all patterns are finite, beatable and deterministic at fixed timestep", () => {
  for (let pattern = 0; pattern < 6; pattern++) {
    const boss = { ...createBoss("test"), pattern },
      a = new Battle(boss),
      b = new Battle(boss);
    for (let i = 0; i < 2100 && a.state === "playing"; i++) {
      for (const game of [a, b]) {
        game.player.invincible = 100;
        game.update(1 / 60, { x: Math.sin(i / 50) });
        game.events = [];
        assert.ok(game.bullets.length < 250);
      }
    }
    assert.equal(a.state, "won");
    assert.deepEqual(a.result(), b.result());
    assert.ok(a.time < 32);
  }
});
test("paused games do not advance", () => {
  const b = new Battle(createBoss("a"));
  b.state = "paused";
  b.update(1);
  assert.equal(b.time, 0);
  assert.equal(b.dash(), false);
});
