# Matthew Gale

An editorial one-page portfolio for quantitative development, independent projects and a little personal background.

The site follows **Introduction → About / CV → Selected work → Contact**, using the five images in `docs/reference/` and [wodniack.dev](https://wodniack.dev/) as visual and flow references. Abstract line studies give a quiet nod to financial modelling.

## Run locally

The project keeps the same React 19, TypeScript, Vite, TanStack Router, Tailwind 4 and Bun/Turbo workspace foundation as `mattgale-photography.pages.dev`.

```bash
cd website
bun install
bun run dev:web
```

The normal development port is 3001. To run both portfolios together, use port 3002 for this one:

```bash
cd website/apps/web
npm run dev -- --port 3002
```

With dependencies already installed, npm also runs the app scripts directly.

## Content and configuration

| Edit                                                                | File                                             |
| ------------------------------------------------------------------- | ------------------------------------------------ |
| Name, contact details, social links, photography URL, blog settings | `website/apps/web/src/content/site.ts`           |
| Work experience and skills                                          | `website/apps/web/src/content/site.ts`           |
| Project order, descriptions, technologies, links and featured state | `website/apps/web/src/content/projects.ts`       |
| Typography, palette, layout and responsive rules                    | `website/apps/web/src/index.css`                 |
| Reusable component contracts                                        | [COMPONENTS.md](COMPONENTS.md)                   |
| Review findings and design decisions                                | [docs/REFACTOR_NOTES.md](docs/REFACTOR_NOTES.md) |
| Static hosting and photography-site comparison                      | [DEPLOYMENT.md](DEPLOYMENT.md)                   |

Featured projects form a horizontal exhibition controlled by normal vertical scrolling. Click a composition to open its details, preview and real links. Projects marked `featured: false` appear as expandable rows under “More experiments”. Private work is labelled and has no pretend demo link.

To add real project media, place it in `website/apps/web/public/showcase/` and set `preview` in the project record:

```ts
preview: {
  type: "image",
  src: "/showcase/project-homepage.webp",
  alt: "Describe the actual screen shown",
  width: 1440,
  height: 1000,
}
```

For a short silent recording, use `type: "video"`, an MP4/WebM source and a `poster` path to a still image. `type: "gif"` also requires a still `poster`. Prefer compressed videos over large GIFs. Previews respect visibility, reduced motion and the page's pause control; the project dialog exposes native video controls. Atlas and photography already have actual homepage captures. Capture provenance is recorded in `docs/REFACTOR_NOTES.md`.

The CV opens within About. “Print / save CV” uses the browser’s print dialog and a dedicated CV print layout. Career dates and qualifications come from the previous About page.

## Writing and the optional local blog

The local blog is disabled by default:

```ts
blog: {
  enabled: false,
  externalUrl: "https://atlas-website-6cn.pages.dev/research/",
}
```

The external URL is deliberately the development destination supplied for this refactor. Change it here when Atlas moves to its production domain. A project’s `articleSlug` is appended to that base:

```ts
articleSlug: "mapping-macro-regimes-without-false-precision";
```

Set `enabled: true` and rebuild to restore the Blog navigation link, local routes and sitemap entries. Existing Markdown and blog components are retained. This switch controls publishing/navigation, not access to confidential content: do not put private material in the repository or public assets.

The existing blog uses the Markdown filename without its extension as the post ID; use unique filenames. The current `2025-08-24/index.md` resolves to `/blog/index` when enabled. Post assets live under `public/blog/`.

## Build

```bash
cd website
bun run build:web
```

Or, with installed dependencies:

```bash
cd website/apps/web
npm run build
```

Both regenerate the public sitemap and output the static site to `website/apps/web/dist`. `npm run serve -- --port 4173` previews the production output. The build has no test step.

## Routes

- `/` contains `#home`, `#about`, `#cv`, `#work` and `#contact`.
- `/about` redirects to `/#about`.
- `/showcase` redirects to `/#work`.
- Disabled local blog requests redirect to `/#work`.
- Unrecognised routes show a return-to-portfolio screen.

## Design and accessibility

Fonts are self-hosted with their open-source licences. The default editorial appearance alternates ink and paper sections; the contrast control switches to an all-paper appearance and remembers the choice. The whole-page transition reveals light from right to left and the editorial appearance from left to right, with an immediate reduced-motion fallback.

Vertical scroll also drives masked heading reveals, hero depth, the horizontal Work exhibition, project-row entry and a page-progress rail. Name letters occasionally roll up, down, left or right. The hero's red convergence point follows the pointer. Navigation uses native smooth scrolling with normal URL hashes and browser history. A mobile menu supports Escape and visible keyboard focus. Motion pauses off-screen and in hidden tabs, respects reduced motion, and has a page-wide pause control. Work becomes a vertical exhibition when motion is paused or reduced, on short screens, or without native scroll-timeline support.

No tests were added or run for this refactor, as requested.
