import fs from "node:fs/promises";
import path from "node:path";

export async function readFileSafe(filePath: string): Promise<string | null> {
  try {
    const content = await fs.readFile(filePath, "utf-8");
    return content;
  } catch {
    return null;
  }
}

export async function readDirSafe(dirPath: string): Promise<string[]> {
  try {
    const names = await fs.readdir(dirPath);
    return names;
  } catch {
    return [];
  }
}

export async function writeFileSafe(
  filePath: string,
  content: string
): Promise<{ ok: boolean; error?: string }> {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content, "utf-8");
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}

export async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/** Simple slug for filenames: lowercase, spaces to dashes, strip non-alnum/dash */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "") || "draft";
}
