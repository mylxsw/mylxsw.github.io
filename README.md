# Gulu AI website

The company homepage for [gulu.ai](https://gulu.ai), built with React, TypeScript and Vite.

## Develop

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # type-check, build to docs/, and preserve the custom domain
npm run preview   # serve the production build
npm run lint
```

`docs/` is the production static site. GitHub Pages publishes the `main` branch at `/docs` on `https://gulu.ai/`. The build preserves the root `CNAME` (or an explicit `PAGES_CNAME`, `CNAME`, or `VITE_CNAME` environment override) and copies `public/.nojekyll` to disable Jekyll processing.

## Editing content

- **Products:** `src/data/products.ts`. The first product with `featured: true` is the large card. To use a real logo, put the image in `public/logos/` and set `logo: '/logos/<file>.png'`. Without a logo, the card shows the two-letter `monogram`.
- **Navigation, model list, contact email:** `src/data/site.ts`. The contact email preserves the address from the previous live homepage.
- **Colors and fonts:** the tokens at the top of `src/styles/global.css`.

The five product icons in `public/logos/` are restored unchanged from `backup/pre-gulu-ai-2026-10-08:src/assets/`. They were checked against the corresponding product projects, including the current AIdea iOS app icon. These bundled images replace the letter placeholders and do not depend on external image hosts.

## Structure

```
src/
  App.tsx              page sections in order
  data/                products and site content
  components/          one component (and its CSS) per section
  styles/global.css    design tokens and shared styles
```

## Publish and rollback

Use `npm ci`, `npm run lint`, and `npm run build` before committing the source and generated `docs/` files to `main`. The existing `make run`, `make build`, and `make push` commands remain available. GitHub Pages keeps its existing custom domain and publishing source; no DNS or hosting changes are required.

The homepage was imported from [`mylxsw/gulu-ai-website`](https://github.com/mylxsw/gulu-ai-website) at commit `442a81232bacf738f0aade462b908a95a7ea4c1f`. Deployment-only adaptations are the `docs/` output, relative asset base, CNAME build step, `.nojekyll`, the previous contact email, and excluding generated `docs/` assets from lint.

The complete previous source and deployed assets are preserved in [`backup/pre-gulu-ai-2026-10-08`](https://github.com/mylxsw/mylxsw.github.io/tree/backup/pre-gulu-ai-2026-10-08) at commit `294b0f89fecbd256f79fe11a310bc5e636b8d509`. To restore the previous site, revert the migration commit on `main`, push, and verify the resulting GitHub Pages deployment. Do not force-push or change the Pages source to perform a rollback.
