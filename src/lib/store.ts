import { promises as fs } from "fs";
import path from "path";
import { defaultConfig, type SiteConfig } from "@/data/siteConfig";

/*
  Published site content lives on disk: DATA_DIR/config.json plus uploaded
  photos in DATA_DIR/uploads. On Railway DATA_DIR points at a volume so it
  survives deploys; locally it falls back to ./.data (git-ignored).
*/
export const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), ".data");
export const UPLOAD_DIR = path.join(DATA_DIR, "uploads");
const CONFIG_FILE = path.join(DATA_DIR, "config.json");

export async function readConfig(): Promise<SiteConfig> {
  try {
    const raw = await fs.readFile(CONFIG_FILE, "utf8");
    const saved = JSON.parse(raw) as Partial<SiteConfig>;
    // shallow per-section merge so new default fields still appear
    return {
      ...defaultConfig,
      ...saved,
      artist: { ...defaultConfig.artist, ...(saved.artist ?? {}) },
      featuredTrack: { ...defaultConfig.featuredTrack, ...(saved.featuredTrack ?? {}) },
    };
  } catch {
    return defaultConfig;
  }
}

export async function writeConfig(config: SiteConfig): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  // write-then-rename so a crash never leaves a half-written file
  const tmp = `${CONFIG_FILE}.${process.pid}.${Date.now()}.tmp`;
  await fs.writeFile(tmp, JSON.stringify(config, null, 2), "utf8");
  await fs.rename(tmp, CONFIG_FILE);
}
