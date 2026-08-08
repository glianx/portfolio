#!/usr/bin/env bash
#
# Regenerate public/mnist.html from the notebook in the neural-nets repo.
#
# Run this after editing mnist.ipynb, then redeploy. It cannot run in Vercel's
# build container — that has no Jupyter and no Julia — so it stays a local step.
#
#   ./scripts/build-notebook.sh [path/to/mnist.ipynb]

set -euo pipefail

NOTEBOOK="${1:-$HOME/neural-nets/mnist.ipynb}"
ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUT="$ROOT/public/mnist.html"
THEME="$ROOT/scripts/notebook-theme.css"

if [ ! -f "$NOTEBOOK" ]; then
  echo "notebook not found: $NOTEBOOK" >&2
  exit 1
fi

echo "converting $NOTEBOOK"
jupyter nbconvert --to html --theme dark "$NOTEBOOK" \
  --output-dir "$ROOT/public" --output mnist.html

echo "injecting theme"
THEME_CSS="$THEME" python3 - "$OUT" <<'PY'
import os, sys

path = sys.argv[1]
css = open(os.environ["THEME_CSS"]).read()

html = open(path).read()

fonts = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">\n'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n'
    '<link rel="stylesheet" href="https://fonts.googleapis.com/css2'
    "?family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700"
    '&display=swap">\n'
)

block = fonts + "<style>\n" + css + "\n</style>\n"

# Inject last in <head> so the overrides win on source order.
if "</head>" not in html:
    sys.exit("no </head> in generated HTML — nbconvert template changed?")

html = html.replace("</head>", block + "</head>", 1)
open(path, "w").write(html)
PY

echo "wrote $OUT ($(wc -c <"$OUT" | tr -d ' ') bytes)"
