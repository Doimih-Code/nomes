'use client'

import { useEffect, useRef, useState } from 'react'

export default function GoToTopButton() {
  const [visible, setVisible] = useState(false)
  const [useLightColor, setUseLightColor] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const getEffectiveBackgroundColor = (el: Element | null): string | null => {
    let current: Element | null = el

    while (current && current instanceof HTMLElement) {
      const bg = window.getComputedStyle(current).backgroundColor
      if (bg && !bg.includes('rgba(0, 0, 0, 0)') && bg !== 'transparent') {
        return bg
      }
      current = current.parentElement
    }

    return window.getComputedStyle(document.body).backgroundColor
  }

  const isDarkColor = (color: string): boolean => {
    const match = color.match(/\d+(?:\.\d+)?/g)
    if (!match || match.length < 3) return false

    const r = Number(match[0]) / 255
    const g = Number(match[1]) / 255
    const b = Number(match[2]) / 255

    const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b
    return luminance < 0.45
  }

  const updateButtonContrast = () => {
    const button = buttonRef.current
    if (!button) return

    const rect = button.getBoundingClientRect()
    const x = rect.left + rect.width / 2
    const y = rect.top + rect.height / 2

    const previousPointerEvents = button.style.pointerEvents
    button.style.pointerEvents = 'none'
    const elUnderButton = document.elementFromPoint(x, y)
    button.style.pointerEvents = previousPointerEvents

    const footerEl = elUnderButton?.closest('footer')
    if (footerEl) {
      const footerBgColor = getEffectiveBackgroundColor(footerEl)
      if (footerBgColor) {
        setUseLightColor(isDarkColor(footerBgColor))
        return
      }
    }

    const bgColor = getEffectiveBackgroundColor(elUnderButton)
    if (!bgColor) return

    setUseLightColor(isDarkColor(bgColor))
  }

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 180)
      updateButtonContrast()
    }

    onScroll()
    updateButtonContrast()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateButtonContrast)

    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateButtonContrast)
    }
  }, [])

  if (!visible) return null

  const buttonColor = useLightColor ? '#eee5c8' : '#1b2c1a'

  return (
    <button
      ref={buttonRef}
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Go to top"
      className="fixed right-4 md:right-6 bottom-4 md:bottom-6 z-50 h-12 w-12 rounded-full flex items-center justify-center text-2xl leading-none shadow-lg bg-transparent transition-all hover:opacity-80"
      style={{
        border: `1px solid ${buttonColor}`,
        color: buttonColor,
      }}
    >
      <svg
        width="30"
        height="30"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M4.5 15.5L12 8L19.5 15.5"
          stroke="currentColor"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  )
}
