import React from 'react';
import type { Metadata, Viewport } from 'next';
import '../styles/tailwind.css';
import { Toaster } from 'sonner';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: 'CMSBuilder — Block-Based Page Builder for Modern Teams',
  description:
    'CMSBuilder lets editors create, publish, and optimize pages with a visual block builder — built for content teams who move fast.',
  icons: {
    icon: [{ url: '/favicon.ico', type: 'image/x-icon' }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-[hsl(var(--background))] text-[hsl(var(--foreground))] antialiased">
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(222 40% 9%)',
              border: '1px solid hsl(222 25% 18%)',
              color: 'hsl(210 40% 95%)',
              fontFamily: 'Plus Jakarta Sans, sans-serif',
              fontSize: '13px',
            },
          }}
        />
</body>
    </html>
  );
}