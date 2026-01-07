import { motion } from "framer-motion";
import bgImg from "@/assets/bg.jpg";
import avatarImg from "@/assets/avatar.png";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { siteConfig, socialLinks, externalLinks } from "@/config/links";

export default function Home() {
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
      <main className="relative z-10 container mx-auto px-4 py-20 flex flex-col items-center justify-center min-h-screen max-w-4xl">
        
        {/* Floating Avatar Monolith */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mb-12 group"
        >
          <div className="absolute inset-0 bg-primary/20 blur-[100px] rounded-full animate-pulse-glow" />
          <motion.div 
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-10"
          >
            <img 
              src={avatarImg} 
              alt="Avatar" 
              className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-[0_0_15px_rgba(0,240,255,0.3)]"
            />
          </motion.div>
        </motion.div>

        {/* Identity Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/20 bg-primary/5 text-primary text-xs font-mono mb-2 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            SYSTEM ONLINE
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
            {siteConfig.name}
          </h1>
          <p className="text-muted-foreground font-mono text-sm md:text-base max-w-md mx-auto whitespace-pre-line">
            {siteConfig.title}
            <br />
            {siteConfig.description}
          </p>
        </motion.div>

        {/* Links Grid */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 mb-16 max-w-2xl"
        >
          {externalLinks.map((link, i) => (
            <a 
              key={i} 
              href={link.url}
              className="group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="h-full bg-background/5 border-white/5 hover:border-primary/50 hover:bg-white/5 transition-all duration-300 backdrop-blur-md p-6 flex flex-row items-center gap-4 relative overflow-hidden group-hover:shadow-[0_0_20px_rgba(0,240,255,0.1)]">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="p-3 rounded-md bg-white/5 group-hover:bg-primary/20 text-foreground group-hover:text-primary transition-colors shrink-0">
                  <link.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 text-left">
                  <h3 className="font-bold text-lg leading-none mb-1 group-hover:text-primary transition-colors">{link.title}</h3>
                  <p className="text-xs text-muted-foreground font-mono">{link.desc}</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground/30 group-hover:text-primary/50 transition-colors opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transform duration-300" />
              </Card>
            </a>
          ))}
        </motion.div>

        {/* Social Dock */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4 md:gap-8"
        >
          {socialLinks.map((link, i) => (
            <Button 
              key={i}
              variant="ghost" 
              className="h-auto py-2 px-4 flex flex-col gap-2 hover:bg-transparent transition-all group"
              asChild
            >
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                <div className="p-3 rounded-full border border-white/10 bg-black/40 group-hover:border-primary/50 group-hover:bg-primary/10 group-hover:shadow-[0_0_15px_rgba(0,240,255,0.3)] group-hover:scale-110 transition-all duration-300">
                  <link.icon className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <span className="text-[10px] font-mono text-muted-foreground/50 group-hover:text-primary/80 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300 -translate-y-2 group-hover:translate-y-0">{link.name}</span>
              </a>
            </Button>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.footer 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-4 text-[10px] font-mono text-muted-foreground/20 tracking-[0.2em] uppercase select-none"
        >
          {siteConfig.footerText}
        </motion.footer>

      </main>
    </div>
  );
}
