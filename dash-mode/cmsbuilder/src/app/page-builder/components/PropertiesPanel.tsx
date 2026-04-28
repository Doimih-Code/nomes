'use client';
import React from 'react';
import { Settings, Zap, Globe, ChevronDown } from 'lucide-react';
import type { Block, RightPanelTab, BlockAnimation } from './PageBuilderShell';
import SeoPanel from '@/app/page-builder/components/SeoPanel';


interface PropertiesPanelProps {
  block: Block | null;
  activeTab: RightPanelTab;
  onTabChange: (tab: RightPanelTab) => void;
  onUpdateBlock: (id: string, patch: Partial<Block>) => void;
}

const TABS: { value: RightPanelTab; label: string; icon: React.ElementType }[] = [
  { value: 'properties', label: 'Props', icon: Settings },
  { value: 'animation', label: 'Animate', icon: Zap },
  { value: 'seo', label: 'SEO', icon: Globe },
];

const ANIMATION_TYPES: BlockAnimation['type'][] = ['none', 'fadeIn', 'fadeUp', 'slideLeft', 'slideRight', 'zoomIn', 'bounceIn'];
const TRIGGERS: BlockAnimation['trigger'][] = ['onLoad', 'onScroll', 'onView', 'onHover'];
const EASINGS = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear', 'cubic-bezier(0.34,1.56,0.64,1)'];

function FieldRow({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">{label}</label>
      {hint && <p className="text-[10px] text-[hsl(var(--muted-foreground))] opacity-70 -mt-0.5">{hint}</p>}
      {children}
    </div>
  );
}

function PanelInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] placeholder:text-[hsl(var(--muted-foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all"
    />
  );
}

function PanelSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: string[] }) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-[hsl(var(--foreground))] rounded-lg px-2.5 py-2 text-xs outline-none focus:border-violet-500 pr-7 cursor-pointer"
      >
        {options.map((o) => <option key={`select-${o}`} value={o}>{o}</option>)}
      </select>
      <ChevronDown size={11} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] pointer-events-none" />
    </div>
  );
}

function PanelToggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs text-[hsl(var(--muted-foreground))]">{label}</span>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-9 h-5 rounded-full transition-colors duration-200 ${checked ? 'bg-violet-600' : 'bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))]'}`}
        role="switch"
        aria-checked={checked}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${checked ? 'left-4' : 'left-0.5'}`} />
      </button>
    </div>
  );
}

function HeroProps({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<Block>) => void }) {
  const updateProp = (key: string, val: string) => onUpdate({ props: { ...block.props, [key]: val } });
  return (
    <div className="space-y-4">
      <FieldRow label="Headline"><PanelInput value={block.props.headline || ''} onChange={(v) => updateProp('headline', v)} placeholder="Hero headline" /></FieldRow>
      <FieldRow label="Subheadline"><PanelInput value={block.props.subheadline || ''} onChange={(v) => updateProp('subheadline', v)} placeholder="Supporting text" /></FieldRow>
      <FieldRow label="CTA Label"><PanelInput value={block.props.ctaLabel || ''} onChange={(v) => updateProp('ctaLabel', v)} placeholder="Button label" /></FieldRow>
      <FieldRow label="CTA Link"><PanelInput value={block.props.ctaHref || ''} onChange={(v) => updateProp('ctaHref', v)} placeholder="/signup" /></FieldRow>
      <FieldRow label="Background">
        <PanelSelect
          value={block.props.backgroundType || 'gradient'}
          onChange={(v) => updateProp('backgroundType', v)}
          options={['gradient', 'image', 'solid', 'transparent']}
        />
      </FieldRow>
    </div>
  );
}

function GenericStyleProps({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<Block>) => void }) {
  const updateStyle = (key: string, val: string) => onUpdate({ style: { ...block.style, [key]: val } });
  return (
    <div className="space-y-4">
      <FieldRow label="Padding Top"><PanelInput value={block.style.paddingTop || ''} onChange={(v) => updateStyle('paddingTop', v)} placeholder="48px" /></FieldRow>
      <FieldRow label="Padding Bottom"><PanelInput value={block.style.paddingBottom || ''} onChange={(v) => updateStyle('paddingBottom', v)} placeholder="48px" /></FieldRow>
      <FieldRow label="Background Color"><PanelInput value={block.style.backgroundColor || ''} onChange={(v) => updateStyle('backgroundColor', v)} placeholder="transparent" /></FieldRow>
      <FieldRow label="Text Align">
        <PanelSelect value={block.style.textAlign || 'left'} onChange={(v) => updateStyle('textAlign', v)} options={['left', 'center', 'right']} />
      </FieldRow>
    </div>
  );
}

function AnimationProps({ block, onUpdate }: { block: Block; onUpdate: (patch: Partial<Block>) => void }) {
  const updateAnim = (key: string, val: any) => onUpdate({ animation: { ...block.animation, [key]: val } });
  const updateParallax = (key: string, val: any) => onUpdate({ parallax: { ...block.parallax, [key]: val } });

  return (
    <div className="space-y-5">
      <div className="space-y-4">
        <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Animation</p>
        <FieldRow label="Type">
          <PanelSelect value={block.animation.type} onChange={(v) => updateAnim('type', v)} options={ANIMATION_TYPES} />
        </FieldRow>
        <FieldRow label="Trigger">
          <PanelSelect value={block.animation.trigger} onChange={(v) => updateAnim('trigger', v)} options={TRIGGERS} />
        </FieldRow>
        <FieldRow label="Duration (ms)">
          <div className="space-y-1.5">
            <input
              type="range" min={100} max={2000} step={50}
              value={block.animation.duration}
              onChange={(e) => updateAnim('duration', Number(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
              <span>100ms</span>
              <span className="font-semibold text-violet-400 tabular-nums">{block.animation.duration}ms</span>
              <span>2000ms</span>
            </div>
          </div>
        </FieldRow>
        <FieldRow label="Delay (ms)">
          <div className="space-y-1.5">
            <input
              type="range" min={0} max={1000} step={50}
              value={block.animation.delay}
              onChange={(e) => updateAnim('delay', Number(e.target.value))}
              className="w-full accent-violet-500"
            />
            <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
              <span>0ms</span>
              <span className="font-semibold text-violet-400 tabular-nums">{block.animation.delay}ms</span>
              <span>1000ms</span>
            </div>
          </div>
        </FieldRow>
        <FieldRow label="Easing">
          <PanelSelect value={block.animation.easing} onChange={(v) => updateAnim('easing', v)} options={EASINGS} />
        </FieldRow>
        <PanelToggle checked={block.animation.repeat} onChange={(v) => updateAnim('repeat', v)} label="Repeat animation" />
        <PanelToggle checked={block.animation.once} onChange={(v) => updateAnim('once', v)} label="Animate once only" />
      </div>

      <div className="pt-3 border-t border-[hsl(var(--border))] space-y-4">
        <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Parallax</p>
        <PanelToggle checked={block.parallax.enabled} onChange={(v) => updateParallax('enabled', v)} label="Enable parallax" />
        {block.parallax.enabled && (
          <>
            <FieldRow label="Direction">
              <PanelSelect value={block.parallax.direction} onChange={(v) => updateParallax('direction', v)} options={['vertical', 'horizontal']} />
            </FieldRow>
            <FieldRow label="Speed">
              <div className="space-y-1.5">
                <input type="range" min={0.1} max={2} step={0.1}
                  value={block.parallax.speed}
                  onChange={(e) => updateParallax('speed', Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
                  <span>0.1</span>
                  <span className="font-semibold text-violet-400 tabular-nums">{block.parallax.speed.toFixed(1)}x</span>
                  <span>2.0</span>
                </div>
              </div>
            </FieldRow>
            <FieldRow label="Intensity (px)">
              <div className="space-y-1.5">
                <input type="range" min={5} max={100} step={5}
                  value={block.parallax.intensity}
                  onChange={(e) => updateParallax('intensity', Number(e.target.value))}
                  className="w-full accent-violet-500"
                />
                <div className="flex justify-between text-[10px] text-[hsl(var(--muted-foreground))]">
                  <span>5px</span>
                  <span className="font-semibold text-violet-400 tabular-nums">{block.parallax.intensity}px</span>
                  <span>100px</span>
                </div>
              </div>
            </FieldRow>
            <PanelToggle checked={block.parallax.mobileDisabled} onChange={(v) => updateParallax('mobileDisabled', v)} label="Disable on mobile" />
          </>
        )}
      </div>
    </div>
  );
}

export default function PropertiesPanel({ block, activeTab, onTabChange, onUpdateBlock }: PropertiesPanelProps) {
  if (!block) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center">
        <div className="w-12 h-12 rounded-xl bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center mb-3">
          <Settings size={20} className="text-[hsl(var(--muted-foreground))]" />
        </div>
        <p className="text-xs font-semibold text-[hsl(var(--foreground))] mb-1">No block selected</p>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Click a block on the canvas to edit its properties.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-[hsl(var(--border))]">
        {TABS.map(({ value, label, icon: TIcon }) => (
          <button
            key={`panel-tab-${value}`}
            onClick={() => onTabChange(value)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold transition-all duration-150 border-b-2 ${
              activeTab === value
                ? 'border-violet-500 text-violet-400'
                : 'border-transparent text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
            }`}
          >
            {React.createElement(TIcon, { size: 12 })}
            {label}
          </button>
        ))}
      </div>

      {/* Block type badge */}
      <div className="px-4 py-3 border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{block.label}</p>
          <span className="px-1.5 py-0.5 bg-violet-500/10 text-violet-400 text-[10px] font-mono rounded">{block.type}</span>
        </div>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))] font-mono mt-0.5">{block.id}</p>
      </div>

      {/* Panel content */}
      <div className="flex-1 overflow-y-auto p-4">
        {activeTab === 'properties' && (
          <div className="space-y-5">
            {block.type === 'hero' && <HeroProps block={block} onUpdate={(patch) => onUpdateBlock(block.id, patch)} />}
            <div className="pt-3 border-t border-[hsl(var(--border))]">
              <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-3">Styles</p>
              <GenericStyleProps block={block} onUpdate={(patch) => onUpdateBlock(block.id, patch)} />
            </div>
          </div>
        )}
        {activeTab === 'animation' && (
          <AnimationProps block={block} onUpdate={(patch) => onUpdateBlock(block.id, patch)} />
        )}
        {activeTab === 'seo' && (
          <SeoPanel block={block} onUpdate={(patch) => onUpdateBlock(block.id, patch)} />
        )}
      </div>
    </div>
  );
}