import { unpackBuild } from "./core.mjs?v=3";
import { runLeague } from "./league.mjs?v=3";
self.onmessage = ({ data }) => {
  try {
    const bosses = data.bosses.map(unpackBuild);
    const result = runLeague(bosses, (progress) =>
      self.postMessage({ type: "progress", ...progress }),
    );
    self.postMessage({ type: "complete", ...result });
  } catch (error) {
    self.postMessage({ type: "error", message: error.message });
  }
};
