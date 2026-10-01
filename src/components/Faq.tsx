import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SectionIntro, useRevealScope } from '../lib/ui'
import { SCENE_STILLS, StillBackdrop } from './SceneBackdrop'

const QUESTIONS = [
  {
    q: 'What is Lumora, and how will it help me?',
    a: 'Lumora is an intelligent focus companion — not another meditation app. It helps you create intentional, distraction-free time: protected deep work sessions, guided breathing, nature soundscapes, and a reflection journal, with an AI coach that learns when you think best and quietly protects those hours. Members typically report calmer days, longer stretches of uninterrupted focus, and a healthier relationship with their devices within the first few weeks.',
  },
  {
    q: 'Can I cancel my subscription anytime?',
    a: 'Yes. Subscriptions are month-to-month, and you can cancel in two taps from settings. You keep full access until the end of your billing period, and your journal and progress history stay yours forever.',
  },
  {
    q: 'What happens to my journal entries and session data?',
    a: 'Everything you write is encrypted end-to-end and stored on your device first. We never read, sell, or train models on your reflections. You can export or permanently delete all of your data at any time.',
  },
  {
    q: 'Does Lumora work offline?',
    a: 'Premium and Family members can download soundscapes, guided sessions, and rituals for fully offline use — designed exactly for flights, cabins, and anywhere you go to disconnect.',
  },
  {
    q: 'Which devices does Lumora support?',
    a: 'Lumora runs on iOS, Android, macOS, and Windows, with a companion web app. Sessions sync seamlessly, so a focus block started at your desk can end on a walk.',
  },
  {
    q: 'How does the Family membership work?',
    a: 'One subscription covers up to six people, each with a private profile and private journal. You can optionally share quiet hours — overlapping times when the whole household goes heads-down together.',
  },
  {
    q: 'Is the AI Focus Coach watching everything I do?',
    a: 'No. The coach only sees signals you explicitly share — session times, self-rated focus, and habits you track. It runs its analysis on-device wherever possible and never accesses your screen, messages, or browsing.',
  },
]

export default function Faq() {
  const scope = useRevealScope<HTMLElement>()
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section ref={scope} className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      {/* Quiet Dawn still — the day settles as the questions do */}
      <StillBackdrop src={SCENE_STILLS.quietDawn} dim={0.82} />
      <div className="relative mx-auto max-w-3xl">
        <SectionIntro
          eyebrow="Questions"
          title={
            <>
              Asked, <em className="text-gold-soft">answered</em>.
            </>
          }
        />

        <div className="mt-14 space-y-4">
          {QUESTIONS.map((item, i) => {
            const isOpen = open === i
            return (
              <div
                key={item.q}
                className="glass-card reveal rounded-2xl"
                style={{ ['--reveal-delay' as string]: `${i * 80}ms` }}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="text-lg text-warm sm:text-xl">{item.q}</span>
                  <Plus
                    size={18}
                    className={`shrink-0 text-gold-soft transition-transform duration-500 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
                <div className={`faq-answer ${isOpen ? 'open' : ''}`}>
                  <div>
                    <p
                      className="px-6 pb-6 text-sm leading-relaxed text-warm/60"
                      style={{ fontFamily: 'system-ui, sans-serif' }}
                    >
                      {item.a}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
