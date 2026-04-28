'use client';
import React from 'react';
import Link from 'next/link';
import { FileText, Image, Users, Activity, Plus, Upload, Search, Settings, TrendingUp, TrendingDown, AlertTriangle, Clock, Globe } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';


const PUBLISH_ACTIVITY = [
  { day: 'Mon', published: 4, drafted: 7, archived: 1 },
  { day: 'Tue', published: 6, drafted: 5, archived: 2 },
  { day: 'Wed', published: 3, drafted: 9, archived: 0 },
  { day: 'Thu', published: 8, drafted: 4, archived: 3 },
  { day: 'Fri', published: 5, drafted: 6, archived: 1 },
  { day: 'Sat', published: 2, drafted: 3, archived: 0 },
  { day: 'Sun', published: 1, drafted: 2, archived: 0 },
];

const RECENT_LOGS = [
  { id: 'log-001', user: 'Priya Nair', avatar: 'PN', action: 'Published page', entity: '/blog/nextjs-seo-guide', time: '4 min ago', type: 'publish' },
  { id: 'log-002', user: 'Marcus Webb', avatar: 'MW', action: 'Updated SEO meta', entity: '/products/enterprise', time: '12 min ago', type: 'seo' },
  { id: 'log-003', user: 'Sofia Andreescu', avatar: 'SA', action: 'Invited user', entity: 'dev@cmsbuilder.io', time: '31 min ago', type: 'user' },
  { id: 'log-004', user: 'Priya Nair', avatar: 'PN', action: 'Uploaded media', entity: 'hero-banner-v3.webp', time: '1h ago', type: 'media' },
  { id: 'log-005', user: 'Marcus Webb', avatar: 'MW', action: 'Archived page', entity: '/old-pricing', time: '2h ago', type: 'archive' },
];

const LOG_COLORS: Record<string, string> = {
  publish: 'text-emerald-400',
  seo: 'text-cyan-400',
  user: 'text-green-600',
  media: 'text-orange-400',
  archive: 'text-zinc-400',
};

