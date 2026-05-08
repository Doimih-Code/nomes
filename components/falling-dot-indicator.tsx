'use client'

import { useState, useEffect } from 'react'

export default function FallingDotIndicator() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }}
      aria-hidden={!isVisible}
    >
      <style>{`
        @keyframes falling-dot {
          0% {
            transform: translateY(-16px);
            opacity: 1;
          }
          70% {
            transform: translateY(16px);
            opacity: 1;
          }
          80% {
            transform: translateY(16px);
            opacity: 0;
          }
          90% {
            transform: translateY(-16px);
            opacity: 0;
          }
          100% {
            transform: translateY(-16px);
            opacity: 1;
          }
        }
        .falling-dot {
          animation: falling-dot 2s linear infinite;
        }
      `}</style>

      {/* Button container frame - small and elongated upward */}
      <div
        className="flex flex-col items-center justify-center rounded-full"
        style={{
          width: '32px',
          height: '48px',
          border: '1px solid rgba(180, 163, 93, 0.4)',
          backgroundColor: 'rgba(180, 163, 93, 0.08)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        }}
      >
        {/* Falling dot animation inside the frame */}
        <div
          className="w-2.5 h-2.5 rounded-full falling-dot"
          style={{ backgroundColor: 'rgba(180, 163, 93, 0.8)' }}
        />
      </div>
    </div>
  )
}
