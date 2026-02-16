import fs from "fs";
import path from "path";

export function loadMafiUniverse() {
  const filePath = path.join(process.cwd(), "data", "universe_mafi_v3.json");
  const raw = fs.readFileSync(filePath, "utf8");
  const json = JSON.parse(raw);
  return json.universe || [];
}
