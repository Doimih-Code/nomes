interface ArticleShareIconsProps {
  url: string
  title: string
}

export default function ArticleShareIcons({ url, title }: ArticleShareIconsProps) {
  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)

  const links: { label: string; href: string; path: string; viewBox: string }[] = [
    {
      label: 'Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      path: 'M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z',
      viewBox: '0 0 24 24',
    },
    {
      label: 'Twitter / X',
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      path: 'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z',
      viewBox: '0 0 24 24',
    },
    {
      label: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      path: 'M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z',
      viewBox: '0 0 24 24',
    },
    {
      label: 'TikTok',
      href: 'https://www.tiktok.com/@noms0748?_r=1&_t=ZN-96Y2rYyk3qY',
      path: 'M14 4V13.2C14 15.2 12.4 16.8 10.4 16.8C8.4 16.8 6.8 15.2 6.8 13.2C6.8 11.2 8.4 9.6 10.4 9.6M14 4C14.8 5.9 16.5 7.2 18.6 7.3',
      viewBox: '4 1 17 18',
    },
  ]

  return (
    <div className="flex md:flex-col items-center gap-4">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={link.label === 'TikTok' ? 'NOMÉS pe TikTok' : `Distribuie pe ${link.label}`}
          title={link.label === 'TikTok' ? 'NOMÉS pe TikTok' : `Distribuie pe ${link.label}`}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-opacity hover:opacity-60"
          style={{ color: '#5a5a4a' }}
        >
          <svg width="15" height="15" viewBox={link.viewBox} fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d={link.path} fill={link.label === 'TikTok' ? 'none' : 'currentColor'} stroke={link.label === 'TikTok' ? 'currentColor' : 'none'} />
          </svg>
        </a>
      ))}
    </div>
  )
}
