# Concept

A single-page portfolio where scrolling moves through time, from 2008 to 2026. The page restyles itself to match each era of frontend development, and each era is tied to what I was working on at the time (see Resume.pdf, kept locally and not committed).

## Layout of each era

- **Left: a fake monitor** of the era with a browser replica of the era as its frame (see below). Inside it, a website in the style of the era, ideally a recreation of the project or company I worked on then.
  - The monitor's shape follows the screens of the time: 4:3 / 5:4 → 16:10 → 16:9 → ultrawide.
  - **Max height for the devices (decided):** the devices are capped by height as well as width, so a 5:4 monitor is no taller than a 16:9 one and doesn't push the layout around. The cap is a **fixed size (default 520px)**, not tied to the window height; only in a window too short to show it do the devices shrink to fit. Adjustable in the Playground ("Devices max height").
  - **Fixed width made visible (decided):** in the Web 2.0 era the monitor is a 1280×1024 5:4 LCD (the common office screen of 2008), so the 960px site leaves wide margins, and the page around it gets a typical gradient background, with the site on a white page with a shadow.
  - **Monitor design tied to the era (decided):** each era has a typical monitor model, not just a size: silver 5:4 LCD with green power light (2008) → piano-black glossy widescreen on a round stand (2010) → matte black Full HD (2012) → slim bezel with aluminum chin (2014) → three-side frameless (2017) → curved gaming ultrawide on red-accent V legs (2020) → thin uniform bezel with silver stand (2023). Generic designs, no brands. The model sets the look and the aspect ratio.
  - **Browser versions by year (decided):** not just a brand per era but the real version of the time, with its defining traits (title bar, menu bar, tab position and shape, glossy or flat buttons, colors; dark theme from 2018 on):
    - Internet Explorer → Edge: IE6 (2001), IE7 (2006), IE9 (2011), IE11 (2013), Edge (2015), Edge Chromium (2020)
    - Firefox: 3 (2008), 4 with the orange button (2011), Australis (2014), Quantum (2017), Proton (2021)
    - Chrome: 2008, 2013, 2016, 2018 refresh, 2023 refresh
    - Safari: 3 (2007), 8 (2014), 15 (2021), 26 glass (2025)
  - **Browser tied to the era (decided):** each era uses the **most used brand of the time** (global desktop share), in the version current in the era's **final year** (the final frame). Internet Explorer for 2008–2011 (Chrome passed it in mid-2012), Chrome from 2012 on: IE7 → IE9 → Chrome 2013 → Chrome 2016 → Chrome 2018 → Chrome 2018 (dark) → Chrome 2023. No browser override in the Playground.
  - The browser frame renders inside the scaled screen, so it is to scale with the site (a 2008 toolbar is real 2008 size next to a 1024px page).
  - Devices join when they existed: a phone (iPhone era on), then a tablet (iPad, 2010 on), each showing the version of the same site for that device (a zoomed-out desktop site before responsive design, a responsive one after).
- **Right: the era panel**
  - What I was working on: the company or project, plus a short explanation of its business field.
  - Tech stack for what I was using then. **Logos by default (decided)**, from Simple Icons (CC0), each in its brand color (switching to the text color when the brand color would vanish on the background). Three display options: `icons` (logo, name as tooltip and accessible label), `tags` (names), `both` (logo inside the tag). Technologies without a logo in the set (AngularJS, SharePoint, Kendo UI, JavascriptMVC) get a lettered badge.
  - Short text on the frontend trends of the moment.
  - **Contact Me button, always visible**, restyled per era (glossy gel button → flat → Material raised with ripple → ghost → neumorphic → glass). It shows one real element evolving outside the fake devices. It always works and keeps the same accessible name and good contrast in every style.