const SHORTCUTS = [
  { label: 'New Page', icon: Plus, href: '/page-builder', color: 'bg-green-700/10 text-green-600 border-green-700/20 hover:bg-green-700/20' },
  { label: 'Upload Media', icon: Upload, href: '/media-management', color: 'bg-orange-500/10 text-orange-400 border-orange-500/20 hover:bg-orange-500/20' },
  { label: 'Manage Users', icon: Users, href: '/user-management', color: 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 hover:bg-cyan-500/20' },
  { label: 'All Pages', icon: Search, href: '/page-management', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20' },
  { label: 'Settings', icon: Settings, href: '#', color: 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20 hover:bg-zinc-500/20' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-[hsl(var(--surface))] border border-[hsl(var(--border))] rounded-xl p-3 shadow-xl text-xs">
      <p className="font-semibold text-[hsl(var(--foreground))] mb-2">{label}</p>
      {payload.map((p: any) => (
        <div key={`tooltip-${p.dataKey}`} className="flex items-center gap-2 mb-1">
          <span className="w-2 h-2 rounded-full" style={{ background: p.color }} />
          <span className="text-[hsl(var(--muted-foreground))] capitalize">{p.dataKey}:</span>
          <span className="font-semibold text-[hsl(var(--foreground))]">{p.value}</span>
        </div>
      ))}
    </div>
  );
};

export default function SuperadminDashboard() {
  return (
    <div className="space-y-6">
      {/* KPI bento grid — 6 cards: hero(2col) + 2 + 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        {/* Hero: Total Pages */}
        <div className="col-span-1 md:col-span-2 card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-800/10 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="label">Total Pages</p>
              <p className="text-4xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">247</p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-green-700/15 border border-green-700/25 flex items-center justify-center">
              <FileText size={20} className="text-green-600" />
            </div>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 bg-emerald-400 rounded-full" />142 published</span>
            <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 bg-amber-400 rounded-full" />68 draft</span>
            <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 bg-blue-400 rounded-full" />21 in review</span>
            <span className="flex items-center gap-1 text-zinc-400"><span className="w-2 h-2 bg-zinc-400 rounded-full" />16 archived</span>
          </div>
          <div className="mt-3 flex items-center gap-1 text-xs text-emerald-400">
            <TrendingUp size={13} />
            <span>+14 pages this week</span>
          </div>
        </div>

        {/* Media */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="label">Media Files</p>
            <div className="w-8 h-8 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center">
              <Image size={16} className="text-orange-400" />
            </div>
          </div>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))]">1,842</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">4.7 GB used of 20 GB</p>
          <div className="mt-3 h-1.5 bg-[hsl(var(--surface-elevated))] rounded-full overflow-hidden">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '23.5%' }} />
          </div>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1.5">23.5% storage used</p>
        </div>

        {/* Users */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="label">Team Members</p>
            <div className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Users size={16} className="text-cyan-400" />
            </div>
          </div>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))]">12</p>
          <div className="mt-2 space-y-1 text-xs text-[hsl(var(--muted-foreground))]">
            <div className="flex justify-between"><span>Superadmin</span><span className="font-semibold text-green-600">2</span></div>
            <div className="flex justify-between"><span>SEO Manager</span><span className="font-semibold text-cyan-400">3</span></div>
            <div className="flex justify-between"><span>Editor</span><span className="font-semibold text-orange-400">7</span></div>
          </div>
        </div>

        {/* Logs — alert state */}
        <div className="card p-5 border-red-500/25 bg-red-500/5">
          <div className="flex items-start justify-between mb-3">
            <p className="label text-red-400/70">Audit Logs (Today)</p>
            <div className="w-8 h-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <AlertTriangle size={16} className="text-red-400" />
            </div>
          </div>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))]">38</p>
          <p className="text-xs text-red-400 mt-1 font-medium">3 failed login attempts</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Last: 14 min ago</p>
        </div>

        {/* SEO coverage */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="label">SEO Coverage</p>
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <Globe size={16} className="text-emerald-400" />
            </div>
          </div>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))]">91.5%</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">12 pages missing meta</p>
          <div className="mt-3 h-1.5 bg-[hsl(var(--surface-elevated))] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '91.5%' }} />
          </div>
          <div className="flex items-center gap-1 mt-1.5 text-xs text-emerald-400">
            <TrendingUp size={12} />
            <span>+2.3% from last week</span>
          </div>
        </div>

        {/* Publish rate */}
        <div className="card p-5">
          <div className="flex items-start justify-between mb-3">
            <p className="label">Publish Rate (7d)</p>
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
              <Activity size={16} className="text-blue-400" />
            </div>
          </div>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))]">29</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">pages published this week</p>
          <div className="flex items-center gap-1 mt-2 text-xs text-red-400">
            <TrendingDown size={12} />
            <span>−4 vs last week</span>
          </div>
        </div>
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 xl:grid-cols-3 2xl:grid-cols-3 gap-4">
        {/* Publish activity chart */}
        <div className="xl:col-span-2 card p-5">
          <div className="flex items-center justify-between mb-5">
            <div>
              <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Page Activity — Last 7 Days</h3>
              <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Published, drafted, and archived pages by day</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={PUBLISH_ACTIVITY} barGap={2} barCategoryGap="25%">
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(222 25% 18%)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(222 15% 60%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: 'hsl(222 15% 60%)' }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(124,58,237,0.06)' }} />
              <Legend
                wrapperStyle={{ fontSize: 11, color: 'hsl(222 15% 60%)' }}
                iconType="circle"
                iconSize={8}
              />
              <Bar dataKey="published" fill="hsl(160 84% 39%)" radius={[3, 3, 0, 0]} name="Published" />
              <Bar dataKey="drafted" fill="hsl(38 92% 50%)" radius={[3, 3, 0, 0]} name="Drafted" />
              <Bar dataKey="archived" fill="hsl(222 15% 40%)" radius={[3, 3, 0, 0]} name="Archived" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shortcuts */}
        <div className="card p-5">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-4">Quick Actions</h3>
          <div className="space-y-2">
            {SHORTCUTS.map((s) => {
              const SIcon = s.icon;
              return (
                <Link
                  key={`shortcut-${s.label}`}
                  href={s.href}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-150 active:scale-95 ${s.color}`}
                >
                  <SIcon size={16} />
                  <span className="text-sm font-medium">{s.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent activity */}
      <div className="card">
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Recent Activity</h3>
          <Link href="#" className="text-xs text-green-600 hover:text-green-500 font-medium transition-colors">
            View all logs →
          </Link>
        </div>
        <div className="divide-y divide-[hsl(var(--border))]">
          {RECENT_LOGS.map((log) => (
            <div key={log.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-[hsl(var(--surface-elevated))] transition-colors">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                {log.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-[hsl(var(--foreground))]">
                  <span className="font-semibold">{log.user}</span>
                  {' '}
                  <span className={`font-medium ${LOG_COLORS[log.type]}`}>{log.action}</span>
                </p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] font-mono truncate">{log.entity}</p>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] flex-shrink-0">
                <Clock size={11} />
                {log.time}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}