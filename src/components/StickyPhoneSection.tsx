'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion'

const SLIDES = [
  {
    tag: '01 — MARKET',
    title: 'LIVE ATHLETE PRICES.',
    sub: 'Every share price updates after each match. Goals push prices up. Red cards send them down. Fully transparent, no house edge.',
    screenshot: '/screenshots/phone-home.png',
  },
  {
    tag: '02 — PORTFOLIO',
    title: 'TRACK YOUR P&L IN REAL TIME.',
    sub: 'See your full portfolio value, position breakdown, and 30-day performance chart at a glance.',
    screenshot: '/screenshots/phone-portfolio.png',
  },
  {
    tag: '03 — ATHLETE DETAIL',
    title: 'DEEP DIVE ON EVERY PLAYER.',
    sub: 'Full price history, upcoming fixtures, live stats, and a one-tap trade button for every athlete.',
    screenshot: '/screenshots/phone-athlete.png',
  },
  {
    tag: '04 — PROFILE',
    title: 'YOUR TRADING IDENTITY.',
    sub: 'Track your rank on the leaderboard, manage your account, and unlock founding member perks.',
    screenshot: '/screenshots/phone-profile.png',
  },
]

function PhoneMockup({ src }: { src: string }) {
  return (
    <div style={{ position: 'relative', flexShrink: 0 }}>
      <div style={{
        position: 'absolute', inset: -24,
        background: 'radial-gradient(ellipse, rgba(212,160,23,0.15) 0%, transparent 70%)',
        filter: 'blur(20px)', zIndex: 0,
      }} />
      <img
        src={src}
        alt="App screenshot"
        style={{
          height: 860,
          width: 'auto',
          display: 'block',
          filter: 'drop-shadow(0 32px 64px rgba(0,0,0,0.85))',
          position: 'relative',
          zIndex: 1,
        }}
      />
    </div>
  )
}

function slideOpacity(
  scrollYProgress: MotionValue<number>,
  index: number,
  total: number,
) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2
  const isFirst = index === 0
  const isLast = index === total - 1

  if (isFirst && isLast) {
    return useTransform(scrollYProgress, [0, 1], [1, 1])
  }
  if (isFirst) {
    return useTransform(scrollYProgress, [mid + 0.04, end + 0.02], [1, 0])
  }
  if (isLast) {
    return useTransform(scrollYProgress, [start - 0.02, mid - 0.04], [0, 1])
  }
  return useTransform(
    scrollYProgress,
    [start - 0.02, mid - 0.04, mid + 0.04, end + 0.02],
    [0, 1, 1, 0],
  )
}

function FeatureSlide({
  slide,
  index,
  total,
  scrollYProgress,
}: {
  slide: (typeof SLIDES)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const start = index / total
  const end = (index + 1) / total
  const mid = (start + end) / 2

  const opacity = slideOpacity(scrollYProgress, index, total)
  const y = useTransform(scrollYProgress, [start, mid, end], [50, 0, -50])

  return (
    <motion.div
      style={{ position: 'absolute', top: 0, left: 0, right: 0, opacity, y }}
    >
      <p className="text-xs font-mono uppercase tracking-widest mb-5" style={{ color: 'var(--gold)' }}>
        {slide.tag}
      </p>
      <h3
        className="text-4xl sm:text-5xl text-white leading-none mb-5"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {slide.title}
      </h3>
      <p className="text-white/40 text-base leading-relaxed max-w-sm">{slide.sub}</p>
    </motion.div>
  )
}

function PhoneSlide({
  slide,
  index,
  total,
  scrollYProgress,
}: {
  slide: (typeof SLIDES)[0]
  index: number
  total: number
  scrollYProgress: MotionValue<number>
}) {
  const opacity = slideOpacity(scrollYProgress, index, total)

  return (
    <motion.div style={{ position: 'absolute', top: 0, left: 0, opacity }}>
      <PhoneMockup src={slide.screenshot} />
    </motion.div>
  )
}

function MobileSlides() {
  return (
    <section className="lg:hidden py-16 px-4 sm:px-8 max-w-6xl mx-auto space-y-20">
      {SLIDES.map((slide) => (
        <div key={slide.tag} className="flex flex-col items-center gap-8">
          <div style={{ position: 'relative' }}>
            <div style={{
              position: 'absolute', inset: -16,
              background: 'radial-gradient(ellipse, rgba(212,160,23,0.12) 0%, transparent 70%)',
              filter: 'blur(16px)',
            }} />
            <img
              src={slide.screenshot}
              alt="App screenshot"
              style={{
                height: 480,
                width: 'auto',
                display: 'block',
                filter: 'drop-shadow(0 24px 48px rgba(0,0,0,0.8))',
                position: 'relative',
                zIndex: 1,
              }}
            />
          </div>
          <div className="text-center">
            <p className="text-xs font-mono uppercase tracking-widest mb-3" style={{ color: 'var(--gold)' }}>
              {slide.tag}
            </p>
            <h3 className="text-3xl text-white leading-none mb-3" style={{ fontFamily: 'var(--font-display)' }}>
              {slide.title}
            </h3>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mx-auto">{slide.sub}</p>
          </div>
        </div>
      ))}
    </section>
  )
}

export default function StickyPhoneSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -30])

  return (
    <>
      {/* Mobile: flat stacked cards */}
      <MobileSlides />

      {/* Desktop: sticky scroll */}
      <section
        ref={containerRef}
        className="hidden lg:block"
        style={{ position: 'relative', minHeight: `${SLIDES.length * 100}vh` }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-8 w-full">
            <div style={{ display: 'flex', alignItems: 'center', gap: 60 }}>

              <motion.div
                style={{ y: phoneY, flexShrink: 0, position: 'relative', width: 398, height: 860 }}
              >
                {SLIDES.map((slide, i) => (
                  <PhoneSlide
                    key={slide.tag}
                    slide={slide}
                    index={i}
                    total={SLIDES.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </motion.div>

              <div style={{ flex: 1, position: 'relative', height: 260 }}>
                {SLIDES.map((slide, i) => (
                  <FeatureSlide
                    key={slide.tag}
                    slide={slide}
                    index={i}
                    total={SLIDES.length}
                    scrollYProgress={scrollYProgress}
                  />
                ))}
              </div>

            </div>
          </div>
        </div>
      </section>
    </>
  )
}
