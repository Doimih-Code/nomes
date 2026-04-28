'use client';
import React from 'react';
import type { Block } from './PageBuilderShell';

interface SeoPanelProps {
  block: Block;
  onUpdate: (patch: Partial<Block>) => void;
}

export default function SeoPanel({ block, onUpdate }: SeoPanelProps) {
  return (
    <div className="space-y-4">
      <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
        Block-level SEO hints help search engines understand the role of this section.
      </p>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Semantic Role</label>
        <div className="relative">
          <select
            value={block.props.semanticRole || 'section'}
            onChange={(e) => onUpdate({ props: { ...block.props, semanticRole: e.target.value } })}
            className="w-full appearance-none bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500 pr-7"
          >
            {['section', 'article', 'aside', 'header', 'footer', 'main', 'nav'].map((r) => (
              <option key={`role-${r}`} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Aria Label</label>
        <input
          value={block.props.ariaLabel || ''}
          onChange={(e) => onUpdate({ props: { ...block.props, ariaLabel: e.target.value } })}
          placeholder="Accessible label for screen readers"
          className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500"
        />
      </div>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Heading Level</label>
        <div className="relative">
          <select
            value={block.props.headingLevel || 'h2'}
            onChange={(e) => onUpdate({ props: { ...block.props, headingLevel: e.target.value } })}
            className="w-full appearance-none bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500 pr-7"
          >
            {['h1', 'h2', 'h3', 'h4'].map((h) => (
              <option key={`heading-${h}`} value={h}>{h}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="space-y-1.5">
        <label className="block text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Structured Data Type</label>
        <div className="relative">
          <select
            value={block.props.schemaType || 'none'}
            onChange={(e) => onUpdate({ props: { ...block.props, schemaType: e.target.value } })}
            className="w-full appearance-none bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500 pr-7"
          >
            {['none', 'WebPage', 'Article', 'Product', 'FAQPage', 'HowTo', 'Review'].map((s) => (
              <option key={`schema-${s}`} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}