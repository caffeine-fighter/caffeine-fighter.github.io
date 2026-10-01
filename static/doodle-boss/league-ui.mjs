import { sampleSketch } from "./sketch.mjs?v=5";
import {
  createBoss,
  PATTERNS,
  STYLES,
  packBuild,
  unpackBuild,
  encodeBuild,
  decodeBuild,
  encodeRoster,
  decodeRoster,
  W,
  H,
  VERSION,
} from "./core.mjs?v=5";
import { Duel, STEP, schedule, runLeague } from "./league.mjs?v=5";
import { portrait, background, fitText } from "./art.mjs?v=5";
const $ = (id) => document.getElementById(id);
const element = (tag, text, className) => {
  const e = document.createElement(tag);
  if (text !== undefined) e.textContent = text;
  if (className) e.className = className;
  return e;
};
const description = (b) =>
  `${PATTERNS[b.pattern]} + ${PATTERNS[b.secondary]} · ${STYLES[b.style]}`;

export function initLeagueUI({ getBoss, selectBoss, onMode, initialParams }) {
  let roster = [],
    rows = [],
    matches = [],
    worker,
    runId = 0,
    running = false,
    mode = "solo",
    duel = null,
    paused = false,
    speed = 2,
    last = 0,
    accumulator = 0,
    watched = null;
  const canvas = $("league-game"),
    c = canvas.getContext("2d"),
    reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const params = initialParams || new URLSearchParams(location.search),
    key = "doodle-boss:league:" + VERSION;
  function syncUrl() {
    const url = new URL(location.href);
    if (mode === "league") {
      url.searchParams.set("mode", "league");
      if (roster.length >= 2)
        url.searchParams.set("league", encodeRoster(roster));
      else url.searchParams.delete("league");
    } else {
      url.searchParams.delete("mode");
      url.searchParams.delete("league");
    }
    history.replaceState(null, "", url);
  }
  function updateBuild() {
    const b = getBoss();
    $("build-primary").textContent = PATTERNS[b.pattern];
    $("build-secondary").textContent = PATTERNS[b.secondary];
    $("build-style").textContent = STYLES[b.style];
    $("build-info").textContent =
      `${b.geometry.behavior} · 모서리 ${b.geometry.corners}개 / 닫힌 도형 ${b.geometry.closed}개 · 리그 체력 ${b.duelHp} / 이동 ${b.moveSpeed} / 공격 간격 ${b.reload.toFixed(2)}초`;
    syncUrl();
  }
  document.addEventListener("nameboss:change", updateBuild);
  updateBuild();
  function persist() {
    try {
      localStorage.setItem(key, JSON.stringify(roster.map(packBuild)));
    } catch {}
  }
  function switchMode(next) {
    mode = next;
    onMode(next);
    document.body.classList.toggle("league-mode", next === "league");
    $("solo-panel").hidden = next !== "solo";
    $("league-panel").hidden = next !== "league";
    $("league-results").hidden = next !== "league";
    $("mode-solo").setAttribute("aria-pressed", String(next === "solo"));
    $("mode-league").setAttribute("aria-pressed", String(next === "league"));
    if (next !== "league") paused = true;
    syncUrl();
  }
  $("mode-solo").onclick = () => switchMode("solo");
  $("mode-league").onclick = () => switchMode("league");
  function table() {
    $("rankings").replaceChildren();
    if (!rows.length) {
      const tr = element("tr"),
        td = element(
          "td",
          "리그를 시작하면 실제 대결 결과로 순위가 정해집니다.",
          "empty-ranking",
        );
      td.colSpan = 5;
      tr.append(td);
      $("rankings").append(tr);
      return;
    }
    for (const row of rows) {
      const tr = element("tr"),
        b = unpackBuild(row.boss),
        name = element("td");
      name.append(element("b", row.name), element("small", description(b)));
      tr.append(
        element("td", String(row.rank), row.rank === 1 ? "rank-first" : ""),
        name,
        element("td", `${row.wins}·${row.draws}·${row.losses}`),
        element("td", String(row.points), "points"),
        element(
          "td",
          `${row.difference > 0 ? "+" : ""}${row.difference.toFixed(1)}`,
        ),
      );
      $("rankings").append(tr);
    }
  }
  function rosterView() {
    $("roster").replaceChildren();
    $("roster-count").textContent = `${roster.length} / 8`;
    roster.forEach((boss, index) => {
      const item = element("div", undefined, "roster-item"),
        color = element("i");
      color.style.background = `hsl(${boss.hue} 78% 65%)`;
      const info = element("div");
      info.append(element("b", boss.name), element("small", description(boss)));
      const edit = element("button", "보기");
      edit.setAttribute("aria-label", `${boss.name} 보스 불러오기`);
      edit.onclick = () => {
        selectBoss(boss.name, boss);
        updateBuild();
        $("summon").scrollIntoView({ block: "start", behavior: "instant" });
      };
      const remove = element("button", "×");
      remove.setAttribute("aria-label", `${boss.name} 리그에서 제거`);
      remove.onclick = () => {
        roster.splice(index, 1);
        invalidate();
      };
      item.append(color, info, edit, remove);
      $("roster").append(item);
    });
    $("league-run").disabled = roster.length < 2 || running;
    $("league-rerun").disabled = roster.length < 2 || running;
    $("league-copy").disabled = roster.length < 2;
  }
  function matchLog() {
    $("match-log").replaceChildren();
    if (!matches.length) return;
    $("match-log").append(element("h3", "대결 기록 · 클릭해서 관전"));
    matches.forEach((match, index) => {
      const a = unpackBuild(match.a),
        b = unpackBuild(match.b),
        wins = match.legs.reduce(
          (score, leg) => {
            if (leg.winner === a.id) score[0]++;
            else if (leg.winner === b.id) score[1]++;
            return score;
          },
          [0, 0],
        );
      const item = element("div", undefined, "match-item");
      const label = (boss) =>
        roster.filter((other) => other.name === boss.name).length > 1
          ? `${boss.name} (${PATTERNS[boss.pattern]}·${STYLES[boss.style]})`
          : boss.name;
      item.append(
        element("span", `${label(a)}  ${wins[0]} : ${wins[1]}  ${label(b)}`),
      );
      for (let leg = 0; leg < 2; leg++) {
        const button = element("button", `${leg + 1}차 관전`);
        button.onclick = () => watchMatch(match, leg, index);
        item.append(button);
      }
      $("match-log").append(item);
    });
  }
  function invalidate() {
    runId++;
    worker?.terminate();
    worker = null;
    running = false;
    rows = [];
    matches = [];
    duel = null;
    watched = null;
    paused = false;
    persist();
    table();
    rosterView();
    matchLog();
    $("league-card").disabled = true;
    $("league-progress").textContent = "";
    $("ranking-status").textContent = "경기 전";
    $("league-overlay").hidden = false;
    $("league-title").textContent = "이름 대 이름.";
    $("league-desc").textContent =
      roster.length < 2
        ? "보스를 둘 이상 등록하면 리그를 시작할 수 있어요."
        : `${roster.length}명 등록 완료. 주 패턴과 보조 패턴으로 승부합니다.`;
    $("watch-pause").disabled = true;
    $("watch-pause").textContent = "관전 일시정지";
    $("duel-timer").textContent = "AUTO BATTLE";
    $("duel-caption").textContent = "전원 맞대결 · 시작 위치를 바꿔 2회";
    syncUrl();
  }
  function add(boss) {
    if (roster.some((b) => b.id === boss.id))
      throw Error(
        "이 낙서는 이미 참가했어요. 새 그림을 그리면 다른 보스로 등록할 수 있어요.",
      );
    if (roster.length >= 8)
      throw Error("한 리그에는 최대 8명이 참가할 수 있어요.");
    roster.push(boss);
    invalidate();
    $("roster-notice").textContent = `${boss.name} 참가 완료!`;
  }
  $("roster-add").onclick = () => {
    switchMode("league");
    try {
      add(getBoss());
    } catch (e) {
      $("roster-notice").textContent = e.message;
    }
    $("league-results").scrollIntoView({
      block: "start",
      behavior: reduced ? "instant" : "smooth",
    });
  };
  $("import-form").onsubmit = (e) => {
    e.preventDefault();
    const raw = $("import-boss").value.trim();
    try {
      let boss;
      if (/^https?:\/\//i.test(raw)) {
        const url = new URL(raw);
        if (url.searchParams.has("boss"))
          boss = decodeBuild(url.searchParams.get("boss"));
        else if (url.searchParams.get("name"))
          boss = createBoss(url.searchParams.get("name"));
        else throw Error("친구가 보낸 보스 링크를 붙여넣어 주세요.");
      } else boss = createBoss(raw);
      add(boss);
      $("import-boss").value = "";
    } catch (error) {
      $("roster-notice").textContent = error.message;
    }
  };
  $("league-demo").onclick = () => {
    roster = ["월요일", "김개발", "민수", "지우"].map((name) =>
      createBoss(name, {
        sketch: sampleSketch(
          ["월요일", "김개발", "민수", "지우"].indexOf(name),
        ),
      }),
    );
    invalidate();
    startLeague();
  };
  function showProgress(data) {
    rows = data.rows;
    table();
    $("league-progress").textContent =
      `${data.completed} / ${data.total} 대진 완료 · 각 2경기`;
    $("ranking-status").textContent = "경기 진행 중";
  }
  function complete(data) {
    running = false;
    rows = data.rows;
    matches = data.matches;
    table();
    matchLog();
    rosterView();
    $("ranking-status").textContent = "리그 완료";
    $("league-progress").textContent =
      `총 ${matches.length * 2}경기 완료 · ${rows[0].name} ${rows.filter((r) => r.rank === 1).length > 1 ? "공동 " : ""}1위`;
    $("league-card").disabled = false;
    worker?.terminate();
    worker = null;
    if (!duel) watchMatch(matches[0], 0, 0);
  }
  function startLeague() {
    if (running) return;
    let pairs;
    try {
      pairs = schedule(roster);
    } catch (e) {
      $("roster-notice").textContent = e.message;
      return;
    }
    const ticket = ++runId;
    running = true;
    rows = [];
    matches = [];
    table();
    rosterView();
    $("league-overlay").hidden = true;
    $("league-card").disabled = true;
    $("ranking-status").textContent = "경기 진행 중";
    $("league-progress").textContent = `0 / ${pairs.length} 대진 계산 중…`;
    watchMatch(
      { a: packBuild(pairs[0][0]), b: packBuild(pairs[0][1]), legs: [] },
      0,
      0,
    );
    function fallback() {
      setTimeout(() => {
        if (ticket !== runId) return;
        try {
          const result = runLeague(roster, (p) => {
            if (ticket === runId) showProgress(p);
          });
          if (ticket === runId) complete(result);
        } catch (e) {
          failed(e.message);
        }
      }, 0);
    }
    function failed(message) {
      if (ticket !== runId) return;
      running = false;
      worker?.terminate();
      worker = null;
      rosterView();
      $("league-progress").textContent = message;
    }
    try {
      worker = new Worker(new URL("./league-worker.mjs?v=5", import.meta.url), {
        type: "module",
      });
      worker.onmessage = ({ data }) => {
        if (ticket !== runId) return;
        if (data.type === "progress") showProgress(data);
        else if (data.type === "complete") complete(data);
        else if (data.type === "error") failed(data.message);
      };
      worker.onerror = () => {
        worker?.terminate();
        worker = null;
        fallback();
      };
      worker.postMessage({ bosses: roster.map(packBuild) });
    } catch {
      fallback();
    }
  }
  $("league-run").onclick = startLeague;
  $("league-rerun").onclick = startLeague;
  function watchMatch(match, leg, index) {
    watched = { match, leg, index };
    duel = new Duel(unpackBuild(match.a), unpackBuild(match.b), leg);
    paused = false;
    accumulator = 0;
    last = performance.now();
    $("league-overlay").hidden = true;
    $("watch-pause").disabled = false;
    $("watch-pause").textContent = "관전 일시정지";
    $("duel-caption").textContent =
      `${index + 1}번 대진 · ${leg + 1}차 · ${unpackBuild(match.a).name} vs ${unpackBuild(match.b).name}`;
    restorePause();
  }
  $("watch-pause").onclick = () => {
    if (!duel) return;
    paused = !paused;
    $("watch-pause").textContent = paused ? "관전 계속하기" : "관전 일시정지";
  };
  $("watch-speed").onclick = () => {
    speed = speed === 2 ? 4 : speed === 4 ? 1 : 2;
    $("watch-speed").textContent = speed + "×";
  };
  function watchEnd() {
    const result = duel.result(),
      winner = result.winner
        ? duel.fighters.find((f) => f.boss.id === result.winner).boss.name
        : "무승부";
    $("duel-caption").textContent =
      `${winner}${result.winner ? " 승리" : ""} · ${result.timeout ? "시간 종료 판정" : "KO"} · ${result.time.toFixed(2)}초`;
    if (watched.leg === 0) {
      $("watch-pause").textContent = "2차 관전";
      $("watch-pause").onclick = () => {
        watchMatch(watched.match, 1, watched.index);
        restorePause();
      };
    } else {
      $("watch-pause").textContent = "다시 관전";
      $("watch-pause").onclick = () => {
        watchMatch(watched.match, 0, watched.index);
        restorePause();
      };
    }
  }
  function restorePause() {
    $("watch-pause").onclick = () => {
      if (!duel) return;
      paused = !paused;
      $("watch-pause").textContent = paused ? "관전 계속하기" : "관전 일시정지";
    };
  }
  function render(now, dt) {
    const ratio = Math.min(devicePixelRatio || 1, 2);
    if (canvas.width !== Math.round(W * ratio)) {
      canvas.width = Math.round(W * ratio);
      canvas.height = Math.round(H * ratio);
    }
    c.setTransform(ratio, 0, 0, ratio, 0, 0);
    background(c, roster[0]?.seed || 42, reduced ? 0 : now / 1000, reduced);
    c.strokeStyle = "#41414f";
    c.setLineDash([5, 9]);
    c.beginPath();
    c.moveTo(15, H / 2);
    c.lineTo(W - 15, H / 2);
    c.stroke();
    c.setLineDash([]);
    if (duel) {
      for (const b of duel.bullets) {
        c.globalAlpha = b.delay > 0 ? 0.23 : 1;
        c.fillStyle = b.owner === 0 ? "#d5ff60" : "#ff719b";
        c.beginPath();
        c.arc(b.x, b.y, b.delay > 0 ? b.r + 3 : b.r, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
      for (const f of duel.fighters) {
        const color = f.side === 0 ? "#d5ff60" : "#ff719b";
        portrait(
          c,
          f.boss,
          f.x,
          f.y,
          0.43,
          reduced ? 0 : now / 1000,
          f.phase > 1,
        );
        c.strokeStyle = f.hit > 0 ? "#fff" : color;
        c.lineWidth = 1;
        c.beginPath();
        c.arc(f.x, f.y, 26, 0, Math.PI * 2);
        c.stroke();
        const y = f.side === 0 ? 28 : H - 51;
        c.fillStyle = "#35353f";
        c.fillRect(40, y, W - 80, 6);
        c.fillStyle = color;
        c.fillRect(40, y, ((W - 80) * f.hp) / f.boss.duelHp, 6);
        c.textAlign = "center";
        fitText(
          c,
          `${f.boss.name} · ${STYLES[f.boss.style]} · ${Math.ceil((f.hp / f.boss.duelHp) * 100)}%`,
          W / 2,
          y + 24,
          500,
          14,
          color,
          700,
        );
      }
      $("duel-timer").textContent =
        `${duel.time.toFixed(1)} / 32s${duel.time >= 22 ? " · 서든 데스" : ""}`;
      if (duel.time >= 22) {
        c.textAlign = "center";
        fitText(
          c,
          "SUDDEN DEATH · 피해 증가",
          W / 2,
          H / 2 + 6,
          500,
          12,
          "#ff719b",
          700,
        );
      }
    } else {
      if (roster[0])
        portrait(c, roster[0], W / 2, 150, 1, reduced ? 0 : now / 1000);
      if (roster[1])
        portrait(c, roster[1], W / 2, 520, 0.8, reduced ? 0 : now / 1000);
      c.textAlign = "center";
      fitText(c, "VS", W / 2, 360, 400, 60, "#444450");
    }
  }
  function frame(now) {
    const dt = Math.min((now - last) / 1000 || 0, 0.1);
    last = now;
    if (mode === "league") {
      if (duel && duel.state === "playing" && !paused && !document.hidden) {
        accumulator += dt * speed;
        while (accumulator >= STEP && duel.state === "playing") {
          duel.update();
          accumulator -= STEP;
        }
        if (duel.state === "complete") watchEnd();
      }
      render(now, dt);
    }
    requestAnimationFrame(frame);
  }
  function leagueUrl() {
    const url = new URL(location.href);
    url.search = "";
    url.searchParams.set("league", encodeRoster(roster));
    url.searchParams.set("mode", "league");
    url.searchParams.set("v", VERSION);
    return url.href;
  }
  $("league-copy").onclick = async () => {
    try {
      await navigator.clipboard.writeText(leagueUrl());
      $("roster-notice").textContent =
        "대진표 링크를 복사했어요! 친구도 같은 구성으로 리그를 돌릴 수 있어요.";
    } catch {
      const link = element("a", leagueUrl());
      link.href = leagueUrl();
      $("roster-notice").replaceChildren(
        document.createTextNode("링크를 길게 눌러 복사하세요: "),
        link,
      );
    }
  };
  $("league-card").onclick = async () => {
    if (!rows.length) return;
    try {
      await document.fonts.ready;
      const card = document.createElement("canvas");
      card.width = 1080;
      card.height = 1350;
      const ctx = card.getContext("2d");
      ctx.fillStyle = "#101014";
      ctx.fillRect(0, 0, 1080, 1350);
      ctx.textAlign = "center";
      fitText(ctx, "DOODLE BOSS / 우리 보스 리그", 540, 92, 960, 27, "#d5ff60");
      fitText(ctx, "내 친구 최강 보스는?", 540, 175, 960, 56);
      fitText(
        ctx,
        `${roster.length}명 · ${matches.length * 2}경기 · 이 대진표의 순위`,
        540,
        230,
        960,
        24,
        "#a1a1af",
        400,
      );
      rows.forEach((r, i) => {
        const y = 285 + i * 110;
        ctx.fillStyle = r.rank === 1 ? "#293222" : "#1d1d25";
        ctx.fillRect(65, y, 950, 96);
        ctx.textAlign = "left";
        fitText(
          ctx,
          String(r.rank).padStart(2, "0"),
          95,
          y + 60,
          80,
          34,
          r.rank === 1 ? "#d5ff60" : "#a1a1af",
        );
        fitText(ctx, r.name, 195, y + 32, 550, 30);
        fitText(
          ctx,
          description(roster.find((b) => b.id === r.id)),
          195,
          y + 56,
          550,
          16,
          "#a1a1af",
          400,
        );
        fitText(
          ctx,
          `${r.wins}승 ${r.draws}무 ${r.losses}패`,
          195,
          y + 77,
          550,
          18,
          "#a1a1af",
          400,
        );
        ctx.textAlign = "right";
        fitText(ctx, r.points + "점", 977, y + 60, 200, 32, "#d5ff60");
      });
      ctx.textAlign = "center";
      fitText(ctx, "네 보스도 대진표에 넣어봐.", 540, 1230, 960, 28);
      fitText(
        ctx,
        "caffeine-fighter.github.io/doodle-boss",
        540,
        1285,
        960,
        20,
        "#a1a1af",
        400,
      );
      const blob = await new Promise((r) => card.toBlob(r));
      if (!blob) throw new Error("Card export failed");
      const url = URL.createObjectURL(blob),
        a = element("a");
      a.href = url;
      a.download = "doodle-boss-league.png";
      document.body.append(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(url), 30000);
      $("roster-notice").textContent =
        "순위 카드를 저장했어요. 대진표 링크와 함께 공유해 보세요.";
    } catch {
      $("roster-notice").textContent =
        "카드 저장에 실패했어요. 대진표 링크를 공유해 주세요.";
    }
  };
  try {
    if (params.has("league")) roster = decodeRoster(params.get("league"));
    else {
      const stored = JSON.parse(
        localStorage.getItem(key) ||
          localStorage.getItem("doodle-boss:league:3") ||
          "null",
      );
      if (Array.isArray(stored) && stored.length <= 8) {
        roster = stored.map(unpackBuild);
        roster = roster.filter(
          (b, i) => roster.findIndex((x) => x.id === b.id) === i,
        );
      }
    }
  } catch (e) {
    $("roster-notice").textContent = params.has("league")
      ? e.message
      : "저장된 대진표를 불러오지 못했어요.";
  }
  if (!roster.length) roster = [getBoss()];
  persist();
  rosterView();
  table();
  if (params.has("league")) {
    selectBoss(roster[0].name, roster[0]);
    updateBuild();
    switchMode("league");
  } else if (params.get("mode") === "league") switchMode("league");
  requestAnimationFrame(frame);
  return { switchMode };
}
