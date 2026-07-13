'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import { motion } from 'motion/react'
import { articleCategories, articleListings } from '@/lib/article-listings'
import { getArticleBySlug } from '@/lib/articles-data'

const categories = ['Toate', ...articleCategories]

const articles = articleListings
const featurableArticles = articleListings.filter((a) => a.href)

const GRID_BATCH_SIZE = 6
const FEATURED_INDEX_KEY = 'nomes-featured-article-index'

export default function ArticolePage() {
  const [activeCategory, setActiveCategory] = useState('Toate')
  const [featuredIndex, setFeaturedIndex] = useState(0)
  const [visibleCount, setVisibleCount] = useState(GRID_BATCH_SIZE)
  const categoryScrollerRef = useRef<HTMLDivElement | null>(null)
  const dragStateRef = useRef({ isPointerDown: false, isDragging: false, startX: 0, startScrollLeft: 0 })
  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const filteredArticles = activeCategory === 'Toate'
    ? articles
    : articles.filter(a => a.category === activeCategory)

  const visibleArticles = filteredArticles.slice(0, visibleCount)
  const hasMore = visibleCount < filteredArticles.length

  const featuredListing = featurableArticles[featuredIndex % featurableArticles.length]
  const featuredData = featuredListing ? getArticleBySlug(featuredListing.href!.replace('/articole/', '')) : undefined

  // Rotate the featured article on every page load, in order, remembered across visits.
  useEffect(() => {
    const raw = localStorage.getItem(FEATURED_INDEX_KEY)
    const stored = raw === null ? -1 : Number(raw)
    const next = (Number.isFinite(stored) ? stored + 1 : 0) % featurableArticles.length
    localStorage.setItem(FEATURED_INDEX_KEY, String(next))
    setFeaturedIndex(next)
  }, [])

  // Pick up ?categorie= from links elsewhere on the site (e.g. the article sidebar).
  useEffect(() => {
    const cat = new URLSearchParams(window.location.search).get('categorie')
    if (cat && categories.includes(cat)) {
      setActiveCategory(cat)
    }
  }, [])

  // Reset pagination whenever the category filter changes.
  useEffect(() => {
    setVisibleCount(GRID_BATCH_SIZE)
  }, [activeCategory])

  // Load the next batch of articles as the sentinel scrolls into view.
  useEffect(() => {
    const el = sentinelRef.current
    if (!el || !hasMore) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + GRID_BATCH_SIZE, filteredArticles.length))
        }
      },
      { rootMargin: '400px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [hasMore, filteredArticles.length])

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
      {featuredListing && (
        <section className="w-full px-6 md:px-12 py-12 md:py-16" style={{ backgroundColor: '#eee5c8' }}>
          <div className="max-w-6xl mx-auto">
            <Link
              href={featuredListing.href!}
              className="group grid grid-cols-1 md:grid-cols-2 gap-0 rounded-[3px] overflow-hidden"
            >
              {/* Image placeholder */}
              <motion.div
                key={`${featuredListing.id}-image`}
                className="aspect-4/3 md:aspect-auto md:min-h-105 flex items-end justify-center relative transition-opacity group-hover:opacity-90"
                style={{ backgroundColor: '#1b2c1a' }}
                initial={{ opacity: 0, x: -32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <p
                  className="absolute text-xs uppercase tracking-[0.4em] pb-10"
                  style={{ color: 'rgba(238, 229, 200, 0.3)' }}
                >
                  Imagine Articol Featured
                </p>
              </motion.div>

              {/* Content */}
              <motion.div
                key={`${featuredListing.id}-content`}
                className="flex flex-col justify-center px-8 md:px-12 py-10"
                style={{ backgroundColor: '#eee5c8' }}
                initial={{ opacity: 0, x: 32 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-xs" style={{ color: '#b4a35d' }}>—</span>
                  <span className="text-xs uppercase tracking-[0.35em]" style={{ color: '#b4a35d' }}>
                    {featuredListing.category.toUpperCase()}
                  </span>
                </div>
                <h2
                  className="text-3xl md:text-4xl font-bold leading-[1.15] mb-6 group-hover:opacity-70 transition-opacity"
                  style={{ color: '#1b2c1a' }}
                >
                  {featuredListing.title}
                </h2>
                {featuredData && (
                  <p
                    className="text-sm leading-relaxed mb-8"
                    style={{ color: '#5a5a4a' }}
                  >
                    {featuredData.excerpt}
                  </p>
                )}
                <div className="flex items-center gap-6">
                  <div>
                    <p className="text-xs uppercase tracking-widest mb-1" style={{ color: '#bfbea2' }}>
                      {featuredListing.date.split(' ').slice(0, 2).join(' ')}
                      <br />
                      {featuredListing.date.split(' ')[2]}
                    </p>
                  </div>
                  <span style={{ color: '#bfbea2' }}>·</span>
                  <div>
                    <p className="text-xs uppercase tracking-widest" style={{ color: '#bfbea2' }}>
                      {featuredListing.readTime.split(' ')[0]} MIN
                      <br />
                      CITIRE
                    </p>
                  </div>
                  <span
                    className="ml-auto text-xs uppercase tracking-widest transition-opacity group-hover:opacity-60"
                    style={{ color: '#1b2c1a' }}
                  >
                    Citește →
                  </span>
                </div>
              </motion.div>
            </Link>
          </div>
        </section>
      )}

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
            {visibleArticles.map((article, idx) => {
              const cardContent = (
                <>
                  {/* Image placeholder */}
                  <motion.div
                    className="aspect-16/10 w-full rounded-[3px] mb-4 transition-opacity group-hover:opacity-90"
                    style={{ backgroundColor: '#1b2c1a' }}
                    initial={{ opacity: 0, y: 28 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: (idx % GRID_BATCH_SIZE) * 0.1 }}
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
                </>
              )

              return article.href ? (
                <Link key={article.id} href={article.href} className="group cursor-pointer">
                  {cardContent}
                </Link>
              ) : (
                <div key={article.id} className="group">
                  {cardContent}
                </div>
              )
            })}
          </div>

          {/* Infinite scroll sentinel */}
          {hasMore && (
            <div ref={sentinelRef} className="flex justify-center pt-16" aria-hidden="true">
              <span className="text-xs uppercase tracking-widest" style={{ color: '#bfbea2' }}>
                Se încarcă mai multe articole…
              </span>
            </div>
          )}
        </div>
      </section>
    </main>
  )
}
