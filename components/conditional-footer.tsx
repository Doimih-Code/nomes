'use client'

import { usePathname } from 'next/navigation'
import SiteFooter from '@/components/site-footer'

export default function ConditionalFooter() {
  const pathname = usePathname()

  if (pathname === '/') {
    return null
  }

  if (pathname === '/portofoliu') {
    return <SiteFooter variant="light" />
  }

  return <SiteFooter variant="dark" />
}
