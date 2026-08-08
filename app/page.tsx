const projects = [
  {
    title: "MNIST from scratch",
    blurb:
      "A single-layer neural network written in Julia with hand-derived gradients — no autodiff, no ML framework. 90.91% test accuracy.",
    href: "/mnist.html",
    hrefLabel: "Read the notebook",
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
