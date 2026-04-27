'use client'

import { useRef, useState } from 'react'
import Navigation from '@/components/navigation'

const categories = [
  'Toate',
  'Performance Ads',
  'Social Media',
  'Brand Strategy',
  'Video & Content',
  'Tutoriale',
  'Studii de caz',
]

const featuredArticle = {
  category: 'PERFORMANCE ADS',
  title: 'Cum să structurezi un cont Google Ads de la zero și să ajungi la ROAS pozitiv în 30 de zile',
  description: 'Ghidul complet pentru antreprenorii care vor să înceapă cu publicitatea pe Google — de la structura contului la primele campanii profitabile, cu exemple reale din portofoliul nostru.',
  date: '12 MAR 2026',
  readTime: '8 MIN CITIRE',
}

const articles = [
  {
    id: 1,
    category: 'Social Media',
    title: 'Cum construiești o prezență organică reală pe Instagram în 2026',
    date: '05 MAR 2026',
    readTime: '5 MIN',
  },
  {
    id: 2,
    category: 'Brand Strategy',
    title: 'De ce brandurile romanești pierd la poziționare și cum corectezi asta',
    date: '28 FEB 2026',
    readTime: '7 MIN',
  },
  {
    id: 3,
    category: 'Video & Content',
    title: 'Hook-urile care funcționează pe TikTok în 2026 — studiu pe 50 de reclame',
    date: '20 FEB 2026',
    readTime: '6 MIN',
  },
  {
    id: 4,
    category: 'Tutoriale',
    title: 'Google Tag Manager pentru non-tehnici: tot ce ai nevoie să știi',
    date: '14 FEB 2026',
    readTime: '10 MIN',
  },
  {
    id: 5,
    category: 'Studii de caz',
    title: 'Cum am crescut ROAS-ul unui brand de fashion de la 1.2x la 4.8x în 3 luni',
    date: '07 FEB 2026',
    readTime: '9 MIN',
  },
  {
    id: 6,
    category: 'Performance Ads',
    title: 'Meta Ads vs. Google Ads: unde să investești primul buget de marketing',
    date: '01 FEB 2026',
    readTime: '6 MIN',
  },
]

