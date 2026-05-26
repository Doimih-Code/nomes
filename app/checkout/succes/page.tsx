'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Navigation from '@/components/navigation'
import { motion } from 'motion/react'

function CheckoutSuccesContent() {
  const searchParams = useSearchParams()
  const sessionId = searchParams.get('session_id')
  const [loaded, setLoaded] = useState(false)
  const [isVerifying, setIsVerifying] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [courseName, setCourseName] = useState<string | null>(null)
  const [accessUrl, setAccessUrl] = useState<string | null>(null)

  useEffect(() => {
    setLoaded(true)
  }, [])

  useEffect(() => {
    const verifySession = async () => {
      if (!sessionId) {
        setIsVerified(false)
        setIsVerifying(false)
        return
      }

      try {
        const response = await fetch(`/api/stripe/checkout/verify-session?session_id=${encodeURIComponent(sessionId)}`)
        const data = await response.json().catch(() => null)

        setIsVerified(Boolean(response.ok && data?.verified))
        setCourseName(typeof data?.courseName === 'string' ? data.courseName : null)
        setAccessUrl(typeof data?.accessUrl === 'string' ? data.accessUrl : null)
      } catch {
        setIsVerified(false)
        setAccessUrl(null)
      } finally {
        setIsVerifying(false)
      }
    }

    verifySession()
  }, [sessionId])

  const maskedSessionId = sessionId ? `${sessionId.slice(0, 10)}...${sessionId.slice(-6)}` : null

  return (
    <main className="min-h-screen flex flex-col" style={{ backgroundColor: '#1b2c1a' }}>
      <Navigation variant="transparent" />

      <div className="flex-1 flex items-center justify-center px-6 md:px-12 pt-26 md:pt-30 pb-16">
        <div className="max-w-xl w-full text-center">
          {loaded && (
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-6"
            >
              {/* Checkmark */}
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center border"
                style={{ borderColor: 'rgba(180, 163, 93, 0.4)', backgroundColor: 'rgba(180, 163, 93, 0.1)' }}
              >
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ color: '#b4a35d' }}
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>

              <div>
                <p
                  className="text-xs uppercase tracking-[0.45em] mb-4"
                  style={{ color: isVerified ? 'rgba(180, 163, 93, 0.7)' : 'rgba(222, 89, 89, 0.75)' }}
                >
                  {isVerifying ? 'Verificăm plata...' : isVerified ? 'Plată confirmată' : 'Plată neverificată'}
                </p>
                <h1
                  className="text-4xl md:text-5xl font-bold leading-[1.1] mb-4"
                  style={{ color: '#eee5c8' }}
                >
                  {isVerified ? (
                    <>
                      Mulțumim pentru
                      <br />
                      achiziție!
                    </>
                  ) : (
                    <>
                      Nu am putut
                      <br />
                      confirma plata.
                    </>
                  )}
                </h1>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: 'rgba(238, 229, 200, 0.6)' }}
                >
                  {isVerified
                    ? `Plata a fost procesată cu succes${courseName ? ` pentru ${courseName}` : ''}. Vei primi pe email un link de acces la materiale în câteva minute.`
                    : 'Dacă ai fost taxat, te rugăm să ne contactezi și să ne trimiți referința plății pentru verificare manuală.'}
                </p>
                {maskedSessionId && (
                  <p
                    className="mt-3 text-xs"
                    style={{ color: 'rgba(238, 229, 200, 0.3)' }}
                  >
                    Referință: {maskedSessionId}
                  </p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                {isVerified && accessUrl && (
                  <a
                    href={accessUrl}
                    className="px-7 py-3 text-sm uppercase tracking-[0.25em] font-medium transition-colors"
                    style={{ backgroundColor: '#b4a35d', color: '#1b2c1a' }}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Accesează materialele
                  </a>
                )}
                <Link
                  href="/cursuri"
                  className="px-7 py-3 text-sm uppercase tracking-[0.25em] font-medium transition-colors border"
                  style={{ borderColor: 'rgba(238, 229, 200, 0.2)', color: '#eee5c8' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(238, 229, 200, 0.5)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(238, 229, 200, 0.2)'
                  }}
                >
                  Toate cursurile
                </Link>
                <Link
                  href="/"
                  className="px-7 py-3 text-sm uppercase tracking-[0.25em] font-medium transition-colors"
                  style={{ backgroundColor: '#eee5c8', color: '#1b2c1a' }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#d4c9a8'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = '#eee5c8'
                  }}
                >
                  Acasă
                </Link>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </main>
  )
}

export default function CheckoutSuccesPage() {
  return (
    <Suspense>
      <CheckoutSuccesContent />
    </Suspense>
  )
}
