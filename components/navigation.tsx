'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { DM_Mono, Syne } from 'next/font/google'

const syne = Syne({ subsets: ['latin'], weight: ['800'] })
const dmMono = DM_Mono({ subsets: ['latin'], weight: ['500'] })

const navItems = [
  { label: 'Cine suntem', href: '/cine-suntem', active: false },
  { label: 'Servicii', href: '/servicii', active: false },
  { label: 'Cursuri', href: '/cursuri', active: false },
  { label: 'Portofoliu', href: '/portofoliu', active: false },
  { label: 'Articole', href: '/articole', active: false },
  { label: 'About', href: '/about', active: false },
]

interface NavigationProps {
  activePage?: string
  variant?: 'light' | 'dark' | 'transparent'
  noOffset?: boolean
}

export default function Navigation({ activePage, variant = 'light', noOffset = false }: NavigationProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const [isOverLight, setIsOverLight] = useState(false)
  const scrollStopTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const navRef = useRef<HTMLElement | null>(null)

  const detectBackground = () => {
    const navEl = navRef.current
    if (typeof document === 'undefined' || !navEl) return
    const navH = navEl.getBoundingClientRect().height
    const elements = document.elementsFromPoint(window.innerWidth / 2, navH + 2)
    const bgEl = elements.find(el => !navEl.contains(el) && el !== navEl && el.tagName !== 'HTML' && el.tagName !== 'BODY')
    let el: Element | null = bgEl ?? null
    while (el && el.tagName !== 'HTML') {
      const bg = window.getComputedStyle(el).backgroundColor
      if (bg && bg !== 'rgba(0, 0, 0, 0)' && bg !== 'transparent') {
        const match = bg.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/)
        if (match) {
          const r = parseInt(match[1]) / 255
          const g = parseInt(match[2]) / 255
          const b = parseInt(match[3]) / 255
          setIsOverLight(0.2126 * r + 0.7152 * g + 0.0722 * b > 0.45)
          return
        }
      }
      el = el.parentElement
    }
  }

  useEffect(() => {
    detectBackground()
    const onScroll = () => {
      setIsScrolling(true)
      detectBackground()
      if (scrollStopTimer.current) {
        clearTimeout(scrollStopTimer.current)
      }
      scrollStopTimer.current = setTimeout(() => {
        setIsScrolling(false)
      }, 160)
    }

    window.addEventListener('scroll', onScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (scrollStopTimer.current) {
        clearTimeout(scrollStopTimer.current)
      }
    }
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return

    document.body.style.overflow = menuOpen ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  const isDarkLike = variant === 'dark' || variant === 'transparent'
  const isEffectivelyLight = isOverLight || (!isDarkLike)
  const glassBg = isEffectivelyLight
    ? 'rgba(238, 229, 200, 0.55)'
    : 'rgba(27, 44, 26, 0.55)'
  const glassBorder = isEffectivelyLight
    ? 'rgba(27, 44, 26, 0.1)'
    : 'rgba(238, 229, 200, 0.08)'
  const textColor = isEffectivelyLight ? '#1b2c1a' : '#eee5c8'
  const mutedColor = isEffectivelyLight ? '#5a5a4a' : '#bfbea2'
  const accentColor = '#b4a35d'
  const needsOffset = variant !== 'transparent' && !noOffset
  const shouldHideNav = isScrolling && !menuOpen

  return (
    <>
      <header
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-40 w-full py-4 px-6 md:px-12 flex items-center justify-between transition-transform duration-300 ${shouldHideNav ? '-translate-y-full' : 'translate-y-0'}`}
        style={{
          backgroundColor: glassBg,
          backdropFilter: 'blur(16px) saturate(1.4)',
          WebkitBackdropFilter: 'blur(16px) saturate(1.4)',
          borderBottom: `1px solid ${glassBorder}`,
        }}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: '#c94c4c' }}
          />
          <span
            className={`${syne.className} text-lg tracking-tight`}
            style={{ color: textColor }}
          >
            NOMÉS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm transition-colors"
              style={{
                color: activePage === item.label ? textColor : mutedColor,
                textDecoration: activePage === item.label ? 'underline' : 'none',
                textUnderlineOffset: '4px',
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          type="button"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-navigation"
          className={`${dmMono.className} flex items-center gap-2 text-xs uppercase tracking-widest`}
          style={{ color: accentColor, fontWeight: 500 }}
        >
          <span className="hidden md:inline">— MENU</span>
          <span className="md:hidden flex flex-col justify-center gap-1.5" aria-hidden="true">
            <span
              className={`block h-0.5 w-5 transition-transform duration-300 ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
              style={{ backgroundColor: accentColor }}
            />
            <span
              className={`block h-0.5 w-5 transition-opacity duration-300 ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              style={{ backgroundColor: accentColor }}
            />
            <span
              className={`block h-0.5 w-5 transition-transform duration-300 ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
              style={{ backgroundColor: accentColor }}
            />
          </span>
        </button>
      </header>

      {menuOpen && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ backgroundColor: 'rgba(27, 44, 26, 0.98)' }}
        >
          <div className="flex min-h-screen flex-col px-6 pt-5 pb-8">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="flex items-center gap-2"
                onClick={() => setMenuOpen(false)}
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: '#c94c4c' }}
                />
                <span
                  className={`${syne.className} text-lg tracking-tight`}
                  style={{ color: '#eee5c8' }}
                >
                  NOMÉS
                </span>
              </Link>

              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                className="text-3xl leading-none"
                style={{ color: '#eee5c8' }}
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <nav
              id="mobile-navigation"
              className="flex flex-1 flex-col items-center justify-center gap-6 text-center"
            >
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-4xl font-bold leading-none"
                  style={{ color: activePage === item.label ? '#eee5c8' : '#bfbea2' }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}

      {needsOffset && <div aria-hidden="true" className="h-[68px] md:h-[72px]" />}
    </>
  )
}
