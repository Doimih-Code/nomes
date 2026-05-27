'use client'

import { useEffect, useState } from 'react'
import Navigation from '@/components/navigation'
import FallingDotIndicator from '@/components/falling-dot-indicator'
import { Cormorant_Garamond } from 'next/font/google'
import { motion } from 'motion/react'

const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
})

const heroStats = [
  { number: '15+', label: 'ANI EXPERIENTA' },
  { number: '8+', label: 'BRANDURI MAJORE' },
  { number: '100+', label: 'CAMPANII GESTIONATE' },
  { number: '1ZI', label: 'APLICABIL IMEDIAT' },
]

type SliderOrientation = 'landscape' | 'portrait'

type SliderPlaceholder = {
  id: string
  orientation: SliderOrientation
  title: string
  caption: string
}

type SliderPage = {
  items: SliderPlaceholder[]
  caption: string
}

const sliderPlaceholders: SliderPlaceholder[] = [
  {
    id: 'ph-01',
    orientation: 'portrait',
    title: 'Placeholder 1 · Portrait',
    caption: 'Cadru portrait · studiu de caz',
  },
  {
    id: 'ph-02',
    orientation: 'portrait',
    title: 'Placeholder 2 · Portrait',
    caption: 'Cadru portrait · execuție practică',
  },
  {
    id: 'ph-03',
    orientation: 'portrait',
    title: 'Placeholder 3 · Portrait',
    caption: 'Cadru portrait · funnel setup',
  },
  {
    id: 'ph-04',
    orientation: 'portrait',
    title: 'Placeholder 4 · Portrait',
    caption: 'Cadru portrait · strategie și conversii',
  },
  {
    id: 'ph-05',
    orientation: 'landscape',
    title: 'Placeholder 5 · Landscape',
    caption: 'Cadru landscape · workshop și exemple reale',
  },
  {
    id: 'ph-06',
    orientation: 'portrait',
    title: 'Placeholder 6 · Portrait',
    caption: 'Cadru portrait · optimizare rapidă',
  },
  {
    id: 'ph-07',
    orientation: 'portrait',
    title: 'Placeholder 7 · Portrait',
    caption: 'Cadru portrait · creativ și hook',
  },
  {
    id: 'ph-08',
    orientation: 'portrait',
    title: 'Placeholder 8 · Portrait',
    caption: 'Cadru portrait · audit reclame',
  },
  {
    id: 'ph-09',
    orientation: 'portrait',
    title: 'Placeholder 9 · Portrait',
    caption: 'Cadru portrait · structură campanie',
  },
  {
    id: 'ph-10',
    orientation: 'landscape',
    title: 'Placeholder 10 · Landscape',
    caption: 'Cadru landscape · aplicabil imediat',
  },
]

function buildSliderPages(items: SliderPlaceholder[]): SliderPage[] {
  const pages: SliderPage[] = []

  for (let index = 0; index < items.length; index += 1) {
    const current = items[index]

    if (current.orientation === 'portrait') {
      const group: SliderPlaceholder[] = [current]

      while (
        index + group.length < items.length &&
        items[index + group.length].orientation === 'portrait' &&
        group.length < 4
      ) {
        group.push(items[index + group.length])
      }

      pages.push({
        items: group,
        caption: group.map((item) => item.caption).join(' · '),
      })
      index += group.length - 1
      continue
    }

    pages.push({
      items: [current],
      caption: current.caption,
    })
  }

  return pages
}

const sliderPages = buildSliderPages(sliderPlaceholders)

const expertTags = [
  'Meta Ads',
  'Google Ads',
  'Lead Generation',
  'E-commerce',
  'Funnels',
  'AI & ChatGPT',
  'WhatsApp',
  'Content',
]

