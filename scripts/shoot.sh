#!/usr/bin/env bash
# Capture viewport-accurate screenshots of the landing page.
# Usage: bash scripts/shoot.sh <label> <width> <height> [anchor]
# Uses a realistic viewport height so 100svh-based sections measure correctly,
# and forces reduced motion so entrance animations settle before capture.
set -euo pipefail

CHROME="/c/Program Files/Google/Chrome/Application/chrome.exe"
ROOT="D:\\My Project\\Riya"
PORT="${PORT:-3210}"

label="$1"
width="$2"
height="$3"
anchor="${4:-}"

"$CHROME" \
  --headless=new \
  --disable-gpu \
  --hide-scrollbars \
  --force-prefers-reduced-motion \
  --virtual-time-budget=6000 \
  --window-size="${width},${height}" \
  --user-data-dir="${ROOT}\\.chrome-shot-${label}" \
  "--screenshot=${ROOT}\\shots\\${label}.png" \
  "http://localhost:${PORT}/${anchor}" 2>&1 | grep -Ei "written|failed" || true
