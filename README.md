# Aliph Studio

Marketing site for Aliph Studio — a development agency in DHA Phase 3, Lahore,
serving clients in Pakistan, the UK, UAE and United States.

Built to deploy unchanged to **Vercel** or a **Hostinger VPS**.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16 (App Router, React 19, TypeScript) |
| Styling | Tailwind CSS v4, CSS-first tokens in `globals.css` |
| Scroll motion | GSAP + ScrollTrigger |
| Smooth scroll | Lenis |
| Forms | React Hook Form patterns + Zod, via Server Actions |
| Email | Resend |
| Content | Typed model in `src/lib/content.ts` |

Every route is static or SSG — there is no runtime rendering on any page.

## Getting started

```bash
npm install
cp .env.example .env.local     # fill in RESEND_API_KEY
npm run dev
```

Open <http://localhost:3000>.

## Project structure

```
src/
├── app/
│   ├── actions/contact.ts     Server action — validation, rate limit, send
│   ├── services/[slug]/       Five service pages, generated from content.ts
│   ├── work/[slug]/           Case studies
│   ├── opengraph-image.tsx    Dynamic OG card via next/og
│   ├── sitemap.ts             Generated from the content model
│   └── robots.ts
├── components/
│   ├── providers/             Lenis scroll authority + GSAP reveal engine
│   ├── home/                  Homepage sections, in page order
│   ├── layout/                Header, footer
│   └── ui/                    Button, section, prose, logo, JSON-LD
└── lib/
    ├── site.ts                Identity and NAP — single source of truth
    ├── content.ts             Services, case studies, FAQs, process
    ├── schema.ts              JSON-LD builders
    └── seo.ts                 Metadata + canonical helper
```

## Editing content

Almost everything is data, not markup:

- **Services** — add to `services[]` in `src/lib/content.ts`. A new entry
  generates its own page, sitemap entry, schema, footer link and homepage card.
- **Case studies** — add to `caseStudies[]`, same deal.
- **Contact details / NAP** — `src/lib/site.ts`. This must match your Google
  Business Profile character for character.

## Routes

`/` · `/services` · `/services/[slug]` (5) · `/work` · `/work/[slug]` (3) ·
`/process` · `/about` · `/contact` · `/privacy` · `/terms` · 404

Not yet built, and deliberately absent from the sitemap so nothing 404s:
**`/blog`** and **`/careers`**. The blog matters commercially — it is the
proof that the SEO service works — so it is the first thing to add.

## Motion architecture

Two libraries with a strict division of labour, and one scroll authority:

- **Lenis** owns the scroll position and drives GSAP's ticker. Nothing else may
  install a scroll smoother — two of them produce untunable jitter.
- **GSAP + ScrollTrigger** handles anything tied to scroll *progress*: the
  pinned services scrub, the horizontal process track, hero parallax.
- **`[data-reveal]`** is a single batched ScrollTrigger in
  `components/providers/reveal-engine.tsx`. Add the attribute to any element to
  opt it into the staggered entrance — no per-component wiring.

Rules the codebase holds to:

- Transform and opacity only.
- The LCP element is never animated.
- `prefers-reduced-motion` disables Lenis, the scrubs and the reveals; content
  is shown immediately instead.
- Pinning is desktop-only — below `lg` the set pieces degrade to a stacked list
  and a native swipe carousel.

## SEO

- Canonical URL on every route via `buildMetadata()`.
- `sitemap.xml` and `robots.txt` generated from the content model.
- JSON-LD: `ProfessionalService` (covers LocalBusiness), `WebSite`, `Service`,
  `FAQPage`, `BreadcrumbList`, `Article`.
- Dynamic OG images built at build time.
- FAQ answers use native `<details>`, so they are in the DOM for crawlers and
  cost no JavaScript.

## Before launch

Placeholders that must be replaced — search for `PLACEHOLDER`:

- [ ] Exact street address in `src/lib/site.ts` (the phone channel is WhatsApp)
- [ ] Verify a sending domain in Resend — `CONTACT_FROM_EMAIL` cannot be a
      Gmail address, only a domain you own
- [ ] Real case studies and testimonials (`placeholder: true` marks the drafts)
- [ ] Verified sending domain in Resend
- [ ] Legal review of `/privacy` and `/terms`
- [ ] Google Business Profile created, NAP matched
- [ ] `aliphstudio.com` registered and 301'd to `aliph.studio`

## Scripts

```bash
npm run dev      # Turbopack dev server
npm run build    # Production build (emits .next/standalone)
npm run start    # Serve the production build
npm run lint     # ESLint
```

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for Vercel and Hostinger VPS instructions.
