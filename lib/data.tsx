import { Code, Cpu, Layers, Languages } from "lucide-react";

export const experience = [
  {
    date: "04/2025 – Present",
    title: "Software Engineer",
    company: "Emaar • Dubai, UAE",
    points: [
      "Developed and launched 5 enterprise web apps with Next.js, GraphQL, and React for 10K+ internal users.",
      "Built React Native mobile apps improving field operations efficiency by 45% via real-time data sync.",
      "Designed GraphQL APIs with optimized SQL, reducing data fetch time by 60% for seamless integrations.",
      "Delivered 20% ahead of schedule with Agile/Scrum while maintaining 85%+ test coverage.",
    ],
  },
  {
    date: "10/2024 – 04/2025",
    title: "Full-Stack Developer",
    company: "Veeva Systems and Software • London (remote)",
    points: [
      "Shipped enterprise SaaS for 500+ pharma clients with React, Node.js, and Java Spring Boot (99.9% uptime).",
      "Led REST APIs and microservices integrating Veeva Vault with 3rd-party clinical systems; cut processing time 65%.",
      "Coordinated across 3 time zones, delivering 20+ feature releases with zero critical production issues.",
      "Optimized Postgres and added Redis caching for 40% performance gains (10K+ professionals).",
    ],
  },
  {
    date: "02/2024 – 10/2024",
    title: "Database Engineer",
    company: "ABGA Systems and Software • Dubai (remote)",
    points: [
      "Implemented highly available MySQL and MongoDB databases for mission-critical apps.",
      "Tuned queries and indexing; improved response times and system performance.",
      "Ensured optimized performance and zero downtime across environments.",
    ],
  },
  {
    date: "05/2023 – 11/2023",
    title: "Full-Stack Developer",
    company: "Media Pan Arab FZE • Cairo, Egypt",
    points: [
      "Delivered full-stack apps with React and Node.js and deployed to AWS/Heroku with CI/CD.",
      "Reduced deployment times and improved quality with automated pipelines and testing.",
      "Created and executed detailed test plans and cases for high reliability.",
    ],
  },
  {
    date: "06/2020 – Present",
    title: "Augmented Reality Software Engineer (Own Project)",
    company: "Independent",
    points: [
      "Built QR-triggered AR experiences showing 3D menu items/products for restaurants.",
      "Improved engagement and conversions with Web-based AR previews.",
    ],
  },
];

export const skills = [
  {
    title: "Programming",
    subtitle: "Core languages and patterns",
    icon: <Code className="h-6 w-6 text-cyan-500" />,
    items: ["JavaScript", "TypeScript", "Python", "Java", "C#", "C/C++"],
  },
  {
    title: "Web & Mobile",
    subtitle: "Frontend and cross-platform",
    icon: <Layers className="h-6 w-6 text-pink-500" />,
    items: [
      "React",
      "React Native",
      "Next.js (App Router)",
      "Redux",
      "HTML",
      "CSS",
      "Responsive Design",
      "Perf Opt",
    ],
  },
  {
    title: "Backend & Cloud",
    subtitle: "Scalable, resilient systems",
    icon: <Cpu className="h-6 w-6 text-violet-500" />,
    items: [
      "Node.js",
      "GraphQL",
      "REST",
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "AWS",
    ],
  },
  {
    title: "Tooling & Methodologies",
    subtitle: "Ship fast, keep it robust",
    icon: <Code className="h-6 w-6 text-cyan-500" />,
    items: [
      "Git",
      "GitHub",
      "CI/CD",
      "CircleCI",
      "Ansible",
      "Prometheus",
      "Scrum",
      "Cloud Deployment",
    ],
  },
  {
    title: "Languages",
    subtitle: "Communication",
    icon: <Languages className="h-6 w-6 text-emerald-500" />,
    items: [
      "Arabic (Native/Bilingual)",
      "English (Native/Bilingual)",
      "German (B1)",
    ],
  },
];

export const projects = [
  {
    label: "Enterprise",
    title: "Emaar Internal Platforms",
    description:
      "Suite of enterprise apps for 10K+ internal users with Next.js, GraphQL, and React Native for field ops.",
    tech: ["Next.js", "GraphQL", "React", "React Native"],
    live: undefined,
    code: undefined,
    image: "/enterprise-platform-apps.png",
  },
  {
    label: "Integrations",
    title: "Veeva Vault Integrations",
    description:
      "Microservices and APIs integrating Veeva Vault with clinical systems, improving processing by 65%.",
    tech: ["Node.js", "Java", "Spring Boot", "PostgreSQL", "Redis"],
    live: undefined,
    code: undefined,
    image: "/api-integration-microservices.png",
  },
  {
    label: "Immersive",
    title: "AR Restaurant Ads",
    description:
      "QR-based Web AR previews showing 3D menu items/products to boost engagement.",
    tech: ["Three.js", "WebXR"],
    live: undefined,
    code: undefined,
    image: "/webxr-ar-experience.png",
  },
];
