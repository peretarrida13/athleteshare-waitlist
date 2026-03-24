# SportStack Waitlist

Pre-launch waitlist landing page for **SportStack** — the athlete performance trading platform where sports fans invest real money in footballer and basketball player shares.

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + custom design system |
| Animations | Framer Motion + CSS keyframes |
| Email | Resend (optional, see below) |
| Deploy | Vercel |
| CI/CD | GitHub Actions |

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/athleteshare-waitlist.git
cd athleteshare-waitlist

# 2. Install dependencies
npm install

# 3. Copy environment variables
cp .env.example .env.local

# 4. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the landing page.

## Deployment (Vercel)

### Option A — Vercel Dashboard (easiest)

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo
3. Add environment variables from `.env.example`
4. Deploy

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel login
vercel --prod
```

### Required GitHub Secrets (for CI/CD)

| Secret | Where to find |
|---|---|
| `VERCEL_TOKEN` | Vercel Dashboard → Settings → Tokens |
| `VERCEL_ORG_ID` | `.vercel/project.json` after `vercel link` |
| `VERCEL_PROJECT_ID` | `.vercel/project.json` after `vercel link` |

## Enabling Resend Emails

1. Create an account at [resend.com](https://resend.com)
2. Verify your sending domain
3. Copy your API key into `.env.local`:
   ```
   RESEND_API_KEY=re_your_key_here
   RESEND_FROM_EMAIL=noreply@yourdomain.com
   ```
4. Open `src/app/api/waitlist/route.ts` and uncomment the Resend block (lines marked with `// resend.emails.send(...)`)
5. Redeploy

## Swapping In-Memory Store for Supabase

The waitlist currently stores signups in a Node.js in-memory array (resets on server restart). To persist data:

1. Create a Supabase project at [supabase.com](https://supabase.com)
2. Run this SQL in the Supabase SQL editor:
   ```sql
   create table waitlist (
     id uuid primary key default gen_random_uuid(),
     email text unique not null,
     name text,
     sport text default 'Football',
     created_at timestamptz default now()
   );
   ```
3. Install the client:
   ```bash
   npm install @supabase/supabase-js
   ```
4. Add to `.env.local`:
   ```
   SUPABASE_URL=https://xxxx.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   ```
5. Replace the in-memory `entries` array in `src/app/api/waitlist/route.ts` with Supabase queries (see inline comments in that file)

## Repo Structure

```
athleteshare-waitlist/
├── .github/
│   └── workflows/
│       ├── ci.yml          # Lint + type-check + build on every PR
│       └── deploy.yml      # Auto-deploy to Vercel on main push
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── waitlist/
│   │   │       └── route.ts    # POST (join) + GET (count)
│   │   ├── globals.css         # Design system, fonts, utilities
│   │   ├── layout.tsx          # Root layout + metadata
│   │   └── page.tsx            # Full landing page
│   └── components/
│       ├── AthleteCard.tsx     # Live-price athlete card with sparkline
│       ├── FAQItem.tsx         # Accordion FAQ item
│       └── WaitlistForm.tsx    # hero + section form variants
├── public/                     # Static assets
├── .env.example
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## Related Repos

- [sportstack-app](https://github.com/YOUR_USERNAME/sportstack-app) — main trading platform (coming soon)
- [sportstack-api](https://github.com/YOUR_USERNAME/sportstack-api) — backend API & data pipelines (coming soon)
