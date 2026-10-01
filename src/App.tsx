import { useEffect, useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import Hero from './components/Hero'
import WhyFocus from './components/WhyFocus'
import Experience from './components/Experience'
import HowItWorks from './components/HowItWorks'
import Results from './components/Results'
import Testimonials from './components/Testimonials'
import Pricing from './components/Pricing'
import Faq from './components/Faq'
import FinalCta from './components/FinalCta'
import Footer from './components/Footer'

export default function App() {
  const heroShell = useRef<HTMLDivElement>(null)
  const heroInner = useRef<HTMLDivElement>(null)
  const backTop = useRef<HTMLButtonElement>(null)

  /*
   * Hero scale-away, written straight to the DOM: no React re-render per
   * scroll frame. Once the story fully covers the hero, its four videos
   * pause and the layer is hidden so it costs nothing while reading.
   */
  useEffect(() => {
    let raf = 0
    let parked = false
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const shell = heroShell.current
        const inner = heroInner.current
        if (!shell || !inner) return
        const progress = Math.min(1, window.scrollY / window.innerHeight)
        inner.style.transform = `scale(${1 - progress * 0.08})`
        inner.style.opacity = `${1 - progress * 0.6}`
        const shouldPark = progress >= 1
        if (shouldPark !== parked) {
          parked = shouldPark
          shell.style.visibility = shouldPark ? 'hidden' : 'visible'
          shell.querySelectorAll('video').forEach((video) => {
            if (shouldPark) video.pause()
            else video.play().catch(() => {})
          })
          // The hero nav hides with the hero — offer a way home instead
          const btn = backTop.current
          if (btn) {
            btn.style.opacity = shouldPark ? '1' : '0'
            btn.style.pointerEvents = shouldPark ? 'auto' : 'none'
          }
        }
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <main className="bg-charcoal">
      {/* Hero stays pinned and gently scales down as the story scrolls over it */}
      <div ref={heroShell} className="sticky top-0 h-screen">
        <div ref={heroInner} className="h-full will-change-transform">
          <Hero />
        </div>
      </div>

      <div className="relative z-10 bg-charcoal shadow-[0_-40px_80px_rgba(0,0,0,0.55)]">
        {/* Film grain unifies scene sections and dark panels into one surface */}
        <div className="grain" aria-hidden />
        <WhyFocus />
        <Experience />
        <HowItWorks />
        <Results />
        <Testimonials />
        <Pricing />
        <Faq />
        <FinalCta />
        <Footer />
      </div>

      <button
        ref={backTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
        className="liquid-glass fixed right-5 bottom-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-charcoal/40 text-warm transition-[opacity,transform] duration-500 hover:scale-110 sm:right-8 sm:bottom-8"
        style={{ opacity: 0, pointerEvents: 'none' }}
      >
        <ArrowUp size={18} strokeWidth={1.5} />
      </button>
    </main>
  )
}
