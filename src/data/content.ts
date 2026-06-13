/**
 * SINGLE SOURCE OF CONTENT.
 * Everything here is placeholder — swap in real details and delete the TODO
 * markers. Identity (name / role) is real per the brief; the rest is sample
 * data sized to look right so you can replace it 1:1.
 */

export const identity = {
  name: "Abhinav Teja",
  role: "Creative AI Engineer",
  tagline: ["Immersive", "Interactive", "Cinematic"],
  // TODO: replace with your real one-liner
  blurb:
    "I build intelligent systems that feel alive — blending generative AI, real-time graphics, and human-centred design into experiences people remember.",
  // TODO: replace with real links
  email: "hello@abhinavteja.dev",
  socials: [
    { label: "GitHub", href: "https://github.com/" }, // TODO
    { label: "LinkedIn", href: "https://linkedin.com/in/" }, // TODO
    { label: "X", href: "https://x.com/" }, // TODO
    { label: "Read.cv", href: "https://read.cv/" }, // TODO
  ],
};

export const about = {
  // TODO: rewrite in your own voice
  paragraphs: [
    "I'm a Creative AI Engineer working at the seam between machine intelligence and motion design.",
    "My work turns models into mediums — diffusion, agents, and real-time inference woven into interfaces that respond, breathe, and surprise.",
    "I care about the craft most people scroll past: the easing curve, the first 200ms, the frame that makes someone stop.",
  ],
  facts: [
    { k: "Based in", v: "Hyderabad, IN" }, // TODO
    { k: "Focus", v: "Generative AI · Real-time WebGL" },
    { k: "Years", v: "5+" }, // TODO
    { k: "Status", v: "Open to select work" }, // TODO
  ],
};

export type Skill = { name: string; level: number; group: string };
export const skills: Skill[] = [
  // TODO: tune to your real stack
  { name: "PyTorch", level: 0.92, group: "AI/ML" },
  { name: "Diffusion", level: 0.88, group: "AI/ML" },
  { name: "LLM Agents", level: 0.9, group: "AI/ML" },
  { name: "TensorRT", level: 0.78, group: "AI/ML" },
  { name: "Three.js / R3F", level: 0.9, group: "Graphics" },
  { name: "GLSL", level: 0.82, group: "Graphics" },
  { name: "GSAP", level: 0.86, group: "Motion" },
  { name: "WebGPU", level: 0.7, group: "Graphics" },
  { name: "React / TS", level: 0.93, group: "Engineering" },
  { name: "Python", level: 0.94, group: "Engineering" },
  { name: "Rust", level: 0.64, group: "Engineering" },
  { name: "Design Systems", level: 0.8, group: "Craft" },
];

export type Experience = {
  role: string;
  org: string;
  period: string;
  summary: string;
  tags: string[];
};
export const experience: Experience[] = [
  // TODO: replace all roles with your real history
  {
    role: "Creative AI Engineer",
    org: "Vaultera",
    period: "2024 — Now",
    summary:
      "Lead generative + real-time experiences: agentic pipelines, on-device inference, and WebGL product surfaces.",
    tags: ["LLM Agents", "WebGL", "Product"],
  },
  {
    role: "ML Engineer",
    org: "Studio Placeholder",
    period: "2022 — 2024",
    summary:
      "Shipped diffusion-based tooling and trained custom models for interactive media installations.",
    tags: ["Diffusion", "PyTorch", "Installations"],
  },
  {
    role: "Creative Technologist",
    org: "Agency Placeholder",
    period: "2020 — 2022",
    summary:
      "Built award-adjacent campaign sites with shader-driven interaction and scroll choreography.",
    tags: ["Three.js", "GSAP", "Campaigns"],
  },
];

export type Project = {
  id: string;
  title: string;
  year: string;
  role: string;
  blurb: string;
  description: string;
  tags: string[];
  // hue rotates the placeholder gradient thumbnail; swap for real imagery later
  hue: number;
  href?: string;
};
export const projects: Project[] = [
  // TODO: replace with your real case studies + imagery
  {
    id: "neura",
    title: "Neura Field",
    year: "2025",
    role: "Lead Engineer",
    blurb: "Real-time generative particle instrument driven by audio + agents.",
    description:
      "A live AV instrument where an LLM agent conducts a GPU particle field reacting to audio features. Built with WebGPU compute, custom GLSL, and a streaming inference loop.",
    tags: ["WebGPU", "Agents", "GLSL", "Audio"],
    hue: 230,
  },
  {
    id: "diffuse",
    title: "Diffuse Studio",
    year: "2024",
    role: "Creator",
    blurb: "Browser-native diffusion canvas with sub-second latency.",
    description:
      "An in-browser image studio running a distilled diffusion model via WebGPU, with a node-based prompt graph and shader post-processing.",
    tags: ["Diffusion", "WebGPU", "React"],
    hue: 320,
  },
  {
    id: "atlas",
    title: "Atlas Agents",
    year: "2024",
    role: "Architect",
    blurb: "Multi-agent research OS with a spatial, cinematic UI.",
    description:
      "A multi-agent orchestration platform visualised as an explorable 3D knowledge space — agents, tools, and memory rendered as a living graph.",
    tags: ["LLM Agents", "Three.js", "Graph"],
    hue: 160,
  },
  {
    id: "mirror",
    title: "Mirror Stage",
    year: "2023",
    role: "Creative Tech",
    blurb: "Installation: a portrait that reacts to how you move.",
    description:
      "A camera-driven installation using pose estimation to drive a fluid shader portrait — your motion ripples through a liquid reflection in real time.",
    tags: ["Pose", "GLSL", "Installation"],
    hue: 20,
  },
];

export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  hue: number;
};
export const certificates: Certificate[] = [
  // TODO: replace with real certs + scans (lightbox swaps to real images)
  { title: "Deep Learning Specialization", issuer: "DeepLearning.AI", year: "2023", hue: 230 },
  { title: "GPU Programming", issuer: "NVIDIA DLI", year: "2023", hue: 150 },
  { title: "Real-Time Graphics", issuer: "Placeholder Inst.", year: "2022", hue: 320 },
  { title: "Generative AI Engineering", issuer: "Placeholder Org", year: "2024", hue: 280 },
  { title: "Creative Coding", issuer: "Placeholder", year: "2021", hue: 40 },
  { title: "WebGPU Fundamentals", issuer: "Placeholder", year: "2024", hue: 190 },
];

export type Academic = {
  degree: string;
  school: string;
  period: string;
  detail: string;
};
export const academics: Academic[] = [
  // TODO: replace with real education
  {
    degree: "M.S. — Artificial Intelligence",
    school: "Placeholder University",
    period: "2020 — 2022",
    detail: "Thesis on real-time generative systems and human–AI interaction.",
  },
  {
    degree: "B.Tech — Computer Science",
    school: "Placeholder Institute of Technology",
    period: "2016 — 2020",
    detail: "Graphics, ML, and a lot of side-project shaders.",
  },
];

/** Section registry — order + ids drive nav, scroll progress, and blob morph. */
export const sections = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Work" },
  { id: "certificates", label: "Certificates" },
  { id: "academics", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