export default function ArticolePage() {
  const [activeCategory, setActiveCategory] = useState('Toate')
  const categoryScrollerRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef({ isPointerDown: false, isDragging: false, startX: 0, startScrollLeft: 0 })

  const filteredArticles = activeCategory === 'Toate'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const handleCategoryPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = categoryScrollerRef.current
    if (!scroller) return

    dragStateRef.current = {
      isPointerDown: true,
      isDragging: false,
      startX: event.clientX,
      startScrollLeft: scroller.scrollLeft,
    }
  }

  const handleCategoryPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = categoryScrollerRef.current
    const dragState = dragStateRef.current
    if (!scroller || !dragState.isPointerDown) return

    const deltaX = event.clientX - dragState.startX

    if (!dragState.isDragging && Math.abs(deltaX) < 8) {
      return
    }

    if (!dragState.isDragging) {
      dragState.isDragging = true
      scroller.setPointerCapture(event.pointerId)
    }

    scroller.scrollLeft = dragState.startScrollLeft - deltaX
  }

  const handleCategoryPointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    const scroller = categoryScrollerRef.current
    if (scroller?.hasPointerCapture(event.pointerId)) {
      scroller.releasePointerCapture(event.pointerId)
    }

    dragStateRef.current.isPointerDown = false
    dragStateRef.current.isDragging = false
  }

  return (
    <main style={{ backgroundColor: '#eee5c8' }}>
      <Navigation activePage="Articole" />

      {/* Category Filter Bar */}
      <div
        className="w-full border-b"
        style={{ backgroundColor: '#eee5c8', borderColor: 'rgba(27, 44, 26, 0.12)' }}
      >
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="relative">
            <div
              ref={categoryScrollerRef}
              onPointerDown={handleCategoryPointerDown}
              onPointerMove={handleCategoryPointerMove}
              onPointerUp={handleCategoryPointerUp}
              onPointerCancel={handleCategoryPointerUp}
              className="overflow-x-scroll overflow-y-hidden py-4 touch-pan-x select-none"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                WebkitOverflowScrolling: 'touch',
                cursor: 'grab',
              }}
            >
              <div className="inline-flex w-max items-center gap-3 pr-8">
                <span
                  className="text-xs uppercase tracking-[0.35em] whitespace-nowrap pr-4 border-r mr-2 shrink-0"
                  style={{ color: '#b4a35d', borderColor: 'rgba(27, 44, 26, 0.15)' }}
                >
                  Categorii
                </span>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className="relative whitespace-nowrap px-4 py-1 text-sm transition-colors shrink-0"
                    style={{
                      color: activeCategory === cat ? '#1b2c1a' : '#5a5a4a',
                      fontWeight: activeCategory === cat ? 700 : 400,
                    }}
                  >
                    {cat}
                    {activeCategory === cat && (
                      <span
                        className="absolute bottom-0 left-3 right-3 h-0.5"
                        style={{ backgroundColor: '#1b2c1a' }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </div>

            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-0 w-6 md:hidden"
              style={{ background: 'linear-gradient(90deg, #eee5c8 0%, rgba(238, 229, 200, 0) 100%)' }}
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 right-0 w-10 md:hidden"
              style={{ background: 'linear-gradient(270deg, #eee5c8 0%, rgba(238, 229, 200, 0) 100%)' }}
            />
          </div>
        </div>
      </div>

      {/* Featured Article */}
      <section className="w-full px-6 md:px-12 py-12 md:py-16" style={{ backgroundColor: '#eee5c8' }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[3px] overflow-hidden">
            {/* Image placeholder */}
            <div
              className="aspect-4/3 md:aspect-auto md:min-h-105 flex items-end justify-center relative"
              style={{ backgroundColor: '#1b2c1a' }}
            >
              <p
                className="absolute text-xs uppercase tracking-[0.4em] pb-10"
                style={{ color: 'rgba(238, 229, 200, 0.3)' }}
              >
                Imagine Articol Featured
              </p>
            </div>

            {/* Content */}
            <div
              className="flex flex-col justify-center px-8 md:px-12 py-10"
              style={{ backgroundColor: '#eee5c8' }}
            >
              <div className="flex items-center gap-2 mb-4">
                <span className="text-xs" style={{ color: '#b4a35d' }}>—</span>
                <span className="text-xs uppercase tracking-[0.35em]" style={{ color: '#b4a35d' }}>
                  {featuredArticle.category}
                </span>
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold leading-[1.15] mb-6"
                style={{ color: '#1b2c1a' }}
              >
                {featuredArticle.title}
              </h2>
              <p
                className="text-sm leading-relaxed mb-8"
                style={{ color: '#5a5a4a' }}
              >
                {featuredArticle.description}
              </p>
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#bfbea2' }}>
                    {featuredArticle.date.split(' ').slice(0, 2).join(' ')}
                    <br />
                    {featuredArticle.date.split(' ')[2]}
                  </p>
                </div>
                <span style={{ color: '#bfbea2' }}>·</span>
                <div>
                  <p className="text-xs uppercase tracking-widest" style={{ color: '#bfbea2' }}>
                    {featuredArticle.readTime.split(' ').slice(0, 1).join(' ')} MIN
                    <br />
                    CITIRE
                  </p>
                </div>
                <button
                  className="ml-auto text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
                  style={{ color: '#1b2c1a' }}
                >
                  Citește →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Latest Articles */}
      <section className="w-full px-6 md:px-12 pb-24" style={{ backgroundColor: '#eee5c8' }}>
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div
            className="flex items-center justify-between border-t pt-10 mb-10"
            style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}
          >
            <h3 className="text-2xl font-bold" style={{ color: '#1b2c1a' }}>
              Cele mai noi articole
            </h3>
            <button
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
              style={{ color: '#1b2c1a' }}
            >
              Vezi toate →
            </button>
          </div>

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div key={article.id} className="group cursor-pointer">
                {/* Image placeholder */}
                <div
                  className="aspect-16/10 w-full rounded-[3px] mb-4 transition-opacity group-hover:opacity-90"
                  style={{ backgroundColor: '#1b2c1a' }}
                />
                <p className="text-xs uppercase tracking-widest mb-2" style={{ color: '#b4a35d' }}>
                  {article.category}
                </p>
                <h4
                  className="text-base font-bold leading-snug mb-3 group-hover:opacity-70 transition-opacity"
                  style={{ color: '#1b2c1a' }}
                >
                  {article.title}
                </h4>
                <div className="flex items-center gap-3">
                  <span className="text-xs" style={{ color: '#bfbea2' }}>{article.date}</span>
                  <span style={{ color: '#bfbea2' }}>·</span>
                  <span className="text-xs" style={{ color: '#bfbea2' }}>{article.readTime} citire</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
