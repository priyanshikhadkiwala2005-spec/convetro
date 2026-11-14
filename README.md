# Converto — React Website

Dark, animated video-agency website built with **React + Vite + Framer Motion**.

## Run locally

```bash
npm install
npm run dev        # open http://localhost:5173
```

Production build:

```bash
npm run build      # output in /dist
npm run preview
```

## Pages

| Route | Page |
|---|---|
| `/` | Home — click the CONVERTO logo (3D rotating carousel hero, who we are, play reel, services, recent projects, how we work, pricing, testimonials, news, FAQ) |
| `/about` | About us (hero, logo marquee, mission, story, team, metrics, awards, FAQ) |
| `/service` | Services (scrolling image columns + sticky stacking service cards) |
| `/service/:slug` | Service details |
| `/project` | Projects grid (cursor-follow "View projects" button) |
| `/project/:slug` | Project case study |
| `/blog` | Blog (featured post + grid) |
| `/blog/:slug` | Blog post |
| `/contact` | Contact form + info cards |

## Animations included

- Home hero: 3D cylinder carousel that rotates while scrolling (and follows the mouse)
- Words of the "Who we are" text light up as you scroll
- "Play Reel" thumbnail grows into a big player while scrolling (click opens it)
- "How we work" sticky steps: tilted card flips to the next step
- Testimonial slider with arrows

- 3D cylinder image carousel that rotates while scrolling (home hero)
- Scroll-lit "Who We Are" text and a "Play Reel" thumbnail that grows into a big player
- "How We Work" sticky steps with 3D flipping cards
- RGB glitch effect on project cards on hover
- Floating pill navbar that expands into a menu panel (green link block + image cards)
- Page-transition curtain dropping from the navbar on every route change
- Word-by-word heading reveal, fade/blur-up reveals on scroll
- Image scale-in + scroll parallax
- Infinite logo marquee (logo cards show an image on hover)
- Count-up metrics
- Award list with an image that follows the cursor
- FAQ accordion
- CTA section with a **cursor image trail**
- Sticky stacking service cards
- Rolling-text button hover
- Custom green cursor dot
- Giant gradient footer wordmark (auto-fits the width)

## Edit content / images

Everything (text, team, services, projects, blogs, images) is in **`src/data/content.js`**.
All images live in **`public/images/`** (taken from the reference videos and AI-upscaled). To change one,
replace the file with the same name, or point the path in `content.js` to a new file.
Project card images (`proj-*.jpg`) have the title baked in, like the original design —
if you use a plain photo instead, add `showTitle: true` to that project.

Colors and fonts are CSS variables at the top of `src/index.css` (`--accent` is the green).

## Deploying

- **Vercel / Netlify**: works out of the box (add an SPA rewrite to `index.html` on Netlify:
  `/*  /index.html  200` in `public/_redirects`).
- **Static folder without rewrites** (GitHub Pages, cPanel): build with hash routing
  `VITE_HASH_ROUTER=1 npm run build`.

## Contact form

`src/pages/Contact.jsx` → `submit()` currently just shows a success message.
Hook it up to Formspree, EmailJS or your own API.
