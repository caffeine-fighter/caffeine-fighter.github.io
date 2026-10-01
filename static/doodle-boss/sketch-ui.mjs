import { createBoss } from "./core.mjs?v=6";
import { createPreview, exportIntro } from "./preview.mjs?v=6";
import { analyzeSketch, sampleSketch, MAX_POINTS } from "./sketch.mjs?v=6";
const $ = (id) => document.getElementById(id);
const copy = (s) => s.map((line) => line.map((p) => [...p]));
function simplify(points) {
  if (points.length < 3) return points;
  const a = points[0],
    b = points.at(-1),
    dx = b[0] - a[0],
    dy = b[1] - a[1],
    den = dx * dx + dy * dy;
  let far = 0,
    index = 0;
  for (let i = 1; i < points.length - 1; i++) {
    const p = points[i],
      t = den
        ? Math.max(
            0,
            Math.min(1, ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / den),
          )
        : 0,
      d = Math.hypot(p[0] - a[0] - t * dx, p[1] - a[1] - t * dy);
    if (d > far) {
      far = d;
      index = i;
    }
  }
  return far > 1.4
    ? [
        ...simplify(points.slice(0, index + 1)).slice(0, -1),
        ...simplify(points.slice(index)),
      ]
    : [a, b];
}
export function initSketchUI({ getBoss, summon, play, invite, initialParams }) {
  const canvas = $("sketch-pad"),
    c = canvas.getContext("2d");
  let strokes = copy(getBoss().sketch),
    active = null,
    pointer = null;
  const preview = createPreview($("sketch-preview")),
    reveal = createPreview($("reveal-canvas")),
    dialog = $("awakening");
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let draft = null,
    signature = "",
    lastFrame = 0,
    recording = false;
  try {
    if (!initialParams?.has("boss") && !initialParams?.has("rival")) {
      const saved = JSON.parse(
        localStorage.getItem("doodle-boss:draft") || "null",
      );
      if (saved) {
        if (saved.length) analyzeSketch(saved);
        strokes = copy(saved);
      }
    }
  } catch {}
  function paint() {
    c.clearRect(0, 0, 480, 480);
    c.fillStyle = "#f5f3e9";
    c.fillRect(0, 0, 480, 480);
    c.fillStyle = "#dad8cd";
    for (let x = 20; x < 480; x += 24)
      for (let y = 20; y < 480; y += 24) {
        c.beginPath();
        c.arc(x, y, 1, 0, Math.PI * 2);
        c.fill();
      }
    c.lineWidth = 6;
    c.strokeStyle = "#19191f";
    c.lineCap = "round";
    c.lineJoin = "round";
    for (const s of [...strokes, ...(active ? [active] : [])]) {
      c.beginPath();
      s.forEach(([x, y], i) =>
        i ? c.lineTo(x * 4.8, y * 4.8) : c.moveTo(x * 4.8, y * 4.8),
      );
      c.stroke();
    }
    if (!strokes.length && !active) {
      c.fillStyle = "#8c8a80";
      c.font = "bold 21px sans-serif";
      c.textAlign = "center";
      c.fillText("여기에 보스를 그려봐", 240, 235);
      c.font = "14px sans-serif";
      c.fillText("눈은 우리가 붙여줄게", 240, 265);
    }
    $("sketch-count").textContent = `${strokes.length} / 12 선`;
    $("sketch-undo").disabled = !strokes.length;
    $("sketch-awaken").disabled = !strokes.length || !!active;
    try {
      const g = analyzeSketch(strokes);
      draft = createBoss($("name").value || "내 낙서", { sketch: strokes });
      if (draft.id !== signature) {
        signature = draft.id;
        preview.set(draft);
      }
      $("preview-trait").textContent = g.behavior;
      $("sketch-video").disabled = recording || !!active;
      $("sketch-invite").disabled = !!active;
      if (!active)
        try {
          localStorage.setItem("doodle-boss:draft", JSON.stringify(strokes));
        } catch {}
      $("sketch-insight").textContent =
        `${g.behavior} · 모서리 ${g.corners}개 · 닫힌 도형 ${g.closed}개\n이 모양에서 공격이 만들어져요.`;
    } catch {
      if (!active)
        try {
          localStorage.setItem("doodle-boss:draft", "[]");
        } catch {}
      draft = null;
      signature = "";
      preview.set(null);
      $("preview-trait").textContent = "";
      $("sketch-video").disabled = true;
      $("sketch-invite").disabled = true;
      $("sketch-insight").textContent = "선부터 그려봐. 어떤 괴물이 나올까?";
    }
  }
  const point = (e) => {
    const r = canvas.getBoundingClientRect();
    return [
      Math.round(
        Math.max(0, Math.min(100, ((e.clientX - r.left) / r.width) * 100)),
      ),
      Math.round(
        Math.max(0, Math.min(100, ((e.clientY - r.top) / r.height) * 100)),
      ),
    ];
  };
  canvas.onpointerdown = (e) => {
    if (pointer !== null) return;
    e.preventDefault();
    if (strokes.length >= 12) {
      $("sketch-notice").textContent =
        "선은 12개까지. 한 선을 지우고 이어 그려주세요.";
      return;
    }
    pointer = e.pointerId;
    canvas.setPointerCapture(pointer);
    active = [point(e)];
    paint();
  };
  canvas.onpointermove = (e) => {
    if (e.pointerId !== pointer) return;
    e.preventDefault();
    const p = point(e);
    if (
      active.length < 2000 &&
      Math.hypot(p[0] - active.at(-1)[0], p[1] - active.at(-1)[1]) >= 1
    ) {
      active.push(p);
      paint();
    }
  };
  function finish(e) {
    if (e.pointerId !== pointer) return;
    const line = simplify(active);
    active = null;
    pointer = null;
    try {
      if (line.length < 2) throw Error("점 대신 조금 길게 그려주세요.");
      if ([...strokes, line].flat().length > MAX_POINTS)
        throw Error("선이 너무 복잡해요. 조금 간단하게 그려주세요.");
      analyzeSketch([...strokes, line]);
      strokes.push(line);
      $("sketch-notice").textContent = "준비됐어? 낙서 살려내기를 눌러봐.";
    } catch (error) {
      $("sketch-notice").textContent = error.message;
    }
    paint();
  }
  canvas.onpointerup = finish;
  canvas.onpointercancel = (e) => {
    if (e.pointerId === pointer) {
      active = null;
      pointer = null;
      paint();
    }
  };
  $("sketch-undo").onclick = () => {
    strokes.pop();
    paint();
  };
  $("sketch-clear").onclick = () => {
    strokes = [];
    paint();
    $("sketch-notice").textContent = "새 괴물을 그려봐.";
  };
  document.querySelectorAll("[data-sketch]").forEach(
    (button) =>
      (button.onclick = () => {
        strokes = sampleSketch(Number(button.dataset.sketch));
        paint();
        $("sketch-notice").textContent = "이 그림에 선을 더 그려도 좋아요.";
      }),
  );
  function awaken(show = true) {
    analyzeSketch(strokes);
    summon(copy(strokes));
    reveal.set(getBoss());
    $("reveal-trait").textContent =
      getBoss().geometry.behavior + " · " + getBoss().name;
    if (show && !dialog.open) dialog.showModal();
  }
  $("sketch-awaken").onclick = () => {
    try {
      awaken();
      $("sketch-notice").textContent =
        "살아났다. 직접 잡거나 친구에게 도전장을 보내봐.";
    } catch (error) {
      $("sketch-notice").textContent = error.message;
    }
  };
  document.addEventListener("nameboss:change", () => {
    strokes = copy(getBoss().sketch);
    paint();
  });
  $("reveal-close").onclick = () => dialog.close();
  $("reveal-play").onclick = () => {
    dialog.close();
    play();
  };
  if (initialParams?.has("rival"))
    $("reveal-friend").textContent = "친구의 낙서와 맞대결 ⚔";
  $("reveal-friend").onclick = () => {
    dialog.close();
    if (initialParams?.has("rival")) $("friend-fight").click();
    else invite();
  };
  $("sketch-invite").onclick = () => {
    try {
      awaken(false);
      invite();
    } catch (e) {
      $("sketch-notice").textContent = e.message;
    }
  };
  $("sketch-video").onclick = async () => {
    if (recording || !draft) return;
    recording = true;
    $("sketch-video").disabled = true;
    try {
      const ext = await exportIntro(draft, (second) => {
        $("sketch-video").textContent = `영상 만드는 중 ${second} / 8초`;
      });
      $("sketch-notice").textContent =
        ext === "mp4"
          ? "세로 MP4 소개 영상을 저장했어요. 도전장 링크와 함께 올려봐요."
          : "세로 WebM 소개 영상을 저장했어요. 업로드할 앱이 WebM을 지원하는지 확인해 주세요.";
    } catch (e) {
      $("sketch-notice").textContent = e.message;
    } finally {
      recording = false;
      $("sketch-video").textContent = "8초 소개 영상 저장 ↓";
      paint();
    }
  };
  $("name").addEventListener("input", () => {
    if (!active) paint();
  });
  function animate(now) {
    const dt = lastFrame ? Math.min(0.05, (now - lastFrame) / 1000) : 0;
    lastFrame = now;
    if (!document.hidden && !document.body.classList.contains("playing")) {
      preview.draw(reduced ? 0 : dt);
      if (dialog.open) reveal.draw(reduced ? 0 : dt);
    }
    requestAnimationFrame(animate);
  }
  requestAnimationFrame(animate);
  const observer = new IntersectionObserver((entries) =>
    document.body.classList.toggle(
      "drawing-visible",
      entries[0].isIntersecting,
    ),
  );
  observer.observe(document.querySelector(".sketch-lab"));
  paint();
  return { commit: () => awaken(false) };
}
