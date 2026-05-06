'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'

interface PartnerLogo {
  name: string
  logoSrc: string
}

const partnerLogos: PartnerLogo[] = [
  { name: 'Partener 01', logoSrc: '/placeholder-logo.svg' },
  { name: 'Partener 02', logoSrc: '/placeholder-logo.svg' },
  { name: 'Partener 03', logoSrc: '/placeholder-logo.svg' },
  { name: 'Partener 04', logoSrc: '/placeholder-logo.svg' },
  { name: 'Partener 05', logoSrc: '/placeholder-logo.svg' },
  { name: 'Partener 06', logoSrc: '/placeholder-logo.svg' },
]

export default function PartnersLogoLoop() {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const autoLoopTimerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const [logoRatios, setLogoRatios] = useState<Record<number, number>>({})
  const repeatedLogos = useMemo(
    () => [...partnerLogos, ...partnerLogos, ...partnerLogos],
    []
  )

  const getLogoSizing = (ratio: number | undefined) => {
    if (!ratio) {
      return { width: '72%', height: '68%' }
    }

    if (ratio >= 2.3) {
      return { width: '88%', height: '56%' }
    }

    if (ratio >= 1.45) {
      return { width: '80%', height: '62%' }
    }

    if (ratio >= 1) {
      return { width: '72%', height: '70%' }
    }

    if (ratio >= 0.75) {
      return { width: '56%', height: '82%' }
    }

    return { width: '48%', height: '86%' }
  }

  const move = (direction: 'left' | 'right') => {
    const scroller = scrollerRef.current
    if (!scroller) return
    const card = scroller.querySelector<HTMLElement>('[data-logo-card="true"]')
    const step = card ? card.offsetWidth + 16 : 240
    scroller.scrollBy({
      left: direction === 'left' ? -step : step,
      behavior: 'smooth',
    })
  }

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    const oneSegment = scroller.scrollWidth / 3
    scroller.scrollLeft = oneSegment

    const keepInMiddleSegment = () => {
      if (scroller.scrollLeft <= oneSegment * 0.2) {
        scroller.scrollLeft += oneSegment
      } else if (scroller.scrollLeft >= oneSegment * 1.8) {
        scroller.scrollLeft -= oneSegment
      }
    }

    const startAutoLoop = () => {
      if (autoLoopTimerRef.current) return
      autoLoopTimerRef.current = setInterval(() => {
        move('right')
      }, 2500)
    }

    const stopAutoLoop = () => {
      if (autoLoopTimerRef.current) {
        clearInterval(autoLoopTimerRef.current)
        autoLoopTimerRef.current = null
      }
    }

    scroller.addEventListener('scroll', keepInMiddleSegment, { passive: true })
    scroller.addEventListener('mouseenter', stopAutoLoop)
    scroller.addEventListener('mouseleave', startAutoLoop)
    scroller.addEventListener('touchstart', stopAutoLoop, { passive: true })
    scroller.addEventListener('touchend', startAutoLoop)

    startAutoLoop()

    return () => {
      scroller.removeEventListener('scroll', keepInMiddleSegment)
      scroller.removeEventListener('mouseenter', stopAutoLoop)
      scroller.removeEventListener('mouseleave', startAutoLoop)
      scroller.removeEventListener('touchstart', stopAutoLoop)
      scroller.removeEventListener('touchend', startAutoLoop)
      stopAutoLoop()
    }
  }, [])

  return (
    <div className="relative">
      <div
        ref={scrollerRef}
        className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory touch-pan-x [&::-webkit-scrollbar]:hidden"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        aria-label="Parteneri si colaboratori"
      >
        {repeatedLogos.map((partner, idx) => (
          <div
            key={`${partner.name}-${idx}`}
            data-logo-card="true"
            className="shrink-0 snap-start w-47.5 sm:w-52.5 md:w-55 lg:w-60 border rounded-[3px] py-7 px-5 flex items-center justify-center"
            style={{ borderColor: 'rgba(27, 44, 26, 0.25)', minHeight: '92px' }}
          >
            <div className="relative h-12 w-full flex items-center justify-center">
              <div className="relative" style={{ ...getLogoSizing(logoRatios[idx]) }}>
                <Image
                  src={partner.logoSrc}
                  alt={partner.name}
                  fill
                  sizes="(max-width: 640px) 120px, 150px"
                  className="object-contain opacity-90"
                  onLoadingComplete={(img) => {
                    if (!img.naturalWidth || !img.naturalHeight) return
                    const ratio = img.naturalWidth / img.naturalHeight
                    setLogoRatios((prev) => {
                      if (prev[idx] === ratio) return prev
                      return { ...prev, [idx]: ratio }
                    })
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => move('left')}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-3 z-10 h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
        style={{ border: '1px solid rgba(27, 44, 26, 0.35)', backgroundColor: '#eee5c8', color: '#1b2c1a' }}
        aria-label="Mergi la sigla anterioara"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        onClick={() => move('right')}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-3 z-10 h-10 w-10 md:h-11 md:w-11 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
        style={{ border: '1px solid rgba(27, 44, 26, 0.35)', backgroundColor: '#eee5c8', color: '#1b2c1a' }}
        aria-label="Mergi la urmatoarea sigla"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
    </div>
  )
}
