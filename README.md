# Portfolio

My portfolio as a Senior Frontend Developer since 2008. A single page where scrolling moves through time: from 2008 to today, the page restyles itself to match each era of frontend development, from table layouts and glossy buttons to container queries and view transitions.

## Structure

A monorepo (npm workspaces + Turborepo). Each part of the page is its own package, developed and tested in isolation in Storybook.

| Path                | Package                | What it is                                                                   |
| ------------------- | ---------------------- | ---------------------------------------------------------------------------- |
| `apps/web`          | `@portfolio/web`       | The site: Next.js (App Router), exported as static HTML                      |
| `apps/storybook`    | `@portfolio/storybook` | Storybook for every package                                                  |
| `packages/ui`       | `@portfolio/ui`        | Custom component library on top of Material UI, with a theme for each era    |
| `packages/devices`  | `@portfolio/devices`   | Monitor, tablet, phone and browser replicas, with screens at real resolution |
| `packages/backdrop` | `@portfolio/backdrop`  | The faint background: the era's code style and a picture of the year         |
| `packages/timeline` | `@portfolio/timeline`  | Scroll through time on desktop, slideshow on mobile, on the same markup      |
| `packages/eras`     | `@portfolio/eras`      | Era data: years, career, stack, devices and code snippets                    |
| `packages/scene`    | `@portfolio/scene`     | One era put together: devices, era panel and background                      |

## Getting started

Requires Node 22 (see `.nvmrc`).

```bash
npm install
npm run dev         # the site, on http://localhost:3000
npm run storybook   # Storybook, on http://localhost:6006
npm run build       # static site in apps/web/out, Storybook in apps/storybook/storybook-static
npm run typecheck
```
