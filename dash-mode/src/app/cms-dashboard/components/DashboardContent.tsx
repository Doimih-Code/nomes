'use client';
import React, { useState } from 'react';
import { Shield, Layers, FileText } from 'lucide-react';
import SuperadminDashboard from './SuperadminDashboard';
import SeoDashboard from './SeoDashboard';
import EditorDashboard from './EditorDashboard';

type Role = 'superadmin' | 'seo' | 'editor';

const ROLES: { value: Role; label: string; icon: React.ElementType; color: string }[] = [
  { value: 'superadmin', label: 'Superadmin', icon: Shield, color: 'text-green-600' },
  { value: 'seo', label: 'SEO Manager', icon: Layers, color: 'text-cyan-400' },
  { value: 'editor', label: 'Content Editor', icon: FileText, color: 'text-orange-400' },
];

export default function DashboardContent() {
  const [activeRole, setActiveRole] = useState<Role>('superadmin');

  return (
    <div className="p-6 xl:p-8 2xl:p-10 max-w-screen-2xl mx-auto space-y-6">
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Dashboard</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
            Last refreshed: Apr 27, 2026 at 17:17 UTC
          </p>
        </div>

        {/* Role switcher — demo only */}
        <div className="flex items-center gap-1 bg-[hsl(var(--surface-elevated))] rounded-xl p-1 border border-[hsl(var(--border))]">
          {ROLES.map((r) => {
            const RIcon = r.icon;
            return (
              <button
                key={`role-tab-${r.value}`}
                onClick={() => setActiveRole(r.value)}
                className={`
                  flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold transition-all duration-150
                  ${activeRole === r.value
                    ? 'bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] shadow-sm'
                    : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                  }
                `}
              >
                <RIcon size={13} className={activeRole === r.value ? r.color : ''} />
                <span className="hidden sm:inline">{r.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Role-based content */}
      {activeRole === 'superadmin' && <SuperadminDashboard />}
      {activeRole === 'seo' && <SeoDashboard />}
      {activeRole === 'editor' && <EditorDashboard />}
    </div>
  );
}