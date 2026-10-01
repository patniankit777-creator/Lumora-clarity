import { useCountUp, useRevealScope } from '../lib/ui'
import SceneBackdrop, { SCENE_VIDEOS } from './SceneBackdrop'

function Stat({
  end,
  decimals = 0,
  suffix,
  label,
  delay,
}: {
  end: number
  decimals?: number
  suffix: string
  label: string
  delay: number
}) {
  const { ref, text } = useCountUp(end, { decimals })

  return (
    <div className="reveal text-center" style={{ ['--reveal-delay' as string]: `${delay}ms` }}>
      <p className="text-5xl text-warm tabular-nums sm:text-6xl md:text-7xl">
        <span ref={ref}>{text}</span>
        <span className="text-gold-soft">{suffix}</span>
      </p>
      <p
        className="mt-3 text-xs tracking-[0.25em] text-warm/50 uppercase"
        style={{ fontFamily: 'system-ui, sans-serif' }}
      >
        {label}
      </p>
    </div>
  )
}

export default function Results() {
  const scope = useRevealScope<HTMLElement>()

  return (
    <section ref={scope} className="relative overflow-hidden px-5 py-32 sm:px-8 md:py-44">
      {/* Still Water — calm surface under the numbers */}
      <SceneBackdrop src={SCENE_VIDEOS.stillWater} dim={0.7} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_50%_at_50%_50%,rgba(201,168,118,0.07),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-6xl gap-14 sm:grid-cols-2 lg:grid-cols-4">
        <Stat end={10000} suffix="+" label="Active Members" delay={0} />
        <Stat end={91} suffix="%" label="Improved Daily Focus" delay={120} />
        <Stat end={4.9} decimals={1} suffix="★" label="Average Rating" delay={240} />
        <Stat end={2.5} decimals={1} suffix="M+" label="Minutes of Deep Work" delay={360} />
      </div>
    </section>
  )
}
