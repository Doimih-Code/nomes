'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
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
  { number: '3', label: 'Cursuri Disponibile' },
  { number: '15+', label: 'Săptămâni Conținut' },
  { number: '100%', label: 'Aplicabilitate Reală' },
]

interface Course {
  id: string
  number: string
  priceId: string
  title: string
  category: string
  description: string
  duration: string
  level: string
  includes: string[]
  price: string
}

const courses: Course[] = [
  {
    id: 'ads-fundamentals',
    number: '01',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CURS_ADS || '',
    title: 'Ads Fundamentals',
    category: 'PERFORMANCE ADS',
    description: 'Fundamente complete pentru rularea campaniilor plătite pe Google, Meta și TikTok. De la structura contului la primele campanii profitabile.',
    duration: '6 săptămâni',
    level: 'Începător',
    includes: [
      'Acces video pe viață',
      'Template-uri structuri conturi',
      'Sesiune Q&A lunară',
    ],
    price: process.env.NEXT_PUBLIC_PRICE_CURS_ADS || 'Disponibil în curând',
  },
  {
    id: 'social-media-mastery',
    number: '02',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CURS_SMM || '',
    title: 'Social Media Mastery',
    category: 'SOCIAL MEDIA',
    description: 'Strategia completă de Social Media Management: de la auditul conturilor la calendare editoriale, community management și raportare.',
    duration: '4 săptămâni',
    level: 'Intermediar',
    includes: [
      'Acces video pe viață',
      'Calendare editoriale gata de folosit',
      'Checklist-uri lunare',
    ],
    price: process.env.NEXT_PUBLIC_PRICE_CURS_SMM || 'Disponibil în curând',
  },
  {
    id: 'brand-strategy',
    number: '03',
    priceId: process.env.NEXT_PUBLIC_STRIPE_PRICE_CURS_BRAND || '',
    title: 'Brand Strategy Essentials',
    category: 'BRAND & IDENTITY',
    description: 'Cum să construiești o identitate de brand coerentă — de la poziționare și voce la identitate vizuală și verbal identity.',
    duration: '5 săptămâni',
    level: 'Intermediar',
    includes: [
      'Acces video pe viață',
      'Brand Book template',
      'Exerciții de poziționare',
    ],
    price: process.env.NEXT_PUBLIC_PRICE_CURS_BRAND || 'Disponibil în curând',
  },
]

