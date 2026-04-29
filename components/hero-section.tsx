'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cormorant_Garamond, DM_Mono, Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'] })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['500'] })
const cormorantGaramondItalic = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300'],
  style: ['italic'],
})

const menuItems = [
  { label: 'Cine suntem', href: '/cine-suntem' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Cursuri', href: '/cursuri' },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Articole', href: '/articole' },
  { label: 'About', href: '/about' },
]

export default function HeroSection() {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [visibleMenuCount, setVisibleMenuCount] = useState(0)

  useEffect(() => {
    let revealInterval: ReturnType<typeof setInterval> | null = null

    const startTimer = setTimeout(() => {
      setVisibleMenuCount(1)

      revealInterval = setInterval(() => {
        setVisibleMenuCount((prev) => {
          if (prev >= menuItems.length) {
            if (revealInterval) {
              clearInterval(revealInterval)
            }
            return prev
          }
          return prev + 1
        })
      }, 260)
    }, 900)

    return () => {
      clearTimeout(startTimer)
      if (revealInterval) {
        clearInterval(revealInterval)
      }
    }
  }, [])

  return (
    <div
      className="w-full min-h-screen flex items-start md:items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: '#eee5c8' }}
    >
      {/* Main hero panel with dark green background */}
      <div
        className="relative w-full rounded-lg overflow-hidden shadow-2xl min-h-[720px] md:min-h-[790px] lg:min-h-0 flex flex-col lg:flex-row lg:aspect-[16/10] max-h-none lg:max-h-[90vh]"
        style={{
          backgroundColor: '#1b2c1a',
        }}
      >
        {/* Subtle texture/grid overlay */}
        <div className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 1px, rgba(255,255,255,0.5) 1px, rgba(255,255,255,0.5) 2px)',
          }}
        />

        {/* Vertical divider line */}
        <div
          className="hidden lg:block absolute top-0 left-1/2 bottom-0 w-px opacity-20 pointer-events-none"
          style={{ backgroundColor: '#b4a35d' }}
        />

        {/* Left side content */}
        <div className="relative w-full lg:w-1/2 lg:h-full flex flex-col justify-between p-6 md:p-10 lg:p-12 lg:pr-16 xl:pr-20 z-10 gap-10 md:gap-8 lg:gap-0">
          {/* Top left: mini logo area */}
          <div className="space-y-8 pt-[10%] md:pt-0">
            <div aria-hidden="true" className="hidden lg:block" style={{ height: '50px' }} />

            {/* Main wordmark NUMELE */}
            <div className="space-y-6">
              <h1
                className={`${syne.className} leading-tight tracking-tight flex items-center gap-[0.18em]`}
                style={{
                  fontSize: 'clamp(2rem, 5.6vw, 5rem)',
                  color: '#eee5c8',
                  textShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  maxWidth: '100%',
                }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-[0.5em] h-[0.5em] rounded-full"
                  style={{ backgroundColor: '#c94c4c' }}
                />
                NOMÉS
              </h1>

              {/* Subtitle */}
              <p
                className={`${cormorantGaramondItalic.className} text-lg md:text-xl tracking-wide`}
                style={{
                  color: '#b4a35d',
                  fontStyle: 'italic',
                  fontWeight: 300,
                }}
              >
                Performance • Strategy • Content
              </p>
            </div>
          </div>

        </div>

        {/* Right side: Menu block */}
        <div className="relative w-full lg:w-1/2 lg:h-full flex flex-col justify-center items-start lg:items-center p-6 md:p-10 lg:p-12 lg:pl-16 xl:pl-20 z-20 pb-24 md:pb-28 lg:pb-12">
          <div className="w-full lg:max-w-xs">
            {/* Menu label */}
            <div
              className={`${dmMono.className} text-xs uppercase tracking-widest mb-8`}
              style={{
                color: '#b4a35d',
                letterSpacing: '0.2em',
                fontWeight: 500,
              }}
            >
              — MENU
            </div>

            {/* Menu items */}
            <nav className="space-y-4">
              {menuItems.map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="block text-2xl md:text-[2rem] lg:text-3xl font-bold"
                  style={{
                    color: isHovered === idx ? '#eee5c8' : '#bfbea2',
                    textDecoration: 'none',
                    fontWeight: 700,
                    transform:
                      visibleMenuCount > idx
                        ? `translateY(0) scale(${isHovered === idx ? 1.08 : 1})`
                        : `translateY(-42px) scale(${isHovered === idx ? 1.08 : 0.94})`,
                    transformOrigin: 'left center',
                    opacity: visibleMenuCount > idx ? 1 : 0,
                    transition:
                      'transform 680ms cubic-bezier(0.22, 1, 0.36, 1), opacity 680ms cubic-bezier(0.22, 1, 0.36, 1), color 260ms ease',
                  }}
                  onMouseEnter={() => setIsHovered(idx)}
                  onMouseLeave={() => setIsHovered(null)}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        {/* Social icons anchored to bottom on smartphone/tablet */}
        <div className="absolute bottom-6 md:bottom-7 lg:bottom-10 left-1/2 lg:left-[25%] -translate-x-1/2 z-30 flex gap-6 items-center justify-center w-full lg:w-auto px-6">
          <a
            href="#"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="Facebook"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24h11.495v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.794.143v3.24h-1.918c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622H16.56V24h6.115C23.407 24 24 23.407 24 22.676V1.325C24 .593 23.407 0 22.675 0z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="Instagram"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.322a1.44 1.44 0 11-2.881 0 1.44 1.44 0 012.881 0z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="TikTok"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.1 1.82 2.89 2.89 0 0 1 2.31-4.64 2.86 2.86 0 0 1 .88.13V9.4a6.26 6.26 0 0 0-1-.08A6.26 6.26 0 1 0 12.6 20.9a6.26 6.26 0 0 0 6.52-6.52V10.2a8.14 8.14 0 0 0 4.3 1.23v-3.36a4.83 4.83 0 0 1-.74-.06z" />
            </svg>
          </a>
          <a
            href="#"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="LinkedIn"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.475-2.236-1.986-2.236-1.081 0-1.722.731-2.004 1.438-.103.249-.129.597-.129.946v5.421h-3.554s.05-8.789 0-9.714h3.554v1.375c.427-.659 1.191-1.599 2.897-1.599 2.117 0 3.704 1.385 3.704 4.362v5.576zM5.337 8.855c-1.144 0-1.915-.762-1.915-1.715 0-.953.771-1.715 1.921-1.715 1.15 0 1.915.762 1.915 1.715 0 .953-.765 1.715-1.921 1.715zm1.946 11.597H3.392V9.538h3.891v10.914zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  )
}
