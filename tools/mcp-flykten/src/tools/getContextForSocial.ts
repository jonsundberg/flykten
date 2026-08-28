import { PATHS } from "../lib/paths.js";
import { readFileSafe, readDirSafe } from "../lib/files.js";

export interface GetContextForSocialInput {
  platform: string;
  campaignSlug: string;
  purpose: string;
  releaseSlug?: string;
}

export interface GetContextForSocialOutput {
  voice: string;
  doDont: string;
  themes: string;
  socialAgentInstructions: string;
  campaignContent: string;
  releaseContent: string;
  pressBioShort: string;
  templateSuggestions: string;
  existingDrafts: string[];
}

export async function getContextForSocial(
  input: GetContextForSocialInput
): Promise<GetContextForSocialOutput> {
  const { platform, campaignSlug, purpose, releaseSlug } = input;

  const [voice, doDont, themes, socialAgent, campaignContent, releaseContent, pressBioShort] =
    await Promise.all([
      readFileSafe(PATHS.brand() + "/voice.md"),
      readFileSafe(PATHS.brand() + "/do-dont.md"),
      readFileSafe(PATHS.brand() + "/themes.md"),
      readFileSafe(PATHS.brand() + "/social-agent.md"),
      readFileSafe(PATHS.campaign(campaignSlug) + "/campaign.md"),
      releaseSlug
        ? readFileSafe(PATHS.release(releaseSlug))
        : Promise.resolve(null),
      readFileSafe(PATHS.pressBioShort()),
    ]);

  const templateDir = PATHS.socialTemplates();
  const templateNames = await readDirSafe(templateDir);
  const templateSuggestions: string[] = [];
  for (const name of templateNames) {
    if (!name.endsWith(".md")) continue;
    const content = await readFileSafe(`${templateDir}/${name}`);
    if (content) templateSuggestions.push(`## ${name}\n${content}`);
  }

  const draftsDir = PATHS.campaignDrafts(campaignSlug, platform);
  const draftFiles = await readDirSafe(draftsDir);
  const existingDrafts = draftFiles.filter((f) => f.endsWith(".md"));

  return {
    voice: voice ?? "",
    doDont: doDont ?? "",
    themes: themes ?? "",
    socialAgentInstructions: socialAgent ?? "",
    campaignContent: campaignContent ?? "",
    releaseContent: releaseContent ?? "",
    pressBioShort: pressBioShort ?? "",
    templateSuggestions: templateSuggestions.join("\n\n"),
    existingDrafts,
  };
}
