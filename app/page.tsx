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
