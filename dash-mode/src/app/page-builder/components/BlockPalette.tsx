'use client';
import React, { useState } from 'react';
import {
  Layout, Type, Image, Grid3x3, Quote, Minus, Video,
  List, Star, Mail, Map, Code, ChevronDown, Search, Plus
} from 'lucide-react';

interface BlockType {
  type: string;
  label: string;
  icon: React.ElementType;
  category: string;
  description: string;
}

const BLOCK_TYPES: BlockType[] = [
  { type: 'hero', label: 'Hero Section', icon: Layout, category: 'Layout', description: 'Full-width hero with headline, subtext, and CTA' },
  { type: 'features', label: 'Feature Grid', icon: Grid3x3, category: 'Layout', description: 'Grid of feature cards with icons and descriptions' },
  { type: 'cta', label: 'Call to Action', icon: Star, category: 'Layout', description: 'Conversion section with headline and button' },
  { type: 'columns', label: 'Two Columns', icon: Minus, category: 'Layout', description: 'Side-by-side content layout' },
  { type: 'richtext', label: 'Rich Text', icon: Type, category: 'Content', description: 'Formatted text content with headings and lists' },
  { type: 'image', label: 'Image Block', icon: Image, category: 'Content', description: 'Single image with optional caption and alt text' },
  { type: 'video', label: 'Video Embed', icon: Video, category: 'Content', description: 'YouTube, Vimeo, or direct video embed' },
  { type: 'quote', label: 'Blockquote', icon: Quote, category: 'Content', description: 'Highlighted pull quote or testimonial' },
  { type: 'list', label: 'Icon List', icon: List, category: 'Content', description: 'Bulleted list with optional icons' },
  { type: 'code', label: 'Code Block', icon: Code, category: 'Content', description: 'Syntax-highlighted code snippet' },
  { type: 'form', label: 'Contact Form', icon: Mail, category: 'Interactive', description: 'Lead capture form with field configuration' },
  { type: 'map', label: 'Map Embed', icon: Map, category: 'Interactive', description: 'Google Maps or Mapbox embed' },
];

const CATEGORIES = ['All', 'Layout', 'Content', 'Interactive'];

interface BlockPaletteProps {
  onAddBlock: (type: string, label: string) => void;
}

export default function BlockPalette({ onAddBlock }: BlockPaletteProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['Layout', 'Content', 'Interactive']));

  const filtered = BLOCK_TYPES.filter((b) => {
    const matchSearch = !search || b.label.toLowerCase().includes(search.toLowerCase()) || b.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'All' || b.category === activeCategory;
    return matchSearch && matchCat;
  });

  const grouped = CATEGORIES.slice(1).reduce<Record<string, BlockType[]>>((acc, cat) => {
    acc[cat] = filtered.filter((b) => b.category === cat);
    return acc;
  }, {});

  const toggleCategory = (cat: string) => {
    const next = new Set(expandedCategories);
    if (next.has(cat)) next.delete(cat);
    else next.add(cat);
    setExpandedCategories(next);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-3 py-3 border-b border-[hsl(var(--border))]">
        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-2.5">Blocks</p>
        <div className="relative">
          <Search size={12} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-lg pl-7 pr-3 py-1.5 text-xs text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] outline-none focus:border-violet-500"
            placeholder="Search blocks…"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="flex gap-1 px-3 py-2 border-b border-[hsl(var(--border))] flex-wrap">
        {CATEGORIES.map((cat) => (
          <button
            key={`palette-cat-${cat}`}
            onClick={() => setActiveCategory(cat)}
            className={`px-2 py-1 rounded-md text-[10px] font-semibold transition-colors ${activeCategory === cat ? 'bg-violet-600/20 text-violet-400' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Block list */}
      <div className="flex-1 overflow-y-auto py-2">
        {activeCategory === 'All' ? (
          Object.entries(grouped).map(([cat, items]) => {
            if (!items.length) return null;
            const expanded = expandedCategories.has(cat);
            return (
              <div key={`palette-group-${cat}`} className="mb-1">
                <button
                  onClick={() => toggleCategory(cat)}
                  className="w-full flex items-center justify-between px-3 py-2 text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider hover:text-[hsl(var(--foreground))] transition-colors"
                >
                  <span>{cat}</span>
                  <ChevronDown size={11} className={`transition-transform duration-200 ${expanded ? 'rotate-180' : ''}`} />
                </button>
                {expanded && (
                  <div className="space-y-0.5 px-2">
                    {items.map((block) => (
                      <BlockItem key={`palette-block-${block.type}`} block={block} onAdd={onAddBlock} />
                    ))}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="space-y-0.5 px-2">
            {filtered.map((block) => (
              <BlockItem key={`palette-block-filtered-${block.type}`} block={block} onAdd={onAddBlock} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function BlockItem({ block, onAdd }: { block: BlockType; onAdd: (type: string, label: string) => void }) {
  const BIcon = block.icon;
  return (
    <div
      className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] cursor-pointer group transition-all duration-150"
      onClick={() => onAdd(block.type, block.label)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onAdd(block.type, block.label)}
      title={block.description}
    >
      <div className="w-7 h-7 rounded-lg bg-violet-500/10 border border-violet-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-violet-500/20 transition-colors">
        <BIcon size={13} className="text-violet-400" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-semibold text-[hsl(var(--foreground))] truncate">{block.label}</p>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate leading-tight">{block.description}</p>
      </div>
      <Plus size={12} className="text-violet-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" />
    </div>
  );
}