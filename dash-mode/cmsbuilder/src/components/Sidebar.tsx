'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';
import { LayoutDashboard, FileText, Hammer, Image, Users, Settings, ChevronLeft, ChevronRight, Shield, Sun, Moon } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';
import { useTheme } from '@/context/ThemeContext';


interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  currentPath: string;
  onMobileClose?: () => void;
}

const NAV_GROUPS = [
  {
    label: 'Content',
    items: [
      { label: 'Dashboard', icon: LayoutDashboard, path: '/cms-dashboard', badge: null },
      { label: 'Pages', icon: FileText, path: '/page-management', badge: '3' },
      { label: 'Page Builder', icon: Hammer, path: '/page-builder', badge: null },
    ],
  },
  {
    label: 'Assets',
    items: [
      { label: 'Media', icon: Image, path: '/media-management', badge: null },
    ],
  },
  {
    label: 'Admin',
    items: [
      { label: 'Users', icon: Users, path: '/user-management', badge: null },
      { label: 'Roles & Perms', icon: Shield, path: '/user-management', badge: null },
    ],
  },
];

export default function Sidebar({ collapsed, onToggleCollapse, currentPath, onMobileClose }: SidebarProps) {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => currentPath === path || currentPath.startsWith(path + '/');

  return (
    <aside
      className={`
        h-full bg-[hsl(var(--surface))] border-r border-[hsl(var(--border))]
        flex flex-col transition-all duration-300 ease-in-out
        ${collapsed ? 'w-16' : 'w-60'}
      `}
    >
      {/* Logo */}
      <div className={`flex items-center border-b border-[hsl(var(--border))] h-14 flex-shrink-0 ${collapsed ? 'justify-center px-2' : 'px-4 gap-2'}`}>
        <div className="flex items-center gap-2">
          <AppLogo size={28} />
          {!collapsed && (
            <span className="font-bold text-sm text-gradient-violet tracking-tight">CMSBuilder</span>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-3 px-2 space-y-4">
        {NAV_GROUPS.map((group) => (
          <div key={`group-${group.label}`}>
            {!collapsed && (
              <p className="px-3 mb-1 text-[10px] font-semibold uppercase tracking-widest text-[hsl(var(--muted-foreground))] opacity-60">
                {group.label}
              </p>
            )}
            <div className="space-y-0.5">
              {group.items.map((item) => {
                const active = isActive(item.path);
                const Icon = item.icon;
                return (
                  <Link
                    key={`nav-${item.path}-${item.label}`}
                    href={item.path}
                    onClick={onMobileClose}
                    className={`
                      relative flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium
                      transition-all duration-150 group
                      ${active
                        ? 'bg-[#1B2C1A]/15 text-[#1B2C1A]' :'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))]'
                      }
                      ${collapsed ? 'justify-center' : ''}
                    `}
                    title={collapsed ? item.label : undefined}
                  >
                    <Icon size={18} className="flex-shrink-0" />
                    {!collapsed && (
                      <>
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto bg-[#1B2C1A]/20 text-[#1B2C1A] text-[10px] font-bold px-1.5 py-0.5 rounded-md">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}
                    {collapsed && item.badge && (
                      <span className="absolute top-1 right-1 w-2 h-2 bg-[#1B2C1A] rounded-full" />
                    )}
                    {/* Tooltip for collapsed */}
                    {collapsed && (
                      <div className="absolute left-full ml-2 px-2 py-1 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
                        {item.label}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Bottom actions */}
      <div className="border-t border-[hsl(var(--border))] p-2 space-y-0.5">
        {/* Theme toggle */}
        <button
          onClick={toggleTheme}
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150 group relative ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? (theme === 'dark' ? 'Light mode' : 'Dark mode') : undefined}
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} className="flex-shrink-0" /> : <Moon size={18} className="flex-shrink-0" />}
          {!collapsed && <span>{theme === 'dark' ? 'Light mode' : 'Dark mode'}</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
              {theme === 'dark' ? 'Light mode' : 'Dark mode'}
            </div>
          )}
        </button>

        <button
          className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150 group relative ${collapsed ? 'justify-center' : ''}`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} className="flex-shrink-0" />
          {!collapsed && <span>Settings</span>}
          {collapsed && (
            <div className="absolute left-full ml-2 px-2 py-1 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-md text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-150 z-50">
              Settings
            </div>
          )}
        </button>

        {/* User profile */}
        <div
          className={`flex items-center gap-3 px-3 py-2.5 rounded-lg cursor-pointer hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          onClick={() => setUserMenuOpen(!userMenuOpen)}
        >
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#1B2C1A] to-[#0f1a0e] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            SA
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">Sofia Andreescu</p>
              <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">superadmin</p>
            </div>
          )}
        </div>

        {/* Collapse toggle */}
        <button
          onClick={onToggleCollapse}
          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--surface-elevated))] transition-all duration-150 ${collapsed ? 'justify-center' : ''}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? <ChevronRight size={16} /> : (
            <>
              <ChevronLeft size={16} />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  );
}