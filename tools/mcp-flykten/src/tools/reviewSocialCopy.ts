import { PATHS } from "../lib/paths.js";
import { readFileSafe } from "../lib/files.js";
import { reviewSocialCopy as doReview, type ReviewResult } from "../lib/social.js";

export interface ReviewSocialCopyInput {
  platform: string;
  text: string;
}

export type ReviewSocialCopyOutput = ReviewResult;

export async function reviewSocialCopy(
  input: ReviewSocialCopyInput
): Promise<ReviewSocialCopyOutput> {
  const { platform, text } = input;
  const doDontPath = PATHS.brand() + "/do-dont.md";
  const doDontContent = (await readFileSafe(doDontPath)) ?? "";
  return doReview(platform, text, doDontContent);
}
