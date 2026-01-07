import { Github, XIcon, Youtube, Terminal, Code,  Mail, Bitcoin, Lightbulb } from "lucide-react";

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
