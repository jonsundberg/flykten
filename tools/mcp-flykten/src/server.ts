import { z } from "zod";
import { getContextForSocial } from "./tools/getContextForSocial.js";
import { generateSocialDrafts } from "./tools/generateSocialDrafts.js";
import { saveSocialDraft } from "./tools/saveSocialDraft.js";
import { reviewSocialCopy } from "./tools/reviewSocialCopy.js";
import { listCampaignAssets } from "./tools/listCampaignAssets.js";

const TOOL_NAMES = [
  "get_context_for_social",
  "generate_social_drafts",
  "save_social_draft",
  "review_social_copy",
  "list_campaign_assets",
] as const;

export function createToolList(): Array<{
  name: string;
  description: string;
  inputSchema: { type: "object"; properties: Record<string, unknown>; required?: string[] };
}> {
  return [
    {
      name: "get_context_for_social",
      description:
        "Get brand voice, do/dont, themes, campaign and release content, templates and existing drafts for writing social posts.",
      inputSchema: {
        type: "object",
        properties: {
          platform: { type: "string", description: "Platform, e.g. instagram, facebook" },
          campaignSlug: { type: "string", description: "Campaign slug, e.g. revolutionen" },
          purpose: { type: "string", description: "Purpose of the post, e.g. teaser, release-day" },
          releaseSlug: { type: "string", description: "Optional release slug" },
        },
        required: ["platform", "campaignSlug", "purpose"],
      },
    },
    {
      name: "generate_social_drafts",
      description: "Generate social media draft texts. Uses stub generator; plug in LLM later.",
      inputSchema: {
        type: "object",
        properties: {
          platform: { type: "string" },
          purpose: { type: "string" },
          tone: { type: "string", description: "e.g. Mystik, Rå" },
          count: { type: "number", description: "Number of drafts to generate" },
          campaignSlug: { type: "string" },
          releaseSlug: { type: "string" },
        },
        required: ["platform", "purpose", "tone", "count", "campaignSlug"],
      },
    },
    {
      name: "save_social_draft",
      description: "Save a social draft as markdown in the campaign drafts folder.",
      inputSchema: {
        type: "object",
        properties: {
          campaignSlug: { type: "string" },
          platform: { type: "string" },
          purpose: { type: "string" },
          tone: { type: "string" },
          title: { type: "string" },
          body: { type: "string" },
          imageIdea: { type: "string" },
        },
        required: ["campaignSlug", "platform", "purpose", "tone", "title", "body"],
      },
    },
    {
      name: "review_social_copy",
      description: "Review social copy against brand voice and do/dont. Returns verdict and notes.",
      inputSchema: {
        type: "object",
        properties: {
          platform: { type: "string" },
          text: { type: "string", description: "The caption or post text to review" },
        },
        required: ["platform", "text"],
      },
    },
    {
      name: "list_campaign_assets",
      description: "List campaign files, drafts, templates and release path for a campaign.",
      inputSchema: {
        type: "object",
        properties: {
          campaignSlug: { type: "string" },
        },
        required: ["campaignSlug"],
      },
    },
  ];
}

export async function handleToolCall(
  name: string,
  args: Record<string, unknown>
): Promise<{ content: Array<{ type: "text"; text: string }> }> {
  const text = (value: string) => ({ content: [{ type: "text" as const, text: value }] });

  try {
    switch (name) {
      case "get_context_for_social": {
        const out = await getContextForSocial({
          platform: String(args.platform),
          campaignSlug: String(args.campaignSlug),
          purpose: String(args.purpose),
          releaseSlug: args.releaseSlug != null ? String(args.releaseSlug) : undefined,
        });
        return text(JSON.stringify(out, null, 2));
      }
      case "generate_social_drafts": {
        const out = await generateSocialDrafts({
          platform: String(args.platform),
          purpose: String(args.purpose),
          tone: String(args.tone),
          count: Number(args.count) || 3,
          campaignSlug: String(args.campaignSlug),
          releaseSlug: args.releaseSlug != null ? String(args.releaseSlug) : undefined,
        });
        return text(JSON.stringify(out, null, 2));
      }
      case "save_social_draft": {
        const out = await saveSocialDraft({
          campaignSlug: String(args.campaignSlug),
          platform: String(args.platform),
          purpose: String(args.purpose),
          tone: String(args.tone),
          title: String(args.title),
          body: String(args.body),
          imageIdea: args.imageIdea != null ? String(args.imageIdea) : undefined,
        });
        return text(JSON.stringify(out, null, 2));
      }
      case "review_social_copy": {
        const out = await reviewSocialCopy({
          platform: String(args.platform),
          text: String(args.text),
        });
        return text(JSON.stringify(out, null, 2));
      }
      case "list_campaign_assets": {
        const out = await listCampaignAssets({
          campaignSlug: String(args.campaignSlug),
        });
        return text(JSON.stringify(out, null, 2));
      }
      default:
        return text(JSON.stringify({ error: `Unknown tool: ${name}` }));
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return text(JSON.stringify({ error: message }));
  }
}
