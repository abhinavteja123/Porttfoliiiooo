# Abhinav Teja — Liquid Light Portfolio

A cinematic, WebGL-driven personal portfolio for **Abhinav Teja, Creative AI Engineer**.
Art direction: **Liquid Light** — warm cream base, iridescent periwinkle→rose gradients,
a refractive liquid blob rendered with a custom GLSL shader, kinetic typography, and a
buttery Lenis + GSAP scroll backbone.

> **Lighthouse (desktop, production build): Accessibility 100 · Best Practices 100 · SEO 100.**

---

## Stack

| Layer | Tech |
|---|---|
| App | React 18 + Vite 5 + TypeScript (strict) |
| 3D | Three.js · React Three Fiber · drei · @react-three/postprocessing (Bloom + grain) |
| Shaders | Custom GLSL — 3D simplex-noise vertex displacement + iridescent fresnel fragment |
| Scroll | Lenis (smooth) synced to the GSAP ticker; ScrollTrigger reveals |
| Motion | GSAP + ScrollTrigger, Framer Motion (shared-element modals), magnetic interactions |
| Styling | Tailwind CSS with a custom Liquid Light token set |

> Note: **Anime.js was dropped** from the original brief — GSAP already covers SVG morphs,
> staggered text, and micro-interactions, so removing it means one motion engine and a
> smaller bundle. Spine was left out (heavy) and can be added later for a character section.

---

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
```

Production build + local preview:

```bash
npm run build        # tsc --noEmit + vite build  -> dist/
npm run preview      # serves dist/ on http://localhost:4173
npm run typecheck    # types only
```

Node 18+ required (built and verified on Node 24).

---

## Deploy to Vercel

This is a static SPA — zero config.

1. Push the repo to GitHub.
2. In Vercel: **New Project → import the repo.**
3. Framework preset: **Vite**. Build command `npm run build`, output dir `dist`.
4. Deploy.

CLI alternative:

```bash
npm i -g vercel
vercel            # preview
vercel --prod     # production
```

(Equivalent on Netlify: build `npm run build`, publish `dist`.)

---

## Architecture

```
src/
  three/            # WebGL layer (code-split, lazy-loaded after hero)
    glsl.ts         # simplex noise + vertex/fragment shaders
    LiquidBlob.tsx  # the signature shader mesh (pointer + scroll reactive)
    Scene.tsx       # Canvas, camera rig, Bloom + grain post
    StaticBlob.tsx  # CSS fallback (reduced-motion / low-power)
    BackgroundCanvas.tsx  # chooses WebGL vs fallback
  lib/
    store.ts        # mutable singleton bridging DOM <-> WebGL (no re-renders)
    useSmoothScroll.ts    # Lenis <-> GSAP ticker sync
    useScrollReveal.ts    # shared reveal grammar
    useMagnetic.ts        # magnetic hover
    gsap.ts               # single plugin registration
    useReducedMotion.ts / useIsMobile.ts
  components/       # Preloader, Cursor, Nav, ScrollProgress, KineticText, SectionHeading
  sections/         # Hero, About, Skills, Experience, Projects, Certificates, Academics, Contact
  data/content.ts   # SINGLE source of all content (every placeholder marked TODO)
```

The DOM and the WebGL canvas live in separate React reconcilers, so instead of bridging
context they communicate through `lib/store.ts` — the scroll/pointer values are written
there each frame (no React re-renders) and read inside `useFrame`.

---

## Performance budget

- **Initial JS ≈ 101 KB gz** (`index` 28 KB + `motion` 73 KB). Three.js + R3F (~278 KB gz)
  are in a **separate chunk that only loads after the hero paints**, and only on capable,
  motion-OK devices.
- 60fps target: single shader mesh (no per-frame geometry uploads), DPR capped (2 desktop /
  1.5 mobile), `depthWrite:false` transparent material, idle render loop only.
- **Mobile / low-power** (`isLowPowerDevice`): lower icosahedron detail, no MSAA, lighter
  grain — or the pure-CSS `StaticBlob` fallback entirely.
- **`prefers-reduced-motion`**: Lenis off (native scroll), all reveals resolve instantly,
  blob → static CSS orb, counter skips. Verified end-to-end.

---

## Art-direction notes

- **Palette** — `cream #F4F2EC`, `ink #14141A`, iris gradient `#6E8BFF → #FF8FB1`, `mint #8FF0C8`.
- **Type** — Fraunces (display, kinetic) + Space Grotesk (body). Fluid 1.250 scale via `clamp()`.
- **Motion language** — `expo.out` reveals, magnetic springs, one reveal vocabulary
  (`[data-reveal]` rise + unclip stagger) reused across every section.
- **Signature** — the liquid blob morphs with scroll, swells toward the cursor, and fades to
  an ambient presence after the hero so text-heavy sections stay clean.

---

## Swapping in your real content

Almost everything lives in **`src/data/content.ts`** — search for `TODO` across the repo:

- `identity` — email + social links (GitHub/LinkedIn/X/Read.cv are placeholders).
- `about`, `skills`, `experience`, `projects`, `certificates`, `academics` — replace sample data.
- **Project & certificate imagery** — currently procedural gradient thumbnails
  (`hue` field). Drop real images into `public/` and swap the gradient `style` for an `<img>`.
- **Portrait** — `About.tsx` has a placeholder gradient panel; add `/public/portrait.jpg`.
- **Contact form** — posts via `mailto:` for now; wire `onSubmit` in `Contact.tsx` to
  Formspree / Resend / your API for real delivery.
- **`index.html`** — set a real OG image + canonical URL; **`public/robots.txt`** — add your sitemap.

---

Built with React, React Three Fiber, GSAP & a hand-written GLSL shader.
