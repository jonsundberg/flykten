/**
 * Social copy review: heuristic/rules-based using voice and do-dont.
 * Can be replaced or augmented with LLM later.
 */

export interface ReviewResult {
  verdict: "ok" | "revise" | "reject";
  notes: string[];
  suggestedRevision?: string;
}

const MARKETING_BUZZ = [
  /\b(rea|erbjudande|köp nu|beställ|limited edition|för bara|billigare|rabatt|sälj)\b/i,
  /\b(click here|shop now|buy now|don't miss)\b/i,
  /\b(!!!|!!)\s*$/m,
  /^.{500,}$/m, // single block too long
];

export function reviewSocialCopy(
  _platform: string,
  text: string,
  doDontContent: string
): ReviewResult {
  const notes: string[] = [];
  const lower = text.toLowerCase();

  if (text.length > 500) {
    notes.push("Texten är lång – överväg att korta ned för sociala medier.");
  }
  if (text.trim().length < 10) {
    notes.push("Texten är mycket kort.");
  }

  for (const re of MARKETING_BUZZ) {
    if (re.test(text)) {
      notes.push("Innehåll som kan uppfattas som för säljigt eller buzz-igt – kontrollera mot do/dont.");
    }
  }

  if (lower.includes("!!!") || (text.match(/!/g)?.length ?? 0) > 2) {
    notes.push("Flera utropstecken – kan kännas skrikigt.");
  }

  let verdict: ReviewResult["verdict"] = "ok";
  if (notes.some((n) => n.includes("sälj") || n.includes("buzz"))) {
    verdict = "revise";
  }
  if (text.trim().length === 0) {
    verdict = "reject";
    notes.push("Tom text.");
  }

  return {
    verdict,
    notes: notes.length > 0 ? notes : ["Inga automatiska kommentarer. Granska mot voice/do-dont."],
    suggestedRevision:
      verdict === "revise"
        ? text.replace(/\b(!!!|!!)\s*$/gm, "!").trim()
        : undefined,
  };
}
