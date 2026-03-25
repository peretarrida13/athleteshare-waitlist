import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'AthleteShare — Trade Athlete Shares'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function OgImage() {
  return new ImageResponse(
    <div
      style={{
        background: '#050D18',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '60px',
      }}
    >
      <div style={{ color: '#D4A017', fontSize: 80, fontWeight: 'bold', letterSpacing: '-2px' }}>
        ATHLETESHARE
      </div>
      <div style={{ color: '#FFFFFF', fontSize: 34, marginTop: 24 }}>Trade Athlete Shares</div>
      <div style={{ color: '#94A3B8', fontSize: 24, marginTop: 16 }}>EU Regulated · Free Beta Q4 2026</div>
      <div style={{ color: '#64748B', fontSize: 20, marginTop: 48 }}>athleteshare.app</div>
    </div>
  )
}
