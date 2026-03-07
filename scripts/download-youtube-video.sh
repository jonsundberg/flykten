#!/usr/bin/env bash
#
# Laddar ner videon från YouTube (t.ex. för Mystik-sektionen som lokal asset).
# Kräver: yt-dlp (brew install yt-dlp eller pip install yt-dlp)
#
# Användning:
#   ./scripts/download-youtube-video.sh
#   ./scripts/download-youtube-video.sh "https://youtube.com/watch?v=..."
#

set -e

URL="${1:-https://youtu.be/fehK0lTW64k}"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
OUT_DIR="${SCRIPT_DIR}/../apps/web/public/video"
OUT_FILE="mystik-en-tar-i-elden"

if ! command -v yt-dlp &>/dev/null; then
  echo "yt-dlp krävs. Installera med: brew install yt-dlp"
  exit 1
fi

mkdir -p "$OUT_DIR"
cd "$OUT_DIR"

echo "Laddar ner: $URL"
# Format "best" – när vissa format saknas (t.ex. p.g.a. YouTube SSAP) väljer yt-dlp det som finns.
# Uppdatera yt-dlp vid problem: brew upgrade yt-dlp
yt-dlp -f "best" --merge-output-format mp4 -o "${OUT_FILE}.%(ext)s" "$URL"

echo "Klar. Fil sparad i: apps/web/public/video/"
ls -la "${OUT_DIR}/${OUT_FILE}"* 2>/dev/null || true
