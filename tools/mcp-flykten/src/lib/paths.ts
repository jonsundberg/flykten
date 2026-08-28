import path from "node:path";

/** Repo root: from dist/lib/ we go up to dist, tools/mcp-flykten, then repo root */
export function getRepoRoot(): string {
  // From dist/lib/ go up to repo root (dist -> tools/mcp-flykten -> repo)
  return path.resolve(__dirname, "..", "..", "..");
}

export function getContentRoot(): string {
  return path.join(getRepoRoot(), "packages", "content");
}

export const PATHS = {
  brand: () => path.join(getContentRoot(), "brand"),
  social: () => path.join(getContentRoot(), "social"),
  socialTemplates: () => path.join(getContentRoot(), "social", "templates"),
  socialCampaigns: () => path.join(getContentRoot(), "social", "campaigns"),
  campaign: (slug: string) =>
    path.join(getContentRoot(), "social", "campaigns", slug),
  campaignDrafts: (slug: string, platform: string) =>
    path.join(getContentRoot(), "social", "campaigns", slug, "drafts", platform),
  releases: () => path.join(getContentRoot(), "releases"),
  release: (slug: string) =>
    path.join(getContentRoot(), "releases", slug, "release.md"),
  press: () => path.join(getContentRoot(), "press"),
  pressBioShort: () => path.join(getContentRoot(), "press", "bio.short.md"),
} as const;
