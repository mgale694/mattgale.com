# Portfolio review and refactor notes

## Inputs reviewed

All five source images were opened and inspected:

- `reference/hero banner.png`: dark opening, strong name and role, red points within a fine line field.
- `reference/about.png`: paper surface, assertive introduction, divided skills. The engineering assembly drawing was excluded as requested.
- `reference/contact.png`: large “Say hello”, direct contact rows and restrained linework.
- `reference/references.png`: ink/paper/red palette, grid, typography and motion language.
- `reference/Whole site reference.png`: the overall hero → about → work → contact sequence, including the compact project list.

The live [wodniack.dev](https://wodniack.dev/) reference was reviewed in a browser. Its clear section sequence, typographic scale, bordered navigation and purposeful motion informed the composition. Its biography, claims, diagrams and content were not adopted.

Reference artwork is treated as design material. The user’s request takes precedence, including the absence of technical engineering diagrams and the instruction to add or run no tests.

## Before

- Four separate routes divided the introduction, CV, projects and blog.
- The homepage was a centred introduction followed by three rounded navigation cards.
- A full-window particle network sat behind unrelated page content.
- Typography relied on generic sans-serif fallbacks; most content was framed as UI cards.
- Contact addresses differed between the homepage, About and footer.
- The photography showcase used an older Pages URL.
- The “Cure” project had Rust tags and a link to Repogen despite describing a Java game.
- Metadata advertised a blog, referenced missing icon/social-image files, and the sitemap build step was disabled.
- Deployment documentation described a GitHub Actions workflow not present in the repository.

## Implemented direction

A full visual overhaul with the existing React/Vite/Bun foundation retained. Design dials: variance 6, motion 4, density 3. The supplied references determine the palette, alternating section tones, numbered section labels and ruled rows.

Barlow Condensed Black provides the very compressed, heavy display shape shown in the artwork; Archivo carries readable body text and IBM Plex Mono supplies small labels. This is an implementation of the artwork’s typographic character, not an assertion that its rendered display face was Archivo.

The default ink hero flows into paper About/CV, ink Work and paper Contact. A persistent appearance control provides an all-paper option. Colours, spacing and shared component rules are centralised.

- The hero introduces Matthew and quantitative development immediately.
- About contains a concise positioning statement, practical skills, an expandable CV and the external photography link.
- Career dates and qualifications follow the original About page, not illustrative dates in the reference image.
- Six selected projects remain easy to scan; additional existing projects are available in a disclosure.
- Project details use real source/project links, or clearly explain private/archived status.
- Atlas research uses the development URL supplied during the task.
- Contact uses the existing site-domain email consistently. GitHub and LinkedIn come from the previous site; no YouTube URL was invented.
- The blog is disabled through a documented shared setting. Existing content is retained for restoration.

## Implementation boundaries

No diagram library, animation framework or shared monorepo package was added. Deterministic canvas line studies are abstract decoration, not live financial data. React state changes on discrete UI interactions; continuous drawing stays inside a bounded canvas lifecycle.

The work preserves Markdown blog implementation and general UI primitives for a future blog return. They are documented separately in the component catalogue. The old particle background and obsolete theme-menu component were retired.

See [COMPONENTS.md](../COMPONENTS.md) for component contracts and [DEPLOYMENT.md](../DEPLOYMENT.md) for the photography setup comparison.

## Continued exhibition and interaction work

The existing hero, About/CV, contact, routing and palette were retained. Featured Work now uses a sticky horizontal exhibition driven by native vertical scroll. It has varied composition sizes, overlapping pieces, a keyboard skip link, modal project details and a normal vertical fallback for reduced motion, paused motion, short viewports and unsupported browsers. There is no draggable carousel or scroll interception.

The hero's signal point is now the exact shared point of every strand and follows fine pointers across the hero. Name letters roll individually in randomly selected up/down/left/right directions, with a matching replacement entering from the opposite side. The whole-page appearance wipe reveals light right-to-left and editorial dark left-to-right.

Actual site screenshots were captured on 10 September 2026:

- `public/showcase/atlas-homepage.webp`: Atlas's supplied development site, https://atlas-website-6cn.pages.dev/.
- `public/showcase/photography-homepage.webp`: the current local photography app, served from the existing `mattgale.photography` repo. The production domain did not resolve during capture. The screenshot is a development preview, not evidence of deployment.
- `tokyo-temple.webp` and `tokyo-pagoda.webp`: existing user-owned Nikon F3 photographs from the photography archive's February 2025 Tokyo collection.

Project previews are intentionally presented on their own. The photography homepage no longer has a separate film photograph layered beside it.

The desktop header groups GitHub above LinkedIn in a divided vertical cell, followed by the appearance control. The compact header continues to hide those social controls rather than compressing them below a usable size.

No application demo recordings were found in the local trading-engine or flight-tracker repositories. Their abstract covers remain. The typed media contract supports replacing covers with screenshots, GIFs with still posters, or MP4/WebM recordings. No third-party playback library is needed.

Validation is limited to TypeScript compilation, the production build and manual browser inspection. No tests were added, written or run.

Final browser review covered desktop and 390px phone layouts, a shorter desktop viewport, pin/travel/release geometry, keyboard project traversal, modal dismissal/focus return, the exact Atlas research destination, the paused/reduced-motion vertical fallback, directional theme wipes and the CV print layout. The production preview reported no console errors or warnings. TypeScript compilation and the production build completed successfully.
