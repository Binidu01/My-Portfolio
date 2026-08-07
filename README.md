# Binidu Ranasinghe — Portfolio

My personal portfolio site. A single-page, animation-heavy site built with React, TypeScript, and Framer Motion, powered by **Bini.js**.

---

## About Me

Software engineer and open-source creator. I build developer tools and frameworks — most notably **Bini.js**, a React framework for shipping web, desktop, and mobile apps from a single codebase with zero boilerplate.

Currently studying BEng (Hons) Software Engineering at London Metropolitan University (2025–2026), after completing a Higher National Diploma in Computing (Pearson UK, 2024–2025).

---

## What's on the Site

- **Hero** — animated "Software Engineer" headline with draggable floating icons, a scroll-linked profile photo (grayscale → color flip on scroll), and a live GitHub avatar.
- **About** — short bio and an intro to Bini.js.
- **Quote** — full-bleed scroll-triggered text reveal.
- **Education** — scroll-animated timeline (London Met, Pearson HND).
- **Technical Expertise** — grid of skill icons: React, Next.js, Bini.js, Vite, TypeScript, JavaScript, Python, Java, C#, PHP, Rust, Node.js, .NET, Hono, Express, Fastify, Django, Flask, SQL/NoSQL databases, Docker, Kubernetes, Git, Tauri, and OS platforms.
- **Featured Projects** — cards for **Bini.js**, **Hummanize-AI**, and **Travel Assistant AI**, each with a live screenshot preview fetched via Microlink (falls back to a GitHub OpenGraph image if the fetch fails).
- **Contact** — icon links for email, WhatsApp, phone, GitHub, and LinkedIn.
- **Footer** — quick links and contact details.

## Key Components

| Component | What it does |
|---|---|
| `RollingText` / `RollingButton` | Character-by-character hover roll animation |
| `DraggableFloatingIcon` | Mouse/touch-draggable decorative icons (desktop only) |
| `EducationTimeline` | Scroll-progress-driven timeline with an animated draw-in line |
| `ProfilePicWithScroll` | Scroll-linked 3D flip + vertical travel effect on the hero photo (desktop only; disabled on mobile) |
| `ProjectCard` | Fetches a live screenshot of each project's URL via the Microlink API, with loading and error states |
| `QuoteSection` | Word-by-word color reveal tied to scroll position |

## Tech Stack

- **Bini.js** — framework (file-based routing, dev server, production server)
- **React + TypeScript**
- **Framer Motion** — scroll and gesture animations
- **Tailwind CSS** — styling
- **Lucide React** — icon set
- **Simple Icons** — brand/tech icons
- **GitHub REST API** — pulls the live avatar for the hero
- **Microlink API** — generates live screenshots for project cards

---

## Running Locally

\`\`\`bash
pnpm install
pnpm run dev
\`\`\`

Other useful commands:

| Command | Description |
|---|---|
| \`pnpm run build\` | Type-check and build for production |
| \`pnpm run preview\` | Preview the production build |
| \`pnpm run export\` | Export as a static SPA |
| \`pnpm run deploy\` | Deploy to your configured hosting platform |

Requires Node.js >= 20.19.0.

---

## Contact

- Email: rbinidu@gmail.com
- GitHub: [Binidu01](https://github.com/Binidu01)
- LinkedIn: [binidu-ranasinghe](https://www.linkedin.com/in/binidu-ranasinghe-a6497b300/)

---

Built with **Bini.js**.