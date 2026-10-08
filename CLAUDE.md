# CLAUDE.md

Repository guidance for Claude Code.

## Project Overview

Gulu AI company homepage, a static React 19 + TypeScript 6 + Vite 8 website. The source was imported from `mylxsw/gulu-ai-website`; this repository retains the existing GitHub Pages deployment for `gulu.ai`.

## Commands

- `npm ci`: install the locked dependencies.
- `npm run dev` or `make run`: start the development server.
- `npm run lint`: run Oxlint.
- `npm run build` or `make build`: type-check, build to `docs/`, and preserve the custom domain.
- `npm run preview`: serve the production build.
- `make push`: build, commit the generated site, and push.

## Structure

- `src/App.tsx`: ordered homepage sections.
- `src/components/`: React sections with their colocated CSS.
- `src/data/products.ts`: product descriptions, URLs, highlights, and optional logos.
- `src/data/site.ts`: navigation, model providers, and the existing contact email.
- `src/styles/global.css`: design tokens and shared styles.
- `public/`: favicon, optional logos, and `.nojekyll`.

## Deployment Requirements

GitHub Pages publishes `main:/docs`. Keep `vite.config.ts` output set to `docs/`, retain the root `CNAME` (`gulu.ai`), and keep `scripts/ensure-cname.mjs` in the build command. The script also supports explicit `PAGES_CNAME`, `CNAME`, and `VITE_CNAME` overrides. Generated `docs/` files are versioned and must be committed with source changes. Do not change DNS, Pages publishing source, or the custom domain as part of routine code updates.

Run lint and build, verify deployed asset responses and the rendered live page, and confirm the GitHub Pages deployment belongs to the pushed commit. The old homepage is preserved on `backup/pre-gulu-ai-2026-10-08`; see README.md for rollback.
