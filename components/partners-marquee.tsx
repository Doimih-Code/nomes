'use client'

import React, { useRef, useEffect, useCallback } from 'react'

const partners = [
  'PARTENER 01',
  'PARTENER 02',
  'PARTENER 03',
  'PARTENER 04',
  'PARTENER 05',
  'PARTENER 06',
]

const SPEED = 0.6 // px per frame

export default function PartnersMarquee() {
  const trackRef = useRef<HTMLDivElement>(null)
  const positionRef = useRef(0)
  const isPausedRef = useRef(false)
  const isDraggingRef = useRef(false)
  const dragStartXRef = useRef(0)
  const dragStartPosRef = useRef(0)
  const halfWidthRef = useRef(0)
  const rafRef = useRef<number>()

  const wrap = useCallback((pos: number) => {
    const half = halfWidthRef.current
    if (!half) return pos
    while (pos <= -half) pos += half
    while (pos > 0) pos -= half
    return pos
  }, [])

  const animate = useCallback(() => {
    if (!trackRef.current) return

    if (!isPausedRef.current && !isDraggingRef.current) {
      positionRef.current -= SPEED
      positionRef.current = wrap(positionRef.current)
    }

    trackRef.current.style.transform = `translateX(${positionRef.current}px)`
    rafRef.current = requestAnimationFrame(animate)
  }, [wrap])

  useEffect(() => {
    if (trackRef.current) {
      halfWidthRef.current = trackRef.current.scrollWidth / 2
    }
    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // Touch drag
  const handleTouchStart = (e: React.TouchEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.touches[0].clientX
    dragStartPosRef.current = positionRef.current
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDraggingRef.current) return
    const delta = e.touches[0].clientX - dragStartXRef.current
    positionRef.current = wrap(dragStartPosRef.current + delta)
  }

  const handleTouchEnd = () => {
    isDraggingRef.current = false
  }

  // Mouse drag (desktop)
  const handleMouseDown = (e: React.MouseEvent) => {
    isDraggingRef.current = true
    dragStartXRef.current = e.clientX
    dragStartPosRef.current = positionRef.current
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current) return
    const delta = e.clientX - dragStartXRef.current
    positionRef.current = wrap(dragStartPosRef.current + delta)
  }

  const handleMouseUp = () => {
    isDraggingRef.current = false
  }

  // Duplicate items for seamless loop
  const items = [...partners, ...partners]

  return (
    <div
      className="overflow-hidden select-none cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div
        ref={trackRef}
        className="flex gap-4"
        style={{ width: 'max-content', willChange: 'transform' }}
      >
        {items.map((partner, idx) => (
          <div
            key={idx}
            className="text-center py-8 border rounded-[3px] flex items-center justify-center"
            style={{
              borderColor: 'rgba(27, 44, 26, 0.25)',
              color: '#1b2c1a',
              width: '200px',
              minWidth: '200px',
            }}
          >
            <p className="text-xs uppercase tracking-widest">{partner}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
