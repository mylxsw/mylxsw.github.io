import { Github, XIcon, Youtube, Terminal, Code, Mail, Bitcoin, Lightbulb, User } from "lucide-react";

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
    title: "Blog", 
    desc: "Thoughts on code & life", 
    icon: Terminal, 
    url: "https://aicode.cc" 
  },
  { 
    title: "Projects", 
    desc: "Open source contributions", 
    icon: Code, 
    url: "https://github.com/mylxsw" 
  },
  { 
    title: "Web3", 
    desc: "Exploring decentralized technologies", 
    icon: Bitcoin, 
    url: "https://wy.is" 
  },
  {
    title: "AIdea",
    desc: "My first AI Project",
    icon: Lightbulb,
    url: "https://aidea.aicode.cc"
  }
];

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
