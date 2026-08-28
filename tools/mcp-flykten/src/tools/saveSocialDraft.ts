import path from "node:path";
import { PATHS } from "../lib/paths.js";
import { writeFileSafe, slugify } from "../lib/files.js";
import { buildMarkdownDoc } from "../lib/markdown.js";

export interface SaveSocialDraftInput {
  campaignSlug: string;
  platform: string;
  purpose: string;
  tone: string;
  title: string;
  body: string;
  imageIdea?: string;
}

export interface SaveSocialDraftOutput {
  ok: boolean;
  path?: string;
  error?: string;
}

export async function saveSocialDraft(
  input: SaveSocialDraftInput
): Promise<SaveSocialDraftOutput> {
  const { campaignSlug, platform, purpose, tone, title, body, imageIdea } = input;

  const date = new Date().toISOString().slice(0, 10);
  const slug = slugify(title);
  const filename = `${date}-${slug}.md`;
  const dir = PATHS.campaignDrafts(campaignSlug, platform);
  const filePath = path.join(dir, filename);

  const frontmatter: Record<string, string> = {
    title,
    platform,
    purpose,
    tone,
    createdAt: new Date().toISOString(),
  };
  if (imageIdea) frontmatter.imageIdea = imageIdea;

  const content = buildMarkdownDoc(frontmatter, body.trim());
  const result = await writeFileSafe(filePath, content);

  if (!result.ok) {
    return { ok: false, error: result.error };
  }
  return { ok: true, path: filePath };
}
