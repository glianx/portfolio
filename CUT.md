# Cut from the index

Things that were published and then pulled, so the reasoning is not lost and
nothing gets silently re-added on the next build. Source repos are untouched —
everything here still exists upstream and can be restored by putting its line
back in `scripts/build-source.sh` or `scripts/build-notebook.sh` and adding the
entry to `entries` / `webEntries` in `app/page.tsx`.

## Pulled for content, not quality

**`sms` — `hello-world/sms/send-sms-oauth2.js`.** Hardcodes
`6508129777@vtext.com`, a Verizon email-to-SMS gateway address, which is a
mobile number in plain text. Do not republish until that line reads from an
env var. The number is still in the public `glianx/hello-world` repo and
should be scrubbed there too.

**`cs371-hw3` … `cs371-hw9` — `cs371/hwN/gordon.ipynb`.** Worked solutions to
a Duke COMPSCI 371 problem set. Publishing them puts course solutions in front
of the faculty most likely to recognise the course. `cs371-explore` is
unaffected — that work is unassigned.

Also never published, for the same family of reasons: the group-submission
`homework0N.ipynb` files and `phillip-*.ipynb`, which are my collaborators'
work as much as mine, and every `.env` in `hello-world`.

## Pulled for being too thin to earn a link

Each is fine as a thing I did; none of them demonstrates anything to a reader.
Worth restoring only if the underlying file grows into something.

| slug | source | why |
| --- | --- | --- |
| `proxy` | `hello-world/proxy/squid.conf` | 4 lines of config |
| `ngrok` | `hello-world/tunnel-ngrok/index.html` | 6-line hello world |
| `learn-clsx` | `hello-world/learn-cn/learn-clsx.mjs` | 6 `console.log` calls |
| `tokens` | `hello-world/tokens/main.py` | 9 lines of `enc.encode(...)` |
| `http-node` | `hello-world/http/explore.js` | mostly unfinished `// TODO:` exercises |

## Pulled because it is broken, and fixable

**`gradient-descent` — `cs371-explore/gradient_descent.ipynb`.** The published
page showed a live `UndefVarError: gradient_descent not defined` in its output,
plus a `# TODO: 3D gradient descent animation` cell. Re-run the notebook
top-to-bottom with the outputs saved and it can go straight back in.

## Known gap, still published

**`iv-curves` — `neuro/i-v.ipynb`** has no saved outputs, so the page is code
with no figure. It is an interactive GLMakie app with sliders and will not
render statically; it needs a snapshot of the curves saved into the notebook.
