import { motion } from "framer-motion";
import { Link, useParams } from "wouter";
import { ArrowLeft, Globe, Layers3 } from "lucide-react";
import bgImg from "@/assets/bg.jpg";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getFeaturedProject } from "@/config/links";
import NotFound from "@/pages/NotFound";

type ProjectParams = {
  slug: string;
};

export default function ProjectDetail() {
  const params = useParams<ProjectParams>();
  const project = getFeaturedProject(params.slug);

  if (!project) {
    return <NotFound />;
  }

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

      <main className="relative z-10 container mx-auto px-4 py-12 flex flex-col min-h-screen max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Button variant="ghost" asChild className="group">
            <Link href="/projects">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              <span className="font-mono text-sm">Back to Projects</span>
            </Link>
          </Button>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-4 backdrop-blur-sm">
            <Layers3 className="w-3 h-3" />
            PROJECT DETAIL
          </div>
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-[28px] border border-white/10 bg-black/35 p-2 shadow-[0_0_36px_rgba(0,240,255,0.12)]">
              <img
                src={project.logo}
                alt={`${project.name} logo`}
                className="h-full w-full rounded-[22px] object-cover"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                {project.name}
              </h1>
              <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed">
                {project.desc}
              </p>
            </div>
          </div>
        </motion.section>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6 }}
          className="space-y-6"
        >
          <Card className="bg-background/5 border-white/5 backdrop-blur-md p-6">
            <div className="flex items-center gap-2 text-primary font-mono text-sm mb-3">
              <Globe className="w-4 h-4" />
              Project Address
            </div>
            <a
              href={project.siteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm md:text-base text-muted-foreground hover:text-primary transition-colors"
            >
              {project.siteUrl}
            </a>
          </Card>

          <Card className="bg-background/5 border-white/5 backdrop-blur-md p-6">
            <h2 className="text-primary font-mono text-sm mb-4">Highlights</h2>
            <div className="space-y-3">
              {project.highlights.map((item) => (
                <p key={item} className="text-muted-foreground leading-relaxed">
                  {item}
                </p>
              ))}
            </div>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
