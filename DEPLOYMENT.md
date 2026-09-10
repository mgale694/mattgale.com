# Static deployment

This portfolio uses the same static React/Vite workspace foundation as the photography repository. It needs no backend, database or server-side rendering service.

## Relationship to the photography site

| Concern              | Photography site                                                  | Personal portfolio                                       |
| -------------------- | ----------------------------------------------------------------- | -------------------------------------------------------- |
| Workspace            | `website/apps/web`                                                | `website/apps/web`                                       |
| Tooling              | Bun, Turbo, Vite, React, TypeScript, TanStack Router              | Same existing foundation                                 |
| Production output    | `website/apps/web/dist`                                           | `website/apps/web/dist`                                  |
| Content source       | Photo folders + `meta.json`, assembled by a Vite catalogue plugin | Typed `content/site.ts` and `content/projects.ts`        |
| Public experience    | Cover and archive routes                                          | One page with native section anchors                     |
| Discovery            | Generated archive sitemap                                         | Generated homepage sitemap; blog pages only when enabled |
| Static hosting files | `public/_headers`, `public/_redirects`                            | Same conventions; legacy page redirects added            |
| Domain               | `mattgale-photography.pages.dev`                                            | `matthewgale.co.uk`                                      |

Keep each repository and deployment separate. Share the approach and conventions; a shared component package would add unnecessary coupling to these two small sites.

The photography repository’s deployment document contains an old `matthewgale.co.uk` domain example. That is not evidence of its current live custom-domain configuration. Its code and local metadata catalogue were reviewed; no hosting account or DNS settings were changed.

## Build settings

For a Cloudflare Pages project connected to this repository:

- **Root directory:** `website`
- **Build command:** `bun run build:web`
- **Build output directory:** `apps/web/dist`
- **Custom domain:** `matthewgale.co.uk`
- **Vite base path:** `/`
- **Package manager:** Bun version declared in `website/package.json`
- **Node:** a supported Node 22 environment is suitable for the existing tooling.

Install dependencies before the build. From the root:

```bash
cd website
bun install --frozen-lockfile
bun run build:web
```

No new runtime packages are required. On an environment with the workspace dependencies already installed:

```bash
cd website/apps/web
npm run build
npm run serve -- --port 4173
```

Publish the contents of `dist`, not the repository or the reference images.

## Routing

`public/_redirects` issues permanent redirects for `/about` and `/showcase`, then serves `index.html` as the SPA fallback. The application also handles the legacy redirects, so local development behaves consistently. Static assets are served directly by Cloudflare Pages.

Local blog routes remain guarded in the router. `site.blog.enabled` controls their visibility and sitemap inclusion; the build does not permanently redirect them at the hosting layer, allowing the feature to be restored with one switch and a rebuild.

For another static host, configure the same SPA fallback. GitHub Pages needs an additional 404-based SPA routing solution; one is not included in this personal-site repository. Do not use the old deployment guide’s repository-rename advice.

## Metadata and caching

The sitemap generator runs before every production build and reads the same blog setting as the application. Anchors are not separate sitemap pages. External Atlas research belongs to its own site’s sitemap.

Fonts and their licences ship locally. The CSP permits local fonts, local scripts/styles and HTTPS images, retaining inline allowances needed for theming, React styles and JSON-LD. Hashed Vite assets receive an immutable cache header.

When changing the public identity or domain, update `content/site.ts` and the static fallback metadata / JSON-LD in `index.html`. Also update `public/robots.txt`. The static metadata deliberately works before the application loads.

## Release review

Preview the build and review the homepage, legacy page URLs, a disabled blog URL, mobile navigation, external research links and the CV print view. No tests were added or run as part of this refactor.

This work prepares the site locally. Publishing, Cloudflare project configuration and DNS changes have not been performed.
