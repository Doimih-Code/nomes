import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import GoToTopButton from '@/components/go-to-top-button'
import ConditionalFooter from '@/components/conditional-footer'
import { validateServerEnv } from '@/lib/env-validation'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

if (process.env.NODE_ENV === 'production') {
  validateServerEnv()
}

export const metadata: Metadata = {
  title: 'NOMÉS - Performance • Strategy • Content',
  description: 'Echipa ta de marketing. Google, Meta, TikTok și LinkedIn Ads, social media strategy, content, video profesionist și evenimente PR.',
  generator: 'NOMES',
  icons: {
    icon: '/icon.svg',
    shortcut: '/icon.svg',
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <ConditionalFooter />
        <GoToTopButton />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
