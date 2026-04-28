import React from 'react';

type StatusType = 'published' | 'draft' | 'review' | 'archived';
type RoleType = 'superadmin' | 'seo' | 'editor';

interface StatusBadgeProps {
  status: StatusType;
  size?: 'sm' | 'md';
}

interface RoleBadgeProps {
  role: RoleType;
  size?: 'sm' | 'md';
}

const STATUS_CONFIG: Record<StatusType, { label: string; className: string; dot: string }> = {
  published: {
    label: 'Published',
    className: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/25',
    dot: 'bg-emerald-400',
  },
  draft: {
    label: 'Draft',
    className: 'bg-amber-500/15 text-amber-400 border border-amber-500/25',
    dot: 'bg-amber-400',
  },
  review: {
    label: 'In Review',
    className: 'bg-blue-500/15 text-blue-400 border border-blue-500/25',
    dot: 'bg-blue-400',
  },
  archived: {
    label: 'Archived',
    className: 'bg-zinc-500/15 text-zinc-400 border border-zinc-500/25',
    dot: 'bg-zinc-400',
  },
};

const ROLE_CONFIG: Record<RoleType, { label: string; className: string }> = {
  superadmin: {
    label: 'Superadmin',
    className: 'bg-violet-500/15 text-violet-400 border border-violet-500/25',
  },
  seo: {
    label: 'SEO',
    className: 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/25',
  },
  editor: {
    label: 'Editor',
    className: 'bg-orange-500/15 text-orange-400 border border-orange-500/25',
  },
};

export function StatusBadge({ status, size = 'md' }: StatusBadgeProps) {
  const config = STATUS_CONFIG[status];
  return (
    <span
      className={`
        inline-flex items-center gap-1.5 font-semibold rounded-md
        ${size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'}
        ${config.className}
      `}
    >
      <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${config.dot}`} />
      {config.label}
    </span>
  );
}

export function RoleBadge({ role, size = 'md' }: RoleBadgeProps) {
  const config = ROLE_CONFIG[role];
  return (
    <span
      className={`
        inline-flex items-center font-semibold rounded-md
        ${size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs'}
        ${config.className}
      `}
    >
      {config.label}
    </span>
  );
}