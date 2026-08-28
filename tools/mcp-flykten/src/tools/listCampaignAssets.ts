import path from "node:path";
import { PATHS } from "../lib/paths.js";
import { readDirSafe } from "../lib/files.js";

export interface ListCampaignAssetsInput {
  campaignSlug: string;
}

export interface ListCampaignAssetsOutput {
  campaignDir: string;
  campaignFile: string;
  drafts: Record<string, string[]>;
  releasePath?: string;
  templatesDir: string;
  templateFiles: string[];
}

export async function listCampaignAssets(
  input: ListCampaignAssetsInput
): Promise<ListCampaignAssetsOutput> {
  const { campaignSlug } = input;

  const campaignDir = PATHS.campaign(campaignSlug);
  const campaignFile = path.join(campaignDir, "campaign.md");
  const draftsDir = path.join(campaignDir, "drafts");
  const templatesDir = PATHS.socialTemplates();

  const draftPlatforms = await readDirSafe(draftsDir);
  const drafts: Record<string, string[]> = {};
  for (const platform of draftPlatforms) {
    const platformDir = path.join(draftsDir, platform);
    const files = await readDirSafe(platformDir);
    drafts[platform] = files.filter((f) => f.endsWith(".md"));
  }

  const templateFiles = (await readDirSafe(templatesDir)).filter((f) => f.endsWith(".md"));

  const releasePath = path.join(PATHS.releases(), campaignSlug, "release.md");

  return {
    campaignDir,
    campaignFile,
    drafts,
    releasePath,
    templatesDir,
    templateFiles,
  };
}
