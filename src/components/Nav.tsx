'use client'

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const NAV_LINKS = [
  { label: 'How it works', id: 'how-it-works' },
  { label: 'Market',       id: 'market' },
  { label: 'FAQ',          id: 'faq' },
]

export default function Nav() {
  return (
    <nav className="sticky top-0 z-50 border-b border-white/[0.06] glass" style={{ borderRadius: 0 }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-8 flex items-center justify-between h-14">
        <span
          className="text-lg font-black tracking-widest text-white"
          style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}
        >
          ATHLETESHARE
        </span>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="hidden sm:block text-xs text-white/40 hover:text-white/80 transition-colors"
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('join')}
            className="shimmer-btn text-xs font-semibold px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
            style={{ color: '#07090F' }}
          >
            Join waitlist
          </button>
        </div>
      </div>
    </nav>
  )
}
