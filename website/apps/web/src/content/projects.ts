import { researchUrl, site } from "./site";

export type ProjectPreview =
  | { type: "image"; src: string; alt: string; width: number; height: number }
  | {
      type: "gif" | "video";
      src: string;
      poster: string;
      alt: string;
      width: number;
      height: number;
    };

export interface Project {
  id: string;
  title: string;
  description: string;
  details: string;
  technologies: string[];
  status: "Private" | "Building" | "Open source" | "Live" | "Experiment";
  featured: boolean;
  githubUrl?: string;
  liveUrl?: string;
  articleSlug?: string;
  preview?: ProjectPreview;
}

export const projects: Project[] = [
  {
    id: "professional",
    title: "Professional quant engineering",
    description: "Financial models. Production software. Real-world risk.",
    details:
      "Python-based credit and risk models, reusable analysis tools, cloud infrastructure and model execution systems. My work brings modelling and software engineering together, with a focus on maintainable systems and repeatable analysis.",
    technologies: ["Python", "SQL", "Azure", "CI/CD"],
    status: "Private",
    featured: true,
  },
  {
    id: "atlas",
    title: "Atlas Signals",
    description:
      "Independent research at the intersection of markets and data.",
    details:
      "A space for research and exploration of financial markets. Start with the article on mapping macro regimes without false precision.",
    technologies: ["Markets", "Data", "Research"],
    status: "Building",
    featured: true,
    liveUrl: researchUrl(),
    // articleSlug: "mapping-macro-regimes-without-false-precision",
    preview: {
      type: "image",
      src: "/showcase/atlas-homepage.webp",
      alt: "Atlas Signals homepage, with its market research introduction and financial cartography",
      width: 1440,
      height: 1000,
    },
  },
  {
    id: "trading",
    title: "Python trading engine",
    description: "A modular approach to trading, execution and analytics.",
    details:
      "An extensible trading engine with order management, a Streamlit interface and a flexible database layer. An independent exploration of how market data, execution and portfolio analytics fit together.",
    technologies: ["Python", "RabbitMQ", "PostgreSQL", "kdb+"],
    status: "Open source",
    featured: true,
    githubUrl: "https://github.com/mgale694/py-trading-engine",
  },
  {
    id: "flight",
    title: "Flight tracker",
    description: "A little curiosity about the planes passing overhead.",
    details:
      "An application that fetches live flight data and shows the aircraft overhead, filtered by direction. Built with Python and Streamlit, with Raspberry Pi use in mind.",
    technologies: ["Python", "APIs", "Raspberry Pi"],
    status: "Open source",
    featured: true,
    githubUrl: "https://github.com/mgale694/flight-tracker",
  },
  {
    id: "photography",
    title: "Through a different lens",
    description: "Film photographs, places and moments worth keeping.",
    details:
      "My photography portfolio and archive. A print-inspired interface built around a catalogue generated from photographs and their metadata, with collections organised by location, camera and date.",
    technologies: ["Photography", "React", "TypeScript"],
    status: "Live",
    featured: true,
    liveUrl: site.photography,
    githubUrl: "https://github.com/mgale694/mattgale.photography",
    preview: {
      type: "image",
      src: "/showcase/photography-homepage.webp",
      alt: "The current Matt Gale photography homepage, with bold type and a film photograph of a London cinema",
      width: 1440,
      height: 1000,
    },
  },
  {
    id: "uvve",
    title: "uvve",
    description: "A small tool for a better Python workflow.",
    details:
      "A command-line tool for managing Python virtual environments using uv. Inspired by the workflow of pyenv-virtualenv and built around uv’s environment tooling.",
    technologies: ["Python", "uv", "CLI"],
    status: "Open source",
    featured: true,
    githubUrl: "https://github.com/hedge-quill/uvve",
  },
  {
    id: "personal",
    title: "This little corner of the web",
    description: "A personal home for my work, background and ideas.",
    details:
      "An editorial one-page portfolio built from reusable React components. The design pairs strong typography with abstract line studies, accessible interactions and a small, documented design system.",
    technologies: ["React", "TypeScript", "Vite"],
    status: "Live",
    featured: false,
    githubUrl: "https://github.com/mgale694/matthewgale.co.uk",
  },
  {
    id: "cadence",
    title: "Cadence",
    description: "Advanced data structures, explored in Python.",
    details:
      "A Python package exploring efficient and robust implementations of fundamental advanced data structures.",
    technologies: ["Python", "Data structures"],
    status: "Open source",
    featured: false,
    githubUrl: "https://github.com/mgale694/cadence",
  },
  {
    id: "rithm",
    title: "Rithm",
    description: "Essential algorithms, with an emphasis on clarity.",
    details:
      "A Python toolkit for exploring and understanding essential algorithms through clear implementations.",
    technologies: ["Python", "Algorithms"],
    status: "Open source",
    featured: false,
    githubUrl: "https://github.com/mgale694/rithm",
  },
  {
    id: "grrs",
    title: "Grrs",
    description: "A small file-search utility, written in Rust.",
    details:
      "A lightweight command-line tool for finding text patterns in files, built as an exploration of Rust and file I/O.",
    technologies: ["Rust", "CLI"],
    status: "Open source",
    featured: false,
    githubUrl: "https://github.com/mgale694/file-searcher",
  },
  {
    id: "repogen",
    title: "Repogen",
    description: "From an idea to a new GitHub repository.",
    details:
      "A Rust-based command-line tool for creating GitHub repositories remotely and locally, using asynchronous API calls.",
    technologies: ["Rust", "GitHub API", "CLI"],
    status: "Open source",
    featured: false,
    githubUrl: "https://github.com/mgale694/repogen",
  },
  {
    id: "cure",
    title: "Cure",
    description: "A small 2D game and an early learning project.",
    details:
      "A Java game where players fight zombies to find a cure. An early experiment in game development.",
    technologies: ["Java", "Game development"],
    status: "Experiment",
    featured: false,
  },
];
