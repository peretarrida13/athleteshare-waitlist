'use client'

import { useState, useEffect, useRef } from 'react'

type Sport = 'ALL' | 'FOOTBALL' | 'BASKETBALL'

interface Athlete {
  id: string
  name: string
  club: string
  sport: 'FOOTBALL' | 'BASKETBALL'
  league: string
  price: number
  change: number
  history: number[]
}

const BASE_ATHLETES: Athlete[] = [
  { id: 'mbappe',     name: 'K. Mbappé',    club: 'Real Madrid',  sport: 'FOOTBALL',   league: 'La Liga',        price: 142.50, change:  4.2, history: [128,131,133,130,135,138,136,140,141,142] },
  { id: 'haaland',   name: 'E. Haaland',   club: 'Man City',     sport: 'FOOTBALL',   league: 'Premier League', price: 138.20, change:  6.1, history: [122,125,129,127,131,133,130,135,136,138] },
  { id: 'pedri',     name: 'Pedri',        club: 'Barcelona',    sport: 'FOOTBALL',   league: 'La Liga',        price:  96.80, change:  2.8, history: [ 89, 90, 92, 91, 93, 94, 93, 95, 96, 96] },
  { id: 'yamal',     name: 'L. Yamal',     club: 'Barcelona',    sport: 'FOOTBALL',   league: 'La Liga',        price:  74.30, change:  5.3, history: [ 65, 67, 68, 70, 69, 71, 72, 73, 74, 74] },
  { id: 'bellingham',name: 'J. Bellingham',club: 'Real Madrid',  sport: 'FOOTBALL',   league: 'La Liga',        price: 119.60, change: -1.4, history: [124,122,121,120,119,120,118,119,120,119] },
  { id: 'vini',      name: 'Vinicius Jr',  club: 'Real Madrid',  sport: 'FOOTBALL',   league: 'La Liga',        price: 108.40, change:  3.1, history: [ 99,101,103,102,104,105,104,107,108,108] },
  { id: 'curry',     name: 'S. Curry',     club: 'Golden State', sport: 'BASKETBALL', league: 'NBA',            price:  88.90, change: -0.7, history: [ 91, 90, 90, 89, 91, 90, 89, 89, 90, 88] },
  { id: 'jokic',     name: 'N. Jokić',    club: 'Denver',       sport: 'BASKETBALL', league: 'NBA',            price:  95.20, change:  1.9, history: [ 89, 91, 92, 93, 92, 94, 93, 95, 95, 95] },
]

interface ApiAthlete {
  id: string
  name: string
  shortName: string
  team: string
  sport: string
  league: string
  price: number
  priceChangePercent24h: number
}

function mapApiToLocal(a: ApiAthlete): Athlete {
  const price = Number(a.price)
  const change = Number(a.priceChangePercent24h ?? 0)
  return {
    id: a.id,
    name: a.shortName || a.name,
    club: a.team,
    sport: (a.sport === 'BASKETBALL' ? 'BASKETBALL' : 'FOOTBALL') as 'FOOTBALL' | 'BASKETBALL',
    league: a.league,
    price,
    change,
    history: Array(10).fill(price),
  }
}

function Sparkline({ history, change }: { history: number[]; change: number }) {
  const W = 64, H = 24
  const min = Math.min(...history)
  const max = Math.max(...history)
  const range = max - min || 1
  const pts = history
    .map((v, i) => {
      const x = (i / (history.length - 1)) * W
      const y = H - ((v - min) / range) * (H - 4) - 2
      return `${x.toFixed(1)},${y.toFixed(1)}`
    })
    .join(' ')
  const color = change >= 0 ? '#4ade80' : '#f87171'
  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} fill="none">
      <polyline points={pts} stroke={color} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

function nudge(price: number): number {
  const delta = price * (Math.random() * 0.006 - 0.003)
  return Math.max(0.01, price + delta)
}

interface MarketTableProps {
  compact?: boolean
}

