import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service — AthleteShare',
  description: 'AthleteShare terms of service. Read the terms governing use of the AthleteShare waitlist and platform.',
  robots: { index: true, follow: true },
}

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <header className="border-b border-navy-800/50 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-gold-300 font-black tracking-widest text-xl" style={{ fontFamily: 'var(--font-display)' }}>
            ATHLETESHARE
          </Link>
          <Link href="/" className="text-navy-300 hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Terms of Service
        </h1>
        <p className="text-navy-400 text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-navy-200 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Acceptance of Terms</h2>
            <p>
              By joining the AthleteShare waitlist or using any AthleteShare service, you agree to these Terms of Service.
              If you do not agree, please do not use our services.
              These terms are governed by the laws of the Republic of Estonia.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. About AthleteShare</h2>
            <p>
              AthleteShare is a sports performance trading platform that allows users to buy and sell shares representing
              athlete performance. The platform is currently in development. The waitlist grants no rights to use the
              live trading platform until beta access is officially granted.
            </p>
            <p className="mt-2 text-gold-300/80 text-sm font-medium">
              AthleteShare is not a licensed financial instrument broker. Trading athlete shares on AthleteShare is
              entertainment-based and does not constitute investment advice or regulated financial activity.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. Waitlist</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>Joining the waitlist is free and does not create any contractual obligation on either party.</li>
              <li>Position on the waitlist is indicative only and may change.</li>
              <li>We reserve the right to close, pause, or discontinue the waitlist at any time.</li>
              <li>Referral codes are for personal, non-commercial use only. Bulk or automated signups are prohibited.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Eligibility</h2>
            <p>
              You must be at least 18 years old to join the waitlist or use any AthleteShare service.
              By signing up you confirm that you meet this age requirement.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Prohibited Conduct</h2>
            <p className="mb-2">You agree not to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Register multiple waitlist entries with different email addresses</li>
              <li>Use automated tools or scripts to manipulate waitlist positions</li>
              <li>Impersonate any person or entity</li>
              <li>Attempt to gain unauthorised access to any part of our systems</li>
              <li>Use our services for any unlawful purpose</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Intellectual Property</h2>
            <p>
              All content on AthleteShare — including the name, logo, design, copy, and code — is the property of
              AthleteShare OÜ. You may not reproduce, distribute, or create derivative works without our written permission.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Disclaimers</h2>
            <p>
              The service is provided &ldquo;as is&rdquo; without warranties of any kind. We do not guarantee uptime,
              accuracy of athlete data, or any particular trading outcome. Past performance of any athlete or asset
              is not indicative of future results.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, AthleteShare OÜ shall not be liable for any indirect, incidental,
              special, or consequential damages arising from your use of — or inability to use — our services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to These Terms</h2>
            <p>
              We may update these terms at any time. Continued use of our services after changes are posted constitutes
              acceptance of the revised terms. Material changes will be communicated by email to waitlist members.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">10. Contact</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:legal@athleteshare.io" className="text-gold-300 hover:text-gold-200 underline">
                legal@athleteshare.io
              </a>.
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-navy-800/50 mt-16 py-8 text-center text-navy-500 text-sm">
        <p>&copy; {new Date().getFullYear()} AthleteShare OÜ &mdash; <Link href="/terms" className="hover:text-navy-300 transition-colors">Terms</Link> &middot; <Link href="/privacy" className="hover:text-navy-300 transition-colors">Privacy</Link></p>
      </footer>
    </div>
  )
}
