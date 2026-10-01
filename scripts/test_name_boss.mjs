import test from "node:test";
import assert from "node:assert/strict";
import {
  Battle,
  createBoss,
  normalizeName,
  W,
  H,
  encodeBuild,
  decodeBuild,
  encodeRoster,
  decodeRoster,
} from "../static/name-boss/core.mjs";
import {
  Duel,
  simulateDuel,
  runLeague,
  standings,
  schedule,
} from "../static/name-boss/league.mjs";
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
test("all hard patterns stay bounded and auto fire clears them with a protected player", () => {
  for (let pattern = 0; pattern < 6; pattern++) {
    const boss = Array.from({ length: 200 }, (_, i) =>
        createBoss("test" + i),
      ).find((b) => b.pattern === pattern),
      a = new Battle(boss),
      b = new Battle(boss);
    for (let i = 0; i < 2100 && a.state === "playing"; i++) {
      for (const game of [a, b]) {
        game.player.invincible = 100;
        game.update(1 / 60, { x: Math.sin(i / 50) });
        game.events = [];
        assert.ok(game.bullets.length < 500);
      }
    }
    assert.equal(a.state, "won");
    assert.deepEqual(a.result(), b.result());
    assert.ok(a.time < 32);
  }
});
test("every hard pattern requires movement and reaches a third phase", () => {
  for (let pattern = 0; pattern < 6; pattern++) {
    const boss = Array.from({ length: 200 }, (_, i) =>
        createBoss("test" + i),
      ).find((b) => b.pattern === pattern),
      idle = new Battle(boss);
    while (idle.state === "playing" && idle.time < 32) {
      idle.update(1 / 60);
      idle.events = [];
    }
    assert.equal(idle.state, "lost");
    assert.ok(idle.time < 20);
    const rage = new Battle(boss);
    rage.hp = boss.hp * 0.2;
    rage.update(1 / 60);
    assert.equal(rage.phase, 3);
    assert.equal(rage.bullets.length, 0);
    assert.ok(rage.attack >= 1);
  }
});
test("name-derived builds and Unicode league links round trip with strict limits", () => {
  const boss = createBoss("가나다 😈", { pattern: 4, secondary: 1, style: 2 });
  assert.deepEqual(decodeBuild(encodeBuild(boss)), boss);
  const roster = [boss, createBoss("a"), createBoss("b")];
  assert.deepEqual(decodeRoster(encodeRoster(roster)), roster);
  assert.throws(() => decodeBuild("invalid!"));
  assert.throws(() => decodeRoster(encodeRoster([boss, boss])));
  assert.throws(() =>
    decodeRoster(
      encodeRoster(Array.from({ length: 9 }, (_, i) => createBoss("보스" + i))),
    ),
  );
  assert.throws(() => decodeRoster(encodeRoster([boss])));
  assert.equal(
    createBoss("a", { pattern: 0 }).id,
    createBoss("a", { pattern: 1 }).id,
  );
  const fixed = createBoss("a", { pattern: 2, secondary: 2 });
  assert.notEqual(fixed.pattern, fixed.secondary);
  const legacy = (value) =>
    Buffer.from(JSON.stringify(["3", value])).toString("base64url");
  assert.deepEqual(decodeBuild(legacy(["가나다 😈", 0, 1, 0])), boss);
  assert.deepEqual(
    decodeRoster(
      legacy([
        ["a", 0, 1, 0],
        ["a", 2, 3, 1],
        ["b", 4, 5, 2],
      ]),
    ),
    [createBoss("a"), createBoss("b")],
  );
});
test("league results do not depend on input order or replay batching", () => {
  const roster = ["김개발", "월요일", "민수"].map((n) => createBoss(n));
  const forward = runLeague(roster),
    reversed = runLeague([...roster].reverse());
  assert.deepEqual(forward, reversed);
  assert.ok(
    forward.rows.every(
      (r) => r.played === 4 && r.played === r.wins + r.draws + r.losses,
    ),
  );
  const pair = forward.matches[0],
    a = roster.find((b) => b.id === pair.legs[0].combatants[0].id),
    b = roster.find((b) => b.id === pair.legs[0].combatants[1].id);
  const replay = new Duel(a, b, 0);
  while (replay.state === "playing")
    for (let frame = 0; frame < 4; frame++) replay.update();
  assert.deepEqual(replay.result(), simulateDuel(a, b, 0));
  assert.equal(
    new Duel(a, b, 0).fighters[0].boss.id,
    new Duel(a, b, 1).fighters[1].boss.id,
  );
  assert.ok(
    forward.matches.every((m) =>
      m.legs.every(
        (l) =>
          l.time <= 32 && l.combatants.every((c) => c.hp >= 0 && c.hp <= 100),
      ),
    ),
  );
});
test("standings award correct points and share ranks on an exact tie", () => {
  const bosses = ["a", "b", "c"].map((n) => createBoss(n));
  const tied = standings(bosses, []);
  assert.deepEqual(
    tied.map((r) => r.rank),
    [1, 1, 1],
  );
  const rounds = [
    {
      winner: bosses[0].id,
      combatants: [
        { id: bosses[0].id, hp: 80 },
        { id: bosses[1].id, hp: 0 },
      ],
    },
    {
      winner: null,
      combatants: [
        { id: bosses[1].id, hp: 40 },
        { id: bosses[2].id, hp: 40 },
      ],
    },
  ];
  const ranked = standings(bosses, rounds);
  assert.equal(ranked[0].id, bosses[0].id);
  assert.equal(ranked[0].points, 3);
  assert.equal(ranked.find((r) => r.id === bosses[2].id).points, 1);
  assert.throws(() => schedule([bosses[0], bosses[0]]));
  assert.equal(schedule(bosses).length, 3);
});
test("paused games do not advance", () => {
  const b = new Battle(createBoss("a"));
  b.state = "paused";
  b.update(1);
  assert.equal(b.time, 0);
  assert.equal(b.dash(), false);
});
