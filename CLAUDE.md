# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal Link Hub - A one-page personal navigation center with dark, geeky aesthetic. Built with React 19, TypeScript, Vite, and Tailwind CSS.

## Essential Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production (outputs to docs/)
npm run lint         # Run ESLint
npm run preview      # Preview production build

# Deployment workflow
make run             # Start dev server
make build           # Build project
make push            # Build, commit "publish", and push to git
```

## Architecture & Key Patterns

### Tech Stack
- **React 19** with TypeScript (strict mode disabled)
- **Vite** build tool with custom Babel plugin for AI debugging
- **Tailwind CSS 4** for styling with custom animations
- **wouter** for hash-based routing (supports file:// protocol)
- **shadcn/ui** components (New York style)
- **Framer Motion** for animations

### Project Structure
```
src/
├── components/        # React components (ui/ for shadcn components)
├── pages/            # Route components (Home.tsx, NotFound.tsx)
├── config/           # Configuration (links.ts for all site links)
├── contexts/         # React contexts (ThemeContext for dark mode)
├── hooks/            # Custom React hooks
└── lib/              # Utility functions
```

### Key Configuration Files
- **vite.config.ts**: Build output to `docs/`, custom Babel plugin adds `data-source` attributes
- **tsconfig.json**: Path alias `@/*` maps to `./src/*`
- **src/index.css**: Custom animations (float, pulse-glow) and dark theme color palette using oklch
- **components.json**: shadcn/ui config (New York style, lucide icons)

### Development Patterns
1. **Dark Theme Only**: Forces dark mode, no light mode support
2. **Hash Routing**: All routes use `/#/` prefix for file:// protocol compatibility
3. **Link Configuration**: All external links defined in `src/config/links.ts`
4. **AI Debugging**: Custom Babel plugin injects source location data attributes

### Deployment
- GitHub Pages deployment via `docs/` directory
- CNAME file (`gulu.ai`) copied to docs/ during build via `scripts/ensure-cname.mjs`
- Can override domain via `PAGES_CNAME`, `CNAME`, or `VITE_CNAME` env vars