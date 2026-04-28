'use client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import BlockPalette from './BlockPalette';
import BuilderCanvas from './BuilderCanvas';
import PropertiesPanel from './PropertiesPanel';
import BuilderToolbar from './BuilderToolbar';
import JsonPreviewDrawer from './JsonPreviewDrawer';


export type BlockAnimation = {
  type: 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'zoomIn' | 'bounceIn' | 'none';
  trigger: 'onLoad' | 'onScroll' | 'onView' | 'onHover';
  duration: number;
  delay: number;
  easing: string;
  repeat: boolean;
  once: boolean;
};

export type BlockParallax = {
  enabled: boolean;
  speed: number;
  direction: 'vertical' | 'horizontal';
  intensity: number;
  mobileDisabled: boolean;
};

export type Block = {
  id: string;
  type: string;
  label: string;
  props: Record<string, any>;
  style: Record<string, any>;
  animation: BlockAnimation;
  parallax: BlockParallax;
  children: Block[];
};

export type RightPanelTab = 'properties' | 'animation' | 'seo';

const DEFAULT_ANIMATION: BlockAnimation = {
  type: 'fadeUp',
  trigger: 'onView',
  duration: 600,
  delay: 0,
  easing: 'ease-out',
  repeat: false,
  once: true,
};

const DEFAULT_PARALLAX: BlockParallax = {
  enabled: false,
  speed: 0.5,
  direction: 'vertical',
  intensity: 30,
  mobileDisabled: true,
};

// BACKEND INTEGRATION: GET /api/builder/blocks — replace with API call
const INITIAL_BLOCKS: Block[] = [
  {
    id: 'block-001',
    type: 'hero',
    label: 'Hero Section',
    props: {
      headline: 'Build Pages. Ship Faster.',
      subheadline: 'A headless CMS built for editorial teams who move fast.',
      ctaLabel: 'Get Started',
      ctaHref: '/signup',
      backgroundType: 'gradient',
    },
    style: { paddingTop: '80px', paddingBottom: '80px', textAlign: 'center' },
    animation: { ...DEFAULT_ANIMATION, type: 'fadeIn' },
    parallax: { ...DEFAULT_PARALLAX, enabled: true, speed: 0.3 },
    children: [],
  },
  {
    id: 'block-002',
    type: 'features',
    label: 'Feature Grid',
    props: {
      title: 'Everything your team needs',
      columns: 3,
      items: ['Block Builder', 'SEO Tools', 'Role Management'],
    },
    style: { paddingTop: '64px', paddingBottom: '64px', backgroundColor: 'transparent' },
    animation: { ...DEFAULT_ANIMATION, type: 'fadeUp', delay: 150 },
    parallax: DEFAULT_PARALLAX,
    children: [],
  },
  {
    id: 'block-003',
    type: 'richtext',
    label: 'Rich Text',
    props: {
      content: '<p>CMSBuilder gives your team a powerful visual editor with full JSON control under the hood.</p>',
      maxWidth: '720px',
    },
    style: { paddingTop: '40px', paddingBottom: '40px' },
    animation: { ...DEFAULT_ANIMATION, type: 'slideLeft', delay: 100 },
    parallax: DEFAULT_PARALLAX,
    children: [],
  },
  {
    id: 'block-004',
    type: 'cta',
    label: 'Call to Action',
    props: {
      headline: 'Ready to publish?',
      buttonLabel: 'Start Building',
      buttonHref: '/signup',
      variant: 'centered',
    },
    style: { paddingTop: '80px', paddingBottom: '80px', backgroundColor: '#0f0f1a' },
    animation: { ...DEFAULT_ANIMATION, type: 'zoomIn', delay: 200 },
    parallax: DEFAULT_PARALLAX,
    children: [],
  },
];

