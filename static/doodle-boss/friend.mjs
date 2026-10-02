import { decodeBuild } from "./core.mjs?v=8";
import { portrait } from "./art.mjs?v=8";
export function initFriendChallenge({ getBoss, params, duel, prepare }) {
  if (!params.has("rival")) return;
  const panel = document.getElementById("friend-challenge"),
    notice = document.getElementById("friend-notice");
  panel.hidden = false;
  try {
    const rival = decodeBuild(params.get("rival"));
    document.getElementById("friend-title").textContent =
      `「${rival.name}」의 도전장`;
    portrait(
      document.getElementById("friend-preview").getContext("2d"),
      rival,
      120,
      90,
      0.7,
      0,
    );
    document.addEventListener("doodle:league-complete", (event) => {
      const rows = event.detail,
        own = rows.find((r) => r.id === getBoss().id),
        other = rows.find((r) => r.id === rival.id);
      if (rows.length !== 2 || !own || !other) return;
      notice.textContent =
        own.rank === other.rank
          ? "무승부! 다른 낙서로 다시 붙어봐."
          : own.rank < other.rank
            ? "네 낙서가 이겼다! 친구에게 새 도전장을 보내봐."
            : "친구 낙서가 이겼다. 선을 바꿔서 재도전해봐!";
    });
    document.getElementById("friend-fight").onclick = () => {
      try {
        prepare();
        duel([rival, getBoss()]);
        notice.textContent =
          "위치를 바꿔 두 번 겨뤄요. 대결 결과는 아래 순위표에!";
      } catch (e) {
        notice.textContent = e.message;
      }
    };
  } catch {
    document.getElementById("friend-title").textContent =
      "도전장 링크를 불러오지 못했어요.";
    notice.textContent =
      "친구에게 링크를 다시 받아주세요. 새 낙서는 계속 만들 수 있어요.";
    document.getElementById("friend-fight").disabled = true;
  }
}
