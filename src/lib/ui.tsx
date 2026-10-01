import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Observes every `.reveal` element inside the returned ref and adds `.is-visible` on enter. */
export function useRevealScope<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const targets = root.querySelectorAll('.reveal, .timeline-line')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.15 },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}

/** Feeds cursor position into --mx/--my so `.card-light` can follow it. */
export function trackLight(e: React.MouseEvent<HTMLElement>) {
  const el = e.currentTarget
  const rect = el.getBoundingClientRect()
  el.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  el.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

/** Button that leans gently toward the cursor. */
export function Magnetic({
  children,
  className = '',
  strength = 0.2,
  onClick,
}: {
  children: ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}) {
  const ref = useRef<HTMLButtonElement>(null)

  const move = (e: React.MouseEvent) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * strength
    const dy = (e.clientY - (rect.top + rect.height / 2)) * strength
    el.style.transform = `translate(${dx}px, ${dy}px)`
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = 'translate(0, 0)'
  }

  return (
    <button
      ref={ref}
      className={`magnetic ${className}`}
      onMouseMove={move}
      onMouseLeave={reset}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

/** Counts from 0 to `end` once the element scrolls into view. */
export function useCountUp(end: number, opts: { decimals?: number; duration?: number } = {}) {
  const { decimals = 0, duration = 2000 } = opts
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        observer.disconnect()
        const start = performance.now()
        const tick = (now: number) => {
          const t = Math.min(1, (now - start) / duration)
          const eased = 1 - Math.pow(1 - t, 4)
          setValue(end * eased)
          if (t < 1) raf = requestAnimationFrame(tick)
        }
        raf = requestAnimationFrame(tick)
      },
      { threshold: 0.4 },
    )
    observer.observe(el)
    return () => {
      observer.disconnect()
      cancelAnimationFrame(raf)
    }
  }, [end, duration])

  return { ref, text: value.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals }) }
}

/** Shared eyebrow + editorial heading used to open each chapter of the page. */
export function SectionIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
}) {
  return (
    <div className="max-w-3xl">
      <p
        className="reveal mb-5 text-xs tracking-[0.3em] uppercase text-gold/80"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {eyebrow}
      </p>
      <h2 className="reveal text-4xl leading-[1.12] text-warm sm:text-5xl md:text-6xl" style={{ ['--reveal-delay' as string]: '120ms' }}>
        {title}
      </h2>
      {children && (
        <p
          className="reveal mt-6 max-w-xl text-base leading-relaxed text-warm/60"
          style={{ fontFamily: 'system-ui, sans-serif', ['--reveal-delay' as string]: '240ms' }}
        >
          {children}
        </p>
      )}
    </div>
  )
}
