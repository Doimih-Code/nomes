'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronLeft, Save, Globe, Code2, Monitor, Tablet, Smartphone, Loader2, Undo2, Redo2, Layers } from 'lucide-react';
import Icon from '@/components/ui/AppIcon';



interface BuilderToolbarProps {
  pageTitle: string;
  pageSlug: string;
  onTitleChange: (v: string) => void;
  onSlugChange: (v: string) => void;
  onSave: () => void;
  onPublish: () => void;
  saveLoading: boolean;
  publishLoading: boolean;
  onToggleJson: () => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
  onPreviewModeChange: (m: 'desktop' | 'tablet' | 'mobile') => void;
  blockCount: number;
}

const PREVIEW_MODES = [
  { value: 'desktop', icon: Monitor, label: 'Desktop' },
  { value: 'tablet', icon: Tablet, label: 'Tablet' },
  { value: 'mobile', icon: Smartphone, label: 'Mobile' },
] as const;

export default function BuilderToolbar({
  pageTitle, pageSlug, onTitleChange, onSlugChange,
  onSave, onPublish, saveLoading, publishLoading,
  onToggleJson, previewMode, onPreviewModeChange, blockCount
}: BuilderToolbarProps) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingSlug, setEditingSlug] = useState(false);

  return (
    <div className="h-13 flex items-center gap-3 px-4 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface))] flex-shrink-0" style={{ height: 52 }}>
      {/* Back */}
      <Link
        href="/page-management"
        className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors flex-shrink-0"
      >
        <ChevronLeft size={15} />
        <span className="hidden sm:inline">Pages</span>
      </Link>

      <div className="w-px h-5 bg-[hsl(var(--border))]" />

      {/* Page title + slug */}
      <div className="flex flex-col min-w-0 flex-1 max-w-xs">
        {editingTitle ? (
          <input
            autoFocus
            value={pageTitle}
            onChange={(e) => onTitleChange(e.target.value)}
            onBlur={() => setEditingTitle(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingTitle(false)}
            className="text-sm font-semibold bg-transparent border-b border-violet-500 outline-none text-[hsl(var(--foreground))] w-full"
          />
        ) : (
          <button
            onClick={() => setEditingTitle(true)}
            className="text-sm font-semibold text-[hsl(var(--foreground))] truncate text-left hover:text-violet-400 transition-colors"
            title="Click to rename"
          >
            {pageTitle}
          </button>
        )}
        {editingSlug ? (
          <input
            autoFocus
            value={pageSlug}
            onChange={(e) => onSlugChange(e.target.value)}
            onBlur={() => setEditingSlug(false)}
            onKeyDown={(e) => e.key === 'Enter' && setEditingSlug(false)}
            className="text-[10px] font-mono bg-transparent border-b border-violet-500 outline-none text-violet-400 w-full"
          />
        ) : (
          <button
            onClick={() => setEditingSlug(true)}
            className="text-[10px] font-mono text-[hsl(var(--muted-foreground))] text-left hover:text-violet-400 transition-colors truncate"
            title="Click to edit slug"
          >
            {pageSlug}
          </button>
        )}
      </div>

      {/* Block count */}
      <div className="hidden md:flex items-center gap-1.5 px-2.5 py-1 bg-[hsl(var(--surface-elevated))] rounded-lg border border-[hsl(var(--border))]">
        <Layers size={12} className="text-[hsl(var(--muted-foreground))]" />
        <span className="text-xs text-[hsl(var(--muted-foreground))] tabular-nums">{blockCount} blocks</span>
      </div>

      {/* Preview mode */}
      <div className="hidden sm:flex items-center gap-0.5 bg-[hsl(var(--surface-elevated))] rounded-lg p-0.5 border border-[hsl(var(--border))]">
        {PREVIEW_MODES.map(({ value, icon: Icon, label }) => (
          <button
            key={`preview-${value}`}
            onClick={() => onPreviewModeChange(value)}
            title={label}
            className={`p-1.5 rounded-md transition-all duration-150 ${previewMode === value ? 'bg-[hsl(var(--surface))] text-violet-400 shadow-sm' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
          >
            <Icon size={14} />
          </button>
        ))}
      </div>

      <div className="flex-1" />

      {/* History */}
      <div className="hidden md:flex items-center gap-1">
        <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Undo">
          <Undo2 size={14} />
        </button>
        <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Redo">
          <Redo2 size={14} />
        </button>
      </div>

      {/* JSON preview */}
      <button
        onClick={onToggleJson}
        className="hidden md:flex items-center gap-2 btn-ghost text-xs"
      >
        <Code2 size={14} />
        JSON
      </button>

      {/* Save */}
      <button
        onClick={onSave}
        disabled={saveLoading}
        className="btn-secondary flex items-center gap-2 text-xs py-2 px-3"
      >
        {saveLoading ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />}
        Save Draft
      </button>

      {/* Publish */}
      <button
        onClick={onPublish}
        disabled={publishLoading}
        className="btn-primary flex items-center gap-2 text-xs py-2 px-3"
      >
        {publishLoading ? <Loader2 size={13} className="animate-spin" /> : <Globe size={13} />}
        Publish
      </button>
    </div>
  );
}