import { analyzeSketch, sampleSketch, MAX_POINTS } from "./sketch.mjs?v=5";
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
export function initSketchUI({ getBoss, summon }) {
  const canvas = $("sketch-pad"),
    c = canvas.getContext("2d");
  let strokes = copy(getBoss().sketch),
    active = null,
    pointer = null;
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
      $("sketch-insight").textContent =
        `${g.behavior} · 모서리 ${g.corners}개 · 닫힌 도형 ${g.closed}개\n이 모양에서 공격이 만들어져요.`;
    } catch {
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
    if (Math.hypot(p[0] - active.at(-1)[0], p[1] - active.at(-1)[1]) >= 1) {
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
  $("sketch-awaken").onclick = () => {
    try {
      analyzeSketch(strokes);
      summon(copy(strokes));
      $("sketch-notice").textContent =
        "살아났다. 아래에서 직접 도전하거나 리그에 넣어봐.";
      (document.body.classList.contains("league-mode")
        ? $("league-panel")
        : $("solo-panel")
      ).scrollIntoView({
        behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
        block: "center",
      });
    } catch (error) {
      $("sketch-notice").textContent = error.message;
    }
  };
  document.addEventListener("nameboss:change", () => {
    strokes = copy(getBoss().sketch);
    paint();
  });
  paint();
}