export default function CursuriPage() {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleBuy = async (course: Course) => {
    if (!course.priceId) {
      setError('Cursul nu este disponibil momentan. Te rugăm revino curând.')
      return
    }

    setLoadingId(course.id)
    setError(null)

    try {
      const response = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: course.priceId,
          courseName: course.title,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Eroare necunoscută')
      }

      if (data.url) {
        router.push(data.url)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare. Te rugăm încearcă din nou.')
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <>
    <main style={{ backgroundColor: '#eee5c8' }}>
      <Navigation activePage="Cursuri" variant="dark" noOffset />

      {/* Hero Section */}
      <section
        className="w-full min-h-screen px-6 md:px-12 pt-26 md:pt-30 pb-12 md:pb-16"
        style={{ backgroundColor: '#1b2c1a' }}
      >
        <div className="max-w-6xl mx-auto min-h-[calc(100vh-180px)] md:min-h-[calc(100vh-210px)] flex flex-col justify-center">
          {/* Label */}
          <motion.div
            className="flex items-center gap-2 text-xs uppercase tracking-widest mb-8"
            style={{ color: '#b4a35d' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span>—</span>
            <span>CURSURI NOMES</span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
            style={{ color: '#eee5c8' }}
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            Învață de la<br />
            practici.
          </motion.h1>

          {/* Description */}
          <motion.p
            className={`${cormorantGaramondItalic.className} text-lg md:text-xl max-w-2xl mb-10 md:mb-12`}
            style={{ color: '#bfbea2', fontWeight: 300, fontStyle: 'italic' }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
          >
            Cursuri construite din experiența reală a echipei NOMES — fără teorie inutilă,
            cu aplicabilitate imediată în business-ul tău.
          </motion.p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 md:gap-6 border-t pt-8 md:pt-10" style={{ borderColor: 'rgba(180, 163, 93, 0.3)' }}>
            {heroStats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.45 + idx * 0.12 }}
              >
                <div
                  className="text-3xl sm:text-4xl md:text-6xl font-bold mb-2"
                  style={{ color: '#eee5c8' }}
                >
                  {stat.number}
                </div>
                <div
                  className="text-[10px] sm:text-xs uppercase tracking-[0.18em] md:tracking-widest leading-tight pr-2"
                  style={{ color: '#b4a35d' }}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Error Banner */}
      {error && (
        <div
          className="w-full px-6 md:px-12 py-4"
          style={{ backgroundColor: '#f5e6e6' }}
        >
          <div className="max-w-6xl mx-auto">
            <p className="text-sm" style={{ color: '#8b2020' }}>{error}</p>
          </div>
        </div>
      )}

      {/* Courses List */}
      <section className="w-full px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: '#eee5c8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col divide-y" style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}>
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                className="grid grid-cols-1 md:grid-cols-[80px_1fr_auto] gap-6 md:gap-12 py-12 md:py-16 items-start"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
              >
                {/* Number */}
                <span
                  className="text-xs uppercase tracking-[0.35em] pt-1"
                  style={{ color: '#b4a35d' }}
                >
                  {course.number}
                </span>

                {/* Content */}
                <div>
                  <p
                    className="text-[10px] uppercase tracking-[0.45em] mb-3"
                    style={{ color: '#b4a35d' }}
                  >
                    {course.category}
                  </p>
                  <h2
                    className="text-3xl md:text-4xl font-bold mb-4"
                    style={{ color: '#1b2c1a' }}
                  >
                    {course.title}
                  </h2>
                  <p
                    className="text-base leading-relaxed mb-6 max-w-xl"
                    style={{ color: 'rgba(27, 44, 26, 0.65)' }}
                  >
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-6 mb-6">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] mb-1" style={{ color: '#b4a35d' }}>Durată</p>
                      <p className="text-sm font-medium" style={{ color: '#1b2c1a' }}>{course.duration}</p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.35em] mb-1" style={{ color: '#b4a35d' }}>Nivel</p>
                      <p className="text-sm font-medium" style={{ color: '#1b2c1a' }}>{course.level}</p>
                    </div>
                  </div>

                  {/* Includes */}
                  <ul className="flex flex-col gap-1.5">
                    {course.includes.map((item) => (
                      <li
                        key={item}
                        className="flex items-center gap-2 text-sm"
                        style={{ color: 'rgba(27, 44, 26, 0.7)' }}
                      >
                        <span
                          className="w-1 h-1 rounded-full shrink-0"
                          style={{ backgroundColor: '#b4a35d' }}
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Price + CTA */}
                <div className="flex flex-col items-start md:items-end gap-4 pt-1">
                  <p
                    className="text-2xl md:text-3xl font-bold"
                    style={{ color: '#1b2c1a' }}
                  >
                    {course.price}
                  </p>
                  <button
                    onClick={() => handleBuy(course)}
                    disabled={loadingId === course.id || !course.priceId}
                    className="relative px-7 py-3 text-sm uppercase tracking-[0.25em] font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      backgroundColor: loadingId === course.id ? 'rgba(27, 44, 26, 0.7)' : '#1b2c1a',
                      color: '#eee5c8',
                    }}
                    onMouseEnter={(e) => {
                      if (loadingId !== course.id) {
                        e.currentTarget.style.backgroundColor = '#2d4a2c'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (loadingId !== course.id) {
                        e.currentTarget.style.backgroundColor = '#1b2c1a'
                      }
                    }}
                  >
                    {loadingId === course.id ? 'Se procesează...' : 'Cumpără'}
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ / Note */}
      <section
        className="w-full px-6 md:px-12 py-16 md:py-20 border-t"
        style={{ backgroundColor: '#eee5c8', borderColor: 'rgba(27, 44, 26, 0.12)' }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#b4a35d' }}>Plată</p>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1b2c1a' }}>Plată securizată prin Stripe</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(27, 44, 26, 0.65)' }}>
              Toate tranzacțiile sunt procesate securizat prin Stripe. Acceptăm carduri Visa, Mastercard și American Express.
            </p>
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.45em] mb-4" style={{ color: '#b4a35d' }}>Acces</p>
            <h3 className="text-xl font-bold mb-3" style={{ color: '#1b2c1a' }}>Acces imediat după plată</h3>
            <p className="text-sm leading-relaxed" style={{ color: 'rgba(27, 44, 26, 0.65)' }}>
              Imediat după confirmare primești pe email linkul de acces la materiale. Accesul este pe viață — inclusiv actualizările viitoare.
            </p>
          </div>
        </div>
      </section>
    </main>
    <FallingDotIndicator />
    </>
  )
}
