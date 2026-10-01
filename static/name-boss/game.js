import {
  Battle,
  createBoss,
  normalizeName,
  TYPES,
  VERSION,
  W,
  H,
  PATTERNS,
  STYLES,
  encodeBuild,
  decodeBuild,
} from "./core.mjs?v=4";
import { portrait, background, fitText, drawCard } from "./art.mjs?v=4";
import { initLeagueUI } from "./league-ui.mjs?v=4";
const $ = (id) => document.getElementById(id),
  canvas = $("game"),
  ctx = canvas.getContext("2d");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches,
  keys = new Set();
let boss,
  battle,
  state = "ready",
  result = null,
  target = null,
  pointerId = null,
  lastPointer = null;
let lastTime = 0,
  accumulator = 0,
  particles = [],
  toastTime = 0,
  flash = 0,
  audio,
  sound = false;
let challengeTime = 0;
const params = new URLSearchParams(location.search);
let initialBoss = null,
  linkError = "",
  workshop;
if (params.has("boss")) {
  try {
    initialBoss = decodeBuild(params.get("boss"));
  } catch (error) {
    linkError = error.message;
  }
}
const challengeValue = Number(params.get("time"));
if (params.get("v") === VERSION && challengeValue >= 5 && challengeValue <= 120)
  challengeTime = challengeValue;
