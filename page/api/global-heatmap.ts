import fs from "fs";
import path from "path";

export default function handler(req, res) {
  // 1. Require API key
  const clientKey = req.headers["x-api-key"];
  const serverKey = process.env.MARKETAI_HEATMAP_KEY;

  if (!clientKey || clientKey !== serverKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // 2. Load heatmap JSON
  const heatmapPath = path.join(process.cwd(), "data", "global_heatmap.json");

  try {
    const json = JSON.parse(fs.readFileSync(heatmapPath, "utf8"));
    return res.status(200).json(json);
  } catch (err) {
    return res.status(500).json({ error: "Heatmap not found" });
  }
}
