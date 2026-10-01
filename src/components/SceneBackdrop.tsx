import { useEffect, useRef, type CSSProperties } from 'react'

/* Same four scenes as the hero — the whole page lives in one world.
   Self-hosted in public/videos so the site never depends on an external CDN. */
export const SCENE_VIDEOS = {
  goldenHour: '/videos/goldenHour.mp4',
  stillWater: '/videos/stillWater.mp4',
  deepWoods: '/videos/deepWoods.mp4',
  quietDawn: '/videos/quietDawn.mp4',
} as const

/* Still frames extracted from the same footage — posters and static backdrops */
export const SCENE_STILLS = {
  goldenHour: '/scenes/goldenHour.jpg',
  stillWater: '/scenes/stillWater.jpg',
  deepWoods: '/scenes/deepWoods.jpg',
  quietDawn: '/scenes/quietDawn.jpg',
} as const

const POSTER_FOR_VIDEO: Record<string, string> = {
  [SCENE_VIDEOS.goldenHour]: SCENE_STILLS.goldenHour,
  [SCENE_VIDEOS.stillWater]: SCENE_STILLS.stillWater,
  [SCENE_VIDEOS.deepWoods]: SCENE_STILLS.deepWoods,
  [SCENE_VIDEOS.quietDawn]: SCENE_STILLS.quietDawn,
}

/**
 * Static image scene behind a section — zero playback cost. Use for
 * chapters that want atmosphere without motion.
 */
export function StillBackdrop({
  src,
  dim = 0.8,
  edges = true,
}: {
  src: string
  dim?: number
  edges?: boolean
}) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
      <div className="absolute inset-0" style={{ background: `rgba(10, 12, 11, ${dim})` }} />
      {edges && (
        <>
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        </>
      )}
    </div>
  )
}

/**
 * Ambient video scene behind a section. Heavily dimmed to keep the dark
 * editorial aesthetic; pauses automatically while off screen. The matching
 * still frame is set as poster so the scene can never render blank, even
 * if the browser runs out of video decoders.
 */
export default function SceneBackdrop({
  src,
  dim = 0.74,
  blur = false,
  edges = true,
  videoStyle,
}: {
  src: string
  /** 0–1 charcoal overlay strength */
  dim?: number
  /** soften the scene so foreground type stays the subject */
  blur?: boolean
  /** fade top/bottom into charcoal so sections blend into each other */
  edges?: boolean
  videoStyle?: CSSProperties
}) {
  const ref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {})
        else video.pause()
      },
      { rootMargin: '200px' },
    )
    observer.observe(video)
    return () => observer.disconnect()
  }, [])

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]">
      <video
        ref={ref}
        src={src}
        poster={POSTER_FOR_VIDEO[src]}
        muted
        loop
        playsInline
        preload="metadata"
        className={`h-full w-full object-cover ${blur ? 'scale-110 blur-[8px]' : ''}`}
        style={videoStyle}
      />
      <div className="absolute inset-0" style={{ background: `rgba(10, 12, 11, ${dim})` }} />
      {edges && (
        <>
          <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-charcoal via-charcoal/70 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent" />
        </>
      )}
    </div>
  )
}