const storage = {
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  },
  set(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch {
      /* Private browsing still allows play. */
    }
  },
};
function recordKey() {
  return "name-boss:" + VERSION + ":" + boss.id;
}
function best() {
  const v = Number(storage.get(recordKey()));
  return Number.isFinite(v) && v > 0 ? v : 0;
}
function bestLabel() {
  $("best").textContent = best() ? `BEST ${best().toFixed(2)}s` : "BEST —";
}
function tone(freq = 440, duration = 0.06, type = "sine", volume = 0.04) {
  if (!sound || !audio || audio.state !== "running") return;
  const o = audio.createOscillator(),
    g = audio.createGain();
  o.type = type;
  o.frequency.setValueAtTime(freq, audio.currentTime);
  o.frequency.exponentialRampToValueAtTime(
    Math.max(30, freq * 0.6),
    audio.currentTime + duration,
  );
  g.gain.setValueAtTime(volume, audio.currentTime);
  g.gain.exponentialRampToValueAtTime(0.001, audio.currentTime + duration);
  o.connect(g);
  g.connect(audio.destination);
  o.start();
  o.stop(audio.currentTime + duration);
}
$("sound").onclick = async () => {
  try {
    if (!audio)
      audio = new (window.AudioContext || window.webkitAudioContext)();
    await audio.resume();
    sound = !sound;
    $("sound").textContent = "소리 " + (sound ? "ON" : "OFF");
    $("sound").setAttribute("aria-pressed", String(sound));
    tone(660);
  } catch {
    $("notice").textContent =
      "이 브라우저에서는 소리를 켤 수 없어요. 게임은 그대로 즐길 수 있습니다.";
  }
};
function overlay(label, title, description, button) {
  $("overlay").hidden = false;
  $("result-label").textContent = label;
  $("result-title").textContent = title;
  $("result-desc").textContent = description;
  $("start").textContent = button;
  $("result-stats").hidden = true;
  $("result-share").hidden = true;
  $("exit").hidden = state === "ready";
}
function summon(raw, initial = false, config = {}) {
  const name = normalizeName(raw);
  if (!name) {
    $("notice").textContent = "이름이나 별명을 먼저 적어주세요.";
    $("name").focus();
    return;
  }
  boss = createBoss(name, config);
  battle = new Battle(boss);
  state = "ready";
  result = null;
  particles = [];
  target = null;
  keys.clear();
  document.body.classList.remove("playing");
  $("name").value = boss.name;
  $("boss-name").textContent = boss.name;
  $("title").textContent = boss.title;
  $("quote").textContent = "“" + boss.quote + "”";
  $("boss-code").textContent = "#" + boss.code;
  $("species").textContent = TYPES[boss.type];
  $("ability").textContent =
    PATTERNS[boss.pattern] + " + " + PATTERNS[boss.secondary];
  for (const key of ["ego", "patience"]) {
    $(key).textContent = boss[key];
    $(key + "-bar").style.width = boss[key] + "%";
  }
  $("notice").textContent = "";
  $("battle-toast").textContent = "";
  $("timer").textContent = "00.0s";
  $("arena-label").textContent = "BOSS DISCOVERED";
  $("card").textContent = "보스 카드 이미지 저장 ↓";
  $("start-hint").hidden = false;
  $("pause").disabled = true;
  $("pause").setAttribute("aria-label", "일시정지");
  if (!initial) challengeTime = 0;
  $("challenge").hidden = !challengeTime;
  $("challenge").textContent = challengeTime
    ? `도전장 도착! 이 보스를 ${challengeTime.toFixed(2)}초보다 빠르게 격파해 보세요. (친구가 공유한 기록)`
    : "";
  overlay(
    "CHALLENGER WANTED",
    "이길 자신 있어?",
    "예측탄 · 곡선탄 · 3단계 광폭화.\n공격은 자동. 스치듯 피할수록 강해집니다.",
    "도전하기 →",
  );
  bestLabel();
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("name", boss.name);
  url.searchParams.set("v", VERSION);
  url.searchParams.set("boss", encodeBuild(boss));
  if (challengeTime) url.searchParams.set("time", challengeTime.toFixed(2));
  history.replaceState(null, "", url);
  document.dispatchEvent(new CustomEvent("nameboss:change", { detail: boss }));
  tone(330, 0.1);
}
function focusGame() {
  canvas.focus({ preventScroll: true });
}
function start() {
  if (state !== "paused") {
    battle = new Battle(boss);
    result = null;
    particles = [];
  }
  state = "playing";
  battle.state = "playing";
  keys.clear();
  target = null;
  pointerId = null;
  lastPointer = null;
  accumulator = 0;
  lastTime = performance.now();
  $("overlay").hidden = true;
  $("battle-toast").textContent = "";
  $("arena-label").textContent = "BATTLE IN PROGRESS";
  document.body.classList.add("playing");
  $("pause").setAttribute("aria-label", "일시정지");
  $("pause").disabled = false;
  focusGame();
  if (!matchMedia("(max-width:760px)").matches)
    canvas.scrollIntoView({ block: "center", behavior: "instant" });
  tone(540, 0.12);
}
function pause() {
  if (state === "paused") {
    start();
    return;
  }
  if (state !== "playing") return;
  state = "paused";
  battle.state = "paused";
  keys.clear();
  target = null;
  pointerId = null;
  lastPointer = null;
  overlay(
    "PAUSED",
    "잠깐 숨 고르기",
    "준비되면 다시 이어서 싸워요.",
    "계속하기 →",
  );
  $("start-hint").hidden = true;
  $("pause").setAttribute("aria-label", "계속하기");
  $("start").focus({ preventScroll: true });
}
function finish() {
  state = battle.state;
  result = battle.result();
  document.body.classList.remove("playing");
  keys.clear();
  target = null;
  pointerId = null;
  lastPointer = null;
  $("battle-toast").textContent = "";
  $("pause").disabled = true;
  const previous = best(),
    isBest = result.won && (!previous || result.time < previous);
  if (isBest) storage.set(recordKey(), String(result.time));
  bestLabel();
  const challenge =
    challengeTime && result.won
      ? result.time < challengeTime
        ? "친구 기록을 깼습니다!"
        : `친구 기록까지 ${(result.time - challengeTime).toFixed(2)}초!`
      : "";
  overlay(
    result.won ? (isBest ? "NEW PERSONAL BEST" : "BOSS DEFEATED") : "YOU DIED",
    result.won ? "친구를 이겨버렸다." : "친구가 너무 강하다.",
    result.won
      ? `${boss.name} 격파. ${challenge || "이제 친구 차례입니다."}`
      : `${boss.name} 체력 ${Math.ceil((battle.hp / boss.hp) * 100)}% 남음.\n${battle.grazes ? "아슬아슬 회피를 활용해 더 빠르게 끝내보세요." : "탄막에 갇혔다면 대시로 빠져나오세요."}`,
    "한 판 더 →",
  );
  const stats = $("result-stats");
  stats.replaceChildren();
  for (const [value, label] of [
    [result.rank, "등급"],
    [result.time.toFixed(2) + "s", "플레이"],
    [String(result.grazes), "아슬아슬 회피"],
  ]) {
    const span = document.createElement("span"),
      b = document.createElement("b");
    b.textContent = value;
    span.append(b, document.createTextNode(label));
    stats.append(span);
  }
  stats.hidden = false;
  $("result-share").hidden = false;
  $("start-hint").hidden = true;
  $("card").textContent = "결과 카드 이미지 저장 ↓";
  $("arena-label").textContent = result.won ? "BOSS DEFEATED" : "TRY AGAIN";
  $("start").focus({ preventScroll: true });
  tone(result.won ? 880 : 130, 0.3, "triangle");
  requestAnimationFrame(() => {
    $("overlay").scrollIntoView({
      block: "center",
      behavior: reduced ? "instant" : "smooth",
    });
  });
}
function dash() {
  if (state === "playing" && battle.dash()) tone(420, 0.1, "sawtooth", 0.015);
}
function puff(x, y, color, n = 6) {
  if (reduced) return;
  for (let i = 0; i < n; i++) {
    const a = Math.random() * Math.PI * 2,
      s = 30 + Math.random() * 90;
    particles.push({
      x,
      y,
      vx: Math.cos(a) * s,
      vy: Math.sin(a) * s,
      life: 0.45,
      max: 0.45,
      color,
    });
  }
  if (particles.length > 180) particles.splice(0, particles.length - 180);
}
function events() {
  for (const e of battle.events) {
    if (e.type === "spark") puff(e.x, e.y, "#d5ff60", 3);
    if (e.type === "hit") {
      puff(e.x, e.y, "#ff719b", 15);
      flash = 0.12;
      tone(100, 0.15, "triangle");
    }
    if (e.type === "dash") puff(e.x, e.y, "#d5ff60", 16);
    if (e.type === "graze") {
      puff(e.x, e.y, "#9a9aff", 5);
      tone(950, 0.025, "sine", 0.018);
    }
    if (e.type === "rage") {
      $("battle-toast").textContent =
        battle.phase === 3 ? "광폭화 / 패턴 중첩" : "분노 발동 / " + boss.skill;
      toastTime = 1.6;
      tone(170, 0.25, "sawtooth", 0.02);
    }
  }
  battle.events.length = 0;
}
function render(t, dt) {
  const dpr = Math.min(devicePixelRatio || 1, 2);
  if (canvas.width !== Math.round(W * dpr)) {
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  background(ctx, boss.seed, t, reduced);
  const active = state === "playing" || state === "paused";
  const bob = reduced || state === "paused" ? 0 : Math.sin(t * 2) * 5;
  if (active) {
    portrait(ctx, boss, W / 2, 150 + bob, 0.86, t, battle.phase >= 2);
    ctx.fillStyle = "#38383f";
    ctx.fillRect(70, 30, W - 140, 5);
    ctx.fillStyle = battle.phase >= 2 ? "#ff719b" : "#d5ff60";
    ctx.fillRect(70, 30, ((W - 140) * battle.hp) / boss.hp, 5);
    ctx.textAlign = "center";
    fitText(
      ctx,
      `${boss.name} / ${battle.phase === 3 ? "광폭화" : battle.phase === 2 ? "분노" : "PHASE 01"}`,
      W / 2,
      58,
      500,
      14,
      "#b9b9ca",
      500,
    );
  } else {
    portrait(
      ctx,
      boss,
      W / 2,
      state === "ready" ? 203 + bob : 153 + bob,
      state === "ready" ? 1.22 : 0.76,
      t,
      false,
    );
    ctx.textAlign = "center";
    fitText(ctx, boss.title, W / 2, 45, 520, 15, "#d5ff60", 500);
    fitText(ctx, boss.name, W / 2, 87, 520, 32);
    if (state === "ready")
      fitText(ctx, "“" + boss.quote + "”", W / 2, 353, 520, 16, "#c1c1d0", 400);
  }
  if (active) {
    for (const s of battle.shots) {
      ctx.strokeStyle = "#d5ff60";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(s.x, s.y);
      ctx.lineTo(s.x - s.vx * 0.018, s.y - s.vy * 0.018);
      ctx.stroke();
    }
    for (const b of battle.bullets) {
      ctx.globalAlpha = b.delay > 0 ? 0.24 : 1;
      ctx.fillStyle = battle.phase >= 2 ? "#ff719b" : "#b9a0ff";
      ctx.beginPath();
      ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = "#fff2f7";
      ctx.beginPath();
      ctx.arc(b.x, b.y, 2, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    const p = battle.player;
    ctx.save();
    ctx.translate(p.x, p.y);
    if (p.invincible > 0) {
      ctx.strokeStyle = "#d5ff60";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(0, 0, 23, 0, Math.PI * 2);
      ctx.stroke();
      ctx.globalAlpha = 0.7;
    }
    ctx.fillStyle = "#d5ff60";
    ctx.beginPath();
    ctx.moveTo(0, -15);
    ctx.lineTo(12, 13);
    ctx.lineTo(0, 7);
    ctx.lineTo(-12, 13);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    ctx.arc(0, 0, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
    ctx.textAlign = "left";
    fitText(
      ctx,
      "♥".repeat(Math.max(0, p.hp)) + "♡".repeat(5 - Math.max(0, p.hp)),
      20,
      H - 22,
      200,
      23,
      "#d5ff60",
      500,
    );
    ctx.textAlign = "right";
    fitText(
      ctx,
      `GRAZE ${battle.grazes} · ATK +${Math.round((Math.min(1.4, battle.grazes * 0.065) / 2.6) * 100)}%`,
      W - 20,
      H - 24,
      300,
      12,
      "#c1c1d0",
      500,
    );
  }
  for (const p of particles) {
    p.life -= dt;
    p.x += p.vx * dt;
    p.y += p.vy * dt;
    ctx.globalAlpha = Math.max(0, p.life / p.max);
    ctx.fillStyle = p.color;
    ctx.fillRect(p.x, p.y, 3, 3);
  }
  ctx.globalAlpha = 1;
  particles = particles.filter((p) => p.life > 0);
  if (flash > 0 && !reduced) {
    ctx.strokeStyle = "#ff719b";
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, W - 8, H - 8);
    flash -= dt;
  }
}
function frame(now) {
  const dt = Math.min((now - lastTime) / 1000 || 0, 0.1);
  lastTime = now;
  if (state === "playing") {
    accumulator += dt;
    while (accumulator >= 1 / 60 && state === "playing") {
      battle.update(1 / 60, {
        x:
          Number(keys.has("d") || keys.has("arrowright")) -
          Number(keys.has("a") || keys.has("arrowleft")),
        y:
          Number(keys.has("s") || keys.has("arrowdown")) -
          Number(keys.has("w") || keys.has("arrowup")),
        target,
      });
      accumulator -= 1 / 60;
      events();
      if (battle.state !== "playing") finish();
    }
    $("timer").textContent = battle.time.toFixed(1) + "s";
    document.querySelector("#dash i").style.width =
      (1 - battle.player.cooldown / 2.5) * 100 + "%";
    $("dash").disabled = battle.player.cooldown > 0;
    if (toastTime > 0) {
      toastTime -= dt;
      if (toastTime <= 0) $("battle-toast").textContent = "";
    }
  }
  if (!document.body.classList.contains("league-mode"))
    render(reduced ? 0 : now / 1000, dt);
  requestAnimationFrame(frame);
}
$("summon").onsubmit = (e) => {
  e.preventDefault();
  summon($("name").value, false, {});
  $("name").blur();
};
document
  .querySelectorAll("[data-name]")
  .forEach((b) => (b.onclick = () => summon(b.dataset.name)));
const examples = [
  "김개발",
  "과제",
  "알람",
  "우리 팀장님",
  "월요일",
  "민수",
  "지우",
  "내일의 나",
  "와이파이",
  "마감",
];
$("random").onclick = () => {
  const pool = examples.filter((n) => n !== boss.name);
  summon(pool[Math.floor(Math.random() * pool.length)]);
};
$("start").onclick = start;
$("pause").onclick = pause;
$("dash").onclick = dash;
$("exit").onclick = () => {
  summon(boss.name, false, boss);
  $("name").focus();
  $("name").select();
  $("summon").scrollIntoView({ block: "center", behavior: "instant" });
};
window.addEventListener("keydown", (e) => {
  if (e.target.matches("input,textarea,select") || e.isComposing) return;
  const k = e.key.toLowerCase();
  if (
    state === "playing" &&
    ["arrowup", "arrowdown", "arrowleft", "arrowright", " "].includes(k)
  )
    e.preventDefault();
  if (state === "playing") keys.add(k);
  if (k === " " && !e.repeat && state === "playing") dash();
  if (k === "escape" && !e.repeat) pause();
});
window.addEventListener("keyup", (e) => keys.delete(e.key.toLowerCase()));
window.addEventListener("blur", () => {
  if (state === "playing") pause();
});
document.addEventListener("visibilitychange", () => {
  if (document.hidden && state === "playing") pause();
});
// Relative drag preserves finger-to-ship distance and works with letterboxed mobile canvases.
function point(e) {
  const r = canvas.getBoundingClientRect(),
    scale = Math.min(r.width / W, r.height / H);
  return { x: e.clientX / scale, y: e.clientY / scale };
}
canvas.onpointerdown = (e) => {
  if (state !== "playing" || pointerId !== null) return;
  e.preventDefault();
  pointerId = e.pointerId;
  lastPointer = point(e);
  target = { x: battle.player.x, y: battle.player.y };
  canvas.setPointerCapture(e.pointerId);
};
canvas.onpointermove = (e) => {
  if (e.pointerId !== pointerId || state !== "playing") return;
  const p = point(e);
  target.x = Math.max(18, Math.min(W - 18, target.x + p.x - lastPointer.x));
  target.y = Math.max(240, Math.min(H - 24, target.y + p.y - lastPointer.y));
  lastPointer = p;
};
function release(e) {
  if (e.pointerId === pointerId) {
    target = null;
    pointerId = null;
    lastPointer = null;
  }
}
canvas.onpointerup = release;
canvas.onpointercancel = release;
canvas.onlostpointercapture = release;
function shareUrl() {
  const url = new URL(location.href);
  url.search = "";
  url.searchParams.set("name", boss.name);
  url.searchParams.set("v", VERSION);
  url.searchParams.set("boss", encodeBuild(boss));
  if (result?.won) url.searchParams.set("time", result.time.toFixed(2));
  return url.href;
}
async function share() {
  const url = shareUrl(),
    text = result?.won
      ? `${boss.name} 보스 ${result.time.toFixed(2)}초 격파! 내 기록 깰 수 있어?`
      : `${boss.title}, ${boss.name} 등장. 너는 이길 수 있어?`;
  try {
    if (navigator.share) {
      await navigator.share({ title: "네 이름은 보스.", text, url });
      return;
    }
    await navigator.clipboard.writeText(text + "\n" + url);
    $("notice").textContent =
      "도전장 링크를 복사했어요. 친구에게 붙여넣어 보세요!";
  } catch (e) {
    if (e.name === "AbortError") return;
    try {
      await navigator.clipboard.writeText(url);
      $("notice").textContent = "도전장 링크를 복사했어요!";
    } catch {
      $("notice").replaceChildren(
        document.createTextNode("링크를 길게 눌러 복사하세요: "),
      );
      const link = document.createElement("a");
      link.href = url;
      link.textContent = url;
      $("notice").append(link);
    }
  }
}
$("share").onclick = share;
$("result-share").onclick = share;
$("copy").onclick = async () => {
  const url = shareUrl();
  try {
    await navigator.clipboard.writeText(url);
    $("notice").textContent =
      "도전장 링크를 복사했어요! 친구에게 붙여넣어 보세요.";
  } catch {
    $("notice").replaceChildren(
      document.createTextNode("이 링크를 길게 눌러 복사하세요: "),
    );
    const link = document.createElement("a");
    link.href = url;
    link.textContent = url;
    $("notice").append(link);
  }
};
$("card").onclick = async () => {
  try {
    await document.fonts.ready;
    const image = document.createElement("canvas");
    drawCard(image.getContext("2d"), boss, result);
    const blob = await new Promise((resolve) =>
      image.toBlob(resolve, "image/png"),
    );
    if (!blob) throw Error("image");
    const url = URL.createObjectURL(blob),
      link = document.createElement("a");
    link.href = url;
    link.download = `name-boss-${boss.code}.png`;
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    $("notice").textContent =
      "이미지를 저장했어요. 도전장 링크와 함께 보내보세요!";
  } catch {
    $("notice").textContent =
      "이미지를 저장하지 못했어요. 도전장 링크를 공유해 주세요.";
  }
};
summon(
  initialBoss?.name || params.get("name") || "월요일",
  true,
  initialBoss || {},
);
if (linkError) $("notice").textContent = linkError;
workshop = initLeagueUI({
  getBoss: () => boss,
  selectBoss: (name, config) => summon(name, false, config),
  initialParams: params,
  onMode: () => {
    if (state === "playing") pause();
    document.body.classList.remove("playing");
  },
});
requestAnimationFrame(frame);
