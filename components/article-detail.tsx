'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import Navigation from '@/components/navigation'
import ArticleCoverIconGraphic from '@/components/article-cover-icon'
import ArticleContent from '@/components/article-content'
import ArticleShareIcons from '@/components/article-share-icons'
import ArticleSidebar from '@/components/article-sidebar'
import type { Article } from '@/lib/articles-data'
import { articleListings } from '@/lib/article-listings'

interface ArticleDetailProps {
  article: Article
}

export default function ArticleDetail({ article }: ArticleDetailProps) {
  const coverImage = articleListings.find(
    (listing) => listing.href === `/articole/${article.slug}`
  )?.coverImage

  return (
    <main style={{ backgroundColor: '#eee5c8' }}>
      <Navigation activePage="Articole" variant="dark" noOffset />

      {/* Hero */}
      <section
        className="w-full px-6 md:px-12 pt-26 md:pt-30 pb-16 md:pb-20 relative overflow-hidden"
        style={{ backgroundColor: '#1b2c1a' }}
      >
        <div className="max-w-6xl mx-auto relative">
          {/* Top row: back link + category badge */}
          <motion.div
            className="flex items-center justify-between mb-10 md:mb-16"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/articole"
              className="text-xs uppercase tracking-widest transition-opacity hover:opacity-70"
              style={{ color: '#bfbea2' }}
            >
              ← Toate articolele
            </Link>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: '#b4a35d' }} />
              <span
                className="text-xs uppercase tracking-[0.35em]"
                style={{ color: '#b4a35d' }}
              >
                {article.category}
              </span>
            </div>
          </motion.div>

          {/* Title + decorative icon */}
          <div className="grid md:grid-cols-[1fr_auto] md:items-center gap-8 md:gap-16">
            <div>
              <motion.span
                className="block w-10 h-0.5 mb-6"
                style={{ backgroundColor: '#b4a35d' }}
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 40 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              />
              <motion.h1
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-[1.08] max-w-3xl"
                style={{ color: '#eee5c8' }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
              >
                {article.title}
              </motion.h1>
            </div>

            <motion.div
              className="hidden md:block relative shrink-0"
              style={{ width: 'clamp(180px, 20vw, 232px)', height: 'clamp(220px, 27vw, 300px)' }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.25 }}
            >
              {/* Decorative icon, in front */}
              <div className="absolute top-0 right-0 -translate-x-[150px]">
                <ArticleCoverIconGraphic icon={article.coverIcon} className="w-40 h-40 md:w-44 md:h-44 lg:w-52 lg:h-52" />
              </div>
            </motion.div>
          </div>

          {/* Footer meta row */}
          <div
            className="relative mt-10 md:mt-14 pt-6 border-t flex items-center justify-between"
            style={{ borderColor: 'rgba(238, 229, 200, 0.15)' }}
          >
            {/* Giant faded article number, 35px above the separator line */}
            <motion.div
              aria-hidden="true"
              className="hidden md:block absolute bottom-full right-0 mb-[10px] select-none font-bold leading-none pointer-events-none"
              style={{
                color: 'rgba(238, 229, 200, 0.07)',
                fontSize: 'clamp(calc(5.5rem + 25px), 15vw, calc(10rem + 25px))',
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
            >
              {article.articleNumber}
            </motion.div>
            <span className="text-xs" style={{ color: 'rgba(238, 229, 200, 0.5)' }}>
              nomes.ro
            </span>
            <span
              className="text-xs uppercase tracking-widest"
              style={{ color: 'rgba(238, 229, 200, 0.5)' }}
            >
              Articol {article.articleNumber} · {article.readTime} citire
            </span>
          </div>
        </div>
      </section>

      {/* Body */}
      <section className="w-full px-6 md:px-12 py-14 md:py-20" style={{ backgroundColor: '#eee5c8' }}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-12 lg:gap-16 items-start">
          {/* Main column */}
          <div className="min-w-0">
            {/* Meta: autor + citire */}
            <div
              className="flex items-center justify-between gap-4 mb-8 pb-6 border-b"
              style={{ borderColor: 'rgba(27, 44, 26, 0.12)' }}
            >
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ backgroundColor: '#1b2c1a', color: 'rgba(238, 229, 200, 0.75)' }}
                >
                  NM
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide" style={{ color: '#1b2c1a' }}>
                    Echipa NOMÉS
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: '#bfbea2' }}>
                    {article.date}
                  </p>
                </div>
              </div>
              <span className="text-xs uppercase tracking-widest shrink-0" style={{ color: '#5a5a4a' }}>
                {article.readTime} citire
              </span>
            </div>

            {/* Imagine featured */}
            <div
              className="relative w-full aspect-video rounded-[3px] mb-10 overflow-hidden"
              style={{ backgroundColor: '#1b2c1a' }}
            >
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt={article.title}
                  fill
                  sizes="(min-width: 768px) 768px, 100vw"
                  className="object-contain"
                  priority
                />
              ) : (
                <p
                  className="absolute inset-0 flex items-center justify-center text-xs uppercase tracking-[0.3em]"
                  style={{ color: 'rgba(238, 229, 200, 0.25)' }}
                >
                  Imagine articol featured
                </p>
              )}
            </div>

            {/* Conținut + social share */}
            <div className="flex items-start gap-0 md:gap-8">
              <div className="hidden md:block shrink-0 pt-1 sticky top-28">
                <ArticleShareIcons url={`https://www.nomes.ro/articole/${article.slug}`} title={article.title} />
              </div>
              <div className="min-w-0 flex-1">
                <ArticleContent blocks={article.content} coverImage={coverImage} imageAlt={article.title} />
              </div>
            </div>
          </div>

          {/* Sidebar — desktop only, kept as a direct grid child so position:sticky has room to work */}
          <ArticleSidebar currentHref={`/articole/${article.slug}`} />
        </div>
      </section>
    </main>
  )
}