export default function PageBuilderShell() {
  const [blocks, setBlocks] = useState<Block[]>(INITIAL_BLOCKS);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('block-001');
  const [rightPanelTab, setRightPanelTab] = useState<RightPanelTab>('properties');
  const [jsonDrawerOpen, setJsonDrawerOpen] = useState(false);
  const [pageTitle, setPageTitle] = useState('Homepage — Spring 2026 Redesign');
  const [pageSlug, setPageSlug] = useState('/');
  const [publishLoading, setPublishLoading] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const selectedBlock = blocks.find((b) => b.id === selectedBlockId) ?? null;

  const handleAddBlock = (type: string, label: string) => {
    const newBlock: Block = {
      id: `block-${Date.now()}`,
      type,
      label,
      props: {},
      style: { paddingTop: '48px', paddingBottom: '48px' },
      animation: DEFAULT_ANIMATION,
      parallax: DEFAULT_PARALLAX,
      children: [],
    };
    setBlocks((prev) => [...prev, newBlock]);
    setSelectedBlockId(newBlock.id);
    toast.success(`"${label}" block added`);
  };

  const handleDeleteBlock = (id: string) => {
    setBlocks((prev) => prev.filter((b) => b.id !== id));
    if (selectedBlockId === id) setSelectedBlockId(null);
    toast.success('Block removed');
  };

  const handleDuplicateBlock = (id: string) => {
    const original = blocks.find((b) => b.id === id);
    if (!original) return;
    const duplicate: Block = { ...original, id: `block-${Date.now()}` };
    const idx = blocks.findIndex((b) => b.id === id);
    const next = [...blocks];
    next.splice(idx + 1, 0, duplicate);
    setBlocks(next);
    setSelectedBlockId(duplicate.id);
    toast.success(`"${original.label}" duplicated`);
  };

  const handleMoveBlock = (id: string, dir: 'up' | 'down') => {
    const idx = blocks.findIndex((b) => b.id === id);
    if (dir === 'up' && idx === 0) return;
    if (dir === 'down' && idx === blocks.length - 1) return;
    const next = [...blocks];
    const swap = dir === 'up' ? idx - 1 : idx + 1;
    [next[idx], next[swap]] = [next[swap], next[idx]];
    setBlocks(next);
  };

  const handleUpdateBlock = (id: string, patch: Partial<Block>) => {
    setBlocks((prev) => prev.map((b) => b.id === id ? { ...b, ...patch } : b));
  };

  const handleSave = async () => {
    // BACKEND INTEGRATION: PUT /api/pages/[id] with {contentJson: blocks, title, slug}
    setSaveLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setSaveLoading(false);
    toast.success('Draft saved successfully');
  };

  const handlePublish = async () => {
    // BACKEND INTEGRATION: POST /api/pages/[id]/publish
    setPublishLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setPublishLoading(false);
    toast.success('Page published successfully');
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Toolbar */}
      <BuilderToolbar
        pageTitle={pageTitle}
        pageSlug={pageSlug}
        onTitleChange={setPageTitle}
        onSlugChange={setPageSlug}
        onSave={handleSave}
        onPublish={handlePublish}
        saveLoading={saveLoading}
        publishLoading={publishLoading}
        onToggleJson={() => setJsonDrawerOpen(!jsonDrawerOpen)}
        previewMode={previewMode}
        onPreviewModeChange={setPreviewMode}
        blockCount={blocks.length}
      />

      {/* Three-panel layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Block palette */}
        <div className="w-60 flex-shrink-0 border-r border-[hsl(var(--border))] overflow-y-auto bg-[hsl(var(--surface))]">
          <BlockPalette onAddBlock={handleAddBlock} />
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 overflow-y-auto bg-[hsl(var(--background))]">
          <BuilderCanvas
            blocks={blocks}
            selectedBlockId={selectedBlockId}
            onSelectBlock={setSelectedBlockId}
            onDeleteBlock={handleDeleteBlock}
            onDuplicateBlock={handleDuplicateBlock}
            onMoveBlock={handleMoveBlock}
            previewMode={previewMode}
          />
        </div>

        {/* Right: Properties panel */}
        <div className="w-72 flex-shrink-0 border-l border-[hsl(var(--border))] overflow-y-auto bg-[hsl(var(--surface))]">
          <PropertiesPanel
            block={selectedBlock}
            activeTab={rightPanelTab}
            onTabChange={setRightPanelTab}
            onUpdateBlock={handleUpdateBlock}
          />
        </div>
      </div>

      {/* JSON preview drawer */}
      <JsonPreviewDrawer
        open={jsonDrawerOpen}
        onClose={() => setJsonDrawerOpen(false)}
        blocks={blocks}
        pageTitle={pageTitle}
        pageSlug={pageSlug}
      />
    </div>
  );
}