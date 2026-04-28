'use client';
import React from 'react';
import Link from 'next/link';
import { AlertTriangle, Globe, Map, FileSearch, ExternalLink, TrendingUp, Clock } from 'lucide-react';

import { StatusBadge } from '@/components/ui/StatusBadge';

const MISSING_SEO_PAGES = [
  { id: 'page-011', title: 'Enterprise Pricing 2026', slug: '/pricing/enterprise', missing: ['og:image', 'description'], updatedAt: 'Apr 26' },
  { id: 'page-012', title: 'API Documentation Overview', slug: '/docs/api', missing: ['og:image'], updatedAt: 'Apr 25' },
  { id: 'page-013', title: 'Partner Program Benefits', slug: '/partners/benefits', missing: ['description', 'og:title', 'og:image'], updatedAt: 'Apr 24' },
  { id: 'page-014', title: 'Changelog — Q1 2026', slug: '/changelog/q1-2026', missing: ['description'], updatedAt: 'Apr 23' },
  { id: 'page-015', title: 'Security Compliance Guide', slug: '/security/compliance', missing: ['og:image', 'og:description'], updatedAt: 'Apr 22' },
];

const RECENT_MODIFIED = [
  { id: 'page-021', title: 'Homepage — Spring 2026', slug: '/', status: 'published' as const, seoScore: 98, editor: 'Priya Nair', updatedAt: '2h ago' },
  { id: 'page-022', title: 'Product Features', slug: '/features', status: 'published' as const, seoScore: 94, editor: 'Marcus Webb', updatedAt: '5h ago' },
  { id: 'page-023', title: 'Integrations Directory', slug: '/integrations', status: 'review' as const, seoScore: 76, editor: 'Priya Nair', updatedAt: '1d ago' },
  { id: 'page-024', title: 'Case Study: Acme Corp', slug: '/case-studies/acme', status: 'draft' as const, seoScore: 42, editor: 'Sofia Andreescu', updatedAt: '1d ago' },
  { id: 'page-025', title: 'Blog: Core Web Vitals 2026', slug: '/blog/cwv-2026', status: 'published' as const, seoScore: 91, editor: 'Marcus Webb', updatedAt: '2d ago' },
];

const SEO_RADIAL_DATA = [
  { name: 'Coverage', value: 91.5, fill: 'hsl(160 84% 39%)' },
];

const SEO_SHORTCUTS = [
  { label: 'Global SEO Settings', icon: Globe, href: '#', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20' },
  { label: 'Sitemap Generator', icon: Map, href: '#', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' },
  { label: 'Robots.txt Editor', icon: FileSearch, href: '#', color: 'bg-green-700/10 text-green-600 border-green-700/20 hover:bg-green-700/20' },
];

function SeoScorePill({ score }: { score: number }) {
  const color = score >= 90 ? 'text-emerald-400 bg-emerald-500/10' : score >= 70 ? 'text-amber-400 bg-amber-500/10' : 'text-red-400 bg-red-500/10';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${color}`}>
      {score}
    </span>
  );
}

export default function SeoDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI row — 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label">SEO Coverage</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">91.5%</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">130 of 142 published pages</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400"><TrendingUp size={12} />+2.3% this week</div>
        </div>
        <div className="card p-5 border-red-500/25 bg-red-500/5">
          <p className="label text-red-400/70">Missing SEO Meta</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">12</p>
          <p className="text-xs text-red-400 mt-1 font-medium">Published pages affected</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Needs immediate attention</p>
        </div>
        <div className="card p-5 border-amber-500/25 bg-amber-500/5">
          <p className="label text-amber-400/70">Missing OG Image</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">7</p>
          <p className="text-xs text-amber-400 mt-1 font-medium">Pages missing og:image</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Affects social sharing</p>
        </div>
        <div className="card p-5">
          <p className="label">Avg SEO Score</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">84.2</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Across all published pages</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400"><TrendingUp size={12} />+1.8 pts from last week</div>
        </div>
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {/* Missing SEO table */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
            <div className="flex items-center gap-2">
              <AlertTriangle size={15} className="text-red-400" />
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Pages Missing SEO Metadata</h3>
            </div>
            <Link href="/page-management" className="text-xs text-green-600 hover:text-green-500 font-medium transition-colors">
              Fix all →
            </Link>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {MISSING_SEO_PAGES.map((page) => (
              <div key={page.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[hsl(var(--surface-elevated))] transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{page.title}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono mt-0.5">{page.slug}</p>
                </div>
                <div className="flex flex-wrap gap-1">
                  {page.missing.map((m) => (
                    <span key={`missing-${page.id}-${m}`} className="px-1.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/20 rounded text-[10px] font-mono font-semibold">
                      {m}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">{page.updatedAt}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-green-600">
                  <ExternalLink size={13} />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts + coverage */}
        <div className="space-y-4">
          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">SEO Tools</h3>
            <div className="space-y-2">
              {SEO_SHORTCUTS.map((s) => {
                const SIcon = s.icon;
                return (
                  <Link key={`seo-shortcut-${s.label}`} href={s.href} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 active:scale-95 ${s.color}`}>
                    <SIcon size={16} />
                    <span className="text-sm font-medium">{s.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="card p-5">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1">Coverage Breakdown</h3>
            <div className="space-y-3 mt-3">
              {[
                { label: 'Title tag', pct: 100, color: 'bg-emerald-500' },
                { label: 'Meta description', pct: 91, color: 'bg-emerald-500' },
                { label: 'OG image', pct: 85, color: 'bg-amber-500' },
                { label: 'Canonical URL', pct: 97, color: 'bg-emerald-500' },
                { label: 'Schema markup', pct: 62, color: 'bg-red-500' },
              ].map((item) => (
                <div key={`cov-${item.label}`}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-[hsl(var(--muted-foreground))]">{item.label}</span>
                    <span className="font-semibold text-[hsl(var(--foreground))] tabular-nums">{item.pct}%</span>
                  </div>
                  <div className="h-1.5 bg-[hsl(var(--surface-elevated))] rounded-full overflow-hidden">
                    <div className={`h-full ${item.color} rounded-full transition-all`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recently modified */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recently Modified Pages</h3>
          <span className="text-xs text-[hsl(var(--muted-foreground))]">Last 10 modified</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))]">
                {['Page Title', 'Slug', 'Status', 'SEO Score', 'Last Editor', 'Modified'].map((h) => (
                  <th key={`seo-th-${h}`} className="px-5 py-3 text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[hsl(var(--border))]">
              {RECENT_MODIFIED.map((page) => (
                <tr key={page.id} className="hover:bg-[hsl(var(--surface-elevated))] transition-colors">
                  <td className="px-5 py-3 font-medium text-[hsl(var(--foreground))] whitespace-nowrap">{page.title}</td>
                  <td className="px-5 py-3 font-mono text-xs text-[hsl(var(--muted-foreground))]">{page.slug}</td>
                  <td className="px-5 py-3"><StatusBadge status={page.status} size="sm" /></td>
                  <td className="px-5 py-3"><SeoScorePill score={page.seoScore} /></td>
                  <td className="px-5 py-3 text-[hsl(var(--muted-foreground))]">{page.editor}</td>
                  <td className="px-5 py-3 text-[hsl(var(--muted-foreground))] flex items-center gap-1.5"><Clock size={11} />{page.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}