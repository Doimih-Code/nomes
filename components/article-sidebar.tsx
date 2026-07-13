'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { articleCategories, articleListings } from '@/lib/article-listings'

interface ArticleSidebarProps {
  currentHref: string
}

const SIDEBAR_SLOTS = 5
const ROTATION_KEY = 'nomes-sidebar-rotation'

export default function ArticleSidebar({ currentHref }: ArticleSidebarProps) {
  const [rotation, setRotation] = useState(0)

  // Rotate which category (and which article within it) shows on every page load.
  useEffect(() => {
    const raw = localStorage.getItem(ROTATION_KEY)
    const stored = raw === null ? -1 : Number(raw)
    const next = (Number.isFinite(stored) ? stored + 1 : 0) % articleCategories.length
    localStorage.setItem(ROTATION_KEY, String(next))
    setRotation(next)
  }, [])

  // One real article per category, rotating which article represents a category across loads.
  const categoryPicks = articleCategories
    .map((category, categoryIdx) => {
      const candidates = articleListings.filter(
        (item) => item.category === category && item.href && item.href !== currentHref
      )
      if (candidates.length === 0) return null
      return candidates[(rotation + categoryIdx) % candidates.length]
    })
    .filter((item): item is NonNullable<typeof item> => item !== null)

  // Rotate which categories make the cut this load (one drops out in round-robin fashion).
  const offset = categoryPicks.length > 0 ? rotation % categoryPicks.length : 0
  const recent = [...categoryPicks.slice(offset), ...categoryPicks.slice(0, offset)].slice(0, SIDEBAR_SLOTS)

  const categoryCounts = articleCategories.map((name) => ({
    name,
    count: articleListings.filter((item) => item.category === name).length,
  }))

  return (
    <aside className="hidden lg:flex lg:sticky lg:top-24 flex-col gap-12">
      {/* Articole recente */}
      <div>
        <div
          className="flex items-baseline justify-between mb-5 pb-3 border-b-2"
          style={{ borderColor: '#1b2c1a' }}
        >
          <h3 className="text-lg font-bold" style={{ color: '#1b2c1a' }}>
            Articole recente
          </h3>
          <Link
            href="/articole"
            className="text-xs uppercase tracking-widest transition-opacity hover:opacity-60"
            style={{ color: '#5a5a4a' }}
          >
            Vezi toate →
          </Link>
        </div>

        <div className="flex flex-col">
          {recent.map((item, idx) => {
            const num = String(idx + 1).padStart(2, '0')
            const inner = (
              <>
                <span className="text-sm font-bold shrink-0 mt-0.5" style={{ color: '#bfbea2' }}>
                  {num}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-snug mb-1" style={{ color: '#1b2c1a' }}>
                    {item.title}
                  </p>
                  <div className="flex items-center gap-2 text-xs" style={{ color: '#bfbea2' }}>
                    <span>{item.category}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>
              </>
            )

            const rowClass = 'flex gap-3.5 items-start py-3.5 border-b transition-opacity hover:opacity-70'
            const rowStyle = { borderColor: 'rgba(27, 44, 26, 0.12)' }

            return item.href ? (
              <Link key={item.id} href={item.href} className={rowClass} style={rowStyle}>
                {inner}
              </Link>
            ) : (
              <div key={item.id} className={rowClass} style={rowStyle}>
                {inner}
              </div>
            )
          })}
        </div>
      </div>

      {/* Categorii */}
      <div>
        <div
          className="mb-5 pb-3 border-b-2"
          style={{ borderColor: '#1b2c1a' }}
        >
          <h3 className="text-lg font-bold" style={{ color: '#1b2c1a' }}>
            Categorii
          </h3>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {categoryCounts.map((cat) => (
            <div
              key={cat.name}
              className="flex items-center gap-2.5 p-3 rounded-[3px] border"
              style={{ backgroundColor: 'rgba(27, 44, 26, 0.03)', borderColor: 'rgba(27, 44, 26, 0.12)' }}
            >
              <div className="w-9 h-9 rounded-[3px] shrink-0" style={{ backgroundColor: '#1b2c1a' }} />
              <div className="min-w-0">
                <p
                  className="text-[11px] font-bold uppercase tracking-wide leading-tight"
                  style={{ color: '#1b2c1a' }}
                >
                  {cat.name}
                </p>
                <p className="text-[10px] mt-0.5" style={{ color: '#bfbea2' }}>
                  {cat.count} articole
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </aside>
  )
}
