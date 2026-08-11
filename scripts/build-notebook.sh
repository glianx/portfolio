#!/usr/bin/env bash
#
# Regenerate a themed public/<name>.html from a notebook in the neural-nets repo.
#
# Run this after editing a notebook, then redeploy. It cannot run in Vercel's
# build container (no Jupyter, no Julia), so it stays a local step.
#
#   ./scripts/build-notebook.sh                        # all notebooks in NOTEBOOKS
#   ./scripts/build-notebook.sh path/to/foo.ipynb      # just that one -> public/foo.html

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THEME="$ROOT/scripts/notebook-theme.css"

# Where the notebook repo is checked out. Sits beside the site by default;
# override with NOTEBOOK_SRC=/some/path ./scripts/build-notebook.sh
SRC="${NOTEBOOK_SRC:-$ROOT/../portfolio_source/neural-nets}"

# Notebooks published on the site, built when no argument is given.
NOTEBOOKS=(
  "$SRC/mnist.ipynb"
  "$SRC/layers.ipynb"
  "$SRC/learnings.ipynb"
)

build() {
  local notebook="$1"
  local name out
  name="$(basename "${notebook%.ipynb}")"
  out="$ROOT/public/$name.html"

  if [ ! -f "$notebook" ]; then
    echo "notebook not found: $notebook" >&2
    exit 1
  fi

  echo "converting $notebook"
  jupyter nbconvert --to html --theme dark "$notebook" \
    --output-dir "$ROOT/public" --output "$name.html"

  echo "injecting theme"
  THEME_CSS="$THEME" python3 - "$out" <<'PY'
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
    sys.exit("no </head> in generated HTML; nbconvert template changed?")

html = html.replace("</head>", block + "</head>", 1)
open(path, "w").write(html)
PY

  echo "wrote $out ($(wc -c <"$out" | tr -d ' ') bytes)"
}

if [ $# -gt 0 ]; then
  build "$1"
else
  for nb in "${NOTEBOOKS[@]}"; do
    build "$nb"
  done
fi
