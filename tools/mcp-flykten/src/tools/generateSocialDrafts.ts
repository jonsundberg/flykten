import { getContextForSocial } from "./getContextForSocial.js";
import { buildGenerationPrompt, generateDraftsWithLLM, type DraftSpec } from "../lib/prompts.js";

export interface GenerateSocialDraftsInput {
  platform: string;
  purpose: string;
  tone: string;
  count: number;
  campaignSlug: string;
  releaseSlug?: string;
}

export interface GenerateSocialDraftsOutput {
  drafts: DraftSpec[];
  promptUsed?: string;
}

export async function generateSocialDrafts(
  input: GenerateSocialDraftsInput
): Promise<GenerateSocialDraftsOutput> {
  const { platform, purpose, tone, count, campaignSlug, releaseSlug } = input;

  const context = await getContextForSocial({
    platform,
    campaignSlug,
    purpose,
    releaseSlug,
  });

  const promptContext = {
    voice: context.voice,
    doDont: context.doDont,
    themes: context.themes,
    socialAgentInstructions: context.socialAgentInstructions,
    campaignContent: context.campaignContent,
    releaseContent: context.releaseContent,
    pressBioShort: context.pressBioShort,
    templateSuggestions: context.templateSuggestions,
    purpose,
    platform,
    tone,
  };

  const prompt = buildGenerationPrompt(promptContext);
  const drafts = await generateDraftsWithLLM(promptContext, count);

  return { drafts, promptUsed: prompt };
}
