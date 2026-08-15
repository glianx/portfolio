#!/usr/bin/env bash
#
# Regenerate a themed public/<name>.html from a notebook in a source repo.
#
# Run this after editing a notebook, then redeploy. It cannot run in Vercel's
# build container (no Jupyter, no Julia), so it stays a local step.
#
#   ./scripts/build-notebook.sh                        # all notebooks in NOTEBOOKS
#   ./scripts/build-notebook.sh path/to/foo.ipynb      # just that one -> public/foo.html

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
THEME="$ROOT/scripts/notebook-theme.css"

# Where the notebook repos are checked out, one directory per repo. Sits beside
# the site by default; override with NOTEBOOK_SRC=/some/path ./scripts/build-notebook.sh
SRC="${NOTEBOOK_SRC:-$ROOT/../portfolio_source}"

# Notebooks published on the site, built when no argument is given. The output
# is named after the notebook unless an entry supplies its own name after a
# space, which is what keeps two notebooks sharing a basename across repos
# from overwriting each other in public/ — knn/learnings.ipynb is scratch and
# deliberately not published for that reason.
NOTEBOOKS=(
  "$SRC/neural-nets/mnist.ipynb"
  "$SRC/neural-nets/layers.ipynb"
  "$SRC/neural-nets/learnings.ipynb"
  "$SRC/knn/knn.ipynb"
  "$SRC/ngram/ngram.ipynb"
  "$SRC/autoencoders/undercomplete.ipynb"
  "$SRC/attention/attention.ipynb"
  "$SRC/neuro/nernst.ipynb"
  "$SRC/neuro/i-v.ipynb"
  "$SRC/cs371-explore/gradient_descent.ipynb"
  "$SRC/cs371-explore/softmax.ipynb"
  "$SRC/cs371-explore/softmax-K.ipynb"
  "$SRC/cs371-explore/linear_classifier.ipynb"
)

build() {
  local notebook="$1"
  local name out
  name="${2:-$(basename "${notebook%.ipynb}")}"
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
  build "$1" "${2:-}"
else
  for entry in "${NOTEBOOKS[@]}"; do
    # Word-split each entry into path and optional output name.
    # shellcheck disable=SC2086
    build $entry
  done
fi