- **Background, decorative at low opacity:**
  - A code snippet in the coding style of the era (tables for layout → divs and floats → flexbox → grid → components → ...).
    - **Colored like VS Code (decided):** highlighted with Shiki, which uses VS Code's grammars and themes: *Light+* on a light background, *Dark+* on a dark one, following the page side the code sits on (with the split page it is on the dark side, so Dark+). Both versions are prepared at build time, so no highlighter ships to the browser.
    - **Placed behind the right-hand panel (decided):** behind the monitor it was hidden. Opacity 0.25 on desktop, 60% of that on mobile, where it sits right behind the text. Tilted by **−6°** and slightly bigger (1.2rem) by default; incline and size are adjustable (Storybook controls "Code incline" and "Code size"). Other placements (`left`, `top-left`, `bottom-left`, `bottom-center`, `top-right`, `full`) stay available as an option in Storybook.
  - An image that places the visitor in the year (e.g. 2020: a face mask or the virus particle).

## Theme

**Changed (decided):** the page around the devices no longer takes the era's colors. A light page in the old eras was confusing next to the text on the right. Now there are two layers:
- **Page theme** (`createPageTheme`): neutral, the same in every era, in **light or dark mode**. Covers the page background, the era panel text and the background code (Light+ / Dark+ follow the page mode). Default is the split page below; a light/dark/split toggle for visitors may come later.
- **Era theme** (`createEraTheme`): only what evolves, the sites inside the monitor, tablet and phone, and the Contact Me button.

**Split page (decided, default):** the devices read best on a light background, the text on a dark one. So the page is split: **light behind the devices, dark behind the text and the background code**. The split follows the layout: vertical between the two columns on wide screens (anchored to the text column, so it stays in the same place in every era), horizontal (devices above, text below) on small ones. Light and dark stay available as options (`pageMode: 'split' | 'light' | 'dark'`).

Replaces the earlier idea of the base color going from light to dark around 2019–2020. The light-to-dark story can still be told inside the devices, where the era sites switch to dark mode in the 2020s.

## Static version of each era

"Static" means **the final frame of each era**: the same content as the animated version (devices with the mini-site, the era panel, Contact Me, the background code and image), shown in its end state with no animations. The only difference between the versions is **how you move from one era to the next**.

- The HTML is simply a list of era sections, each rendered in its final frame. It works without JavaScript, can be indexed by search engines, and is accessible.
- On desktop, the scroll-through-time experience is built on top: it pins the eras and animates from one era's final frame to the next one's (each final frame is a "keyframe").
- With `prefers-reduced-motion`, the same final frames are shown with crossfades.

## Mobile version

- Same eras, same content, each shown as its final frame. No scroll-driven animations and no morphs.
- Moving between eras is a normal slideshow: left/right arrows plus swipe, one era per slide.
- Built on CSS scroll-snap, with the newer CSS carousel features (`::scroll-button`, `::scroll-marker`) as progressive enhancement where supported.
- The era layout has to be adapted to a phone screen (see "Open questions").

## Transitions between eras (desktop)

Goal: where possible, elements morph into their next-era version instead of being swapped out. Three kinds of change:

1. **Values that can change smoothly follow the scroll:** monitor aspect ratio, bezel thickness and color, browser frame dimensions and radius, theme colors, font size, background opacity. (Monitor and browser designs that differ in structure, like the stand shape or the tab position, crossfade or morph as in point 2.) Driven by scroll position (`@property` + CSS scroll-driven animations, with an IntersectionObserver fallback), and reversible.
2. **Elements present in both eras morph:** every era's mini-site shares one skeleton (header, nav, hero, content blocks, footer), and each era restyles it, CSS Zen Garden style. Shared elements (nav, hero, logo, browser toolbar, tabs, Contact Me button) get a `view-transition-name` and morph with the View Transitions API.
   - The visible site uses the shared skeleton; the **background code shows the real markup of each era** (e.g. `<table>` layouts in 2008), so the code tells the honest story.
3. **Code background animates its changes:** tokens slide out/in/move between snippets (`shiki-magic-move`), e.g. `float` + clearfix → `display: flex` → `display: grid` → a React component.

Timing: continuous values (1) follow the scroll; structural and code morphs (2, 3) play when crossing a year boundary. Each era is pinned (sticky) for most of its scroll distance, with the morph in a short zone at the end. Within an era, small changes happen year by year: odometer-style year counter, tech badges, background image.

