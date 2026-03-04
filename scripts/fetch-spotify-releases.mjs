#!/usr/bin/env node
/**
 * Hämtar metadata (titel, releasedatum, låtlista) från Spotify och uppdaterar
 * release.md-filer i packages/content/releases/.
 *
 * Kräver: SPOTIFY_CLIENT_ID och SPOTIFY_CLIENT_SECRET (eller .env i repo-root).
 * Kör: pnpm run fetch-spotify
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import matter from "gray-matter";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const RELEASES_DIR = join(ROOT, "packages", "content", "releases");
const COVERS_DIR = join(ROOT, "apps", "web", "public", "covers");

function extractAlbumId(spotifyUrl) {
  if (!spotifyUrl || typeof spotifyUrl !== "string") return null;
  const m = spotifyUrl.match(/spotify\.com\/album\/([a-zA-Z0-9]+)/);
  return m ? m[1] : null;
}

function normalizeReleaseDate(releaseDate, precision) {
  if (!releaseDate) return null;
  if (precision === "day" || releaseDate.length >= 10) return releaseDate.slice(0, 10);
  if (precision === "month") return `${releaseDate.slice(0, 7)}-01`;
  if (precision === "year") return `${releaseDate.slice(0, 4)}-01-01`;
  return releaseDate.length >= 10 ? releaseDate.slice(0, 10) : `${releaseDate}-01-01`;
}

async function getAccessToken(clientId, clientSecret) {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString("base64")}`,
    },
    body: new URLSearchParams({ grant_type: "client_credentials" }).toString(),
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Spotify token: ${res.status} ${t}`);
  }
  const data = await res.json();
  return data.access_token;
}

async function getAlbum(token, albumId) {
  const res = await fetch(`https://api.spotify.com/v1/albums/${albumId}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!res.ok) {
    const t = await res.text();
    throw new Error(`Album ${albumId}: ${res.status} ${t}`);
  }
  return res.json();
}

function collectTracks(album) {
  const items = album.tracks?.items ?? [];
  return items.map((t) => ({ title: t.name }));
}

/** Tar den största bilden som är max 640px bred, eller annars första. */
function getBestImageUrl(images) {
  if (!images?.length) return null;
  const sorted = [...images].sort((a, b) => (b.width ?? 0) - (a.width ?? 0));
  const medium = sorted.find((img) => img.width && img.width <= 640) ?? sorted[0];
  return medium?.url ?? null;
}

async function downloadCover(imageUrl, slug) {
  if (!imageUrl) return null;
  const res = await fetch(imageUrl);
  if (!res.ok) return null;
  const buffer = Buffer.from(await res.arrayBuffer());
  const ext = res.headers.get("content-type")?.includes("png") ? "png" : "jpg";
  const filename = `${slug}.${ext}`;
  mkdirSync(COVERS_DIR, { recursive: true });
  writeFileSync(join(COVERS_DIR, filename), buffer);
  return `/covers/${filename}`;
}

async function main() {
  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    console.error("Sätt SPOTIFY_CLIENT_ID och SPOTIFY_CLIENT_SECRET (eller .env i repo-root).");
    process.exit(1);
  }

  const token = await getAccessToken(clientId, clientSecret);
  const slugs = readdirSync(RELEASES_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  let updated = 0;
  for (const slug of slugs) {
    const path = join(RELEASES_DIR, slug, "release.md");
    let raw;
    try {
      raw = readFileSync(path, "utf-8");
    } catch {
      continue;
    }
    const { data: frontmatter, content: body } = matter(raw);
    const spotifyUrl = frontmatter.links?.spotify;
    const albumId = extractAlbumId(spotifyUrl);
    if (!albumId) continue;

    const album = await getAlbum(token, albumId);
    const releaseDate = normalizeReleaseDate(
      album.release_date,
      album.release_date_precision
    );
    const tracks = collectTracks(album);
    const imageUrl = getBestImageUrl(album.images);
    const coverPath = imageUrl ? await downloadCover(imageUrl, slug) : null;

    const updatedFrontmatter = {
      ...frontmatter,
      title: album.name,
      releaseDate: releaseDate ?? frontmatter.releaseDate,
      tracks: tracks.length > 0 ? tracks : frontmatter.tracks,
      ...(coverPath && { cover: coverPath }),
    };
    // Ta bort cover om Spotify inte gav någon bild (så trasig/annan bild inte används)
    if (!coverPath && frontmatter.cover) delete updatedFrontmatter.cover;

    const newContent = matter.stringify(body.trimEnd() ? body : "", updatedFrontmatter, {
      lineWidth: -1,
    });
    writeFileSync(path, newContent, "utf-8");
    console.log("Uppdaterad:", slug, "–", album.name, coverPath ? "(omslag nedladdat)" : "");
    updated++;
  }

  console.log("\nKlart.", updated, "release(s) uppdaterade från Spotify.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
