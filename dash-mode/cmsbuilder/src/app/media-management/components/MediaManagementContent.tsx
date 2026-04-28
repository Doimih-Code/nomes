'use client';
import React, { useState, useRef, useMemo } from 'react';
import { toast } from 'sonner';
import { Upload, Grid3x3, List, Search, Trash2, Download, Image, Film, File, X, Check, HardDrive, Clock, Info, Copy, CheckSquare, Square } from 'lucide-react';

import ConfirmModal from '@/components/ui/ConfirmModal';
import EmptyState from '@/components/ui/EmptyState';

type MediaType = 'image' | 'video' | 'all';
type ViewMode = 'grid' | 'list';

interface MediaFile {
  id: string;
  name: string;
  type: 'image' | 'video';
  originalPath: string;
  webpPath: string | null;
  thumbnailPath: string;
  width: number | null;
  height: number | null;
  size: number; // bytes
  mimeType: string;
  uploadedBy: string;
  uploadedAt: string;
  usedInPages: number;
}

// BACKEND INTEGRATION: GET /api/media — replace with API call
const MOCK_MEDIA: MediaFile[] = [
  { id: 'media-001', name: 'hero-banner-spring-2026.webp', type: 'image', originalPath: '/uploads/hero-banner-spring-2026.jpg', webpPath: '/uploads/hero-banner-spring-2026.webp', thumbnailPath: '/uploads/thumb/hero-banner-spring-2026.webp', width: 1920, height: 1080, size: 284320, mimeType: 'image/webp', uploadedBy: 'Priya Nair', uploadedAt: '2h ago', usedInPages: 3 },
  { id: 'media-002', name: 'team-photo-2026.jpg', type: 'image', originalPath: '/uploads/team-photo-2026.jpg', webpPath: '/uploads/team-photo-2026.webp', thumbnailPath: '/uploads/thumb/team-photo-2026.webp', width: 2400, height: 1600, size: 1258000, mimeType: 'image/jpeg', uploadedBy: 'Sofia Andreescu', uploadedAt: '5h ago', usedInPages: 1 },
  { id: 'media-003', name: 'product-demo-v2.mp4', type: 'video', originalPath: '/uploads/product-demo-v2.mp4', webpPath: null, thumbnailPath: '/uploads/thumb/product-demo-v2.jpg', width: 1920, height: 1080, size: 18432000, mimeType: 'video/mp4', uploadedBy: 'Marcus Webb', uploadedAt: '1d ago', usedInPages: 2 },
  { id: 'media-004', name: 'blog-cover-headless-cms.webp', type: 'image', originalPath: '/uploads/blog-cover-headless-cms.jpg', webpPath: '/uploads/blog-cover-headless-cms.webp', thumbnailPath: '/uploads/thumb/blog-cover-headless-cms.webp', width: 1200, height: 630, size: 156400, mimeType: 'image/webp', uploadedBy: 'Priya Nair', uploadedAt: '2d ago', usedInPages: 1 },
  { id: 'media-005', name: 'feature-screenshot-builder.png', type: 'image', originalPath: '/uploads/feature-screenshot-builder.png', webpPath: '/uploads/feature-screenshot-builder.webp', thumbnailPath: '/uploads/thumb/feature-screenshot-builder.webp', width: 2560, height: 1440, size: 892100, mimeType: 'image/png', uploadedBy: 'Dev Patel', uploadedAt: '3d ago', usedInPages: 4 },
  { id: 'media-006', name: 'logo-white.svg', type: 'image', originalPath: '/uploads/logo-white.svg', webpPath: null, thumbnailPath: '/uploads/thumb/logo-white.png', width: 200, height: 60, size: 4200, mimeType: 'image/svg+xml', uploadedBy: 'Sofia Andreescu', uploadedAt: '5d ago', usedInPages: 8 },
  { id: 'media-007', name: 'case-study-acme-cover.jpg', type: 'image', originalPath: '/uploads/case-study-acme-cover.jpg', webpPath: '/uploads/case-study-acme-cover.webp', thumbnailPath: '/uploads/thumb/case-study-acme-cover.webp', width: 1600, height: 900, size: 421000, mimeType: 'image/jpeg', uploadedBy: 'Lena Hartmann', uploadedAt: '1w ago', usedInPages: 1 },
  { id: 'media-008', name: 'pricing-bg-gradient.webp', type: 'image', originalPath: '/uploads/pricing-bg-gradient.webp', webpPath: '/uploads/pricing-bg-gradient.webp', thumbnailPath: '/uploads/thumb/pricing-bg-gradient.webp', width: 1920, height: 1200, size: 98000, mimeType: 'image/webp', uploadedBy: 'Marcus Webb', uploadedAt: '1w ago', usedInPages: 1 },
  { id: 'media-009', name: 'integration-logos-grid.png', type: 'image', originalPath: '/uploads/integration-logos-grid.png', webpPath: '/uploads/integration-logos-grid.webp', thumbnailPath: '/uploads/thumb/integration-logos-grid.webp', width: 1400, height: 800, size: 312000, mimeType: 'image/png', uploadedBy: 'Dev Patel', uploadedAt: '2w ago', usedInPages: 2 },
  { id: 'media-010', name: 'onboarding-walkthrough.mp4', type: 'video', originalPath: '/uploads/onboarding-walkthrough.mp4', webpPath: null, thumbnailPath: '/uploads/thumb/onboarding-walkthrough.jpg', width: 1280, height: 720, size: 9800000, mimeType: 'video/mp4', uploadedBy: 'Lena Hartmann', uploadedAt: '2w ago', usedInPages: 1 },
  { id: 'media-011', name: 'avatar-placeholder.webp', type: 'image', originalPath: '/uploads/avatar-placeholder.webp', webpPath: '/uploads/avatar-placeholder.webp', thumbnailPath: '/uploads/thumb/avatar-placeholder.webp', width: 400, height: 400, size: 18000, mimeType: 'image/webp', uploadedBy: 'Sofia Andreescu', uploadedAt: '3w ago', usedInPages: 12 },
  { id: 'media-012', name: 'security-badge.svg', type: 'image', originalPath: '/uploads/security-badge.svg', webpPath: null, thumbnailPath: '/uploads/thumb/security-badge.png', width: 120, height: 120, size: 6800, mimeType: 'image/svg+xml', uploadedBy: 'Dev Patel', uploadedAt: '1mo ago', usedInPages: 3 },
];

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function MediaTypeIcon({ type, mimeType }: { type: 'image' | 'video'; mimeType: string }) {
  if (type === 'video') return <Film size={16} className="text-blue-400" />;
  if (mimeType.includes('svg')) return <File size={16} className="text-emerald-400" />;
  return <Image size={16} className="text-orange-400" />;
}

