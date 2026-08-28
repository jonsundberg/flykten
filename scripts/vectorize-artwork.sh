#!/usr/bin/env bash
#
# Traserar de svartvita merch-motiven i packages/brand/artwork/merch/source/
# till SVG (vit konst, transparent bakgrund) och renderar högupplöst PNG.
#
# Kräver: potrace, librsvg (brew install potrace librsvg). sips ingår i macOS.
#
set -euo pipefail

ART_DIR="$(cd "$(dirname "$0")/.." && pwd)/packages/brand/artwork/merch"
SRC_DIR="$ART_DIR/source"
PNG_WIDTH=4096

command -v potrace >/dev/null || { echo "potrace saknas: brew install potrace"; exit 1; }
command -v rsvg-convert >/dev/null || { echo "rsvg-convert saknas: brew install librsvg"; exit 1; }

tmp="$(mktemp -d)"
trap 'rm -rf "$tmp"' EXIT

for src in "$SRC_DIR"/*.png; do
  name="$(basename "$src" .png)"
  sips -s format bmp "$src" --out "$tmp/$name.bmp" >/dev/null

  # -i: konsten är vit på svart, potrace traserar mörkt som förgrund
  # -t 3: rensar enstaka pixlar från bildgenereringen
  potrace --svg --invert --turdsize 3 --color '#ffffff' \
    "$tmp/$name.bmp" -o "$ART_DIR/$name.svg"

  rsvg-convert --width "$PNG_WIDTH" "$ART_DIR/$name.svg" -o "$ART_DIR/$name.png"
  echo "$name.svg + $name.png"
done
