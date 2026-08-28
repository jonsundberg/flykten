export interface FrontmatterRecord {
  [key: string]: string | number | boolean | string[] | undefined;
}

/**
 * Simple frontmatter serialization (no external parser).
 * Assumes values are strings or simple types; arrays as comma-separated or JSON.
 */
export function stringifyFrontmatter(fm: FrontmatterRecord): string {
  const lines: string[] = ["---"];
  for (const [key, value] of Object.entries(fm)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      lines.push(`${key}:`);
      for (const item of value) {
        lines.push(`  - ${String(item).replace(/\n/g, " ")}`);
      }
    } else if (typeof value === "string" && (value.includes("\n") || value.includes(":") || value.includes("'"))) {
      lines.push(`${key}: |`);
      for (const line of value.split("\n")) {
        lines.push(`  ${line}`);
      }
    } else {
      const escaped = typeof value === "string" ? (value.includes("'") ? `"${value.replace(/"/g, '\\"')}"` : `'${value}'`) : String(value);
      lines.push(`${key}: ${escaped}`);
    }
  }
  lines.push("---");
  return lines.join("\n");
}

export function buildMarkdownDoc(
  frontmatter: FrontmatterRecord,
  body: string
): string {
  const fmBlock = stringifyFrontmatter(frontmatter);
  const trimmed = body.trim();
  return trimmed ? `${fmBlock}\n\n${trimmed}\n` : `${fmBlock}\n`;
}
