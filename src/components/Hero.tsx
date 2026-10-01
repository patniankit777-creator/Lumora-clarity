import { useRef, useState } from 'react'
import { Menu, Play, X } from 'lucide-react'

const VIDEOS = [
  '/videos/goldenHour.mp4',
  '/videos/stillWater.mp4',
  '/videos/deepWoods.mp4',
  '/videos/quietDawn.mp4',
]

const OVERLAY_PNG = '/overlay.png'

const VIDEO_LABELS = ['Golden Hour', 'Still Water', 'Deep Woods', 'Quiet Dawn']

/* Each scene subtly tints the interface glow while keeping the dark aesthetic */
const MOOD_TINTS = [
  'rgba(226, 185, 120, 0.16)', // Golden Hour
  'rgba(140, 180, 205, 0.14)', // Still Water
  'rgba(126, 168, 136, 0.14)', // Deep Woods
  'rgba(219, 173, 160, 0.14)', // Quiet Dawn
]

const NAV_LINKS = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Experience', href: '#experience' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Community', href: '#community' },
]

const STATS = ['60+ Deep Sessions', '12,000+ Creators', '4.8 User Satisfaction', 'Intentional-First Design']

const SANS = { fontFamily: 'system-ui, sans-serif' } as const

export default function Hero() {
  const [activeVideo, setActiveVideo] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const isTransitioning = useRef(false)

  // "Deep Woods" (index 2) shifts hero content to a dark ink color
  const isDark = activeVideo === 2
  const contentColor = isDark ? '#182C41' : '#f5f1e8'
  const contentMuted = isDark ? 'rgba(24, 44, 65, 0.75)' : 'rgba(245, 241, 232, 0.75)'

  const switchVideo = (index: number) => {
    if (index === activeVideo || isTransitioning.current) return
    isTransitioning.current = true
    setActiveVideo(index)
    window.setTimeout(() => {
      isTransitioning.current = false
    }, 1000)
  }

  const scrollTo = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Background video layer */}
      {VIDEOS.map((src, i) => (
        <video
          key={src}
          src={src}
          autoPlay
          muted
          loop
          playsInline
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out ${
            activeVideo === i ? 'opacity-100' : 'opacity-0'
          }`}
        />
      ))}

      {/* Mood tint — each scene gently colors the interface light */}
      <div
        className="pointer-events-none absolute inset-0 transition-[background] duration-1000"
        style={{
          background: `radial-gradient(120% 90% at 50% 100%, ${MOOD_TINTS[activeVideo]}, transparent 60%)`,
        }}
      />

      {/* Transparent PNG overlay */}
      <img
        src={OVERLAY_PNG}
        alt=""
        aria-hidden
        className="animate-train-bob pointer-events-none absolute inset-0 z-[1] h-full w-full object-cover"
      />

      {/* Content layer */}
      <div className="relative z-[2] flex h-full flex-col px-5 py-5 sm:px-8 sm:py-6">
        {/* Navigation */}
        <nav className="flex items-center justify-between">
          <a href="#" className="text-xl italic text-white sm:text-2xl">
            Lumora
          </a>

          {/* Desktop nav pill */}
          <div className="liquid-glass hidden items-center gap-1 rounded-full py-1.5 pr-1.5 pl-5 md:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className="px-3 text-sm text-white/90 transition-colors duration-300 hover:text-white"
                style={SANS}
              >
                {link.label}
              </a>
            ))}
            <button
              className="ml-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-charcoal transition-transform duration-300 hover:scale-105"
              style={SANS}
            >
              Get Started
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(true)}
            className="liquid-glass relative flex h-10 w-10 items-center justify-center rounded-full text-white md:hidden"
            aria-label="Open menu"
          >
            <Menu
              size={18}
              className={`transition-all duration-300 ${menuOpen ? 'rotate-90 scale-75 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}
            />
            <X
              size={18}
              className={`absolute transition-all duration-300 ${menuOpen ? 'rotate-0 scale-100 opacity-100' : '-rotate-90 scale-75 opacity-0'}`}
            />
          </button>
        </nav>

        {/* Mobile menu overlay */}
        <div
          className={`fixed inset-0 z-50 md:hidden ${menuOpen ? 'pointer-events-auto' : 'pointer-events-none'}`}
        >
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-500 ${menuOpen ? 'opacity-100' : 'opacity-0'}`}
            onClick={() => setMenuOpen(false)}
          />
          <div
            className="relative flex h-full flex-col items-center justify-center gap-8 transition-opacity duration-500"
            style={{
              opacity: menuOpen ? 1 : 0,
              transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
            }}
          >
            <button
              onClick={() => setMenuOpen(false)}
              className="liquid-glass absolute top-5 right-5 flex h-10 w-10 items-center justify-center rounded-full text-white"
              aria-label="Close menu"
            >
              <X size={18} />
            </button>
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(link.href)
                }}
                className="text-3xl text-white transition-all duration-500"
                style={{
                  transitionDelay: `${100 + i * 50}ms`,
                  transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                  transform: menuOpen ? 'translateY(0)' : 'translateY(1rem)',
                  opacity: menuOpen ? 1 : 0,
                }}
              >
                {link.label}
              </a>
            ))}
            <button
              className="mt-4 rounded-full bg-white px-8 py-3 text-sm font-medium text-charcoal transition-all duration-500"
              style={{
                ...SANS,
                transitionDelay: '300ms',
                transitionTimingFunction: 'cubic-bezier(0.4,0,0.2,1)',
                transform: menuOpen ? 'scale(1)' : 'scale(0.9)',
                opacity: menuOpen ? 1 : 0,
              }}
            >
              Get Started
            </button>
          </div>
        </div>

        {/* Hero content */}
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          {/* Badge */}
          <div
            className="liquid-glass rounded-full px-4 py-2 text-xs transition-colors duration-700 sm:text-sm"
            style={{ ...SANS, color: contentMuted }}
          >
            Trusted by 10,000+ professionals building a calmer digital life
          </div>

          {/* Headline */}
          <h1
            className="mt-6 max-w-4xl text-4xl leading-[1.1] transition-colors duration-700 sm:text-5xl md:text-7xl lg:text-[5.5rem]"
            style={{ color: contentColor }}
          >
            Find Clarity in an <em>Endlessly</em>
            <br />
            Noisy World
          </h1>

          {/* Subheading */}
          <p
            className="mt-6 max-w-xl text-sm leading-relaxed transition-colors duration-700 sm:text-base"
            style={{ ...SANS, color: contentMuted }}
          >
            Escape constant distractions, endless notifications, and digital overload. Build a
            healthier relationship with technology and rediscover your best thinking.
          </p>

          {/* Email capture + secondary CTA */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="liquid-glass flex w-full max-w-[320px] items-center rounded-full p-1.5 sm:max-w-sm"
            >
              <input
                type="email"
                placeholder="Your Best Email"
                className="min-w-0 flex-1 bg-transparent px-4 text-sm outline-none transition-colors duration-700 placeholder:opacity-60"
                style={{ ...SANS, color: contentColor }}
              />
              <button
                type="submit"
                className="shrink-0 rounded-full bg-white px-4 py-2.5 text-sm font-medium whitespace-nowrap text-charcoal transition-transform duration-300 hover:scale-105"
                style={SANS}
              >
                Get Early Access
              </button>
            </form>

            <button
              className="group flex items-center gap-2 text-sm transition-colors duration-700"
              style={{ ...SANS, color: contentMuted }}
            >
              <span className="liquid-glass flex h-8 w-8 items-center justify-center rounded-full transition-transform duration-300 group-hover:scale-110">
                <Play size={12} fill="currentColor" />
              </span>
              Watch Experience
            </button>
          </div>

          {/* Video switcher — glass pill keeps labels legible over any scene */}
          <div
            className="liquid-glass mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 rounded-full px-6 py-3"
            style={SANS}
          >
            {/* Always white — the pill sits over the dark frame, so the ink
                dark-mode color would vanish here on every scene */}
            {VIDEO_LABELS.map((label, i) => (
              <button
                key={label}
                onClick={() => switchVideo(i)}
                className={`border-b pb-0.5 text-xs tracking-wide text-white transition-all duration-500 sm:text-sm ${
                  activeVideo === i
                    ? 'border-white opacity-100'
                    : 'border-transparent opacity-60 hover:opacity-90'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div
          className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs text-white/70 sm:text-sm"
          style={SANS}
        >
          {STATS.map((stat, i) => (
            <span key={stat} className="flex items-center gap-4">
              {i > 0 && <span className="hidden text-white/30 sm:inline">|</span>}
              {stat}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
