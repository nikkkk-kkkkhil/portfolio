<<<<<<< HEAD
# portfolio
=======
# THE MASKED MAN — An Interactive Character Portfolio

> *You don't have to become what people expect you to become.*
> *Sometimes the person nobody notices is building something nobody imagined.*

This is not a résumé with animations. It is a **cinematic, story-driven portfolio**
built around a character: **THE MASKED MAN** — an ambitious full-stack developer
who never reveals his face. The visitor doesn't read about him; they *experience* him:

- A boot-sequence opening (`IDENTITY SEARCH... FAILED.`)
- Nine story chapters with scroll-driven cinematic scenes
- A cursor-reactive, light-shifting **mask** as the site's visual identity
- An RPG-style evolution tree and a full **skill ecosystem**
- A 10-entry **MISSION ARCHIVE** with full case-study files (KisanSetu, NEXUS, and more)
- **ENTER NEXUS** — an interactive concept OS for his dream product
- A hidden **secret terminal** with Easter-egg commands
- A "TRANSMIT A SIGNAL" contact channel backed by PostgreSQL

## Tech Stack

**Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · Framer Motion ·
Drizzle ORM · PostgreSQL · Lucide Icons**

## Local Development

```bash
npm install
cp .env.example .env        # fill in DATABASE_URL
npx drizzle-kit push        # create tables
npm run dev
```

Then open the printed local URL.

## Database

One table (`signals`) stores contact-form transmissions. Run `npx drizzle-kit push`
after setting `DATABASE_URL`, or apply the equivalent SQL:

```sql
CREATE TABLE IF NOT EXISTS signals (
  id serial PRIMARY KEY,
  callsign text NOT NULL,
  frequency text,
  message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
```

## Environment Variables

| Variable | Required | Purpose |
|---|---|---|
| `DATABASE_URL` | yes (for `/api/signal`) | PostgreSQL connection string. Use a **hosted** Postgres in production (Neon, Supabase, Railway…). Never commit real credentials. |
| `NEXT_PUBLIC_SITE_URL` | recommended | Public site URL for SEO metadata, Open Graph, sitemap & robots. |

See `.env.example`. No secrets are ever shipped to the browser — only
`NEXT_PUBLIC_*` values are client-visible, and the site does not depend on
`localhost` for any production functionality.

## Deployment (Vercel / Netlify / similar)

1. Push this repo to GitHub (`.env` is git-ignored — keep it that way).
2. Create a hosted PostgreSQL database (e.g. **Neon**), copy its connection string.
3. Import the project into Vercel (or Netlify):
   - Add env vars: `DATABASE_URL`, `NEXT_PUBLIC_SITE_URL=https://your-domain`
   - Build command: `npm run build` (default)
4. Run `npx drizzle-kit push` once against the hosted database
   (locally, with `DATABASE_URL` pointing at the hosted DB) — or run the SQL above.
5. Visit your public URL. The mask will be waiting.

## Project Checklist Notes

- Project links in mission files are **honest placeholders** — they attach when real.
- NEXUS is labelled **VISION / LONG-TERM PROJECT** everywhere — including inside the
  interactive concept OS (marked as a simulation).
- Reduced-motion preferences are respected; the custom cursor disables itself on
  touch devices; layouts are responsive down to small phones.

## The Secret Terminal

Press the **backtick** key (`` ` ``) anywhere — or the terminal icon in the nav.
Try: `whoami`, `story`, `mask`, `dream`, `future`, `sudo reveal-face`.

---

*The mask is the identity. The code is the voice. The projects are the proof.
The story is the portfolio.*
>>>>>>> 858dc94 (initialize with maskedman website files)
