import { motion } from "framer-motion";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, ExternalLink, FolderOpen } from "lucide-react";
import bgImg from "@/assets/bg.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { featuredProjects, siteConfig } from "@/config/links";

export default function Projects() {
  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-background text-foreground flex flex-col">
      <div
        className="fixed inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "contrast(1.2) brightness(0.8)",
        }}
      />
      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/80 via-background/90 to-background pointer-events-none" />
      <div
        className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col min-h-screen max-w-5xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm">Back to Home</span>
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-10 text-center md:text-left"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4 backdrop-blur-sm">
            <FolderOpen className="w-3 h-3" />
            PROJECTS
          </div>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            Selected Work
          </h1>
          <p className="mt-3 text-muted-foreground font-mono text-sm md:text-base max-w-2xl">
            A few products from {siteConfig.name}. Open any project to read the in-site details first, then continue to the live page when you want to explore more.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {featuredProjects.map((project, index) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.08, duration: 0.5 }}
            >
              <Link href={`/projects/${project.slug}`} className="group block h-full">
                <Card className="h-full bg-background/5 border-white/5 hover:border-primary/40 hover:bg-white/5 transition-all duration-300 backdrop-blur-md p-6 group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[18px] border border-white/10 bg-black/30 p-1.5 shadow-[0_0_24px_rgba(0,240,255,0.08)]">
                        <img
                          src={project.logo}
                          alt={`${project.name} logo`}
                          className="h-full w-full rounded-[14px] object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold group-hover:text-primary transition-colors">
                          {project.name}
                        </h2>
                        <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                          {project.desc}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground/40 group-hover:text-primary transition-colors shrink-0 mt-1" />
                  </div>
                  <div className="space-y-2">
                    {project.highlights.slice(0, 2).map((item) => (
                      <p key={item} className="text-xs font-mono text-muted-foreground/80">
                        {item}
                      </p>
                    ))}
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="pt-8 flex justify-center"
        >
          <Button asChild size="lg">
            <a href="https://github.com/mylxsw" target="_blank" rel="noopener noreferrer">
              View More Projects
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </motion.div>
      </main>
    </div>
  );
}
