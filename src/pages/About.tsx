import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, Star, ExternalLink, Github } from "lucide-react";
import bgImg from "@/assets/bg.jpg";
import avatarImg from "@/assets/avatar.png";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig, aboutConfig } from "@/config/links";

function renderTextWithLinks(text: string, links: { text: string; url: string }[]): ReactNode {
  if (!links || links.length === 0) return text;

  let result: ReactNode[] = [text];

  links.forEach((link, linkIndex) => {
    result = result.flatMap((part) => {
      if (typeof part !== 'string') return part;
      const parts = part.split(link.text);
      if (parts.length === 1) return part;

      const elements: ReactNode[] = [];
      parts.forEach((p, i) => {
        if (i > 0) {
          elements.push(
            <a
              key={`${linkIndex}-${i}`}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              {link.text}
            </a>
          );
        }
        if (p) elements.push(p);
      });
      return elements;
    });
  });

  return result;
}

export default function About() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background text-foreground flex flex-col">
      {/* Background Layer */}
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'contrast(1.2) brightness(0.8)',
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />

      {/* Grid overlay for Geek feel */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Main Content */}
      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center min-h-screen max-w-4xl">

        {/* Back Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="self-start mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm">Back to Home</span>
            </Link>
          </Button>
        </motion.div>

        {/* Header with Avatar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row items-center gap-8 mb-12"
        >
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full" />
            <img
              src={avatarImg}
              alt="Avatar"
              className="relative z-10 w-32 h-32 md:w-40 md:h-40 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            />
          </div>
          <div className="text-center md:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-3 backdrop-blur-sm">
              <aboutConfig.icon className="w-3 h-3" />
              {aboutConfig.title.toUpperCase()}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50 mb-2">
              {siteConfig.name}
            </h1>
            <p className="text-muted-foreground font-mono text-sm">
              {siteConfig.title}
            </p>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="w-full mb-12"
        >
          <Card className="bg-background/5 border-white/5 backdrop-blur-md p-8">
            <div className="space-y-4">
              {aboutConfig.bio.map((paragraph, i) => (
                <p key={i} className="text-muted-foreground leading-relaxed">
                  {renderTextWithLinks(paragraph.text, paragraph.links)}
                </p>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="w-full mb-12"
        >
          <h2 className="text-xl font-bold mb-6 text-center font-mono text-muted-foreground">
            {"< Skills />"}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {aboutConfig.skills.map((skill, i) => (
              <motion.div
                key={skill.category}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-background/5 border-white/5 hover:border-primary/30 backdrop-blur-md p-6 transition-colors">
                  <h3 className="text-primary font-mono text-sm mb-3">{skill.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="px-3 py-1 rounded-full bg-white/5 text-muted-foreground text-xs font-mono border border-white/10 hover:border-primary/30 hover:text-primary transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full"
        >
          <h2 className="text-xl font-bold mb-6 text-center font-mono text-muted-foreground">
            {"< Projects />"}
          </h2>
          <div className="space-y-4">
            {aboutConfig.projects.map((project, i) => (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + i * 0.1, duration: 0.5 }}
              >
                <Card className="bg-background/5 border-white/5 hover:border-primary/30 backdrop-blur-md p-5 transition-all group">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-1">
                        <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {project.name}
                        </h3>
                        {project.stars && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-500 text-xs font-mono">
                            <Star className="w-3 h-3" />
                            {project.stars}
                          </span>
                        )}
                      </div>
                      <p className="text-muted-foreground text-sm">{project.desc}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 rounded-md bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-md bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
                        title="View on GitHub"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.5 }}
              className="text-center pt-4"
            >
              <a
                href="https://github.com/mylxsw"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary text-sm font-mono transition-colors"
              >
                <Github className="w-4 h-4" />
                View more on GitHub
                <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-16 text-[10px] font-mono text-muted-foreground/20 tracking-[0.2em] uppercase select-none"
        >
          {siteConfig.footerText}
        </motion.footer>

      </main>
    </div>
  );
}
