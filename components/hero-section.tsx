'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Cormorant_Garamond, DM_Mono, Syne } from 'next/font/google'
import { motion } from 'motion/react'

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
  { label: 'Contact', href: '/contact' },
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
          className="hidden lg:block absolute left-1/2 w-px pointer-events-none"
          style={{
            top: '50%',
            transform: 'translateY(-50%)',
            height: '55%',
            background: 'linear-gradient(to bottom, transparent, rgba(180,163,93,0.35) 20%, rgba(180,163,93,0.35) 80%, transparent)',
          }}
        />

        {/* Left side content */}
        <div className="relative w-full lg:w-1/2 lg:h-full flex flex-col justify-center items-center p-6 md:p-10 lg:p-12 lg:pr-16 xl:pr-20 z-10">
          {/* Main wordmark NUMELE */}
          <div className="space-y-6">
              <motion.h1
                className={`${syne.className} leading-tight tracking-tight flex items-center gap-[0.18em]`}
                style={{
                  fontSize: 'clamp(2rem, 5.6vw, 5rem)',
                  color: '#eee5c8',
                  textShadow: '0 8px 16px rgba(0,0,0,0.3)',
                  fontWeight: 800,
                  letterSpacing: '-0.02em',
                  maxWidth: '100%',
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              >
                <span
                  aria-hidden="true"
                  className="inline-block w-[0.5em] h-[0.5em] rounded-full"
                  style={{ backgroundColor: '#c94c4c' }}
                />
                NOMÉS
              </motion.h1>

              <motion.p
                className="text-xl md:text-2xl tracking-[0.01em]"
                style={{
                  color: '#eee5c8',
                  fontWeight: 500,
                }}
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.14 }}
              >
                Seen not scrolled
              </motion.p>

              {/* Subtitle */}
              <motion.p
                className={`${cormorantGaramondItalic.className} text-lg md:text-xl tracking-wide`}
                style={{
                  color: '#b4a35d',
                  fontStyle: 'italic',
                  fontWeight: 300,
                }}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                Performance • Strategy • Content
              </motion.p>
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
        <div className="absolute bottom-6 md:bottom-7 lg:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-6 items-center justify-center w-full lg:w-auto px-6">
          <motion.a
            href="https://www.facebook.com/share/1CupsdYrWj/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="Facebook"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M13.8 9H15V6.8H13.6C11.9 6.8 10.8 7.9 10.8 9.6V11H9V13.2H10.8V17.2H13V13.2H14.8L15.1 11H13V9.8C13 9.3 13.3 9 13.8 9Z" fill="currentColor" />
            </svg>
          </motion.a>
          <motion.a
            href="https://www.instagram.com/nomes.digitalagency?igsh=cWI0emtvcXl4eDg0&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="Instagram"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.63 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
            </svg>
          </motion.a>
          <motion.a
            href="https://www.tiktok.com/@noms0748?_r=1&_t=ZN-96Y2rYyk3qY"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="TikTok"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.71 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M14 4V13.2C14 15.2 12.4 16.8 10.4 16.8C8.4 16.8 6.8 15.2 6.8 13.2C6.8 11.2 8.4 9.6 10.4 9.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M14 4C14.8 5.9 16.5 7.2 18.6 7.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </motion.a>
          <motion.a
            href="#"
            className="flex items-center justify-center transition-all hover:scale-110"
            style={{
              color: '#bfbea2',
            }}
            aria-label="LinkedIn"
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1], delay: 0.79 }}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3.5" y="3.5" width="17" height="17" rx="3" stroke="currentColor" strokeWidth="1.8" />
              <path d="M8 10.5V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <path d="M12 16V12.8C12 11.7 12.9 10.8 14 10.8C15.1 10.8 16 11.7 16 12.8V16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>
      </div>
    </div>
  )
}
