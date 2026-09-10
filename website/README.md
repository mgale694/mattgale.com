# Website workspace

The web application is in `apps/web`. Its content, component catalogue and hosting notes are documented in the [repository README](../README.md), [COMPONENTS.md](../COMPONENTS.md) and [DEPLOYMENT.md](../DEPLOYMENT.md).

```bash
bun install
bun run dev:web
bun run build:web
```

Production output: `apps/web/dist`.

The photography site uses the same workspace structure. Run this application on port 3002 when the photography development server occupies port 3001:

```bash
cd apps/web
npm run dev -- --port 3002
```