const audiencePoints = [
  'Vrei să înțelegi cum funcționează marketingul digital în realitate',
  'Ai un business și vrei mai multe lead-uri sau vânzări',
  'Lucrezi în marketing și simți că "știi teoria", dar nu execuția',
  'Vrei să începi în digital marketing fără cursuri complicate și generale',
  'Ai încercat reclame și "nu au mers"',
  'Vrei să înțelegi cum gândesc campaniile oamenii care fac asta zilnic',
]

const differentiators = [
  { icon: '✅', title: 'Ce funcționează', desc: 'Metode testate în business-uri active' },
  { icon: '❌', title: 'Ce nu funcționează', desc: 'Greșeli reale și cum le eviți' },
  { icon: '💸', title: 'Unde se pierd bani', desc: 'Capcanele comune în campanii' },
  { icon: '⚡', title: 'Cum optimizezi rapid', desc: 'Fără să complici tot procesul' },
]

const formatItems = [
  { icon: '🏙️', text: 'Workshop live în București' },
  { icon: '👥', text: 'Grup restrâns' },
  { icon: '💡', text: 'Exemple reale & sesiuni practice' },
  { icon: '❓', text: 'Întrebări & răspunsuri' },
  { icon: '🤝', text: 'Networking' },
  { icon: '🎁', text: 'Bonus prompts & resurse utile' },
]

const brands = [
  'HOLCIM',
  'AUTOMOBILE BAVARIA',
  'ENGIE - AJUSTO',
  'PHYSIO ONE',
  'PICK2',
  'STARTCASA',
  'AVANDOR LABS',
  'DR. GABRIEL ȘTEFĂNESCU',
]

const whatYouLearnCards = [
  {
    number: '01',
    title: 'Meta Ads',
    points: [
      'Reclame care nu par reclame',
      'Cum găsești un hook bun',
      'Creative care opresc scroll-ul',
      'Greșeli care omoară campaniile',
    ],
  },
  {
    number: '02',
    title: 'Lead Generation',
    points: [
      'Cum generezi lead-uri mai bune',
      'Formulare care convertesc',
      'WhatsApp pentru conversii',
    ],
  },
  {
    number: '03',
    title: 'Ofertă & Psihologia vânzării',
    points: [
      'De ce performează unele reclame',
      'Cum construiești o ofertă bună',
      'Cum influențează mesajul conversia',
    ],
  },
  {
    number: '04',
    title: 'AI & ChatGPT',
    points: [
      'AI practic în marketing',
      'Prompts utile pentru reclame & content',
      'Automatizări care economisesc timp',
    ],
  },
  {
    number: '05',
    title: 'Content & Performance',
    points: [
      'Conținut care vinde',
      'Cifrele importante din Ads Manager',
      'KPI-urile care contează',
    ],
  },
  {
    number: '06',
    title: 'Funnel & Conversii',
    points: [
      'Funnel simplu și eficient',
      'Trafic → lead-uri și vânzări',
      'Greșeli comune și cum le eviți',
    ],
  },
]

