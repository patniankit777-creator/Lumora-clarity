import { useState } from 'react'
import { BellOff, Brain, Leaf, Plus } from 'lucide-react'
import { SectionIntro, trackLight, useRevealScope } from '../lib/ui'
import SceneBackdrop, { SCENE_VIDEOS } from './SceneBackdrop'

const CARDS = [
  {
    icon: BellOff,
    title: 'Disconnect',
    body: 'Step away from constant interruptions and reclaim your mental space.',
    note: 'The cost of the ping',
    article: [
      'The average knowledge worker is interrupted every six minutes — and research from UC Irvine suggests it takes around 23 minutes to fully return to a task after each one. Most of us never actually work in a focused state; we work in the fragments between pings.',
      'Disconnection isn’t about abandoning your phone. It’s about deciding once when the world gets access to you, instead of deciding a hundred times a day.',
      'In Lumora, a Disconnect ritual takes one tap: notifications sleep, tabs quiet down, and a timer holds the door. The first sessions feel strange. By the second week, they feel like oxygen.',
    ],
  },
  {
    icon: Brain,
    title: 'Deep Work',
    body: 'Create uninterrupted sessions where your best ideas naturally emerge.',
    note: 'Where good ideas live',
    article: [
      'Your brain does its best thinking in unbroken stretches of 60–90 minutes — the natural ultradian rhythm your attention already follows. Deep work isn’t a talent; it’s what happens when you stop interrupting that rhythm.',
      'Shallow tasks feel productive because they’re easy to count. But the work that changes your career — the essay, the architecture, the strategy — only surfaces when your attention has had time to descend.',
      'Lumora sessions are shaped around those natural cycles: a gentle start, a protected middle, and a soft landing with room to capture what emerged.',
    ],
  },
  {
    icon: Leaf,
    title: 'Restore',
    body: 'Develop sustainable habits that improve creativity, focus, and overall well-being.',
    note: 'Rest is a skill',
    article: [
      'Attention works like a muscle, and muscles grow during rest, not effort. Studies on attention restoration show that even brief exposure to natural environments measurably rebuilds the capacity to concentrate.',
      'That’s why Lumora’s breaks aren’t just timers — they’re scenes. Water, forest, dawn light: the environments your nervous system reads as safety.',
      'Sustainable focus isn’t a 30-day sprint. It’s a rhythm of effort and recovery you can keep for years — which is the only kind of habit that matters.',
    ],
  },
]

export default function WhyFocus() {
  const scope = useRevealScope<HTMLElement>()
  const [open, setOpen] = useState<number | null>(null)

  return (
    <section ref={scope} className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      {/* Golden Hour — the warm light this chapter argues for */}
      <SceneBackdrop src={SCENE_VIDEOS.goldenHour} dim={0.74} />
      <div className="relative mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Why focus matters"
          title={
            <>
              Your attention is your most <em className="text-gold-soft">valuable</em> resource.
            </>
          }
        >
          Every ping spends a little of it. Lumora helps you spend it on purpose.
        </SectionIntro>

        <div className="mt-16 grid items-start gap-6 md:grid-cols-3">
          {CARDS.map((card, i) => {
            const isOpen = open === i
            return (
              <div
                key={card.title}
                role="button"
                tabIndex={0}
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    setOpen(isOpen ? null : i)
                  }
                }}
                onMouseMove={trackLight}
                className="glass-card reveal cursor-pointer rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2"
                style={{ ['--reveal-delay' as string]: `${i * 140}ms` }}
              >
                <div className="card-light" />
                <div className="flex items-start justify-between">
                  <card.icon className="feature-icon text-sage" size={26} strokeWidth={1.5} />
                  <Plus
                    size={18}
                    className={`text-gold-soft transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`}
                  />
                </div>
                <h3 className="mt-6 text-2xl text-warm">{card.title}</h3>
                <p
                  className="mt-3 text-sm leading-relaxed text-warm/70"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {card.body}
                </p>

                {/* Field note — a small blog that opens inside the card */}
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <div>
                    <div className="mt-6 border-t border-white/10 pt-6">
                      <p className="text-lg italic text-gold-soft">{card.note}</p>
                      {card.article.map((paragraph) => (
                        <p
                          key={paragraph.slice(0, 24)}
                          className="mt-4 text-sm leading-relaxed text-warm/70"
                          style={{ fontFamily: 'system-ui, sans-serif' }}
                        >
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                </div>

                <p
                  className="mt-6 text-[11px] tracking-[0.25em] text-warm/45 uppercase"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  {isOpen ? 'Close the note' : 'Read the field note'}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
