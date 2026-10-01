import { Magnetic, useRevealScope } from '../lib/ui'
import SceneBackdrop, { SCENE_VIDEOS } from './SceneBackdrop'

export default function FinalCta() {
  const scope = useRevealScope<HTMLElement>()

  return (
    <section ref={scope} className="relative overflow-hidden px-5 py-36 text-center sm:px-8 md:py-52">
      {/* Quiet Dawn — the story ends where a calmer day begins */}
      <SceneBackdrop src={SCENE_VIDEOS.quietDawn} dim={0.68} />
      {/* Drifting spotlight */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="animate-spotlight h-[70vmin] w-[70vmin] rounded-full bg-[radial-gradient(circle,rgba(201,168,118,0.14),rgba(143,163,148,0.05)_45%,transparent_70%)] blur-2xl" />
      </div>

      <div className="relative mx-auto max-w-3xl">
        <h2 className="reveal text-4xl leading-[1.15] text-warm sm:text-5xl md:text-6xl">
          A calmer mind begins with one <em className="text-gold-soft">intentional</em> moment.
        </h2>
        <p
          className="reveal mx-auto mt-6 max-w-xl text-base leading-relaxed text-warm/60"
          style={{ fontFamily: 'system-ui, sans-serif', ['--reveal-delay' as string]: '160ms' }}
        >
          Join thousands creating healthier digital habits and discovering the power of focused
          living.
        </p>
        <div className="reveal mt-10" style={{ ['--reveal-delay' as string]: '320ms' }}>
          <Magnetic className="animate-breathe-glow rounded-full bg-warm px-10 py-4 text-base font-medium text-charcoal hover:bg-white">
            <span style={{ fontFamily: 'system-ui, sans-serif' }}>Start Your Journey</span>
          </Magnetic>
        </div>
      </div>
    </section>
  )
}
