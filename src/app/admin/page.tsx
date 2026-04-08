export const dynamic = 'force-dynamic'

import { ensureTable, query } from '@/lib/db'
import AdminLogout from './AdminLogout'

interface SportRow { sport: string; count: string }
interface CountryRow { country: string; count: string }
interface DayRow { day: string; count: string }
interface RecentRow { email: string; first_name: string | null; sport: string; country: string | null; created_at: string }
interface OtherRow { other_sport: string; count: string }

async function getData() {
  await ensureTable()

  const [total, sports, countries, daily, recent, others] = await Promise.all([
    query<{ count: string }>('SELECT COUNT(*) AS count FROM waitlist_entries'),
    query<SportRow>(`
      SELECT sport, COUNT(*) AS count
      FROM waitlist_entries
      GROUP BY sport
      ORDER BY count DESC
    `),
    query<CountryRow>(`
      SELECT COALESCE(country, 'Unknown') AS country, COUNT(*) AS count
      FROM waitlist_entries
      GROUP BY country
      ORDER BY count DESC
      LIMIT 15
    `),
    query<DayRow>(`
      SELECT DATE_TRUNC('day', created_at)::date::text AS day, COUNT(*) AS count
      FROM waitlist_entries
      WHERE created_at >= NOW() - INTERVAL '30 days'
      GROUP BY day
      ORDER BY day
    `),
    query<RecentRow>(`
      SELECT email, first_name, sport, country, created_at
      FROM waitlist_entries
      ORDER BY created_at DESC
      LIMIT 20
    `),
    query<OtherRow>(`
      SELECT other_sport, COUNT(*) AS count
      FROM waitlist_entries
      WHERE other_sport IS NOT NULL AND other_sport != ''
      GROUP BY other_sport
      ORDER BY count DESC
      LIMIT 20
    `),
  ])

  return {
    total: parseInt(total[0].count, 10),
    sports,
    countries,
    daily,
    recent,
    others,
  }
}

