import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AthleteShare — Trade Athlete Shares | EU Regulated',
  description:
    'Buy and sell shares in footballers and basketball players. Prices move in real-time based on match stats. Join the waitlist for early beta access.',
  keywords: [
    'sports trading',
    'athlete shares',
    'footballer investment',
    'basketball player stocks',
    'sports finance',
    'EU regulated sports platform',
    'athlete market',
    'AthleteShare',
  ],
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL || 'https://athleteshare.io',
  },
  openGraph: {
    title: 'AthleteShare — Trade Athlete Shares | EU Regulated',
    description:
      'Buy and sell shares in footballers and basketball players. Prices update after every match. Join the waitlist.',
    url: process.env.NEXT_PUBLIC_APP_URL || 'https://athleteshare.io',
    siteName: 'AthleteShare',
    images: [
      {
        url: 'https://athleteshare.io/og-image.png',
        width: 1200,
        height: 630,
        alt: 'AthleteShare — Athlete Performance Trading',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AthleteShare — Trade Athlete Shares | EU Regulated',
    description:
      'Buy and sell shares in footballers and basketball players. Prices update after every match. Join the waitlist.',
    images: ['https://athleteshare.io/og-image.png'],
    creator: '@AthleteShareHQ',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/logo.png',
    apple: '/apple-touch-icon.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className="bg-navy-950 text-white antialiased"
        style={{ fontFamily: 'var(--font-body)' }}
      >
        {children}
      </body>
    </html>
  )
}
