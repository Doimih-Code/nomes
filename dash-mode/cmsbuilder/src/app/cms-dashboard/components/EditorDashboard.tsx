'use client';
import React from 'react';
import Link from 'next/link';
import { FileText, Image, Plus, Upload, Menu, Clock, Edit3, TrendingUp } from 'lucide-react';


const MY_DRAFTS = [
  { id: 'page-031', title: 'Blog: Headless CMS Trends 2026', slug: '/blog/headless-cms-2026', updatedAt: '1h ago', blocks: 14 },
  { id: 'page-032', title: 'Product Update: May Release', slug: '/updates/may-2026', updatedAt: '3h ago', blocks: 9 },
  { id: 'page-033', title: 'Customer Story: Bright Labs', slug: '/stories/bright-labs', updatedAt: '1d ago', blocks: 22 },
  { id: 'page-034', title: 'Webinar Landing — June 2026', slug: '/webinars/june-2026', updatedAt: '2d ago', blocks: 11 },
];

const PUBLISHED_PAGES = [
  { id: 'page-041', title: 'Features Overview', slug: '/features', publishedAt: 'Apr 25', views: 2847 },
  { id: 'page-042', title: 'Pricing Page 2026', slug: '/pricing', publishedAt: 'Apr 23', views: 5102 },
  { id: 'page-043', title: 'Homepage Redesign', slug: '/', publishedAt: 'Apr 20', views: 12491 },
];

const RECENT_MEDIA = [
  { id: 'media-011', name: 'hero-banner-v3.webp', type: 'image', size: '284 KB', uploadedAt: '2h ago' },
  { id: 'media-012', name: 'team-photo-2026.jpg', type: 'image', size: '1.2 MB', uploadedAt: '5h ago' },
  { id: 'media-013', name: 'product-demo.mp4', type: 'video', size: '18.4 MB', uploadedAt: '1d ago' },
  { id: 'media-014', name: 'blog-cover-headless.webp', type: 'image', size: '156 KB', uploadedAt: '2d ago' },
];

const EDITOR_SHORTCUTS = [
  { label: 'New Page', icon: Plus, href: '/page-builder', color: 'bg-green-700/10 text-green-600 border-green-700/20 hover:bg-green-700/20' },
  { label: 'Upload Media', icon: Upload, href: '/media-management', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20' },
  { label: 'All Pages', icon: FileText, href: '/page-management', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' },
  { label: 'Manage Menus', icon: Menu, href: '#', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20' },
];

export default function EditorDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI row — 4 cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label">My Draft Pages</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">4</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Awaiting publish or review</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-amber-400">
            <Clock size={12} />
            <span>Oldest: 2 days ago</span>
          </div>
        </div>
        <div className="card p-5">
          <p className="label">Published by Me</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">31</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">All-time published pages</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-emerald-400">
            <TrendingUp size={12} />
            <span>+3 this week</span>
          </div>
        </div>
        <div className="card p-5">
          <p className="label">Media Uploads</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">148</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Files uploaded by you</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">1.8 GB total</p>
        </div>
        <div className="card p-5">
          <p className="label">Pages in Review</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">2</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Submitted for approval</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-blue-400">
            <Clock size={12} />
            <span>Avg review: 4h</span>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {/* Draft pages */}
        <div className="xl:col-span-2 card">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">My Draft Pages</h3>
            <Link href="/page-management" className="text-xs text-green-600 hover:text-green-500 font-medium transition-colors">
              View all →
            </Link>
          </div>
          <div className="divide-y divide-[hsl(var(--border))]">
            {MY_DRAFTS?.map((page) => (
              <div key={page?.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[hsl(var(--surface-elevated))] transition-colors group">
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate">{page?.title}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono">{page?.slug}</p>
                </div>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">{page?.blocks} blocks</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1"><Clock size={11} />{page?.updatedAt}</span>
                <Link
                  href="/page-builder"
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg bg-green-700/10 text-green-600 hover:bg-green-700/20"
                >
                  <Edit3 size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Shortcuts */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {EDITOR_SHORTCUTS?.map((s) => {
              const SIcon = s?.icon;
              return (
                <Link key={`editor-shortcut-${s?.label}`} href={s?.href} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 active:scale-95 ${s?.color}`}>
                  <SIcon size={16} />
                  <span className="text-sm font-medium">{s?.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
      {/* Recent media */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Media Uploads</h3>
          <Link href="/media-management" className="text-xs text-green-600 hover:text-green-500 font-medium transition-colors">
            Media library →
          </Link>
        </div>
        <div className="divide-y divide-[hsl(var(--border))]">
          {RECENT_MEDIA?.map((m) => (
            <div key={m?.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[hsl(var(--surface-elevated))] transition-colors">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m?.type === 'image' ? 'bg-orange-500/10' : 'bg-blue-500/10'}`}>
                <Image size={16} className={m?.type === 'image' ? 'text-orange-400' : 'text-blue-400'} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[hsl(var(--foreground))] truncate font-mono">{m?.name}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{m?.size}</p>
              </div>
              <span className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1"><Clock size={11} />{m?.uploadedAt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}