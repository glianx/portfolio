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
  "$SRC/hello-world/advanced-funcs/generator/count_to_three.py	advanced-funcs	Python generators — yield, send and closing"
  "$SRC/hello-world/ai-sdk-python/llm.py	ai-sdk-python	Calling an LLM from Python"
  "$SRC/hello-world/auth/bcrypt-jwt/server.ts	auth-jwt	Password hashing with bcrypt and JWT sessions"
  "$SRC/hello-world/express-sqlite-http-crud/server.js	express-crud	CRUD over HTTP with Express and SQLite"
  "$SRC/hello-world/fastapi/crud.py	fastapi	CRUD endpoints with FastAPI"
  "$SRC/hello-world/http-py/small-server.py	http-py	A small HTTP server in Python"
  "$SRC/hello-world/learn-cva/hello_cva.mjs	learn-cva	Class variance authority, plain"
  "$SRC/hello-world/learn-cva-react/src/badge.ts	learn-cva-react	A badge's variants defined with cva"
  "$SRC/hello-world/learn-nextjs/app/nav/page.tsx	learn-nextjs	A Next.js page with a navigation menu"
  "$SRC/hello-world/learn-slot/src/App.jsx	learn-slot	Radix Slot and asChild composition"
  "$SRC/hello-world/learn_postgres/milli-pg.js	learn-postgres	Querying Postgres from Node"
  "$SRC/hello-world/learn_shadcn/components/ui/button.tsx	learn-shadcn	The shadcn/ui button, variant by variant"
  "$SRC/hello-world/local-llm/test/index.js	local-llm	Running a model locally in the browser"
  "$SRC/hello-world/neon-nodejs/centi.js	neon	Neon serverless Postgres from Node"
  "$SRC/hello-world/openai-agents-py/quickstart.py	openai-agents-py	Agents SDK quickstart in Python"
  "$SRC/hello-world/openai-agents-ts/index.js	openai-agents-ts	Agents SDK in JavaScript"
  "$SRC/hello-world/pil-tesseract-image-ocr/run_ocr_lite.py	pil-ocr	OCR over page images with PIL and Tesseract"
  "$SRC/hello-world/probe/probe-server.py	probe	Probing a server's behaviour"
  "$SRC/hello-world/reverse-proxy/server.mjs	reverse-proxy	A reverse proxy in Node"
  "$SRC/hello-world/sql/music.sql	sql	A music database in SQL"
  "$SRC/hello-world/tcp/server.js	tcp	A TCP server on raw sockets"
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
# Inline line numbers, not the table layout: the table puts the gutter in
# its own <pre>, and the two columns drift out of alignment by a line. Inline
# numbers live in the same <pre> as the code, so they cannot. CSS marks them
# unselectable so copying the block does not pick them up.
formatter = HtmlFormatter(style="nord-darker", linenos="inline", cssclass="src")

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
    IFS=$'	' read -r file name title <<<"$entry"
    build "$file" "$name" "$title"
  done
fi
