/** Shared by the browser and sitemap generator. Keep this file environment-independent. */
export const site = {
  name: "Matthew Gale",
  title: "Quantitative developer",
  url: "https://matthewgale.co.uk",
  description:
    "Quantitative developer in London. Financial models, production software, and independent projects at the intersection of markets and technology.",
  email: "hello@matthewgale.co.uk",
  location: "London, UK",
  github: "https://github.com/mgale694",
  linkedin: "https://linkedin.com/in/M-Gale",
  photography: "https://mattgale-photography.pages.dev",
  blog: {
    enabled: false,
    externalUrl: "https://atlas-website-6cn.pages.dev/research/",
  },
};

export const navigation = [
  { id: "about", label: "About" },
  { id: "work", label: "Work" },
  { id: "contact", label: "Contact" },
] as const;

export function researchUrl(slug?: string) {
  if (!site.blog.externalUrl) return undefined;
  return `${site.blog.externalUrl.replace(/\/$/, "")}/${slug ? `${slug.replace(/^\/+|\/+$/g, "")}/` : ""}`;
}

export const experience = [
  {
    period: "2021 – Present",
    title: "Quantitative developer",
    description:
      "Building financial models and the software that puts them to work.",
    details: [
      "Develop Python credit and risk models as APIs with FastAPI and Pydantic.",
      "Modernise legacy R, Excel and MATLAB systems using Python, Azure and CI/CD.",
      "Build reusable tools for portfolio analysis, backtesting and asynchronous model execution.",
      "Create React and TypeScript interfaces for financial analysis, supported by containerised applications and automated data pipelines.",
      "Pioneered and built a FastMCP server that connects model context, data schemas, APIs, parameters, macroeconomic sources and coding workflows across the risk ecosystem, reducing prompt-token usage and repeated context assembly.",
    ],
  },
  {
    period: "2020 – 2021",
    title: "Technology graduate",
    description: "Data pipelines, validation and quantitative infrastructure.",
    details: [
      "Developed pipelines and auditing processes to collate, validate and distribute datasets.",
      "Maintained quantitative data infrastructure supporting risk and analytics research.",
    ],
  },
  {
    period: "2020",
    title: "Data science secondment",
    description: "Research into privacy-preserving machine learning.",
    details: [
      "Explored differential privacy and homomorphic encryption with Python, PyTorch and TensorFlow Privacy.",
      "Researched open-source tools and shared findings with technical and non-technical audiences.",
    ],
  },
  {
    period: "2019",
    title: "Assurance summer internship",
    description: "Financial analysis and client delivery at PwC.",
    details: [
      "Analysed financial information for FTSE 100 clients, including intercompany accounts and revenue.",
      "Managed client conversations around sales and purchase evidence while supporting the wider assurance team.",
    ],
  },
];

export const skills = [
  {
    title: "Domain",
    items: [
      "Credit risk",
      "Portfolio analytics",
      "Macroeconomic scenarios",
      "Sensitivity analysis",
      "Model governance",
    ],
  },
  {
    title: "Skills",
    items: [
      "Python / SQL",
      "FastAPI / Pydantic",
      "Azure / CI/CD",
      "TypeScript / React",
      "C++ / Rust",
    ],
  },
  {
    title: "Interests",
    items: [
      "Financial markets",
      "Rates & credit",
      "Independent research",
      "Developer tooling",
      "Film photography",
    ],
  },
];

export const certifications = [
  {
    title: "Financial Risk Manager (FRM)",
    detail: "Part I",
  },
  {
    title: "Microsoft Azure Fundamentals",
    detail: "AZ-900",
  },
] as const;