export default async function AdminDashboard() {
  const { total, sports, countries, daily, recent, others } = await getData()

  const maxDay = Math.max(...daily.map(d => parseInt(d.count, 10)), 1)

  const sportLabel = (s: string) =>
    s === 'FOOTBALL' ? '⚽ Football' : s === 'BASKETBALL' ? '🏀 Basketball' : '🏆 Both'

  const flagEmoji = (cc: string) => {
    if (cc === 'Unknown') return '🌍'
    return cc
      .toUpperCase()
      .replace(/./g, c => String.fromCodePoint(0x1F1E0 - 65 + c.charCodeAt(0)))
  }

  return (
    <main
      className="min-h-screen p-6"
      style={{ background: 'var(--navy)', fontFamily: 'var(--font-body)' }}
    >
      <div className="max-w-5xl mx-auto space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1
              className="text-3xl font-bold text-gradient"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Waitlist Dashboard
            </h1>
            <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
              AthleteShare · live data
            </p>
          </div>
          <AdminLogout />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total signups', value: total.toLocaleString() },
            { label: 'Football', value: sports.find(s => s.sport === 'FOOTBALL')?.count ?? '0' },
            { label: 'Basketball', value: sports.find(s => s.sport === 'BASKETBALL')?.count ?? '0' },
            { label: 'Both', value: sports.find(s => s.sport === 'BOTH')?.count ?? '0' },
          ].map(({ label, value }) => (
            <div
              key={label}
              className="rounded-xl p-4"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <p className="text-xs mb-1" style={{ color: 'rgba(255,255,255,0.4)' }}>{label}</p>
              <p
                className="text-3xl font-bold text-gradient"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {parseInt(value as string, 10).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Daily signups chart (last 30 days) */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Signups — last 30 days
          </h2>
          {daily.length === 0 ? (
            <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No data yet.</p>
          ) : (
            <div className="flex items-end gap-1 h-24">
              {daily.map(d => {
                const pct = (parseInt(d.count, 10) / maxDay) * 100
                return (
                  <div key={d.day} className="flex-1 flex flex-col items-center gap-1 group relative">
                    <span
                      className="absolute -top-5 text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {d.count}
                    </span>
                    <div
                      className="w-full rounded-sm"
                      style={{
                        height: `${Math.max(pct, 4)}%`,
                        background: 'var(--gold-light)',
                        opacity: 0.7,
                      }}
                    />
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Countries */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Top countries
            </h2>
            {countries.length === 0 ? (
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.3)' }}>No data yet.</p>
            ) : (
              <div className="space-y-2">
                {countries.map(c => {
                  const pct = ((parseInt(c.count, 10) / total) * 100).toFixed(1)
                  return (
                    <div key={c.country} className="flex items-center gap-2 text-sm">
                      <span className="w-6 text-center">{flagEmoji(c.country)}</span>
                      <span className="flex-1" style={{ color: 'rgba(255,255,255,0.8)' }}>{c.country}</span>
                      <span style={{ color: 'rgba(255,255,255,0.4)' }}>{pct}%</span>
                      <span className="font-mono text-xs" style={{ color: 'var(--gold-light)' }}>
                        {parseInt(c.count, 10).toLocaleString()}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </div>

          {/* Sport breakdown */}
          <div
            className="rounded-xl p-5"
            style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
          >
            <h2 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
              Sport preference
            </h2>
            <div className="space-y-3">
              {sports.map(s => {
                const pct = total > 0 ? ((parseInt(s.count, 10) / total) * 100).toFixed(1) : '0'
                return (
                  <div key={s.sport}>
                    <div className="flex justify-between text-sm mb-1">
                      <span style={{ color: 'rgba(255,255,255,0.8)' }}>{sportLabel(s.sport)}</span>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>
                        {parseInt(s.count, 10).toLocaleString()} · {pct}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${pct}%`, background: 'var(--gold-light)' }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Other sport suggestions */}
            {others.length > 0 && (
              <>
                <h2 className="text-sm font-semibold mt-6 mb-3" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  Other sport suggestions
                </h2>
                <div className="flex flex-wrap gap-2">
                  {others.map(o => (
                    <span
                      key={o.other_sport}
                      className="px-2 py-1 rounded text-xs"
                      style={{ background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      {o.other_sport} <span style={{ color: 'var(--gold-light)' }}>×{o.count}</span>
                    </span>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Recent signups */}
        <div
          className="rounded-xl p-5"
          style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
        >
          <h2 className="text-sm font-semibold mb-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
            Recent signups
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr style={{ color: 'rgba(255,255,255,0.3)' }}>
                  <th className="text-left pb-2 font-normal">Email</th>
                  <th className="text-left pb-2 font-normal">Name</th>
                  <th className="text-left pb-2 font-normal">Sport</th>
                  <th className="text-left pb-2 font-normal">Country</th>
                  <th className="text-left pb-2 font-normal">Date</th>
                </tr>
              </thead>
              <tbody>
                {recent.map(r => (
                  <tr key={r.email} style={{ borderTop: '1px solid var(--border)' }}>
                    <td className="py-2 pr-4" style={{ color: 'rgba(255,255,255,0.8)' }}>{r.email}</td>
                    <td className="py-2 pr-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.first_name ?? '—'}</td>
                    <td className="py-2 pr-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{sportLabel(r.sport)}</td>
                    <td className="py-2 pr-4" style={{ color: 'rgba(255,255,255,0.5)' }}>{r.country ?? '—'}</td>
                    <td className="py-2" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      {new Date(r.created_at).toLocaleDateString('en-GB', {
                        day: '2-digit', month: 'short', year: 'numeric',
                      })}
                    </td>
                  </tr>
                ))}
                {recent.length === 0 && (
                  <tr>
                    <td colSpan={5} className="py-4 text-center" style={{ color: 'rgba(255,255,255,0.3)' }}>
                      No signups yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  )
}
