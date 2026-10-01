import { CircleDot, RotateCcw, Target, Waves } from 'lucide-react'
import { SectionIntro, useRevealScope } from '../lib/ui'
import SceneBackdrop, { SCENE_VIDEOS } from './SceneBackdrop'

const STEPS = [
  {
    icon: CircleDot,
    title: 'Pause',
    body: 'One breath before anything else. Lumora opens with stillness, not a dashboard.',
  },
  {
    icon: RotateCcw,
    title: 'Reset',
    body: 'Notifications fade out, tabs go quiet, and your environment settles around one task.',
  },
  {
    icon: Target,
    title: 'Focus',
    body: 'A protected session begins — timed, soundscaped, and shaped to how you work best.',
  },
  {
    icon: Waves,
    title: 'Flow',
    body: 'Attention deepens on its own. Sessions end gently, and what you learned carries forward.',
  },
]

export default function HowItWorks() {
  const scope = useRevealScope<HTMLElement>()

  return (
    <section ref={scope} id="how-it-works" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      {/* Deep Woods — a walk through the four movements */}
      <SceneBackdrop src={SCENE_VIDEOS.deepWoods} dim={0.82} />
      <div className="relative mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="How Lumora works"
          title={
            <>
              Four movements toward a <em className="text-gold-soft">quieter</em> mind.
            </>
          }
        />

        <div className="relative mx-auto mt-20 max-w-2xl">
          {/* Glowing connector */}
          <div className="timeline-line absolute top-6 bottom-6 left-[27px] w-px" />

          <ol className="space-y-16">
            {STEPS.map((step, i) => (
              <li
                key={step.title}
                className="reveal flex items-start gap-8"
                style={{ ['--reveal-delay' as string]: `${i * 160}ms` }}
              >
                <span className="liquid-glass animate-breathe-glow relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-charcoal/60 text-gold-soft">
                  <step.icon size={22} strokeWidth={1.5} />
                </span>
                <div className="pt-1">
                  <p
                    className="text-[11px] tracking-[0.3em] text-sage/70 uppercase"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    Movement {i + 1}
                  </p>
                  <h3 className="mt-1 text-3xl text-warm">{step.title}</h3>
                  <p
                    className="mt-3 max-w-md text-sm leading-relaxed text-warm/60"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {step.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
