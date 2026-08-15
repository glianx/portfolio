import { Space_Mono } from "next/font/google";

import Mail from "./mail";

// A second face for the web dev index, so the two sections read as
// different bodies of work at a glance rather than one long list.
const webFont = Space_Mono({ subsets: ["latin"], weight: ["400", "700"] });

type Entry = {
  slug: string;
  href: string;
  title: string;
};

// The index reads as one run of monospace text, so each entry is just its
// slug. Alphabetical — the order carries no ranking.
const entries: Entry[] = [
  { slug: "attention", href: "/attention.html", title: "The attention mechanism taken apart by hand in Julia" },
  { slug: "autoencoder", href: "/undercomplete.html", title: "Undercomplete autoencoder — 784 to 100 to 784 on FashionMNIST" },
  { slug: "colon-cancer-svm", href: "/colon-cancer-svm.html", title: "Writing — SVM-based detection of cancerous colon polyps" },
  { slug: "cs371-hw3", href: "/cs371-hw3.html", title: "Momentum, automatic differentiation and SGD" },
  { slug: "cs371-hw4", href: "/cs371-hw4.html", title: "Linear score-based classifiers, loss functions and soft-max" },
  { slug: "cs371-hw5", href: "/cs371-hw5.html", title: "The Bayes classifier, validation and the bootstrap" },
  { slug: "cs371-hw6", href: "/cs371-hw6.html", title: "SVMs, the representer theorem and Gaussian kernels" },
  { slug: "cs371-hw8", href: "/cs371-hw8.html", title: "The chain rule and back-propagation for an MLP" },
  { slug: "cs371-hw9", href: "/cs371-hw9.html", title: "Correlation, convolution and gradients of a convolution" },
  { slug: "gradient-descent", href: "/gradient_descent.html", title: "Gradient descent on a paraboloid, in 3D" },
  { slug: "iv-curves", href: "/i-v.html", title: "Neuron I–V curves with interactive ion-concentration sliders" },
  { slug: "knn", href: "/knn.html", title: "k-nearest neighbours on Iris — no training loop, 96.7%" },
  { slug: "linear-classifier", href: "/linear_classifier.html", title: "Decision regions of a three-way linear classifier" },
  { slug: "llm-transparency", href: "/llm-transparency.html", title: "Writing — why LLMs are opaque, and what that means for consumer health" },
  { slug: "mlp", href: "/layers.html", title: "Two-layer MNIST — ReLU hidden layer, He init, 96.95%" },
  { slug: "mlp-failures", href: "/learnings.html", title: "How neural nets break — dead ReLUs, softmax saturation" },
  { slug: "mypromise", href: "/mypromise.html", title: "A Promise/A+ implementation written from scratch in JavaScript" },
  { slug: "nernst", href: "/nernst.html", title: "The Nernst equation over sodium concentrations, in 3D" },
  { slug: "ngram", href: "/ngram.html", title: "An n-gram language model on Frankenstein" },
  { slug: "softmax", href: "/softmax.html", title: "Softmax over three Gaussians, visualized" },
  { slug: "softmax-k", href: "/softmax-K.html", title: "Softmax generalized to K classes" },
  { slug: "softmax-regression", href: "/mnist.html", title: "MNIST from scratch — one layer, hand-derived gradients, 90.91%" },
];

// One key file from each folder of glianx/hello-world — the scratch repo
// where each subfolder is a thing I sat down to learn.
const webEntries: Entry[] = [
  { slug: "advanced-funcs", href: "/advanced-funcs.html", title: "Python generators — yield, send and closing" },
  { slug: "ai-sdk-python", href: "/ai-sdk-python.html", title: "Calling an LLM from Python" },
  { slug: "auth-jwt", href: "/auth-jwt.html", title: "Password hashing with bcrypt and JWT sessions" },
  { slug: "express-crud", href: "/express-crud.html", title: "CRUD over HTTP with Express and SQLite" },
  { slug: "fastapi", href: "/fastapi.html", title: "CRUD endpoints with FastAPI" },
  { slug: "http-node", href: "/http-node.html", title: "Poking at Node's http module" },
  { slug: "http-py", href: "/http-py.html", title: "A small HTTP server in Python" },
  { slug: "learn-clsx", href: "/learn-clsx.html", title: "clsx for conditional class names" },
  { slug: "learn-cva", href: "/learn-cva.html", title: "Class variance authority, plain" },
  { slug: "learn-cva-react", href: "/learn-cva-react.html", title: "A badge's variants defined with cva" },
  { slug: "learn-nextjs", href: "/learn-nextjs.html", title: "A Next.js page with a navigation menu" },
  { slug: "learn-postgres", href: "/learn-postgres.html", title: "Querying Postgres from Node" },
  { slug: "learn-shadcn", href: "/learn-shadcn.html", title: "The shadcn/ui button, variant by variant" },
  { slug: "learn-slot", href: "/learn-slot.html", title: "Radix Slot and asChild composition" },
  { slug: "local-llm", href: "/local-llm.html", title: "Running a model locally in the browser" },
  { slug: "neon", href: "/neon.html", title: "Neon serverless Postgres from Node" },
  { slug: "ngrok", href: "/ngrok.html", title: "The page served through an ngrok tunnel" },
  { slug: "openai-agents-py", href: "/openai-agents-py.html", title: "Agents SDK quickstart in Python" },
  { slug: "openai-agents-ts", href: "/openai-agents-ts.html", title: "Agents SDK in JavaScript" },
  { slug: "pil-ocr", href: "/pil-ocr.html", title: "OCR over page images with PIL and Tesseract" },
  { slug: "probe", href: "/probe.html", title: "Probing a server's behaviour" },
  { slug: "proxy", href: "/proxy.html", title: "A forward proxy with Squid" },
  { slug: "reverse-proxy", href: "/reverse-proxy.html", title: "A reverse proxy in Node" },
  { slug: "sms", href: "/sms.html", title: "Sending SMS over an OAuth2 API" },
  { slug: "sql", href: "/sql.html", title: "A music database in SQL" },
  { slug: "tcp", href: "/tcp.html", title: "A TCP server on raw sockets" },
  { slug: "tokens", href: "/tokens.html", title: "Tokenizing text with tiktoken" },
];

function Cloud({
  items,
  label,
  className = "",
}: {
  items: Entry[];
  label: string;
  className?: string;
}) {
  return (
    <nav className={`cloud ${className}`} aria-label={label}>
      {items.map((e, i) => (
        <span key={e.slug}>
          {/* Word and its trailing separator are one unwrappable unit, then a
              real space — so lines break after a dot, never before one.
              Adjacent JSX elements alone would give the line nowhere to wrap
              at all. */}
          <span className="word">
            <a href={e.href} title={e.title}>
              {e.slug}
            </a>
            {i < items.length - 1 && <span className="sep">·</span>}
          </span>{" "}
        </span>
      ))}
    </nav>
  );
}

export default function Home() {
  return (
    <main>
      <h1>gordon liang</h1>

      <div className="cloud-wrap">
        <Cloud items={entries} label="Notebooks" />
      </div>

      <h2 className={webFont.className}>web dev</h2>
      <Cloud items={webEntries} label="Web development" className={webFont.className} />

      <footer>
        <a href="https://github.com/glianx">github</a>
        <Mail />
      </footer>
    </main>
  );
}
