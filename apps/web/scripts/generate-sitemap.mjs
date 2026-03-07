#!/usr/bin/env node
/**
 * Genererar sitemap-index.xml och sitemap-0.xml i dist/ efter astro build.
 * Körs som postbuild så att Vercel/build får en fungerande sitemap utan @astrojs/sitemap.
 */
import { readdirSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const distDir = join(root, 'dist');
const contentReleases = join(root, '../../../packages/content/releases');
const site = 'https://flykten.com';

const staticPaths = ['', 'music', 'live', 'press'];
let releaseSlugs = [];
try {
  releaseSlugs = readdirSync(contentReleases, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
} catch {
  // content kan vara annan path vid build
}

const urls = [
  ...staticPaths.map((p) => `${site}/${p ? p + '/' : ''}`),
  ...releaseSlugs.map((slug) => `${site}/releases/${slug}/release/`),
];

const now = new Date().toISOString().slice(0, 10);
const sitemap0 = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url><loc>${loc}</loc><lastmod>${now}</lastmod></url>`).join('\n')}
</urlset>`;

const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap><loc>${site}/sitemap-0.xml</loc><lastmod>${now}</lastmod></sitemap>
</sitemapindex>`;

mkdirSync(distDir, { recursive: true });
writeFileSync(join(distDir, 'sitemap-0.xml'), sitemap0);
writeFileSync(join(distDir, 'sitemap-index.xml'), sitemapIndex);
console.log('Sitemap skapad: sitemap-index.xml, sitemap-0.xml');
