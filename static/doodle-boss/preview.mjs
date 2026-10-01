import { volley, moveProjectile } from "./patterns.mjs?v=6";
import { positionSketchShots } from "./sketch.mjs?v=6";
import { portrait } from "./art.mjs?v=6";
export function createPreview(canvas, caption = true) {
  const c = canvas.getContext("2d");
  let boss = null,
    shots = [],
    time = 0,
    next = 0.5,
    wave = 0;
  return {
    set(value) {
      boss = value;
      shots = [];
      time = 0;
      next = 0.5;
      wave = 0;
    },
    draw(dt = 0) {
      const w = canvas.width,
        h = canvas.height,
        ratio = w / 480;
      c.setTransform(ratio, 0, 0, ratio, 0, 0);
      c.fillStyle = "#111118";
      c.fillRect(0, 0, 480, h / ratio);
      c.strokeStyle = "#24242e";
      c.lineWidth = 1;
      for (let x = 0; x <= 480; x += 30) {
        c.beginPath();
        c.moveTo(x, 0);
        c.lineTo(x, 300);
        c.stroke();
      }
      for (let y = 0; y <= 300; y += 30) {
        c.beginPath();
        c.moveTo(0, y);
        c.lineTo(480, y);
        c.stroke();
      }
      if (!boss) {
        c.fillStyle = "#a1a1af";
        c.font = "14px sans-serif";
        c.textAlign = "center";
        c.fillText("그려봐. 여기서 살아날 거야.", 240, 150);
        return;
      }
      time += Math.min(dt, 0.05);
      next -= Math.min(dt, 0.05);
      if (next <= 0) {
        shots.push(
          ...positionSketchShots(
            volley({
              pattern: wave % 3 === 2 ? boss.secondary : boss.pattern,
              origin: { x: 240, y: 110 },
              target: { x: 240 + Math.sin(time) * 80, y: 290 },
              wave: wave++,
              speed: 120,
              seed: boss.combatSeed,
            }),
            boss,
            {},
            0.92,
          ),
        );
        next = 0.9;
      }
      for (const b of shots) {
        moveProjectile(b, dt, { x: 240, y: 290 });
        c.globalAlpha = b.delay > 0 ? 0.2 : 1;
        c.fillStyle = wave % 2 ? "#d5ff60" : "#ff719b";
        c.beginPath();
        c.arc(b.x, b.y, 3, 0, Math.PI * 2);
        c.fill();
      }
      c.globalAlpha = 1;
      shots = shots.filter(
        (b) => b.x > -20 && b.x < 500 && b.y > -20 && b.y < 320 && b.age < 5,
      );
      portrait(c, boss, 240, 110 + Math.sin(time * 2) * 4, 0.92, time);
      c.fillStyle = "#a1a1af";
      c.font = "11px sans-serif";
      c.textAlign = "center";
      if (caption) c.fillText("탄막 미리보기 · 실제 대결은 아래에서", 240, 286);
    },
  };
}
export async function exportIntro(boss, onProgress) {
  if (!window.MediaRecorder || !HTMLCanvasElement.prototype.captureStream)
    throw Error(
      "이 브라우저는 영상 저장을 지원하지 않아요. 보스 카드 이미지를 저장해 주세요.",
    );
  await document.fonts.ready;
  const canvas = document.createElement("canvas");
  canvas.width = 720;
  canvas.height = 1280;
  const c = canvas.getContext("2d"),
    arena = document.createElement("canvas");
  arena.width = 480;
  arena.height = 300;
  const preview = createPreview(arena, false);
  preview.set(boss);
  const types = [
      "video/mp4;codecs=avc1.42001E",
      "video/mp4",
      "video/webm;codecs=vp9",
      "video/webm;codecs=vp8",
      "video/webm",
    ],
    mime = types.find((t) => MediaRecorder.isTypeSupported(t));
  if (!mime)
    throw Error("지원되는 영상 형식이 없어요. 보스 카드를 저장해 주세요.");
  const stream = canvas.captureStream(30),
    recorder = new MediaRecorder(stream, {
      mimeType: mime,
      videoBitsPerSecond: 5000000,
    }),
    chunks = [];
  let frame,
    started = performance.now(),
    last = started,
    abort = false;
  const hidden = () => {
    abort = true;
    if (recorder.state !== "inactive") recorder.stop();
  };
  const result = new Promise((resolve, reject) => {
    recorder.ondataavailable = (e) => {
      if (e.data.size) chunks.push(e.data);
    };
    recorder.onerror = () =>
      reject(Error("영상 저장에 실패했어요. 다시 시도해 주세요."));
    recorder.onstop = () => {
      abort
        ? reject(Error("페이지를 떠나 영상 저장이 중단됐어요."))
        : resolve(new Blob(chunks, { type: mime }));
    };
  });
  window.addEventListener("pagehide", hidden, { once: true });
  recorder.start();
  function draw(now) {
    const t = Math.min(8, (now - started) / 1000),
      dt = (now - last) / 1000;
    last = now;
    c.fillStyle = "#101014";
    c.fillRect(0, 0, 720, 1280);
    c.textAlign = "center";
    c.fillStyle = "#d5ff60";
    c.font = "bold 20px sans-serif";
    c.fillText("DOODLE BOSS / DRAW. WAKE. FIGHT.", 360, 80);
    c.fillStyle = "#f5f3e9";
    c.font = "900 45px 'Noto Sans KR', sans-serif";
    c.fillText(
      t < 2.5
        ? "친구한테 보스를"
        : t < 4
          ? "이 낙서가 살아났다."
          : "네 낙서로 이길 수 있어?",
      360,
      175,
    );
    if (t < 2.5) c.fillText("그려달라고 했다.", 360, 235);
    if (t < 2.5) {
      c.fillStyle = "#f5f3e9";
      c.fillRect(90, 330, 540, 540);
      c.strokeStyle = "#19191f";
      c.lineWidth = 7;
      c.lineCap = "round";
      c.lineJoin = "round";
      const lines = boss.geometry.normalized,
        total = lines.flat().length;
      let budget = Math.ceil(total * Math.min(1, t / 1.7));
      for (const s of lines) {
        c.beginPath();
        for (let i = 0; i < s.length && budget > 0; i++, budget--) {
          const [x, y] = s[i];
          i
            ? c.lineTo(360 + x * 2.6, 600 + y * 2.6)
            : c.moveTo(360 + x * 2.6, 600 + y * 2.6);
        }
        c.stroke();
      }
    } else {
      preview.draw(Math.min(0.05, dt));
      c.drawImage(arena, 0, 0, 480, 300, 30, 380, 660, 412);
      c.strokeStyle = "#d5ff60";
      c.lineWidth = 2;
      c.strokeRect(30, 380, 660, 412);
    }
    c.fillStyle = "#d5ff60";
    c.font = "bold 34px 'Noto Sans KR', sans-serif";
    c.fillText(boss.name, 360, 940);
    c.fillStyle = "#a1a1af";
    c.font = "22px 'Noto Sans KR', sans-serif";
    c.fillText(boss.geometry.behavior, 360, 990);
    c.fillStyle = "#f5f3e9";
    c.font = "bold 24px 'Noto Sans KR', sans-serif";
    c.fillText("그려서 살리고, 친구와 붙여봐.", 360, 1120);
    c.fillStyle = "#a1a1af";
    c.font = "17px sans-serif";
    c.fillText("caffeine-fighter.github.io/doodle-boss", 360, 1170);
    onProgress(Math.floor(t));
    if (t >= 8) {
      recorder.stop();
      return;
    }
    frame = requestAnimationFrame(draw);
  }
  frame = requestAnimationFrame(draw);
  try {
    const blob = await result;
    if (!blob.size) throw Error("영상이 비어 있어요. 다시 시도해 주세요.");
    const ext = mime.startsWith("video/mp4") ? "mp4" : "webm",
      url = URL.createObjectURL(blob),
      a = document.createElement("a");
    a.href = url;
    a.download = `doodle-boss-${boss.code}.${ext}`;
    document.body.append(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 30000);
    return ext;
  } finally {
    cancelAnimationFrame(frame);
    stream.getTracks().forEach((t) => t.stop());
    window.removeEventListener("pagehide", hidden);
  }
}
