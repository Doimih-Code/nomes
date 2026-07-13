'use client'

import { useEffect, useRef, useState } from 'react'

const videos = [
  { id: 1, videoId: 'kEoHHLbjh-M' },
  { id: 2, videoId: 'olmkTNT7B0s' },
  { id: 3, videoId: 'hPwaMa2GIdQ' },
  { id: 4, videoId: 'h2Zj2dzHU54' },
  { id: 5, videoId: '1qHE3uZZy3o' },
  { id: 6, videoId: 'CWGeYcqnTro' },
]

export default function PortfolioSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)
  const [needsScroll, setNeedsScroll] = useState(false)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 4)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 4)
    setNeedsScroll(scrollWidth > clientWidth + 4)
  }

  // All clips currently fit the gallery zone without scrolling — arrows only
  // reappear (via needsScroll) once more clips are added than the row can hold.
  useEffect(() => {
    checkScroll()
    window.addEventListener('resize', checkScroll)
    return () => window.removeEventListener('resize', checkScroll)
  }, [])

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth * 0.8
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 300)
  }

  return (
    <div className="flex items-center gap-3 md:gap-4">
      {/* Left Arrow — only rendered when the row actually overflows */}
      {needsScroll && (
        <button
          onClick={() => scroll('left')}
          disabled={!canScrollLeft}
          className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            border: `1px solid #1b2c1a`,
            color: '#1b2c1a',
            background: '#eee5c8',
          }}
          aria-label="Scroll left"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M16 4.5L8 12L16 19.5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="min-w-0 flex-1 overflow-x-auto scroll-smooth flex gap-4 pb-2"
        onScroll={checkScroll}
        style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory', scrollbarWidth: 'none' }}
      >
        {videos.map((video) => (
          <a
            key={video.id}
            href={`https://youtube.com/shorts/${video.videoId}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Vezi clipul pe YouTube"
            className="group flex-shrink-0 w-[42%] sm:w-[30%] md:w-[20%] lg:w-[15%] rounded-[3px] overflow-hidden relative"
            style={{ scrollSnapAlign: 'start', backgroundColor: '#1b2c1a' }}
          >
            <div className="aspect-9/16 w-full relative overflow-hidden">
              <img
                src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                alt="Campanie video NOMÉS"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 flex items-center justify-center transition-colors group-hover:bg-black/10">
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center transition-transform group-hover:scale-110"
                  style={{ backgroundColor: 'rgba(27, 44, 26, 0.55)', border: '1.5px solid rgba(238, 229, 200, 0.7)', backdropFilter: 'blur(4px)' }}
                >
                  <div className="w-0 h-0 border-t-[7px] border-b-[7px] border-l-[11px] border-t-transparent border-b-transparent ml-0.5" style={{ borderLeftColor: '#eee5c8' }} />
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>

      {/* Right Arrow — only rendered when the row actually overflows */}
      {needsScroll && (
        <button
          onClick={() => scroll('right')}
          disabled={!canScrollRight}
          className="shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70 disabled:opacity-30 disabled:pointer-events-none"
          style={{
            border: `1px solid #1b2c1a`,
            color: '#1b2c1a',
            background: '#eee5c8',
          }}
          aria-label="Scroll right"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M8 4.5L16 12L8 19.5"
              stroke="currentColor"
              strokeWidth="2.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}
    </div>
  )
}