function ImageFrame({ ratio, title }: { ratio: string; title: string }) {
  return (
    <div
      className="relative w-full overflow-hidden border"
      style={{
        borderColor: 'rgba(180, 163, 93, 0.35)',
        aspectRatio: ratio,
        background:
          'linear-gradient(135deg, rgba(201, 162, 39, 0.13) 0%, rgba(27, 44, 26, 0.06) 45%, rgba(201, 162, 39, 0.08) 100%)',
      }}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(to right, rgba(180, 163, 93, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(180, 163, 93, 0.18) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      <div className="absolute inset-0 flex items-center justify-center text-center px-4">
        <div>
          <p
            className="text-[10px] uppercase tracking-[0.3em] mb-2"
            style={{ color: 'rgba(27, 44, 26, 0.55)' }}
          >
            Placeholder Imagine
          </p>
          <p className="text-sm md:text-base font-semibold" style={{ color: '#1b2c1a' }}>
            {title}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function CursuriPage() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false)
  const [checkoutError, setCheckoutError] = useState<string | null>(null)
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)
  const [checkoutModalMessage, setCheckoutModalMessage] = useState('Procesez...')

  const courseKey = 'marketing-digital-aplicat-workshop'
  const isCheckoutTestMode = process.env.NEXT_PUBLIC_STRIPE_CHECKOUT_TEST_MODE === 'true'

  useEffect(() => {
    const id = window.setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % sliderPages.length)
    }, 4500)

    return () => window.clearInterval(id)
  }, [])

  const goPrev = () => {
    setActiveSlide((prev) => (prev - 1 + sliderPages.length) % sliderPages.length)
  }

  const goNext = () => {
    setActiveSlide((prev) => (prev + 1) % sliderPages.length)
  }

  const startCheckout = async () => {
    if (isCheckoutLoading) {
      return
    }

    setCheckoutError(null)
    setIsCheckoutLoading(true)
    setIsCheckoutModalOpen(true)
    setCheckoutModalMessage('Procesez...')

    if (isCheckoutTestMode) {
      window.setTimeout(() => {
        setCheckoutModalMessage('Acesta este un flux de test. Nicio plata nu a fost procesata.')
        setIsCheckoutLoading(false)
      }, 1600)
      return
    }

    try {
      const idempotencyKey =
        typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
          ? crypto.randomUUID()
          : `${Date.now()}-${Math.random().toString(36).slice(2)}`

      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-idempotency-key': idempotencyKey,
        },
        body: JSON.stringify({
          courseKey,
        }),
      })

      const data = await response.json().catch(() => null)

      if (!response.ok || !data?.url) {
        throw new Error(data?.error || 'Nu am putut inițializa plata.')
      }

      window.location.assign(data.url)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'A apărut o eroare neașteptată.'
      setCheckoutError(message)
      setCheckoutModalMessage('Nu am putut porni checkout-ul. Te rugam sa incerci din nou.')
      setIsCheckoutLoading(false)
    }
  }

  return (
    <>
      <main style={{ backgroundColor: '#eee5c8' }}>
        <Navigation activePage="Cursuri" variant="dark" noOffset />

        <section
          className="w-full min-h-screen px-6 md:px-12 pt-26 md:pt-30 pb-12 md:pb-16"
          style={{ backgroundColor: '#1b2c1a' }}
        >
          <div className="max-w-6xl mx-auto min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-210px)] flex flex-col justify-center">
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="inline-flex items-center gap-2 border px-4 py-2 text-[10px] uppercase tracking-[0.2em]"
                style={{ color: '#b4a35d', borderColor: 'rgba(180, 163, 93, 0.7)' }}
              >
                <motion.span
                  className="inline-block h-2 w-2 rounded-full"
                  style={{ backgroundColor: '#b4a35d' }}
                  animate={{
                    opacity: [0.55, 1, 0.55],
                    boxShadow: [
                      '0 0 0 0 rgba(180, 163, 93, 0.35)',
                      '0 0 0 9px rgba(180, 163, 93, 0)',
                      '0 0 0 0 rgba(180, 163, 93, 0)',
                    ],
                  }}
                  transition={{ duration: 0.7, repeat: Infinity, ease: 'easeOut' }}
                />
                <span>WORKSHOP FIZIC · BUCUREȘTI · LOCURI LIMITATE</span>
              </div>
            </motion.div>

            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
              style={{ color: '#eee5c8' }}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
            >
              Marketing
              <br />
              digital
              <br />
              <span style={{ color: '#c9a227' }}>aplicat.</span>
            </motion.h1>

            <motion.p
              className={`${cormorantGaramondItalic.className} text-2xl md:text-3xl max-w-2xl mb-6 md:mb-8 italic tracking-wide`}
              style={{ color: '#bfbea2', fontWeight: 300, fontStyle: 'italic' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
            >
              Fără teorie inutilă. Fără cursuri "de pe YouTube".
            </motion.p>

            <motion.p
              className="max-w-2xl mb-10 md:mb-12"
              style={{ fontSize: '15px', lineHeight: 1.8, color: 'rgba(237, 234, 219, 0.55)' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              Un workshop construit din campanii reale, bugete reale și <strong style={{ color: '#edeadb', fontWeight: 700 }}>15+ ani</strong> de experiență practică în marketing digital și online sales. Campanii pe care le poți aplica <strong style={{ color: '#edeadb', fontWeight: 700 }}>chiar de a doua zi.</strong>
            </motion.p>

            <motion.div
              className="mb-10 md:mb-12 flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
            >
              <motion.button
                type="button"
                className="h-12 px-7 text-sm md:text-[15px] tracking-[0.08em] uppercase font-bold"
                style={{ backgroundColor: '#c9a227', color: '#111' }}
                onClick={startCheckout}
                disabled={isCheckoutLoading}
                whileHover={{ y: -2, scale: 1.01 }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                {isCheckoutLoading ? 'SE PROCESEAZĂ...' : '→ REZERVĂ LOCUL ACUM'}
              </motion.button>
              <motion.button
                type="button"
                className="h-12 px-7 text-sm md:text-[15px] tracking-[0.08em] uppercase font-bold border"
                style={{ borderColor: 'rgba(237, 234, 219, 0.25)', color: '#edeadb', backgroundColor: 'transparent' }}
                whileHover={{ y: -2, scale: 1.01, borderColor: 'rgba(237, 234, 219, 0.45)' }}
                whileTap={{ y: 0, scale: 0.98 }}
                transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                DESPRE CURS
              </motion.button>
            </motion.div>

            {checkoutError && (
              <p className="mb-8 text-sm" style={{ color: '#de5959' }}>
                {checkoutError}
              </p>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 border-t pt-8 md:pt-10" style={{ borderColor: 'rgba(180, 163, 93, 0.3)' }}>
              {heroStats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 + idx * 0.12 }}
                >
                  <div
                    className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2"
                    style={{ color: '#c9a227' }}
                  >
                    {stat.number}
                  </div>
                  <div
                    className="text-[10px] sm:text-xs uppercase tracking-[0.18em] md:tracking-widest leading-tight pr-2"
                    style={{ color: 'rgba(237, 234, 219, 0.5)' }}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="w-full pt-19.25 pb-19.25 md:pt-21.25 md:pb-21.25" style={{ backgroundColor: '#122612' }}>
          <div className="w-full">
            <div className="relative overflow-hidden border" style={{ borderColor: 'rgba(180, 163, 93, 0.26)' }}>
              <div className="relative h-[44vw] min-h-55 max-h-130 md:min-h-75">
                {sliderPages.map((page, index) => (
                  <div
                    key={`slider-page-${index}`}
                    className="absolute inset-0 transition-opacity duration-700"
                    style={{ opacity: activeSlide === index ? 1 : 0 }}
                  >
                    <div
                      className={`h-full ${
                        page.items.length === 4
                          ? 'grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 p-3 md:p-5'
                          : page.items.length === 3
                            ? 'grid grid-cols-3 gap-3 md:gap-4 p-3 md:p-5'
                          : page.items.length === 2
                            ? 'grid grid-cols-2 gap-4 md:gap-6 p-4 md:p-6'
                            : 'p-3 md:p-5'
                      }`}
                    >
                      {page.items.map((item) => (
                        <div
                          key={item.id}
                          className="relative h-full overflow-hidden border"
                          style={{
                            borderColor: 'rgba(180, 163, 93, 0.35)',
                            background:
                              'linear-gradient(135deg, rgba(201, 162, 39, 0.13) 0%, rgba(27, 44, 26, 0.06) 45%, rgba(201, 162, 39, 0.08) 100%)',
                          }}
                        >
                          <div
                            className="absolute inset-0"
                            style={{
                              backgroundImage:
                                'linear-gradient(to right, rgba(180, 163, 93, 0.18) 1px, transparent 1px), linear-gradient(to bottom, rgba(180, 163, 93, 0.18) 1px, transparent 1px)',
                              backgroundSize: '36px 36px',
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center text-center px-4">
                            <div>
                              <p
                                className="text-[10px] uppercase tracking-[0.3em] mb-2"
                                style={{ color: 'rgba(27, 44, 26, 0.55)' }}
                              >
                                Placeholder Imagine
                              </p>
                              <p className="text-sm md:text-base font-semibold" style={{ color: '#1b2c1a' }}>
                                {item.title}
                              </p>
                              <p className="mt-2 text-[11px] uppercase tracking-[0.2em]" style={{ color: 'rgba(27, 44, 26, 0.48)' }}>
                                {item.orientation === 'portrait' ? 'Portrait' : 'Landscape'}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}

                <div className="absolute inset-x-0 bottom-0 h-24" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.52), rgba(0,0,0,0))' }} />

                <button
                  type="button"
                  aria-label="Slide anterior"
                  onClick={goPrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border text-lg"
                  style={{
                    backgroundColor: 'rgba(27, 44, 26, 0.62)',
                    borderColor: 'rgba(237, 234, 219, 0.2)',
                    color: '#edeadb',
                  }}
                >
                  ‹
                </button>

                <button
                  type="button"
                  aria-label="Slide următor"
                  onClick={goNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 h-11 w-11 rounded-full border text-lg"
                  style={{
                    backgroundColor: 'rgba(27, 44, 26, 0.62)',
                    borderColor: 'rgba(237, 234, 219, 0.2)',
                    color: '#edeadb',
                  }}
                >
                  ›
                </button>

                <p
                  className={`${cormorantGaramondItalic.className} absolute left-6 bottom-5 text-base md:text-xl italic`}
                  style={{ color: 'rgba(237, 234, 219, 0.92)' }}
                >
                  {sliderPages[activeSlide].caption}
                </p>

                <div className="absolute bottom-6 right-6 flex items-center gap-2">
                  {sliderPages.map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      aria-label={`Mergi la slide ${index + 1}`}
                      onClick={() => setActiveSlide(index)}
                      className="h-2.5 rounded-full transition-all"
                      style={{
                        width: activeSlide === index ? '22px' : '8px',
                        backgroundColor: activeSlide === index ? '#c9a227' : 'rgba(237, 234, 219, 0.35)',
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee9d9' }}>
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-start">
            <div className="relative mb-12 lg:mb-0">
              <ImageFrame ratio="4 / 5" title="Cadru imagine · Despre mine" />

              <div
                className="absolute right-2 -bottom-8 md:right-4 md:-bottom-10 lg:-right-5 lg:-bottom-5 w-90 md:w-97.5 p-6 rounded-none"
                style={{ backgroundColor: '#173620', transform: 'scale(0.6)', transformOrigin: 'bottom right' }}
              >
                <p
                  className={`${cormorantGaramondItalic.className} text-[26px] leading-[1.34] italic`}
                  style={{ color: '#f3eedf', fontWeight: 500 }}
                >
                  "Digitalul nu vinde. Oferta vinde.
                  <br />
                  Digitalul doar o multiplică."
                </p>

                <p
                  className="mt-4 text-[12px] uppercase tracking-[0.18em]"
                  style={{ color: 'rgba(180, 163, 93, 0.85)' }}
                >
                  — Mihai Iorgulescu
                </p>
              </div>
            </div>

            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
                — DESPRE MINE
              </p>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-7" style={{ color: '#1b2c1a' }}>
                Salut, sunt
                <br />
                Mihai
                <br />
                Iorgulescu.
              </h2>
              <p className="text-lg leading-9 mb-6" style={{ color: 'rgba(27, 44, 26, 0.56)' }}>
                Lucrez de peste 15 ani în marketing digital și online sales, construind și scalând campanii pentru business-uri reale — de la e-commerce și lead generation până la campanii pentru companii mari, clinici, retail și servicii.
              </p>
              <p className="text-lg leading-9 mb-7" style={{ color: 'rgba(27, 44, 26, 0.56)' }}>
                În ultimii ani am lucrat intensiv pe Meta Ads, Google Ads, lead generation, e-commerce, funnels, WhatsApp conversion, content performance și AI aplicat în marketing și vânzări.
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {expertTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 rounded-full border text-sm"
                    style={{ borderColor: 'rgba(27, 44, 26, 0.2)', color: 'rgba(27, 44, 26, 0.65)' }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          className="w-full px-6 md:px-12 py-16 md:py-24"
          style={{ background: 'linear-gradient(90deg, #173620 0%, #112913 100%)' }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 md:gap-14 items-start">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
                — PENTRU CINE ESTE CURSUL
              </p>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-7" style={{ color: '#eee5c8' }}>
                Cursul este
                <br />
                pentru tine dacă:
              </h2>

              <ul className="space-y-4 mb-8">
                {audiencePoints.map((point) => (
                  <li key={point} className="flex items-start gap-3" style={{ color: 'rgba(237, 234, 219, 0.86)' }}>
                    <span className="mt-1 text-sm" style={{ color: '#c9a227' }}>✓</span>
                    <span className="text-[15px] leading-6">{point}</span>
                  </li>
                ))}
              </ul>

              <div className="px-6 py-7 border" style={{ backgroundColor: 'rgba(255,255,255,0.03)', borderColor: 'rgba(180, 163, 93, 0.2)' }}>
                <p className="text-[14px] leading-7" style={{ color: 'rgba(237, 234, 219, 0.82)' }}>
                  Nu contează dacă ești <strong style={{ color: '#eee5c8' }}>antreprenor, freelancer, angajat, creator</strong> sau la început de drum. Vei pleca cu lucruri pe care le poți aplica imediat.
                </p>
              </div>
            </div>

            <ImageFrame ratio="4 / 5" title="Cadru imagine · Pentru cine este cursul" />
          </div>
        </section>

        <section className="w-full px-6 md:px-12 py-16 md:py-24 bg-[#d8d5c7]">
          <div className="max-w-7xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.3em] mb-5 text-[#8b946c]">
              — CE VEI ÎNVĂȚA
            </p>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-12 text-[#173620]">
              Ce vei putea aplica
              <br />
              imediat după <span className="text-[#de5959]">workshop.</span>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-5">
              {whatYouLearnCards.map((card) => (
                <div key={card.number} className="p-7 md:p-8 border bg-[#f1f1f1] border-[rgba(23,54,32,0.08)]">
                  <p className="text-sm font-semibold tracking-[0.2em] mb-2 text-[#c9a227]">
                    {card.number}
                  </p>
                  <h3 className="text-[15px] font-bold leading-tight mb-6 text-[#132b1a]">
                    {card.title}
                  </h3>
                  <ul className="space-y-3">
                    {card.points.map((point) => (
                      <li key={point} className="flex items-start gap-3">
                        <span className="mt-0.5 text-[10px] text-[#de5959]">•</span>
                        <span className="text-[13px] leading-6 text-[rgba(19,43,26,0.42)]">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section
          className="w-full px-6 md:px-12 py-16 md:py-24"
          style={{ background: 'linear-gradient(90deg, #173620 0%, #112913 100%)' }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-10 md:gap-14 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
                CUM ESTE DIFERIT
              </p>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6" style={{ color: '#eee5c8' }}>
                Nu este un curs
                <br />
                <span style={{ color: '#c9a227' }}>&quot;academic&quot;.</span>
              </h2>
              <p className="text-[15px] leading-9 mb-4" style={{ color: 'rgba(237, 234, 219, 0.62)' }}>
                Nu vei sta 6 ore într-un PowerPoint cu definiții. Vom lucra pe exemple reale, reclame reale, campanii active, funnel-uri din business-uri reale.
              </p>
              <p className="text-[15px] leading-9 mb-8" style={{ color: 'rgba(237, 234, 219, 0.62)' }}>
                Totul explicat simplu, direct și aplicat.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {differentiators.map((item) => (
                  <div key={item.title} className="border p-6" style={{ borderColor: 'rgba(180, 163, 93, 0.16)', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                    <p className="text-2xl mb-3">{item.icon}</p>
                    <p className="text-[11px] font-bold tracking-[0.2em] mb-[5px]" style={{ color: '#eee5c8' }}>{item.title}</p>
                    <p className="text-[12px] leading-[1.5]" style={{ color: 'rgba(237, 234, 219, 0.62)' }}>{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <ImageFrame ratio="4 / 5" title="Cadru imagine · Nu este un curs academic" />
          </div>
        </section>

        <section
          className="w-full px-6 md:px-12 py-16 md:py-24 border-t"
          style={{ background: 'linear-gradient(90deg, #173620 0%, #112913 100%)', borderColor: 'rgba(180, 163, 93, 0.2)' }}
        >
          <div className="max-w-6xl mx-auto text-center">
            <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
              FORMAT CURS
            </p>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-4" style={{ color: '#eee5c8' }}>
              Workshop fizic.
              <br />
              Aplicat. Interactiv.
            </h2>
            <p className="text-lg leading-9 mb-10" style={{ color: 'rgba(237, 234, 219, 0.62)' }}>
              Workshop live în București · Grup restrâns · Rezultate imediat aplicabile
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4 md:gap-5">
              {formatItems.map((item) => (
                <div key={item.text} className="border p-6 md:p-7" style={{ borderColor: 'rgba(180, 163, 93, 0.2)' }}>
                  <p className="text-3xl mb-3">{item.icon}</p>
                  <p className="text-[12px] leading-[1.45]" style={{ color: 'rgba(237, 234, 219, 0.82)' }}>
                    {item.text}
                  </p>
                </div>
              ))}
            </div>

            <p className="mt-10 text-[18px]" style={{ color: 'rgba(237, 234, 219, 0.7)' }}>
              <span className="text-[14px]">Durată:</span>{' '}
              <strong style={{ color: '#eee5c8' }}>Half-day intensive workshop</strong>
            </p>
          </div>
        </section>

        <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee9d9' }}>
          <div className="max-w-6xl mx-auto">
            <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
              EXPERIENȚĂ PRACTICĂ
            </p>
            <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-6" style={{ color: '#1b2c1a' }}>
              Experiență construită
              <br />
              în campanii reale.
            </h2>
            <p className="text-[15px] leading-9 max-w-3xl mb-8" style={{ color: 'rgba(27, 44, 26, 0.56)' }}>
              15+ ani de proiecte de marketing digital, lead generation și online sales pentru companii din multiple industrii.
            </p>

            <div className="mb-8 grid grid-cols-2 auto-rows-fr gap-3 md:[grid-template-columns:repeat(auto-fit,minmax(160px,1fr))] xl:grid-cols-8">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="flex min-h-[64px] h-full items-center justify-center border px-3 py-2 text-center text-[12px] font-semibold leading-[1.25] sm:text-[13px] md:text-[12px] xl:px-2 xl:text-[clamp(9px,0.7vw,12px)]"
                  style={{ borderColor: 'rgba(27, 44, 26, 0.14)', color: '#1b2c1a', backgroundColor: '#f8f6ee' }}
                >
                  {brand}
                </span>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <ImageFrame ratio="4 / 5" title="Cadru galerie · Proiect 1" />
              <ImageFrame ratio="4 / 5" title="Cadru galerie · Proiect 2" />
              <ImageFrame ratio="4 / 5" title="Cadru galerie · Proiect 3" />
            </div>
          </div>
        </section>

        <section
          className="w-full px-6 md:px-12 py-16 md:py-20 border-t"
          style={{ backgroundColor: '#070c12', borderColor: 'rgba(180, 163, 93, 0.24)' }}
        >
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-10 md:gap-14 items-center">
            <div>
              <p className="text-[11px] uppercase tracking-[0.3em] mb-5" style={{ color: '#8b946c' }}>
                URMĂTORUL WORKSHOP
              </p>
              <h2 className="text-5xl md:text-7xl font-bold leading-[0.95] mb-5" style={{ color: '#eee5c8' }}>
                Înțelege. Aplică.
                <br />
                <span style={{ color: '#c9a227' }}>Obține rezultate.</span>
              </h2>
              <p className="text-lg leading-9 mb-8" style={{ color: 'rgba(237, 234, 219, 0.65)' }}>
                Locurile sunt limitate. Workshop fizic, București, grup restrâns pentru calitatea interacțiunii.
              </p>

              <button
                type="button"
                className="h-12 px-7 text-sm md:text-[15px] tracking-[0.08em] uppercase font-bold"
                style={{ backgroundColor: '#c9a227', color: '#111' }}
                onClick={startCheckout}
                disabled={isCheckoutLoading}
              >
                {isCheckoutLoading ? 'SE PROCESEAZĂ...' : '→ REZERVĂ LOCUL ACUM'}
              </button>
            </div>

            <div className="border p-8 md:p-10" style={{ borderColor: 'rgba(180, 163, 93, 0.25)', background: 'linear-gradient(90deg, #18361f 0%, #1f4628 100%)' }}>
              <div className="inline-flex items-center px-4 py-2 rounded-full text-[11px] uppercase tracking-[0.2em] mb-6 border" style={{ borderColor: 'rgba(201, 162, 39, 0.5)', color: '#c9a227' }}>
                ⚡ LOCURI LIMITATE
              </div>
              <h3 className="text-4xl md:text-5xl font-bold leading-tight mb-4" style={{ color: '#eee5c8' }}>
                Marketing Digital
                <br />
                Aplicat
              </h3>
              <p className="mb-6" style={{ color: 'rgba(237, 234, 219, 0.66)' }}>
                📍 București · Workshop fizic
              </p>
              <button
                type="button"
                className="w-full h-12 px-7 text-sm md:text-[15px] tracking-[0.08em] uppercase font-bold mb-5"
                style={{ backgroundColor: '#c9a227', color: '#111' }}
                onClick={startCheckout}
                disabled={isCheckoutLoading}
              >
                {isCheckoutLoading ? 'SE PROCESEAZĂ...' : 'REZERVĂ LOCUL ACUM →'}
              </button>
              <p className="text-sm text-center" style={{ color: 'rgba(237, 234, 219, 0.55)' }}>
                Vreau mai multe detalii înainte
              </p>
            </div>
          </div>
        </section>
      </main>
      {isCheckoutModalOpen && (
        <div className="fixed inset-0 z-120 flex items-center justify-center px-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.6)' }}>
          <div className="w-full max-w-md border p-7 md:p-8" style={{ backgroundColor: '#102414', borderColor: 'rgba(180, 163, 93, 0.35)' }}>
            <p className="text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: 'rgba(180, 163, 93, 0.8)' }}>
              Checkout curs
            </p>
            <h3 className="text-2xl md:text-3xl font-bold leading-tight mb-4" style={{ color: '#eee5c8' }}>
              {checkoutModalMessage}
            </h3>
            <p className="text-sm leading-6" style={{ color: 'rgba(237, 234, 219, 0.7)' }}>
              {isCheckoutLoading ? 'Te rugam sa astepti cateva secunde.' : 'Poti inchide aceasta fereastra.'}
            </p>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                className="h-11 px-6 text-sm uppercase tracking-[0.12em] font-bold"
                style={{ backgroundColor: '#c9a227', color: '#111', opacity: isCheckoutLoading ? 0.6 : 1 }}
                disabled={isCheckoutLoading}
                onClick={() => setIsCheckoutModalOpen(false)}
              >
                Inchide
              </button>
            </div>
          </div>
        </div>
      )}
      <FallingDotIndicator />
    </>
  )
}
