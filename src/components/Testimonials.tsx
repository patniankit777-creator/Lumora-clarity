import { SectionIntro, trackLight, useRevealScope } from '../lib/ui'

const TESTIMONIALS = [
  {
    name: 'Maya Chen',
    role: 'Product Designer, Figma',
    quote:
      'I used to end every day feeling like my attention had been spent by everyone but me. Three weeks with Lumora and my mornings belong to my own work again.',
    tone: 'from-sage/40 to-sage-deep/40',
    float: 'animate-float-a',
  },
  {
    name: 'Daniel Okafor',
    role: 'Novelist',
    quote:
      'The focus timer is the first one that doesn’t feel like a stopwatch pointed at my head. Sessions end like a piece of music ending.',
    tone: 'from-gold/40 to-gold-soft/30',
    float: 'animate-float-b',
  },
  {
    name: 'Priya Raghavan',
    role: 'Engineering Lead, Stripe',
    quote:
      'My team noticed before I told them. Fewer scattered replies, more finished thinking. The reflection journal is where my best decisions start now.',
    tone: 'from-sage/40 to-gold/30',
    float: 'animate-float-c',
  },
  {
    name: 'Tomás Rivera',
    role: 'Architect',
    quote:
      'Deep Woods on, phone in the drawer, ninety minutes gone in what feels like ten. I forgot work could feel like this.',
    tone: 'from-gold-soft/30 to-sage-deep/40',
    float: 'animate-float-b',
  },
  {
    name: 'Elise Fournier',
    role: 'PhD Candidate, Neuroscience',
    quote:
      'As someone who studies attention for a living: the pacing of these sessions is genuinely well designed. And it’s the only app I don’t resent opening.',
    tone: 'from-sage-deep/40 to-sage/40',
    float: 'animate-float-a',
  },
  {
    name: 'Jordan Blake',
    role: 'Founder, two-person startup',
    quote:
      'I bought it for the habit tracking and stayed for the quiet. It’s the least demanding piece of software I own.',
    tone: 'from-gold/30 to-sage/40',
    float: 'animate-float-c',
  },
]

export default function Testimonials() {
  const scope = useRevealScope<HTMLElement>()

  return (
    <section ref={scope} id="community" className="relative px-5 py-28 sm:px-8 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_40%_at_85%_10%,rgba(143,163,148,0.08),transparent_65%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Community"
          title={
            <>
              Quiet minds, <em className="text-gold-soft">loud</em> results.
            </>
          }
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <figure
              key={t.name}
              onMouseMove={trackLight}
              className={`glass-card reveal rounded-3xl p-7 ${t.float}`}
              style={{ ['--reveal-delay' as string]: `${(i % 3) * 130}ms` }}
            >
              <div className="card-light" />
              <blockquote
                className="text-sm leading-relaxed text-warm/75"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                “{t.quote}”
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span
                  className={`flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br text-sm text-warm ${t.tone}`}
                >
                  {t.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </span>
                <span>
                  <span className="block text-base text-warm">{t.name}</span>
                  <span
                    className="block text-xs text-warm/50"
                    style={{ fontFamily: 'system-ui, sans-serif' }}
                  >
                    {t.role}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
