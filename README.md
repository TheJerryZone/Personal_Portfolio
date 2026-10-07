# N Harshith Raje Urs — Portfolio

A React + TypeScript + Tailwind CSS + Framer Motion portfolio with a scroll-driven
light → dark theme transition, an interactive four-discipline "What I do" section,
and a JERRY freelance identity section.

## Run it locally

```bash
npm install
npm run dev       # local dev server
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

## Where to edit content

Everything editable lives in **`src/data/portfolio.ts`** — profile info, social
links, experience, skills, projects, education, research, and certifications.
You should not need to touch component files to update copy.

## Assets to add

- **Resume**: drop your PDF at `public/resume/harshith-raje-urs-resume.pdf`
  (or update `profile.resumeUrl` in `src/data/portfolio.ts` to match your filename).
- **Photo**: intentionally not used. The hero identity card is a typographic/
  abstract brand treatment instead of a headshot — see "No-photo hero" below.
- **Project links**: add GitHub/live URLs in the `links` field of each project in
  `portfolio.ts` — empty ones currently show "GitHub link coming soon".
- **Instagram**: `socialLinks.instagram` is empty — add your URL when ready.
- **SEO**: update the canonical URL and OG image in `index.html` once you have a
  live domain.

## Deploying

This is a static Vite build — `npm run build` outputs a `dist/` folder that
deploys as-is to Vercel, Netlify, GitHub Pages, or any static host.

## Notes on scope

A few sections from the original brief were consolidated to keep the page focused
rather than overloaded:
- Education, Research, and Certifications are combined into one "Credentials" section.
- No fabricated stats, clients, or results anywhere.

Everything is real, functional React — no static mockup, no dead links.

## Recent additions

- **Boot loader** (`src/components/Loader.tsx`) — a short system-initializing
  sequence shown once on first load, before the hero. Update the `CAPTIONS` array
  to change the rotating lines.
- **Hero-local theme wash** — the hero background tints blue while showing the
  professional identity and shifts to red as it turns to reveal JERRY, so the
  swap reads as a real theme change, not just a photo filter.
- **Section backgrounds** — "What I do", the intro statement, Skills,
  Experience and Credentials each carry a soft blurred accent glow so no
  section reads as a flat, undifferentiated block.
- **Skills as cards** — `Skills.tsx` now renders each category as its own card
  instead of a flat tag list.
- **Full project case studies** — clicking a project in "Selected work" opens a
  slide-in panel (`src/components/ProjectDetail.tsx`) with Overview, Problem,
  Solution, My Role, Key Features and Outcome. Edit these fields per project in
  `src/data/portfolio.ts`.
- **No-photo hero** — the hero's flip card and the JERRY sections use a brand
  mark (`src/components/JerryMark.tsx`) and typographic initials instead of a
  photo. Colors and animated gradients carry the identity switch, not a face.