Fun extra: the transition into an era uses that era's own technique (jQuery `fadeIn()` with an AJAX spinner around 2009, Material ripple in 2014, native View Transition in 2023).

First prototype: the 2008 → 2010 transition (4:3 → 16:10 monitor, tablet appears, glossy → flatter nav, `<table>` → floated `<div>`s).

## Tech stack

- Next.js (App Router, static export) + TypeScript 7, React 19.
- **Material UI instead of Tailwind** (Tailwind dropped, my preference). Styling with MUI `styled` / `sx` (Emotion); CSS Modules only for the neutral site shell.
- **Custom library on MUI (`@portfolio/ui`):** one MUI theme per era (`createEraTheme`), so the same components render in the style of any era. The mini-sites in the devices and the Contact Me button are built from it. During the Material era, MUI's own defaults are the authentic look.
- Era data as typed objects (`@portfolio/eras`).
- Container queries so the same mini-site lays out correctly in the monitor, tablet and phone.
- Shiki for build-time code highlighting, shiki-magic-move for the code transitions (to do).

## Project structure (decided)

**One monorepo, split into packages**, instead of separate repos for the site, the library and Storybook.

Why: with separate repos, every change to the library would need a version bump and publish before the site could use it, and Storybook would need to pull from several repos. A monorepo keeps everything in sync and is the same setup I led at Sitecore (Unified UI). Each part can still be shown on its own:
- **Storybook** is deployed to its own URL (e.g. GitHub Pages), linkable on its own.
- **The library** (`packages/ui`) can be published to npm under its own name when ready, and linked by folder on GitHub.
- If a separate repo is ever needed, a package can be extracted with its Git history (`git subtree split`).

Tooling: npm workspaces + Turborepo; Node 22; Prettier. Packages are source-only TypeScript (no build step); Next.js transpiles them and Storybook (Vite) reads them directly.