const PLACEHOLDER_COLORS = [
  'from-violet-800 to-violet-950',
  'from-orange-800 to-orange-950',
  'from-emerald-800 to-emerald-950',
  'from-blue-800 to-blue-950',
  'from-rose-800 to-rose-950',
  'from-amber-800 to-amber-950',
];

export default function MediaManagementContent() {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<MediaType>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [selectedFile, setSelectedFile] = useState<MediaFile | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [copiedPath, setCopiedPath] = useState(false);

  const filtered = useMemo(() => {
    return MOCK_MEDIA.filter((m) => {
      const matchSearch = !search || m.name.toLowerCase().includes(search.toLowerCase());
      const matchType = typeFilter === 'all' || m.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [search, typeFilter]);

  const totalStorage = MOCK_MEDIA.reduce((sum, m) => sum + m.size, 0);
  const totalImages = MOCK_MEDIA.filter((m) => m.type === 'image').length;
  const totalVideos = MOCK_MEDIA.filter((m) => m.type === 'video').length;

  const handleUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    // BACKEND INTEGRATION: POST /api/media/upload with FormData
    toast.success(`Uploading ${files.length} file${files.length > 1 ? 's' : ''}…`);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success(`${files.length} file${files.length > 1 ? 's' : ''} uploaded successfully`);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    handleUpload(e.dataTransfer.files);
  };

  const handleDelete = async () => {
    // BACKEND INTEGRATION: DELETE /api/media/[id]
    setDeletingLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeletingLoading(false);
    setDeleteModalOpen(false);
    if (selectedFile?.id === deleteTarget) setSelectedFile(null);
    toast.success('File deleted');
  };

  const handleBulkDelete = async () => {
    // BACKEND INTEGRATION: POST /api/media/bulk-delete with {ids: [...]}
    await new Promise((r) => setTimeout(r, 900));
    toast.success(`${selectedIds.size} files deleted`);
    setSelectedIds(new Set());
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const handleCopyPath = async (path: string) => {
    await navigator.clipboard.writeText(path);
    setCopiedPath(true);
    setTimeout(() => setCopiedPath(false), 1500);
    toast.success('Path copied to clipboard');
  };

  return (
    <div className="flex h-full overflow-hidden">
      {/* Main panel */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="p-6 xl:p-8 space-y-5 flex-1 overflow-y-auto">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Media Library</h1>
              <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
                {MOCK_MEDIA.length} files · {formatBytes(totalStorage)} used
              </p>
            </div>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="btn-primary flex items-center gap-2 text-sm"
            >
              <Upload size={15} />
              Upload Files
            </button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,video/*"
              className="hidden"
              onChange={(e) => handleUpload(e.target.files)}
            />
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { label: 'Total Files', value: MOCK_MEDIA.length, icon: File, color: 'text-violet-400' },
              { label: 'Images', value: totalImages, icon: Image, color: 'text-orange-400' },
              { label: 'Videos', value: totalVideos, icon: Film, color: 'text-blue-400' },
              { label: 'Storage Used', value: formatBytes(totalStorage), icon: HardDrive, color: 'text-emerald-400' },
            ].map((s) => {
              const SIcon = s.icon;
              return (
                <div key={`media-stat-${s.label}`} className="card p-4 flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
                    <SIcon size={15} className={s.color} />
                  </div>
                  <div>
                    <p className="text-xs text-[hsl(var(--muted-foreground))]">{s.label}</p>
                    <p className="text-sm font-bold text-[hsl(var(--foreground))] tabular-nums">{s.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Storage bar */}
          <div className="card p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-[hsl(var(--foreground))]">Storage Usage</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))] tabular-nums">{formatBytes(totalStorage)} / 20 GB</p>
            </div>
            <div className="h-2 bg-[hsl(var(--surface-elevated))] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-500 transition-all"
                style={{ width: `${(totalStorage / (20 * 1024 * 1024 * 1024)) * 100}%` }}
              />
            </div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1.5">
              {((totalStorage / (20 * 1024 * 1024 * 1024)) * 100).toFixed(2)}% of your 20 GB storage plan used
            </p>
          </div>

          {/* Toolbar */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-40 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 text-sm"
                placeholder="Search files…"
              />
            </div>

            {/* Type filter */}
            <div className="flex items-center gap-1.5">
              {(['all', 'image', 'video'] as MediaType[]).map((t) => (
                <button
                  key={`media-type-${t}`}
                  onClick={() => setTypeFilter(t)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                    typeFilter === t
                      ? 'bg-violet-600/20 text-violet-300 border-violet-500/30'
                      : 'bg-transparent text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:text-[hsl(var(--foreground))]'
                  }`}
                >
                  {t === 'all' ? 'All Files' : t === 'image' ? 'Images' : 'Videos'}
                </button>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-1 bg-[hsl(var(--surface-elevated))] rounded-lg p-0.5 border border-[hsl(var(--border))]">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-md transition-all ${viewMode === 'grid' ? 'bg-[hsl(var(--surface))] text-violet-400' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
                title="Grid view"
              >
                <Grid3x3 size={14} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-md transition-all ${viewMode === 'list' ? 'bg-[hsl(var(--surface))] text-violet-400' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
                title="List view"
              >
                <List size={14} />
              </button>
            </div>
          </div>

          {/* Upload dropzone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`
              border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200
              ${isDragOver
                ? 'border-violet-500 bg-violet-500/10'
                : 'border-[hsl(var(--border))] hover:border-violet-500/50 hover:bg-violet-500/5'
              }
            `}
          >
            <Upload size={20} className={`mx-auto mb-2 ${isDragOver ? 'text-violet-400' : 'text-[hsl(var(--muted-foreground))]'}`} />
            <p className="text-sm font-medium text-[hsl(var(--foreground))]">
              {isDragOver ? 'Drop files to upload' : 'Drag & drop files here'}
            </p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
              or click to browse — JPG, PNG, WebP, SVG, MP4 supported
            </p>
          </div>

          {/* Media grid / list */}
          {filtered.length === 0 ? (
            <EmptyState
              icon={Image}
              title="No media files found"
              description="No files match your current search or filter. Upload your first file or try a different query."
              action={{ label: 'Upload Files', onClick: () => fileInputRef.current?.click() }}
            />
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-3">
              {filtered.map((file, idx) => {
                const isSelected = selectedIds.has(file.id);
                const isActive = selectedFile?.id === file.id;
                const gradientClass = PLACEHOLDER_COLORS[idx % PLACEHOLDER_COLORS.length];
                return (
                  <div
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`
                      relative aspect-square rounded-xl overflow-hidden cursor-pointer group
                      border-2 transition-all duration-150
                      ${isActive ? 'border-violet-500 ring-2 ring-violet-500/20' : isSelected ? 'border-violet-400/50' : 'border-transparent hover:border-[hsl(var(--border))]'}
                    `}
                  >
                    {/* Placeholder gradient bg */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${gradientClass} opacity-60`} />

                    {/* File type indicator */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      {file.type === 'video' ? (
                        <Film size={28} className="text-white/60" />
                      ) : (
                        <Image size={28} className="text-white/60" />
                      )}
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedFile(file); }}
                        className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                        title="View details"
                      >
                        <Info size={13} className="text-white" />
                      </button>
                      <button
                        onClick={(e) => { e.stopPropagation(); setDeleteTarget(file.id); setDeleteModalOpen(true); }}
                        className="p-2 bg-red-500/40 rounded-lg hover:bg-red-500/60 transition-colors"
                        title="Delete file"
                      >
                        <Trash2 size={13} className="text-white" />
                      </button>
                    </div>

                    {/* Select checkbox */}
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleSelect(file.id); }}
                      className={`absolute top-2 left-2 transition-opacity ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}
                    >
                      {isSelected
                        ? <CheckSquare size={16} className="text-violet-400 drop-shadow" />
                        : <Square size={16} className="text-white drop-shadow" />
                      }
                    </button>

                    {/* File name */}
                    <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-2">
                      <p className="text-[10px] text-white font-medium truncate">{file.name}</p>
                      <p className="text-[9px] text-white/60 tabular-nums">{formatBytes(file.size)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            /* List view */
            <div className="card overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
                    {['', 'File', 'Type', 'Dimensions', 'Size', 'Uploaded By', 'Used In', 'Date', ''].map((h, i) => (
                      <th key={`media-th-${i}`} className="px-4 py-3 text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {filtered.map((file) => (
                    <tr
                      key={file.id}
                      onClick={() => setSelectedFile(file)}
                      className={`table-row-hover cursor-pointer group ${selectedFile?.id === file.id ? 'bg-violet-600/5' : ''}`}
                    >
                      <td className="px-4 py-3 w-10">
                        <button onClick={(e) => { e.stopPropagation(); toggleSelect(file.id); }} className="text-[hsl(var(--muted-foreground))] hover:text-violet-400 transition-colors">
                          {selectedIds.has(file.id) ? <CheckSquare size={14} className="text-violet-400" /> : <Square size={14} />}
                        </button>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] flex items-center justify-center flex-shrink-0">
                            <MediaTypeIcon type={file.type} mimeType={file.mimeType} />
                          </div>
                          <div className="min-w-0">
                            <p className="font-medium text-[hsl(var(--foreground))] truncate max-w-[200px] font-mono text-xs">{file.name}</p>
                            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{file.mimeType}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${file.type === 'image' ? 'bg-orange-500/10 text-orange-400' : 'bg-blue-500/10 text-blue-400'}`}>
                          {file.type}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))] tabular-nums">
                        {file.width && file.height ? `${file.width}×${file.height}` : '—'}
                      </td>
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))] tabular-nums">{formatBytes(file.size)}</td>
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))]">{file.uploadedBy}</td>
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))] tabular-nums">{file.usedInPages} pages</td>
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap flex items-center gap-1">
                        <Clock size={11} />{file.uploadedAt}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="Download file">
                            <Download size={13} />
                          </button>
                          <button
                            onClick={(e) => { e.stopPropagation(); setDeleteTarget(file.id); setDeleteModalOpen(true); }}
                            className="p-1.5 rounded-lg hover:bg-red-500/15 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors"
                            title="Delete file — this cannot be undone"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bulk action bar */}
        {selectedIds.size > 0 && (
          <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-slide-up">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl shadow-black/40">
              <span className="text-sm font-semibold text-[hsl(var(--foreground))]">{selectedIds.size} selected</span>
              <div className="w-px h-5 bg-[hsl(var(--border))]" />
              <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 text-xs font-semibold transition-colors">
                <Download size={13} />
                Download
              </button>
              <button onClick={handleBulkDelete} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors">
                <Trash2 size={13} />
                Delete
              </button>
              <button onClick={() => setSelectedIds(new Set())} className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">Clear</button>
            </div>
          </div>
        )}
      </div>

      {/* Right metadata panel */}
      {selectedFile && (
        <div className="w-72 flex-shrink-0 border-l border-[hsl(var(--border))] bg-[hsl(var(--surface))] overflow-y-auto animate-slide-up">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-[hsl(var(--border))]">
            <p className="text-xs font-semibold text-[hsl(var(--foreground))]">File Details</p>
            <button onClick={() => setSelectedFile(null)} className="p-1 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
              <X size={14} />
            </button>
          </div>

          {/* Thumbnail */}
          <div className="p-4">
            <div className={`aspect-video rounded-xl bg-gradient-to-br ${PLACEHOLDER_COLORS[MOCK_MEDIA.findIndex(m => m.id === selectedFile.id) % PLACEHOLDER_COLORS.length]} flex items-center justify-center`}>
              {selectedFile.type === 'video' ? <Film size={32} className="text-white/60" /> : <Image size={32} className="text-white/60" />}
            </div>
          </div>

          {/* Metadata */}
          <div className="px-4 pb-4 space-y-3">
            <div>
              <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-1">File Name</p>
              <p className="text-xs font-mono text-[hsl(var(--foreground))] break-all">{selectedFile.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Type', value: selectedFile.mimeType },
                { label: 'Size', value: formatBytes(selectedFile.size) },
                { label: 'Dimensions', value: selectedFile.width ? `${selectedFile.width}×${selectedFile.height}` : '—' },
                { label: 'Used In', value: `${selectedFile.usedInPages} pages` },
                { label: 'Uploaded By', value: selectedFile.uploadedBy },
                { label: 'Uploaded', value: selectedFile.uploadedAt },
              ].map((meta) => (
                <div key={`meta-${meta.label}`}>
                  <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider mb-0.5">{meta.label}</p>
                  <p className="text-xs text-[hsl(var(--foreground))] truncate">{meta.value}</p>
                </div>
              ))}
            </div>

            {/* Paths */}
            <div className="space-y-2 pt-2 border-t border-[hsl(var(--border))]">
              <p className="text-[10px] font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">File Paths</p>
              {[
                { label: 'Original', path: selectedFile.originalPath },
                ...(selectedFile.webpPath ? [{ label: 'WebP', path: selectedFile.webpPath }] : []),
                { label: 'Thumbnail', path: selectedFile.thumbnailPath },
              ].map((p) => (
                <div key={`path-${p.label}`} className="flex items-center gap-2 bg-[hsl(var(--surface-elevated))] rounded-lg px-2.5 py-2">
                  <div className="flex-1 min-w-0">
                    <p className="text-[9px] text-[hsl(var(--muted-foreground))] uppercase font-semibold">{p.label}</p>
                    <p className="text-[10px] font-mono text-violet-400 truncate">{p.path}</p>
                  </div>
                  <button
                    onClick={() => handleCopyPath(p.path)}
                    className="p-1 rounded hover:bg-[hsl(var(--surface))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors flex-shrink-0"
                  >
                    {copiedPath ? <Check size={11} className="text-emerald-400" /> : <Copy size={11} />}
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-2">
              <button className="flex-1 btn-secondary text-xs flex items-center justify-center gap-1.5 py-2">
                <Download size={13} />
                Download
              </button>
              <button
                onClick={() => { setDeleteTarget(selectedFile.id); setDeleteModalOpen(true); }}
                className="flex-1 btn-danger text-xs flex items-center justify-center gap-1.5 py-2"
              >
                <Trash2 size={13} />
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Delete this file?"
        description="This will permanently remove the file from your media library. Any pages using this file will show a broken image. This cannot be undone."
        confirmLabel="Delete File"
        loading={deletingLoading}
        variant="danger"
      />
    </div>
  );
}