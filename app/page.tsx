import Mail from "./mail";

type Entry = {
  slug: string;
  href: string;
  title: string;
};

// The index reads as one run of monospace text, so each entry is just its
// slug. Alphabetical — the order carries no ranking.
const entries: Entry[] = [
  { slug: "autoencoder", href: "/undercomplete.html", title: "Undercomplete autoencoder — 784 to 100 to 784 on FashionMNIST" },
  { slug: "knn", href: "/knn.html", title: "k-nearest neighbours on Iris — no training loop, 96.7%" },
  { slug: "mlp", href: "/layers.html", title: "Two-layer MNIST — ReLU hidden layer, He init, 96.95%" },
  { slug: "mlp-failures", href: "/learnings.html", title: "How neural nets break — dead ReLUs, softmax saturation" },
  { slug: "ngram", href: "/ngram.html", title: "An n-gram language model on Frankenstein" },
  { slug: "softmax-regression", href: "/mnist.html", title: "MNIST from scratch — one layer, hand-derived gradients, 90.91%" },
];

export default function Home() {
  return (
    <main>
      <h1>gordon liang</h1>

      <div className="cloud-wrap">
        <nav className="cloud" aria-label="Notebooks">
          {entries.map((e, i) => (
            <span key={e.slug}>
              {/* Word and its trailing separator are one unwrappable unit,
                  then a real space — so lines break after a dot, never
                  before one. Adjacent JSX elements alone would give the line
                  nowhere to wrap at all. */}
              <span className="word">
                <a href={e.href} title={e.title}>
                  {e.slug}
                </a>
                {i < entries.length - 1 && <span className="sep">·</span>}
              </span>{" "}
            </span>
          ))}
        </nav>
      </div>

      <footer>
        <a href="https://github.com/glianx">github</a>
        <Mail />
      </footer>
    </main>
  );
}