| Path | Package | Contents |
| --- | --- | --- |
| `apps/web` | `@portfolio/web` | The site: persistent neutral header + the timeline of era scenes |
| `apps/storybook` | `@portfolio/storybook` | Storybook 10 config and introduction page |
| `packages/ui` | `@portfolio/ui` | The custom library: era themes, ContactButton, TechStack |
| `packages/devices` | `@portfolio/devices` | Monitor, Tablet, Phone, BrowserFrame, DeviceSet, Screen |
| `packages/backdrop` | `@portfolio/backdrop` | CodeLayer, YearImage, Backdrop |
| `packages/timeline` | `@portfolio/timeline` | Timeline: `scroll` (desktop), `slider` (mobile), `auto` |
| `packages/eras` | `@portfolio/eras` | Era data and types |
| `packages/scene` | `@portfolio/scene` | EraScene (one era's final frame), EraPanel, MiniSite |

Key implementation choices:
- **Screen at real resolution:** each device screen lays out its content at the device's real width (1024px for a 2008 monitor, 320px for an iPhone 3G) and scales it down to fit. Container queries inside see the real width, so phones get the mobile layout. Before responsive design, phones and tablets render the desktop site at 980px, zoomed out like the original iPhone did.
- **One DOM for both timelines:** every era is rendered once; `auto` mode switches between the desktop sticky scroll and the mobile scroll-snap slider with a CSS media query (below 900px).
- **Accessibility:** the sites inside the devices are illustrations (`inert`, wrapped in `role="img"` with a description); the code and image layers are `aria-hidden`; the slider announces the current era.

## Storybook

Stories live next to their components in each package; the Storybook app holds the config, the introduction and the Playground. Sections: **Introduction → Playground → Library → Devices → Backdrop → Timeline → Scene**. Highlights: Library → ContactButton "Across eras", Library → TechStack "All variants", Devices → "Browser timeline" (20 versions, light/dark) and "Monitor timeline" (7 designs). An **Era** switch in the toolbar renders any story in the style of any era, and the accessibility addon checks every story.

**Playground** (first section after Introduction): every attribute of every component in one place, to test combinations. "One era" and "Full timeline" (all eras, plus scroll/slider mode and scroll length). Controls grouped as Era, Page (page mode split/light/dark, panel text glow, tech stack display), Devices (monitor ratio and resolution, devices max height, tablet, phone), Code (placement, incline, size, opacity, fade). Device controls default to "auto" (the era's own value).
- **Decided:** the era's **style**, its **responsive behavior**, its **monitor design** and its **browser** are always tied to the era, so they have no override controls.

## Direction of time (decided: 2008 → now)

Considered:
1. **Start in 2008:** the visitor sees right away that something is unusual, which motivates scrolling and makes the concept obvious.
2. **Start in 2026:** better for short attention spans (recruiters), and résumés are reverse-chronological anyway, but the concept risks being missed and scrolling down would mean going backward in time.

Decided: **start in 2008 and move toward now, and make sure the recruiter's needs are covered from the first second, whatever year is on screen:**
- Persistent header in a neutral style: name, "Senior Frontend Developer · since 2008," Contact Me, and the timeline scrubber with a "Now" jump. (Built: name, role, "Now" and "Contact" links. The scrubber is still to do.)
- Scrolling forward = time moving forward, and the story reads as growth, ending on 2026 with the strongest content and the contact call to action.
- The 2008 frame is so recognizable that the concept is clear within a second.

Still an optional experiment, not decided: a short **"rewind" intro**: the page loads on the 2026 final frame (name, role, contact), then after about a second rewinds quickly through the eras back to 2008 and invites the visitor to scroll. The visitor sees "now" first and understands the concept. Skipped with `prefers-reduced-motion`, on repeat visits, and on any user input. To be tested in the prototype, as it could also feel like a delay.

Mobile follows the same direction (starts at 2008), with the same "Now" jump.

## Open questions

- **Fake devices on mobile:** a full monitor + tablet + phone is small on a phone screen. Options: only the monitor, scaled down; only the device most typical of the era; or a device switcher inside the slide. (For now: the whole device set, scaled down.)
- **Overlapping jobs:** OSeven (2016–2024) overlaps with the I6 (2022) and XM (2023) consulting roles. Either show two projects side by side in those eras, or a primary job with a "consulting on the side" note. (For now: both listed, the consulting role marked "alongside".)
- **Contact Me target:** still a placeholder (`#contact`). Proposed: a `mailto:` to my personal email, assembled in the browser to limit spam scraping; phone kept off the public site; or a contact form service instead. Waiting for my decision.
- **Screen width in the 2020s eras:** they lay out at 2560px, so the browser toolbar is tiny. Proposed: 1440–1920px, as real high-resolution screens use display scaling.
- **Phone and tablet designs per era:** they have only two looks (classic/modern). Proposed: a model per era, like the monitors.
- **Dim logos on dark:** some brand colors (.NET purple, MySQL blue) look dim on the dark side. Option: raise the contrast threshold so more logos switch to the text color. Real logo files could replace the lettered badges (AngularJS, SharePoint, Kendo UI, JavascriptMVC).

## Status

- **Built** (branch `POR-002`, pushed 2026-11-18): monorepo skeleton, the site with all 7 eras as final frames (desktop sticky scroll, mobile slider), Storybook with the Playground, era themes, Contact Me per era, monitors and browsers per era, VS Code-colored background code, split page, tech stack logos. Tech stack logos and the concept update are committed on the same branch.
- **Next:** the 2008 → 2010 transition prototype (morphs, View Transitions, shiki-magic-move); real recreations of my projects inside the devices; year images; header timeline scrubber; Contact Me target; deploy (site + Storybook).

## Later features

- **Aging avatar in the header:** a round profile photo like on GitHub or LinkedIn, drawn as a slightly cartoonish version of me, that ages as the visitor scrolls through the years.

## Agreed principles

- Tie every era to my own career.
- Recruiters skim: always-visible timeline or year scrubber, plus a "skip to now / contact" shortcut.
- About 6–7 eras, not 19 separate designs.
- Authentic details, including browser replicas as wrappers.
- The technique matches the content: the last era uses the newest platform features on purpose.
- Accessibility and performance: native scroll (no scroll-jacking), `prefers-reduced-motion`, keyboard navigation, high Lighthouse scores.
