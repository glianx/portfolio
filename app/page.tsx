type Project = {
  title: string;
  blurb: string;
  href: string;
  hrefLabel: string;
  source: string;
  extra?: { href: string; label: string };
};

const projects: Project[] = [
  {
    title: "An undercomplete autoencoder",
    blurb:
      "784 → 100 → 784 on FashionMNIST, with the MSE gradients derived by hand. The bottleneck is the whole idea: 100 units can't hold 784 pixels, so the network has to learn what the clothes have in common. Reconstructions are rendered every epoch.",
    href: "/undercomplete.html",
    hrefLabel: "Read the notebook",
    source: "https://github.com/glianx/autoencoders",
  },
  {
    title: "An n-gram language model",
    blurb:
      "Every three-word window in Frankenstein mapped to the words that followed it, then sampled one at a time. No libraries, no training — the whole model is a dictionary. n = 3 tracks the novel for a clause, then wanders off into it.",
    href: "/ngram.html",
    hrefLabel: "Read the notebook",
    source: "https://github.com/glianx/ngram",
  },
  {
    title: "k-nearest neighbours on Iris",
    blurb:
      "No training loop at all — just squared Euclidean distance and a majority vote over the five nearest neighbours. 96.7% test accuracy on Iris, with the four features plotted to show why it works.",
    href: "/knn.html",
    hrefLabel: "Read the notebook",
    source: "https://github.com/glianx/knn",
  },
  {
    title: "Two-layer MNIST",
    blurb:
      "A two-layer network in Julia with the same hand-derived gradients. A ReLU hidden layer and He initialization take it from 90.91% to 96.95% test accuracy.",
    href: "/layers.html",
    hrefLabel: "Read the notebook",
    source: "https://github.com/glianx/neural-nets",
    extra: { href: "/learnings.html", label: "What broke along the way" },
  },
  {
    title: "MNIST from scratch",
    blurb:
      "A single-layer neural network written in Julia with hand-derived gradients, no autodiff and no ML framework. 90.91% test accuracy.",
    href: "/mnist.html",
    hrefLabel: "Read the notebook",
    source: "https://github.com/glianx/neural-nets",
  },
  {
    title: "How neural nets break",
    blurb:
      "Notes on the failure modes behind the two notebooks above: exploding activations from bad initialization, dead ReLU neurons that freeze the gradient at zero, and softmax saturation.",
    href: "/learnings.html",
    hrefLabel: "Read the notes",
    source: "https://github.com/glianx/neural-nets",
  },
];

export default function Home() {
  return (
    <main>
      <h1>Gordon Liang</h1>
      <p className="intro">
        I build things and write them up. Below is what I&rsquo;ve been working on.
      </p>

      <h2>Projects</h2>
      <ul className="projects">
        {projects.map((p) => (
          <li key={p.title}>
            <h3>{p.title}</h3>
            <p>{p.blurb}</p>
            <p className="links">
              <a href={p.href}>{p.hrefLabel}</a>
              {p.extra && <a href={p.extra.href}>{p.extra.label}</a>}
              <a href={p.source}>Source</a>
            </p>
          </li>
        ))}
      </ul>

      <footer>
        <a href="https://github.com/glianx">GitHub</a>
        <a href="mailto:gordon@liang.ca">gordon@liang.ca</a>
      </footer>
    </main>
  );
}
