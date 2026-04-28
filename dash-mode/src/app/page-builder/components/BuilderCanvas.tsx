'use client';
import React from 'react';
import { Trash2, Copy, ChevronUp, ChevronDown, GripVertical, Layout, Type, Image, Grid3x3, Star, Quote, List, Video, Mail, Map, Code, Minus } from 'lucide-react';
import type { Block } from './PageBuilderShell';

const BLOCK_ICONS: Record<string, React.ElementType> = {
  hero: Layout,
  features: Grid3x3,
  cta: Star,
  richtext: Type,
  image: Image,
  quote: Quote,
  list: List,
  video: Video,
  form: Mail,
  map: Map,
  code: Code,
  columns: Minus,
};

const PREVIEW_WIDTHS = {
  desktop: 'max-w-full',
  tablet: 'max-w-2xl',
  mobile: 'max-w-sm',
};

interface BuilderCanvasProps {
  blocks: Block[];
  selectedBlockId: string | null;
  onSelectBlock: (id: string) => void;
  onDeleteBlock: (id: string) => void;
  onDuplicateBlock: (id: string) => void;
  onMoveBlock: (id: string, dir: 'up' | 'down') => void;
  previewMode: 'desktop' | 'tablet' | 'mobile';
}

function BlockPreview({ block }: { block: Block }) {
  switch (block.type) {
    case 'hero':
      return (
        <div className="py-12 px-8 text-center space-y-4 bg-gradient-to-br from-violet-950/40 to-transparent rounded-xl">
          <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">{block.props.headline || 'Hero Headline'}</h2>
          <p className="text-sm text-[hsl(var(--muted-foreground))] max-w-md mx-auto">{block.props.subheadline || 'Hero subheadline text goes here'}</p>
          <div className="flex justify-center gap-3 pt-2">
            <span className="px-4 py-2 bg-violet-600 text-white text-sm font-semibold rounded-lg">{block.props.ctaLabel || 'Get Started'}</span>
          </div>
        </div>
      );
    case 'features':
      return (
        <div className="py-10 px-8 space-y-6">
          <h3 className="text-lg font-bold text-[hsl(var(--foreground))] text-center">{block.props.title || 'Feature Section'}</h3>
          <div className="grid grid-cols-3 gap-4">
            {(block.props.items || ['Feature 1', 'Feature 2', 'Feature 3']).map((item: string, i: number) => (
              <div key={`feature-preview-${i}`} className="p-4 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-center">
                <div className="w-8 h-8 rounded-lg bg-violet-500/10 mx-auto mb-2" />
                <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{item}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'richtext':
      return (
        <div className="py-8 px-8">
          <div className="prose prose-sm max-w-none text-[hsl(var(--muted-foreground))] text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: block.props.content || '<p>Rich text content…</p>' }} />
        </div>
      );
    case 'cta':
      return (
        <div className="py-12 px-8 text-center space-y-4 bg-gradient-to-r from-violet-900/30 to-emerald-900/20 rounded-xl">
          <h3 className="text-xl font-bold text-[hsl(var(--foreground))]">{block.props.headline || 'Call to Action'}</h3>
          <span className="inline-block px-5 py-2.5 bg-violet-600 text-white text-sm font-semibold rounded-lg">{block.props.buttonLabel || 'Get Started'}</span>
        </div>
      );
    case 'image':
      return (
        <div className="py-6 px-8">
          <div className="w-full aspect-video bg-[hsl(var(--surface-elevated))] rounded-xl border border-[hsl(var(--border))] flex items-center justify-center">
            <Image size={32} className="text-[hsl(var(--muted-foreground))]" />
          </div>
        </div>
      );
    case 'quote':
      return (
        <div className="py-8 px-8">
          <blockquote className="border-l-4 border-violet-500 pl-5 py-2">
            <p className="text-base italic text-[hsl(var(--foreground))]">{block.props.text || '"A powerful quote goes here."'}</p>
            <cite className="text-xs text-[hsl(var(--muted-foreground))] mt-2 block">{block.props.author || '— Author Name'}</cite>
          </blockquote>
        </div>
      );
    default:
      return (
        <div className="py-8 px-8 flex items-center justify-center">
          <div className="text-center space-y-2">
            <div className="w-10 h-10 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center mx-auto">
              {React.createElement(BLOCK_ICONS[block.type] || Layout, { size: 18, className: 'text-[hsl(var(--muted-foreground))]' })}
            </div>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">{block.label}</p>
          </div>
        </div>
      );
  }
}

export default function BuilderCanvas({
  blocks, selectedBlockId, onSelectBlock, onDeleteBlock, onDuplicateBlock, onMoveBlock, previewMode
}: BuilderCanvasProps) {
  if (blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-center p-8">
        <div>
          <div className="w-16 h-16 rounded-2xl bg-[hsl(var(--surface))] border border-[hsl(var(--border))] flex items-center justify-center mx-auto mb-4">
            <Layout size={28} className="text-[hsl(var(--muted-foreground))]" />
          </div>
          <h3 className="text-sm font-semibold text-[hsl(var(--foreground))] mb-1.5">No blocks yet</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] max-w-xs">
            Add blocks from the palette on the left to start building your page.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`mx-auto py-6 px-4 ${PREVIEW_WIDTHS[previewMode]} transition-all duration-300`}>
      <div className="space-y-2">
        {blocks.map((block, idx) => {
          const isSelected = block.id === selectedBlockId;
          const BIcon = BLOCK_ICONS[block.type] || Layout;
          return (
            <div
              key={block.id}
              onClick={() => onSelectBlock(block.id)}
              className={`
                relative rounded-xl border-2 transition-all duration-150 cursor-pointer group
                ${isSelected
                  ? 'border-violet-500 ring-2 ring-violet-500/20'
                  : 'border-transparent hover:border-[hsl(var(--border))]'
                }
              `}
            >
              {/* Block label bar */}
              <div className={`
                absolute -top-px left-3 flex items-center gap-1.5 px-2 py-0.5 rounded-b-md text-[10px] font-semibold transition-all duration-150
                ${isSelected ? 'bg-violet-600 text-white opacity-100' : 'bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] opacity-0 group-hover:opacity-100'}
              `}>
                <BIcon size={10} />
                {block.label}
                {block.animation.type !== 'none' && (
                  <span className="px-1 rounded bg-white/20 text-[9px]">{block.animation.type}</span>
                )}
              </div>

              {/* Block actions — top right */}
              <div className={`absolute top-2 right-2 flex items-center gap-1 transition-opacity duration-150 z-10 ${isSelected || true ? 'opacity-0 group-hover:opacity-100' : 'opacity-0'}`}>
                <button
                  onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'up'); }}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] disabled:opacity-30 transition-colors"
                  title="Move block up"
                >
                  <ChevronUp size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onMoveBlock(block.id, 'down'); }}
                  disabled={idx === blocks.length - 1}
                  className="p-1.5 rounded-lg bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] disabled:opacity-30 transition-colors"
                  title="Move block down"
                >
                  <ChevronDown size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDuplicateBlock(block.id); }}
                  className="p-1.5 rounded-lg bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] hover:text-violet-400 transition-colors"
                  title="Duplicate block"
                >
                  <Copy size={12} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); onDeleteBlock(block.id); }}
                  className="p-1.5 rounded-lg bg-[hsl(var(--surface-elevated))] border border-red-500/20 text-[hsl(var(--muted-foreground))] hover:text-red-400 hover:bg-red-500/10 transition-colors"
                  title="Remove block — cannot be undone"
                >
                  <Trash2 size={12} />
                </button>
              </div>

              {/* Drag handle */}
              <div className={`absolute top-1/2 -translate-y-1/2 -left-0 flex items-center transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                <GripVertical size={14} className="text-[hsl(var(--muted-foreground))]" />
              </div>

              {/* Block content preview */}
              <div className="bg-[hsl(var(--surface))] rounded-xl overflow-hidden">
                <BlockPreview block={block} />
              </div>

              {/* Animation indicator */}
              {block.animation.type !== 'none' && isSelected && (
                <div className="absolute bottom-2 left-3 flex items-center gap-1.5 px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 rounded-md">
                  <span className="text-[10px] text-violet-400 font-mono">{block.animation.type} · {block.animation.trigger} · {block.animation.duration}ms</span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}