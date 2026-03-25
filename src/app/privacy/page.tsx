import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy — AthleteShare',
  description: 'AthleteShare privacy policy. Learn how we collect, use, and protect your personal data.',
  robots: { index: true, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-navy-950 text-white" style={{ fontFamily: 'var(--font-body)' }}>
      {/* Nav */}
      <header className="border-b border-navy-800/50 bg-navy-950/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <img src="/athleteshare-logo.png" alt="AthleteShare" className="h-8 w-auto" />
            <span className="text-sm font-black tracking-widest text-white" style={{ fontFamily: 'var(--font-display)', letterSpacing: '0.12em' }}>ATHLETESHARE</span>
          </Link>
          <Link href="/" className="text-navy-300 hover:text-white text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-16">
        <h1 className="text-4xl font-black tracking-tight mb-2" style={{ fontFamily: 'var(--font-display)' }}>
          Privacy Policy
        </h1>
        <p className="text-navy-400 text-sm mb-12">Last updated: March 2026</p>

        <div className="space-y-10 text-navy-200 leading-relaxed">

          <section>
            <h2 className="text-xl font-bold text-white mb-3">1. Who We Are</h2>
            <p>
              AthleteShare OÜ (&ldquo;AthleteShare&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;) operates the AthleteShare platform and waitlist at athleteshare.app.
              We are registered in Estonia and process personal data in accordance with the General Data Protection Regulation (GDPR).
            </p>
            <p className="mt-2">
              Contact: <a href="mailto:privacy@athleteshare.app" className="text-gold-300 hover:text-gold-200 underline">privacy@athleteshare.app</a>
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">2. Data We Collect</h2>
            <p className="mb-3">When you join the waitlist we collect:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Email address (required)</li>
              <li>First name (optional)</li>
              <li>Sport preference (optional)</li>
              <li>Referral code if you were referred by a friend</li>
              <li>IP address (for fraud prevention and rate-limiting)</li>
              <li>Approximate signup timestamp</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">3. How We Use Your Data</h2>
            <ul className="list-disc list-inside space-y-2 ml-2">
              <li>To send your waitlist confirmation and position</li>
              <li>To notify you when beta access opens</li>
              <li>To track referrals and reward early supporters</li>
              <li>To prevent spam and abuse</li>
              <li>To improve our product based on sport preferences</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">4. Legal Basis for Processing</h2>
            <p>
              We process your data on the basis of <strong>legitimate interest</strong> (managing the waitlist and communicating with you)
              and <strong>consent</strong> (marketing communications). You can withdraw consent at any time by emailing us.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">5. Data Sharing</h2>
            <p>
              We do not sell your data. We share data only with trusted processors needed to operate the service:
            </p>
            <ul className="list-disc list-inside space-y-1 ml-2 mt-2">
              <li>Railway (cloud infrastructure, EU region)</li>
              <li>Resend (transactional email delivery)</li>
            </ul>
            <p className="mt-2">All processors are bound by data processing agreements and GDPR-compliant terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">6. Data Retention</h2>
            <p>
              We retain your waitlist data until (a) you request deletion, (b) the beta launches and you convert to a full account,
              or (c) 24 months after collection if the product does not launch.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">7. Your Rights</h2>
            <p className="mb-2">Under GDPR you have the right to:</p>
            <ul className="list-disc list-inside space-y-1 ml-2">
              <li>Access the personal data we hold about you</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion (&ldquo;right to be forgotten&rdquo;)</li>
              <li>Object to or restrict processing</li>
              <li>Data portability</li>
              <li>Lodge a complaint with your supervisory authority</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, email <a href="mailto:privacy@athleteshare.app" className="text-gold-300 hover:text-gold-200 underline">privacy@athleteshare.app</a>.
              We will respond within 30 days.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">8. Cookies</h2>
            <p>
              The waitlist site does not use tracking or analytics cookies. No third-party advertising pixels are loaded.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-white mb-3">9. Changes to This Policy</h2>
            <p>
              We may update this policy as the product evolves. Material changes will be communicated by email to waitlist members.
              The &ldquo;Last updated&rdquo; date at the top of this page reflects when changes were last made.
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
