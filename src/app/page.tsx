import type { Metadata } from 'next'
import Link from 'next/link'
import WaitlistForm from '@/components/WaitlistForm'
import Nav from '@/components/Nav'
import FAQItem from '@/components/FAQItem'
import Ticker from '@/components/Ticker'
import MarketTable from '@/components/MarketTable'

export const metadata: Metadata = {
  title: 'AthleteShare — Trade Athlete Performance',
  description:
    'The first EU-regulated platform where your sports knowledge earns real money. Buy and sell shares in top athletes. Join the waitlist for early beta access.',
}

async function getCount(): Promise<number> {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/v1/waitlist/count`,
      { next: { revalidate: 60 } },
    )
    const data = await res.json()
    return Number(data.count) || 0
  } catch {
    return 0
  }
}

const FAQ_ITEMS = [
  {
    question: 'Is this gambling?',
    answer:
      'No. AthleteShare is a regulated financial trading platform where shares are priced by verified athlete performance data. You buy and sell shares like a stock market — not bets. We are pursuing a full EU financial licence with passporting rights across all 27 member states.',
  },
  {
    question: 'Do I need money to join the beta?',
    answer:
      'The beta launches with virtual money only. Zero financial risk. You get €50 virtual balance on day one to trade with. Real money trading goes live once our EU licence is approved.',
  },
  {
    question: 'When does the beta launch?',
    answer:
      'We are targeting Q4 2026. Waitlist members are invited in batches based on their position. The earlier you join, the earlier you get in. We will send a reminder email 48 hours before your batch opens.',
  },
  {
    question: 'Which sports and leagues will be available?',
    answer:
      'At launch: La Liga, Premier League, Serie A, Ligue 1, Bundesliga, and the NBA. Additional leagues will be added through 2027 based on trading volume and community demand.',
  },
  {
    question: "What do waitlist members get that others don't?",
    answer:
      'Priority beta access before public launch, a founding member badge, €50 virtual balance on day one, and a lower trading fee tier locked in for your first year. The first 500 members also vote on which athletes get listed first.',
  },
]

const STATS = [
  { label: 'Athletes at launch', value: '200+' },
  { label: 'Leagues covered', value: '6' },
  { label: 'Min share price', value: '€10' },
  { label: 'Virtual balance', value: '€50' },
]

const FEATURES = [
  {
    title: 'Performance-priced shares',
    body: 'Every share price updates after each match using verified official stats — goals, assists, minutes, rating. Fully transparent, no black boxes.',
  },
  {
    title: 'Real-time order book',
    body: 'Buy and sell at live market prices. Limit orders, market orders, and instant price charts for every athlete.',
  },
  {
    title: 'Portfolio analytics',
    body: 'Track your P&L, see your best and worst positions, and monitor upcoming fixtures that could move your holdings.',
  },
  {
    title: 'EU-regulated',
    body: 'We are pursuing a full EU financial licence with passporting rights. Your funds are held in segregated accounts, GDPR-compliant data handling.',
  },
  {
    title: 'Leaderboard & social',
    body: 'See how your returns compare to the community. Follow top traders, share your best picks, and unlock badges.',
  },
  {
    title: 'Mobile-first',
    body: 'iOS and Android apps. Instant push notifications when a player scores, your limit order fills, or a transfer rumour breaks.',
  },
]

export default async function Home() {
  const count = await getCount()

  return (
    <>
      <div className="hero-glow" />

      {/* ── Nav ────────────────────────────────────────────────────── */}
      <Nav />

      {/* ── Ticker ─────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left — copy */}
          <div>
            <div className="flex items-center gap-2 mb-6">
              <span className="live-dot" />
              <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                Pre-launch · Q4 2026 · EU Regulated
              </span>
            </div>
            <h1
              className="text-5xl sm:text-6xl lg:text-7xl leading-none mb-6 text-white"
              style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.01em' }}
            >
              YOU ALWAYS<br />
              KNEW WHO<br />
              WOULD SCORE.<br />
              <span className="text-gradient">NOW PROFIT.</span>
            </h1>
            <p className="text-white/50 text-base leading-relaxed mb-8 max-w-md">
              AthleteShare is the first EU-regulated platform where your sports knowledge earns
              real money. Buy shares in athletes, sell at peak performance, and build a portfolio
              that actually rewards expertise.
            </p>
            <WaitlistForm variant="hero" queueCount={count} />
            <p className="mt-4 text-[11px] text-white/25 font-mono">
              Free to join · No credit card · Beta launches Q4 2026
            </p>
          </div>

          {/* Right — live market preview */}
          <div className="hidden lg:block">
            <MarketTable compact />
          </div>
        </div>
      </section>

      {/* ── Stats bar ──────────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-0 sm:divide-x divide-white/[0.06]">
            {STATS.map((s) => (
              <div key={s.label} className="sm:px-8 first:pl-0 last:pr-0 text-center sm:text-left">
                <p
                  className="text-2xl font-black leading-none mb-1"
                  style={{ fontFamily: 'var(--font-display)', color: 'var(--gold-light)' }}
                >
                  {s.value}
                </p>
                <p className="text-[11px] font-mono text-white/35 uppercase tracking-wider">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── League bar ─────────────────────────────────────────────── */}
      <div className="border-b border-white/[0.06] bg-white/[0.01]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-3">
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-1">
            {['Premier League', 'La Liga', 'Serie A', 'Bundesliga', 'Ligue 1', 'NBA'].map((l) => (
              <span key={l} className="text-[11px] font-mono text-white/25 uppercase tracking-widest">
                {l}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── How It Works ───────────────────────────────────────────── */}
      <section id="how-it-works" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-24">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
            How it works
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            TRADE ATHLETES<br />LIKE STOCKS
          </h2>
          <p className="text-white/40 text-sm leading-relaxed">
            Your sports knowledge is your edge. The market rewards the fans who pay attention.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-8">
          {[
            {
              n: '01',
              title: 'Browse the market',
              body: 'Explore athletes across 6 leagues. Filter by form, upcoming fixtures, or price momentum. Every athlete has a transparent performance ledger.',
            },
            {
              n: '02',
              title: 'Buy your shares',
              body: 'Shares start from €10. Prices adjust after every match using official stats — a hat-trick pushes the price up, a red card sends it down.',
            },
            {
              n: '03',
              title: 'Trade your portfolio',
              body: "Sell before a slump. Hold through a Champions League run. Spot an emerging talent before the market catches up.",
            },
          ].map((s) => (
            <div key={s.n} className="stat-card relative overflow-hidden">
              <span
                className="absolute top-4 right-4 text-5xl font-black opacity-[0.06] leading-none select-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {s.n}
              </span>
              <p
                className="text-3xl font-black mb-4 leading-none"
                style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)' }}
              >
                {s.n}
              </p>
              <h3 className="text-white font-semibold text-sm mb-2">{s.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Live Market Table ───────────────────────────────────────── */}
      <section id="market" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pb-24">
        <div className="flex items-end justify-between mb-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
              Live market demo
            </p>
            <h2
              className="text-4xl sm:text-5xl text-white leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              REAL-TIME PRICES.<br />REAL SPORTS DATA.
            </h2>
          </div>
        </div>
        <MarketTable />
        <p className="mt-4 text-[11px] font-mono text-white/20 text-right">
          Prices simulated for demo purposes · Live data at launch
        </p>
      </section>

      {/* ── Features grid ──────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.01]">
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-24">
          <div className="max-w-xl mb-14">
            <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
              Platform features
            </p>
            <h2
              className="text-4xl sm:text-5xl text-white leading-none"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              BUILT FOR<br />SERIOUS TRADERS
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURES.map((f) => (
              <div key={f.title} className="glass p-6">
                <h3 className="text-white font-semibold text-sm mb-2">{f.title}</h3>
                <p className="text-white/35 text-sm leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Waitlist perks ─────────────────────────────────────────── */}
      <section className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-24">
        <div className="max-w-xl mb-14">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
            Early access perks
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white leading-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            BEING EARLY<br />HAS ADVANTAGES
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              n: '01',
              title: 'Priority Beta Access',
              body: 'You get in before the public. Waitlist members are invited in order. Join now to secure your position.',
            },
            {
              n: '02',
              title: '€50 Virtual Balance',
              body: 'Start trading from day one with a €50 virtual balance — no deposit required. Practice with real market data at zero risk.',
            },
            {
              n: '03',
              title: 'Founding Member Badge',
              body: 'A permanent badge on your profile, visible to all traders. The first 500 members also vote on which athletes get listed first.',
            },
          ].map((card) => (
            <div
              key={card.n}
              className="stat-card"
              style={{ borderLeft: '2px solid rgba(226,185,59,0.35)' }}
            >
              <p
                className="text-xs font-mono mb-4"
                style={{ color: 'var(--gold)' }}
              >
                {card.n}
              </p>
              <h3 className="text-white font-semibold text-sm mb-2">{card.title}</h3>
              <p className="text-white/35 text-sm leading-relaxed">{card.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Trust section ──────────────────────────────────────────── */}
      <div className="border-y border-white/[0.06] bg-white/[0.015]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-16">
          <div className="grid sm:grid-cols-3 gap-8 text-center">
            {[
              { label: 'EU Regulated', sub: 'Pursuing MiFID II licence' },
              { label: 'GDPR Compliant', sub: 'Registered in Estonia' },
              { label: 'Segregated Funds', sub: 'Your money, your account' },
            ].map((t) => (
              <div key={t.label}>
                <p className="text-white font-semibold text-sm mb-1">{t.label}</p>
                <p className="text-[11px] font-mono text-white/30">{t.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <section id="join" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 py-24">
        <div className="glass max-w-lg mx-auto p-10 text-center">
          <p className="text-xs font-mono uppercase tracking-widest mb-4" style={{ color: 'var(--gold)' }}>
            Join the waitlist
          </p>
          <h2
            className="text-4xl sm:text-5xl text-white leading-none mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            GET IN BEFORE<br />THE WHISTLE
          </h2>
          <p className="text-white/40 text-sm mb-8 leading-relaxed">
            Spots are capped. The earlier you join, the higher your position and the better
            your founding member perks.
          </p>
          <WaitlistForm variant="section" queueCount={count} />
        </div>
      </section>

      {/* ── FAQ ────────────────────────────────────────────────────── */}
      <section id="faq" className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pb-24">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs font-mono uppercase tracking-widest mb-4 text-center" style={{ color: 'var(--gold)' }}>
            FAQ
          </p>
          <h2
            className="text-4xl text-white leading-none mb-10 text-center"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            STILL HAVE QUESTIONS?
          </h2>
          <div className="divide-y divide-white/[0.06]">
            {FAQ_ITEMS.map((item) => (
              <FAQItem key={item.question} question={item.question} answer={item.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────────── */}
      <footer className="border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-4 sm:px-8 py-10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <img src="/athleteshare-logo.png" alt="AthleteShare" className="h-7 w-auto" />
                <span className="text-sm font-black tracking-widest text-white" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>ATHLETESHARE</span>
              </div>
              <p className="text-[11px] font-mono text-white/25">© {new Date().getFullYear()} AthleteShare OÜ · Registered in Estonia</p>
            </div>
            <div className="flex items-center gap-6 text-[11px] font-mono text-white/30">
              <a href="mailto:hello@athleteshare.io" className="hover:text-white/60 transition-colors">hello@athleteshare.io</a>
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
            </div>
          </div>
          <p className="mt-8 text-[10px] font-mono text-white/15 max-w-2xl leading-relaxed">
            AthleteShare is pursuing a EU Game of Skill licence and is currently operating in demo mode only.
            This platform does not constitute investment advice or regulated financial activity.
            Past performance is not indicative of future results.
          </p>
        </div>
      </footer>
    </>
  )
}
