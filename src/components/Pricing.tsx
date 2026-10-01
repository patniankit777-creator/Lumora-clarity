import { Check } from 'lucide-react'
import { Magnetic, SectionIntro, trackLight, useRevealScope } from '../lib/ui'
import { SCENE_STILLS, StillBackdrop } from './SceneBackdrop'

const PLANS = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    tagline: 'For your first intentional moments.',
    features: ['3 focus sessions per week', 'Two nature soundscapes', 'Basic habit tracking', 'Reflection journal'],
    cta: 'Start free',
    featured: false,
  },
  {
    name: 'Premium',
    price: '$12',
    period: '/ month',
    tagline: 'The full Lumora practice.',
    features: [
      'Unlimited focus sessions',
      'Complete soundscape library',
      'AI Focus Coach',
      'Progress insights & trends',
      'Offline mode',
      'Priority support',
    ],
    cta: 'Get Premium',
    featured: true,
  },
  {
    name: 'Family',
    price: '$19',
    period: '/ month',
    tagline: 'Calm for up to six people.',
    features: ['Everything in Premium', 'Six member profiles', 'Shared quiet hours', 'Family progress view'],
    cta: 'Choose Family',
    featured: false,
  },
]

export default function Pricing() {
  const scope = useRevealScope<HTMLElement>()

  return (
    <section ref={scope} id="pricing" className="relative overflow-hidden px-5 py-28 sm:px-8 md:py-40">
      {/* Golden Hour still — warm light behind the plans, no playback cost */}
      <StillBackdrop src={SCENE_STILLS.goldenHour} dim={0.78} />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(60%_50%_at_50%_45%,rgba(201,168,118,0.07),transparent_70%)]" />
      <div className="relative mx-auto max-w-6xl">
        <SectionIntro
          eyebrow="Pricing"
          title={
            <>
              An honest price for your <em className="text-gold-soft">attention</em> back.
            </>
          }
        />

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <div
              key={plan.name}
              onMouseMove={trackLight}
              className={`glass-card reveal flex flex-col rounded-3xl p-8 transition-transform duration-500 hover:-translate-y-2 ${
                plan.featured ? 'animate-breathe-glow lg:-my-4 lg:py-12' : ''
              }`}
              style={{
                ['--reveal-delay' as string]: `${i * 140}ms`,
                ...(plan.featured
                  ? { background: 'linear-gradient(165deg, rgba(201,168,118,0.09), rgba(255,255,255,0.02))' }
                  : {}),
              }}
            >
              <div className="card-light" />
              {plan.featured && (
                <span
                  className="mb-4 self-start rounded-full bg-gold/15 px-3 py-1 text-[11px] tracking-[0.2em] text-gold-soft uppercase"
                  style={{ fontFamily: 'system-ui, sans-serif' }}
                >
                  Most loved
                </span>
              )}
              <h3 className="text-2xl text-warm">{plan.name}</h3>
              <p className="mt-4 text-5xl text-warm">
                {plan.price}
                <span className="text-base text-warm/50" style={{ fontFamily: 'system-ui, sans-serif' }}>
                  {' '}
                  {plan.period}
                </span>
              </p>
              <p
                className="mt-2 text-sm text-warm/55"
                style={{ fontFamily: 'system-ui, sans-serif' }}
              >
                {plan.tagline}
              </p>
              <ul className="mt-7 flex-1 space-y-3" style={{ fontFamily: 'system-ui, sans-serif' }}>
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3 text-sm text-warm/70">
                    <Check size={15} className="mt-0.5 shrink-0 text-sage" strokeWidth={2} />
                    {feature}
                  </li>
                ))}
              </ul>
              <Magnetic
                className={`mt-8 w-full rounded-full py-3.5 text-sm font-medium ${
                  plan.featured
                    ? 'bg-warm text-charcoal hover:bg-white'
                    : 'liquid-glass text-warm hover:bg-white/5'
                }`}
              >
                <span style={{ fontFamily: 'system-ui, sans-serif' }}>{plan.cta}</span>
              </Magnetic>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