export default function MarketTable({ compact = false }: MarketTableProps) {
  const [filter, setFilter] = useState<Sport>('ALL')
  const [athletes, setAthletes] = useState<Athlete[]>(BASE_ATHLETES)
  const [flashing, setFlashing] = useState<Record<string, 'up' | 'down' | null>>({})
  const prevRef = useRef<Record<string, number>>(
    Object.fromEntries(BASE_ATHLETES.map((a) => [a.id, a.price]))
  )

  // Seed with real prices from the backend on mount; fall back to BASE_ATHLETES silently
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL
    if (!apiUrl) return
    fetch(`${apiUrl}/api/v1/athletes`)
      .then((r) => r.ok ? r.json() : null)
      .then((data: ApiAthlete[] | null) => {
        if (!data || data.length === 0) return
        const mapped = data.map(mapApiToLocal)
        setAthletes(mapped)
        prevRef.current = Object.fromEntries(mapped.map((a) => [a.id, a.price]))
      })
      .catch(() => { /* keep BASE_ATHLETES */ })
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setAthletes((prev) => {
        const next = prev.map((a) => {
          const newPrice = nudge(a.price)
          const newChange = a.change + (Math.random() * 0.2 - 0.1)
          const newHistory = [...a.history.slice(1), newPrice]
          return { ...a, price: newPrice, change: newChange, history: newHistory }
        })

        const newFlash: Record<string, 'up' | 'down' | null> = {}
        next.forEach((a) => {
          const prevPrice = prevRef.current[a.id]
          newFlash[a.id] = a.price > prevPrice ? 'up' : a.price < prevPrice ? 'down' : null
          prevRef.current[a.id] = a.price
        })
        setFlashing(newFlash)
        setTimeout(() => setFlashing({}), 650)
        return next
      })
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const visible = athletes.filter((a) => filter === 'ALL' || a.sport === filter)
  const displayList = compact ? visible.slice(0, 4) : visible

  return (
    <div className="glass overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <div className="flex items-center gap-2">
          <span className="live-dot" />
          <span className="text-xs font-mono text-white/40 uppercase tracking-wider">Live Market</span>
        </div>
        {!compact && (
          <div className="flex gap-1">
            {(['ALL', 'FOOTBALL', 'BASKETBALL'] as Sport[]).map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`text-[10px] font-mono px-2.5 py-1 rounded transition-colors ${
                  filter === s
                    ? 'bg-white/[0.1] text-white'
                    : 'text-white/30 hover:text-white/60'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Column headers — full mode only */}
      {!compact && (
        <div className="grid grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] gap-x-4 px-4 py-2 border-b border-white/[0.04]">
          <span className="text-[10px] font-mono text-white/25 uppercase">Athlete</span>
          <span className="text-[10px] font-mono text-white/25 uppercase text-right w-16">Price</span>
          <span className="text-[10px] font-mono text-white/25 uppercase text-right w-14">24h</span>
          <span className="hidden sm:block text-[10px] font-mono text-white/25 uppercase text-right w-16">7d chart</span>
        </div>
      )}

      {/* Rows */}
      {displayList.map((a) => {
        const flash = flashing[a.id]
        const priceColor = flash === 'up' ? '#4ade80' : flash === 'down' ? '#f87171' : undefined
        const changePositive = a.change >= 0

        return (
          <div
            key={a.id}
            className={`grid gap-x-4 px-4 border-b border-white/[0.04] last:border-0 items-center ${
              compact
                ? 'grid-cols-[1fr_auto_auto] py-2.5'
                : 'grid-cols-[1fr_auto_auto] sm:grid-cols-[1fr_auto_auto_auto] py-3'
            }`}
          >
            {/* Name + club/league */}
            <div className="min-w-0">
              <p className="text-xs font-medium text-white truncate">{a.name}</p>
              <p className="text-[10px] text-white/30 font-mono truncate">{compact ? a.league : a.club}</p>
            </div>

            {/* Price */}
            <span
              className="text-xs font-mono tabular-nums text-right w-16 transition-colors duration-300"
              style={{ color: priceColor ?? 'rgba(255,255,255,0.7)' }}
            >
              €{a.price.toFixed(2)}
            </span>

            {/* 24h change */}
            <span
              className={`text-[11px] font-mono tabular-nums text-right w-14 ${
                changePositive ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {changePositive ? '+' : ''}{a.change.toFixed(2)}%
            </span>

            {/* Sparkline — full mode only, hidden on mobile */}
            {!compact && (
              <div className="hidden sm:flex w-16 justify-end">
                <Sparkline history={a.history} change={a.change} />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
