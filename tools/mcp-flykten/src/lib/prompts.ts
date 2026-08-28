/**
 * Prompt-building logic for social draft generation.
 * Stubbed generator returns placeholder drafts; replace with LLM call when available.
 */

export interface PromptContext {
  voice: string;
  doDont: string;
  themes: string;
  socialAgentInstructions: string;
  campaignContent: string;
  releaseContent: string;
  pressBioShort: string;
  templateSuggestions: string;
  purpose: string;
  platform: string;
  tone: string;
}

export function buildGenerationPrompt(ctx: PromptContext): string {
  const sections: string[] = [
    "# Uppgift",
    `Skriv ${ctx.platform}-inlägg för: ${ctx.purpose}. Ton: ${ctx.tone}.`,
    "",
    "# Röst & riktlinjer",
    ctx.voice,
    "",
    "# Gör / gör inte",
    ctx.doDont,
    "",
    "# Teman",
    ctx.themes,
    "",
    "# Social-agent",
    ctx.socialAgentInstructions,
  ];
  if (ctx.campaignContent) {
    sections.push("", "# Kampanj", ctx.campaignContent);
  }
  if (ctx.releaseContent) {
    sections.push("", "# Release", ctx.releaseContent);
  }
  if (ctx.pressBioShort) {
    sections.push("", "# Kort bio (press)", ctx.pressBioShort);
  }
  if (ctx.templateSuggestions) {
    sections.push("", "# Mallar / förslag", ctx.templateSuggestions);
  }
  sections.push("", "---", "Skriv bara själva inläggstexten och eventuell bildidé, ingen meta.");
  return sections.join("\n");
}

export interface DraftSpec {
  title: string;
  platform: string;
  purpose: string;
  tone: string;
  body: string;
  imageIdea?: string;
}

/**
 * Stub: returns placeholder drafts. Replace with LLM call using buildGenerationPrompt().
 */
export async function generateDraftsWithLLM(
  _context: PromptContext,
  count: number
): Promise<DraftSpec[]> {
  const drafts: DraftSpec[] = [];
  for (let i = 0; i < count; i++) {
    drafts.push({
      title: `Utkast ${i + 1} (stub)`,
      platform: _context.platform,
      purpose: _context.purpose,
      tone: _context.tone,
      body: `[Platshållare – ersätt med LLM-anrop. Kontext: ${_context.purpose}, ton: ${_context.tone}.]`,
      imageIdea: "Bildidé kan läggas till när LLM är kopplad.",
    });
  }
  return drafts;
}
