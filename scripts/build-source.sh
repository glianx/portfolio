#!/usr/bin/env bash
#
# Render a source file from a source repo into a themed public/<name>.html.
#
# Same idea as build-notebook.sh, for repos whose interesting artifact is a
# plain source file rather than a notebook. Needs Pygments, so like that
# script it stays a local step and cannot run in Vercel's build container.
#
#   ./scripts/build-source.sh                      # everything in SOURCES
#   ./scripts/build-source.sh path/to/foo.js Title # just that one -> public/foo.html

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
SRC="${NOTEBOOK_SRC:-$ROOT/../portfolio_source}"

# file<TAB>output name<TAB>page title
SOURCES=(
  "$SRC/promises-from-scratch/myPromise/myPromise.js	mypromise	A Promise implementation from scratch"
)

build() {
  local file="$1" name="$2" title="$3"
  local out="$ROOT/public/$name.html"

  if [ ! -f "$file" ]; then
    echo "source not found: $file" >&2
    exit 1
  fi

  echo "rendering $file"
  SRC_TITLE="$title" SRC_OUT="$out" python3 - "$file" <<'PY'
import html, os, sys
from pygments import highlight
from pygments.lexers import get_lexer_for_filename
from pygments.formatters import HtmlFormatter

path = sys.argv[1]
title = os.environ["SRC_TITLE"]
out = os.environ["SRC_OUT"]

# Trailing blank lines make Pygments emit an extra numbered row, which puts
# every line number one off from the file.
code = open(path).read().strip("\n")
lexer = get_lexer_for_filename(path)
# linenos in a separate table column so line numbers are not selectable
# along with the code when a reader copies it.
formatter = HtmlFormatter(style="native", linenos="table", cssclass="src")

body = highlight(code, lexer, formatter)
rules = formatter.get_style_defs(".src")

page = f"""<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>{html.escape(title)} &mdash; Gordon Liang</title>
    <link rel="stylesheet" href="/paper.css" />
    <style>
{rules}
    </style>
  </head>
  <body>
    <article class="wide">
      <a class="back" href="/">&larr; index</a>
      <h1>{html.escape(title)}</h1>
      <p class="meta">{html.escape(os.path.basename(path))} &middot;
        {len(code.splitlines())} lines</p>
      {body}
    </article>
  </body>
</html>
"""

open(out, "w").write(page)
print(f"wrote {out} ({len(page)} bytes)")
PY
}

if [ $# -gt 0 ]; then
  build "$1" "$(basename "${1%.*}" | tr '[:upper:]' '[:lower:]')" "${2:-$(basename "$1")}"
else
  for entry in "${SOURCES[@]}"; do
    IFS=$'\t' read -r file name title <<<"$entry"
    build "$file" "$name" "$title"
  done
fi
