"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Syne } from 'next/font/google'
import { motion } from 'motion/react'

const syne = Syne({ subsets: ['latin'], weight: ['800'] })

const pageLinks = [
  { label: 'Cine suntem', href: '/cine-suntem' },
  { label: 'Servicii', href: '/servicii' },
  { label: 'Cursuri', href: '/cursuri' },
  { label: 'Portofoliu', href: '/portofoliu' },
  { label: 'Articole', href: '/articole' },
  { label: 'Contact', href: '/contact' },
]

const socialLinks = [
  {
    label: 'Instagram',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M14 4V13.2C14 15.2 12.4 16.8 10.4 16.8C8.4 16.8 6.8 15.2 6.8 13.2C6.8 11.2 8.4 9.6 10.4 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 4C14.8 5.9 16.5 7.2 18.6 7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M8 10.5V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="8" cy="8" r="1" fill="currentColor" />
        <path d="M12 16V12.8C12 11.7 12.9 10.8 14 10.8C15.1 10.8 16 11.7 16 12.8V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: '#',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
        <path d="M13.8 9H15V6.8H13.6C11.9 6.8 10.8 7.9 10.8 9.6V11H9V13.2H10.8V17.2H13V13.2H14.8L15.1 11H13V9.8C13 9.3 13.3 9 13.8 9Z" fill="currentColor" />
      </svg>
    ),
  },
]

export default function SiteFooter({ variant = 'dark' }: { variant?: 'dark' | 'light' }) {
  const [isHovered, setIsHovered] = useState<number | null>(null)
  const [visibleMenuCount, setVisibleMenuCount] = useState(0)
  const [isFooterRevealed, setIsFooterRevealed] = useState(false)

  useEffect(() => {
    let revealInterval: ReturnType<typeof setInterval> | null = null

    const startTimer = setTimeout(() => {
      setVisibleMenuCount(1)

      revealInterval = setInterval(() => {
        setVisibleMenuCount((prev) => {
          if (prev >= pageLinks.length) {
            if (revealInterval) {
              clearInterval(revealInterval)
            }
            return prev
          }
          return prev + 1
        })
      }, 180)
    }, 200)

    return () => {
      clearTimeout(startTimer)
      if (revealInterval) {
        clearInterval(revealInterval)
      }
    }
  }, [])

  useEffect(() => {
    if (isFooterRevealed || typeof window === 'undefined') return

    const revealOffset = 260
    const checkReveal = () => {
      const nearBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - revealOffset
      if (nearBottom) {
        setIsFooterRevealed(true)
      }
    }

    checkReveal()
    window.addEventListener('scroll', checkReveal, { passive: true })
    window.addEventListener('resize', checkReveal)

    return () => {
      window.removeEventListener('scroll', checkReveal)
      window.removeEventListener('resize', checkReveal)
    }
  }, [isFooterRevealed])

  const isLight = variant === 'light'
  const footerBg = isLight ? '#eee5c8' : '#1b2c1a'
  const headingColor = isLight ? '#1b2c1a' : '#eee5c8'
  const bodyColor = isLight ? '#4f554a' : '#9c9c92'
  const sectionLabelColor = isLight ? 'rgba(180, 163, 93, 0.9)' : 'rgba(180, 163, 93, 0.65)'
  const linkColor = isLight ? '#1b2c1a' : '#d2d2c5'
  const formBorder = isLight ? 'rgba(27, 44, 26, 0.18)' : 'rgba(238, 229, 200, 0.2)'
  const formText = isLight ? '#1b2c1a' : '#eee5c8'
  const joinBg = isLight ? '#1b2c1a' : '#eee5c8'
  const joinText = isLight ? '#eee5c8' : '#1b2c1a'
  const bottomBorder = isLight ? 'rgba(27, 44, 26, 0.12)' : 'rgba(238, 229, 200, 0.08)'
  const bottomText = isLight ? 'rgba(27, 44, 26, 0.65)' : 'rgba(191, 190, 162, 0.55)'

  return (
    <footer style={{ backgroundColor: footerBg }}>
      <motion.div
        initial={{ opacity: 0, y: 56 }}
        animate={isFooterRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: 56 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{ visibility: isFooterRevealed ? 'visible' : 'hidden' }}
      >
      <div className="w-full px-6 md:px-12 py-14 md:py-16">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-12">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#c94c4c' }} />
              <span className={`${syne.className} text-2xl sm:text-3xl md:text-4xl lg:text-[2.7rem] tracking-tight leading-none`} style={{ color: headingColor }}>
                NOMÉS
              </span>
            </Link>
            <p className="text-xl leading-relaxed max-w-md" style={{ color: bodyColor }}>
              Echipa ta pentru performance ads, social media, brand strategy si video production.
              <br />
              14+ ani experienta, 0 clienti pierduti.
            </p>
          </motion.div>

          <div>
            <p
              className="text-sm uppercase tracking-[0.35em] mb-6"
              style={{ color: sectionLabelColor }}
            >
              Pagini
            </p>
            <nav className="flex flex-col gap-3">
              {pageLinks.map((item, idx) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-3xl leading-none font-bold"
                  style={{
                    color: isHovered === idx ? headingColor : linkColor,
                    textDecoration: 'none',
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

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <p
              className="text-sm uppercase tracking-[0.35em] mb-6"
              style={{ color: sectionLabelColor }}
            >
              Newsletter
            </p>
            <p className="text-xl leading-relaxed mb-7" style={{ color: bodyColor }}>
              Tactici de ads si studii de caz saptamanal.
              <br />
              Fara spam.
            </p>
            <form className="flex border rounded-[3px] overflow-hidden" style={{ borderColor: formBorder }}>
              <input
                type="email"
                placeholder="email@tu.ro"
                className={`flex-1 px-5 py-4 text-lg outline-none ${
                  isLight
                    ? 'bg-[#e8dfbf] text-[#1b2c1a] placeholder:text-[#7d826f]'
                    : 'bg-transparent text-[#eee5c8] placeholder:text-[#8f9586]'
                }`}
              />
              <button
                type="button"
                className="w-22 flex items-center justify-center"
                style={{ backgroundColor: joinBg, color: joinText }}
                aria-label="Trimite"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M8 4.5L16 12L8 19.5"
                    stroke="currentColor"
                    strokeWidth="2.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </form>
          </motion.div>
        </div>
      </div>

      <div className="border-t" style={{ borderColor: bottomBorder }}>
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-7 flex flex-col md:flex-row items-start md:items-center justify-between gap-5">
          <motion.p
            className="text-sm uppercase tracking-[0.35em]"
            style={{ color: bottomText }}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            © 2026 NOMES. Toate drepturile rezervate.
          </motion.p>
          <div className="flex flex-wrap items-center gap-6">
            {socialLinks.map((item, idx) => (
              <motion.a
                key={item.label}
                href={item.href}
                aria-label={item.label}
                className="transition-opacity hover:opacity-75"
                style={{ color: bottomText }}
                initial={{ opacity: 0, y: 14, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.08 + idx * 0.08 }}
              >
                {item.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
      </motion.div>
    </footer>
  )
}
