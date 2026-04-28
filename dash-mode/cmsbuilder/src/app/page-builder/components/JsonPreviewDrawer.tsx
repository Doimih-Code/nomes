'use client';
import React, { useState } from 'react';
import { X, Copy, Check, Download } from 'lucide-react';
import type { Block } from './PageBuilderShell';

interface JsonPreviewDrawerProps {
  open: boolean;
  onClose: () => void;
  blocks: Block[];
  pageTitle: string;
  pageSlug: string;
}

export default function JsonPreviewDrawer({ open, onClose, blocks, pageTitle, pageSlug }: JsonPreviewDrawerProps) {
  const [copied, setCopied] = useState(false);
  const [activeView, setActiveView] = useState<'content' | 'full'>('content');

  const contentJson = { blocks };
  const fullJson = {
    title: pageTitle,
    slug: pageSlug,
    status: 'draft',
    contentJson: { blocks },
    seoJson: {
      title: pageTitle,
      description: '',
      ogImage: '',
      canonical: pageSlug,
    },
  };

  const json = JSON.stringify(activeView === 'content' ? contentJson : fullJson, null, 2);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(json);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${pageSlug.replace(/\//g, '-') || 'page'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (!open) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex animate-fade-in">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative ml-auto w-full max-w-xl bg-[hsl(var(--surface))] border-l border-[hsl(var(--border))] flex flex-col shadow-2xl shadow-black/40 animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[hsl(var(--border))]">
          <div>
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">JSON Preview</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{blocks.length} blocks · {json.length.toLocaleString()} chars</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex bg-[hsl(var(--surface-elevated))] rounded-lg p-0.5 border border-[hsl(var(--border))]">
              {(['content', 'full'] as const).map((v) => (
                <button
                  key={`json-view-${v}`}
                  onClick={() => setActiveView(v)}
                  className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${activeView === v ? 'bg-[hsl(var(--surface))] text-[hsl(var(--foreground))]' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
                >
                  {v === 'content' ? 'contentJson' : 'Full Page'}
                </button>
              ))}
            </div>
            <button onClick={handleCopy} className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Copy JSON">
              {copied ? <Check size={15} className="text-emerald-400" /> : <Copy size={15} />}
            </button>
            <button onClick={handleDownload} className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Download JSON">
              <Download size={15} />
            </button>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              <X size={15} />
            </button>
          </div>
        </div>

        {/* JSON content */}
        <div className="flex-1 overflow-auto p-4">
          <pre className="text-[11px] font-mono text-emerald-400 leading-relaxed whitespace-pre-wrap break-all">
            {json}
          </pre>
        </div>

        {/* Footer note */}
        <div className="px-5 py-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
          <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
            {/* BACKEND INTEGRATION: POST /api/builder/validate — send this JSON for server-side Zod validation */}
            This JSON is validated server-side via <span className="font-mono text-violet-400">POST /api/builder/validate</span> on save.
          </p>
        </div>
      </div>
    </div>
  );
}