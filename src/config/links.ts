import { Github, XIcon, Youtube, Terminal, Code, Mail, Bitcoin, Mic, User } from "lucide-react";
import nowCoinerLogo from "@/assets/now-coiner.png";
import aIdeaLogo from "@/assets/aidea.png";
import ployS3Logo from "@/assets/ploys3.png";
import typefluxLogo from "@/assets/typeflux.png";
import squirrelLogo from "@/assets/squirrel.png";

export type FeaturedProject = {
  slug: string;
  name: string;
  desc: string;
  siteUrl: string;
  moreUrl: string;
  highlights: string[];
  logo: string;
};

export const siteConfig = {
  name: "mylxsw",
  title: "Programmer, Architect, Freelancer",
  description: "AI-driven dev & aspiring architect building open-source impact",
  avatar: "/assets/avatar.png", // Path relative to public or src/assets import
  footerText: "© 2026 mylxsw. All rights reserved.",
};

export const socialLinks = [
  { 
    name: "GitHub", 
    icon: Github, 
    url: "https://github.com/mylxsw", 
    label: "@mylxsw" 
  },
  { 
    name: "X", 
    icon: XIcon, 
    url: "https://x.com/mylxsw", 
    label: "@mylxsw" 
  },
  { 
    name: "YouTube", 
    icon: Youtube, 
    url: "https://www.youtube.com/@mylxsw", 
    label: "Channel" 
  },
  {
    name: "Email",
    icon: Mail,
    url: "mailto:mylxsw@aicode.cc",
    label: "Contact Me"
  }
];

export const externalLinks = [
  { 
    title: "Projects", 
    desc: "Open source contributions", 
    icon: Code, 
    url: "/projects" 
  },
  {
    title: "Typeflux",
    desc: "Voice assistant",
    icon: Mic,
    url: "https://typeflux.gulu.ai"
  },
  { 
    title: "Blog", 
    desc: "Thoughts on code & life", 
    icon: Terminal, 
    url: "https://aicode.cc" 
  },
  { 
    title: "Web3", 
    desc: "Exploring decentralized technologies", 
    icon: Bitcoin, 
    url: "https://wy.is" 
  }
];

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "nowcoiner",
    name: "NowCoiner",
    desc: "NowCoiner is a macOS menubar crypto tracker: configurable multi-coin ticker, pin/unpin, drag-to-reorder, and a rich detail view with market data — fast, clean, and distraction-free.",
    siteUrl: "https://now-coiner.gulu.ai",
    moreUrl: "https://now-coiner.gulu.ai",
    logo: nowCoinerLogo,
    highlights: [
      "macOS menubar experience for at-a-glance crypto tracking",
      "Configurable multi-coin ticker with pin, unpin, and drag-to-reorder",
      "Rich market detail view designed to stay fast and distraction-free",
    ],
  },
  {
    slug: "aidea",
    name: "AIdea",
    desc: "An APP that integrates mainstream large language models and image generation models, built with Flutter, with fully open-source code.",
    siteUrl: "https://ai.aicode.cc",
    moreUrl: "https://ai.aicode.cc",
    logo: aIdeaLogo,
    highlights: [
      "Integrates mainstream LLMs and image generation models in one app",
      "Built with Flutter for a consistent cross-platform experience",
      "Fully open-source and centered on practical AI workflows",
    ],
  },
  {
    slug: "ploys3",
    name: "PloyS3",
    desc: "A cross-platform, S3-compatible file manager. Browse, upload, and manage your files through a unified interface",
    siteUrl: "https://ploys3.gulu.ai",
    moreUrl: "https://ploys3.gulu.ai",
    logo: ployS3Logo,
    highlights: [
      "Cross-platform desktop experience for object storage workflows",
      "Works with S3-compatible services through one unified interface",
      "Built for browsing, uploading, and managing files efficiently",
    ],
  },
  {
    slug: "typeflux",
    name: "Typeflux",
    desc: "Typeflux delivers lightning-fast, accurate voice-to-text directly into any application. Best of all, it's free, open-source, and supports local models.",
    siteUrl: "https://typeflux.gulu.ai",
    moreUrl: "https://typeflux.gulu.ai",
    logo: typefluxLogo,
    highlights: [
      "Voice-to-text that works directly inside any application",
      "Fast transcription with an emphasis on accuracy",
      "Free, open-source, and supports local models",
    ],
  },
  {
    slug: "squirrel",
    name: "Squirrel",
    desc: "Squirrel is a high-performance, production-ready LLM gateway and proxy. OpenAI/Anthropic compatible, with protocol conversion, rule-based routing, failover, cost analytics, and a modern admin dashboard.",
    siteUrl: "https://squirrel.gulu.ai",
    moreUrl: "https://squirrel.gulu.ai",
    logo: squirrelLogo,
    highlights: [
      "High-performance LLM gateway and proxy for production environments",
      "OpenAI and Anthropic compatible with protocol conversion support",
      "Includes rule-based routing, failover, cost analytics, and a modern admin dashboard",
    ],
  },
];

export function getFeaturedProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export const aboutConfig = {
  title: "About Me",
  bio: [
    {
      text: "I am a passionate programming enthusiast, independent developer, and software architect with a strong interest in artificial intelligence. In my spare time, I developed an AI-powered chat application that integrates various mainstream language models, called AIdea. This project is open-source and available on GitHub.",
      links: [
        { text: "AIdea", url: "https://github.com/mylxsw/aidea" }
      ]
    },
    {
      text: "I am driven by a desire to explore cutting-edge technologies and apply them effectively in real-world projects. I firmly believe that technological innovation has the power to spark industry transformation and make a profound impact on both industry development and societal progress. My career goal is to become an exceptional software architect, leading teams to create high-quality, efficient software systems that continuously advance the industry.",
      links: []
    }
  ],
  skills: [
    { category: "Languages", items: ["Go", "Python", "PHP", "Java", "JavaScript", "Dart (Flutter)"] },
    { category: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis", "Elasticsearch", "ClickHouse"] },
    { category: "Platforms", items: ["Linux (CentOS & Ubuntu)", "Docker", "Kubernetes"] },
    { category: "DevOps Tools", items: ["Jenkins", "GitHub Actions", "Prometheus", "Grafana"] }
  ],
  projects: [
    { name: "AIdea", desc: "Open-source AI Chat and Drawing App", stars: "6.4K+", url: "https://github.com/mylxsw/aidea", demo: "https://ai.aicode.cc/" },
    { name: "Wizard", desc: "Open-source Document Management System", stars: "2.1K+", url: "https://github.com/mylxsw/wizard" },
    { name: "Growing Up", desc: "Programmer Growth Plan", stars: "2.3K+", url: "https://github.com/mylxsw/growing-up" },
    { name: "Adanos Alert", desc: "Unified Monitoring and Alerting Platform", url: "https://github.com/mylxsw/adanos-alert" },
    { name: "Glacier", desc: "Go Application Development Framework", url: "https://github.com/mylxsw/glacier" }
  ],
  icon: User
};
