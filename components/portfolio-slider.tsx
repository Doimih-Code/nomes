'use client'

import { useRef, useState } from 'react'

const projects = [
  {
    id: 1,
    name: 'Brand Name 01',
    service: 'Performance Ads · Meta & Google',
  },
  {
    id: 2,
    name: 'Brand Name 02',
    service: 'Social Media Strategy · Content',
  },
  {
    id: 3,
    name: 'Brand Name 03',
    service: 'LinkedIn Ads · TikTok',
  },
  {
    id: 4,
    name: 'Brand Name 04',
    service: 'Performance Ads · Meta & Google',
  },
]

export default function PortfolioSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const checkScroll = () => {
    if (!scrollContainerRef.current) return
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
    setCanScrollLeft(scrollLeft > 0)
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
  }

  const scroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return
    const scrollAmount = scrollContainerRef.current.clientWidth
    scrollContainerRef.current.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    })
    setTimeout(checkScroll, 300)
  }

  return (
    <div className="relative">
      {/* Scroll Container */}
      <div
        ref={scrollContainerRef}
        className="overflow-hidden scroll-smooth flex gap-4"
        onScroll={checkScroll}
        onLoad={checkScroll}
        style={{ scrollBehavior: 'smooth', scrollSnapType: 'x mandatory' }}
      >
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex-shrink-0 w-full md:w-1/2 rounded-[3px] overflow-hidden scroll-snap-align-start"
            style={{ scrollSnapAlign: 'start' }}
          >
            <div style={{ backgroundColor: '#1b2c1a' }}>
              <div
                className="aspect-[16/10] w-full"
                style={{ backgroundColor: '#1b2c1a', opacity: 0.7 }}
              />
              <div className="px-6 py-5">
                <p className="text-base font-bold mb-1" style={{ color: '#eee5c8' }}>
                  {project.name}
                </p>
                <p className="text-xs uppercase tracking-widest" style={{ color: '#b4a35d' }}>
                  {project.service}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll('left')}
          className="absolute left-2 md:left-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
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

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll('right')}
          className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 z-10 h-10 w-10 md:h-12 md:w-12 rounded-full flex items-center justify-center transition-opacity hover:opacity-70"
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
