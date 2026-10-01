const NAV = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Experience', href: '#experience' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
]

function XIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.3 19.5h2.04L6.49 3.24H4.3l13.3 17.41Z" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <rect x="2.5" y="2.5" width="19" height="19" rx="5.5" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="17.6" cy="6.4" r="1.1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0ZM.4 8.35h4.6V23H.4V8.35Zm7.68 0h4.4v2h.07c.61-1.16 2.11-2.39 4.35-2.39 4.65 0 5.51 3.06 5.51 7.04V23h-4.59v-7.1c0-1.7-.03-3.88-2.36-3.88-2.37 0-2.73 1.85-2.73 3.76V23H8.08V8.35Z" />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M23.5 6.5a3 3 0 0 0-2.11-2.13C19.52 3.87 12 3.87 12 3.87s-7.52 0-9.39.5A3 3 0 0 0 .5 6.5 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.5 3 3 0 0 0 2.11 2.13c1.87.5 9.39.5 9.39.5s7.52 0 9.39-.5a3 3 0 0 0 2.11-2.13A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.5ZM9.6 15.6V8.4l6.27 3.6L9.6 15.6Z" />
    </svg>
  )
}

const SOCIALS = [
  { icon: XIcon, label: 'X (Twitter)' },
  { icon: InstagramIcon, label: 'Instagram' },
  { icon: LinkedInIcon, label: 'LinkedIn' },
  { icon: YouTubeIcon, label: 'YouTube' },
]

const SANS = { fontFamily: 'system-ui, sans-serif' } as const

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5 px-5 pt-16 pb-8 sm:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="max-w-xs">
            <p className="text-2xl italic text-warm">Lumora</p>
            <p className="mt-3 text-sm leading-relaxed text-warm/50" style={SANS}>
              An intelligent focus companion for a calmer digital life.
            </p>
            <div className="mt-6 flex gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href="#"
                  aria-label={s.label}
                  className="liquid-glass flex h-9 w-9 items-center justify-center rounded-full text-warm/60 transition-colors duration-300 hover:text-warm"
                >
                  <s.icon />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-col gap-3" style={SANS}>
            <p className="text-xs tracking-[0.25em] text-warm/40 uppercase">Explore</p>
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-warm/60 transition-colors duration-300 hover:text-warm"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="max-w-sm">
            <p className="text-xs tracking-[0.25em] text-warm/40 uppercase" style={SANS}>
              Newsletter
            </p>
            <p className="mt-3 text-sm text-warm/50" style={SANS}>
              One thoughtful letter on focus, monthly. No noise — that would be ironic.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="liquid-glass mt-4 flex items-center rounded-full p-1"
            >
              <input
                type="email"
                placeholder="you@example.com"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm text-warm outline-none placeholder:text-warm/35"
                style={SANS}
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-warm px-4 py-2 text-sm font-medium text-charcoal transition-transform duration-300 hover:scale-105"
                style={SANS}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-16 flex justify-center" style={SANS}>
          <a
            href="https://www.neovibeailabs.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-center text-base tracking-wide text-warm/80 transition-colors duration-300 hover:text-gold-soft sm:text-lg"
          >
            Envisioned by{' '}
            <span className="font-medium text-warm">NeovibeAILabs</span>
            <span className="mx-2 text-warm/40">·</span>
            Ankit Patni
          </a>
        </div>

        <div
          className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 text-xs text-warm/40 sm:flex-row"
          style={SANS}
        >
          <p>© {new Date().getFullYear()} Lumora Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors duration-300 hover:text-warm">
              Privacy
            </a>
            <a href="#" className="transition-colors duration-300 hover:text-warm">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
