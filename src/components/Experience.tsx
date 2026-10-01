import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { ArrowLeft, ArrowRight, AudioLines, NotebookPen, Sunrise, Timer, Wind } from 'lucide-react'
import { SectionIntro, useRevealScope } from '../lib/ui'
import SceneBackdrop, { SCENE_VIDEOS } from './SceneBackdrop'

const SCENES: {
  icon: typeof Wind
  title: string
  body: string
  video: string
  videoStyle?: CSSProperties
}[] = [
  {
    icon: Wind,
    title: 'Guided breathing',
    body: 'Slow, guided rhythms that settle your nervous system before deep work.',
    video: SCENE_VIDEOS.stillWater,
  },
  {
    icon: Timer,
    title: 'Focus timer',
    body: 'Intentional sessions with gentle starts and soft landings — never a jarring alarm.',
    video: SCENE_VIDEOS.goldenHour,
  },
  {
    icon: AudioLines,
    title: 'Nature soundscapes',
    body: 'Rainfall, forest wind, and distant water — recorded, not synthesized.',
    video: SCENE_VIDEOS.deepWoods,
  },
  {
    icon: Sunrise,
    title: 'Daily rituals',
    body: 'Small, repeatable moments that open and close each day with intention.',
    video: SCENE_VIDEOS.quietDawn,
  },
  {
    icon: NotebookPen,
    title: 'Reflection journal',
    body: 'A quiet page at the end of every session to capture what surfaced.',
    video: SCENE_VIDEOS.deepWoods,
    // Same forest, later in the evening — reads as its own scene
    videoStyle: { filter: 'brightness(0.55) saturate(0.8) hue-rotate(15deg)', objectPosition: '70% 50%' },
  },
]

export default function Experience() {
  const scope = useRevealScope<HTMLElement>()
  const trackRef = useRef<HTMLDivElement>(null)
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(true)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    let raf = 0
    const update = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        setCanPrev(track.scrollLeft > 8)
        setCanNext(track.scrollLeft < track.scrollWidth - track.clientWidth - 8)
      })
    }
    update()
    track.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      track.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
      cancelAnimationFrame(raf)
    }
  }, [])

  const nudge = (dir: 1 | -1) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: dir * Math.min(track.clientWidth * 0.8, 740), behavior: 'smooth' })
  }

  return (
    <section ref={scope} id="experience" className="relative py-28 md:py-40">
      <div className="px-5 sm:px-8">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            eyebrow="The experience"
            title={
              <>
                Scenes from a <em className="text-gold-soft">quieter</em> day.
              </>
            }
          >
            Swipe through, or use the arrows — each scene is a real moment inside Lumora.
          </SectionIntro>
        </div>
      </div>

      {/* Free-scrolling rail: drag, swipe, or arrows — cards snap into place */}
      <div
        ref={trackRef}
        className="no-scrollbar mt-14 flex snap-x snap-mandatory gap-6 overflow-x-auto pr-5 sm:pr-8"
        style={{
          paddingLeft: 'max(1.25rem, calc((100vw - 72rem) / 2))',
          scrollPaddingLeft: 'max(1.25rem, calc((100vw - 72rem) / 2))',
        }}
      >
        {SCENES.map((scene) => (
          <article
            key={scene.title}
            className="glass-card group relative h-[380px] w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl p-7 sm:h-[420px] sm:w-[340px]"
          >
            {/* The scene itself, living inside the card */}
            <SceneBackdrop src={scene.video} dim={0.18} edges={false} videoStyle={scene.videoStyle} />
            {/* Legibility gradient for the caption */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4/5 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />

            <div className="relative flex h-full flex-col justify-end transition-transform duration-700 group-hover:-translate-y-2">
              <scene.icon className="text-gold-soft" size={28} strokeWidth={1.5} />
              <h3 className="mt-5 text-2xl text-warm sm:text-3xl">{scene.title}</h3>
              <p
                className="mt-3 text-sm leading-relaxed text-warm/75"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {scene.body}
              </p>
            </div>
          </article>
        ))}
      </div>

      {/* Arrows below the rail */}
      <div className="mt-10 flex items-center justify-center gap-4">
        <button
          onClick={() => nudge(-1)}
          disabled={!canPrev}
          aria-label="Previous scenes"
          className={`liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-warm transition-all duration-300 ${
            canPrev ? 'hover:scale-110' : 'cursor-default opacity-30'
          }`}
        >
          <ArrowLeft size={18} strokeWidth={1.5} />
        </button>
        <button
          onClick={() => nudge(1)}
          disabled={!canNext}
          aria-label="Next scenes"
          className={`liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-warm transition-all duration-300 ${
            canNext ? 'hover:scale-110' : 'cursor-default opacity-30'
          }`}
        >
          <ArrowRight size={18} strokeWidth={1.5} />
        </button>
      </div>
    </section>
  )
}
