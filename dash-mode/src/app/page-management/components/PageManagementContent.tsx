'use client';
import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { toast } from 'sonner';
import { Search, Plus, ChevronDown, ChevronUp, ChevronsUpDown, Edit3, Trash2, Globe, Archive, Eye, MoreHorizontal, CheckSquare, Square, ChevronLeft, ChevronRight, RefreshCw, Download, Clock, FileText } from 'lucide-react';
import { StatusBadge } from '@/components/ui/StatusBadge';
import ConfirmModal from '@/components/ui/ConfirmModal';
import { TableSkeleton } from '@/components/ui/LoadingSkeleton';
import EmptyState from '@/components/ui/EmptyState';

type PageStatus = 'published' | 'draft' | 'review' | 'archived';

interface CMSPage {
  id: string;
  title: string;
  slug: string;
  status: PageStatus;
  author: string;
  authorInitials: string;
  seoScore: number;
  blocks: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  views: number;
}

// BACKEND INTEGRATION: GET /api/pages — replace this mock data
const ALL_PAGES: CMSPage[] = [
  { id: 'page-001', title: 'Homepage — Spring 2026 Redesign', slug: '/', status: 'published', author: 'Sofia Andreescu', authorInitials: 'SA', seoScore: 98, blocks: 18, createdAt: 'Mar 10, 2026', updatedAt: '2h ago', publishedAt: 'Apr 20, 2026', views: 12491 },
  { id: 'page-002', title: 'Product Features Overview', slug: '/features', status: 'published', author: 'Priya Nair', authorInitials: 'PN', seoScore: 94, blocks: 24, createdAt: 'Mar 15, 2026', updatedAt: '5h ago', publishedAt: 'Apr 25, 2026', views: 2847 },
  { id: 'page-003', title: 'Pricing Plans 2026', slug: '/pricing', status: 'published', author: 'Marcus Webb', authorInitials: 'MW', seoScore: 91, blocks: 12, createdAt: 'Mar 20, 2026', updatedAt: '1d ago', publishedAt: 'Apr 23, 2026', views: 5102 },
  { id: 'page-004', title: 'Blog: Headless CMS Trends 2026', slug: '/blog/headless-cms-2026', status: 'draft', author: 'Priya Nair', authorInitials: 'PN', seoScore: 55, blocks: 14, createdAt: 'Apr 10, 2026', updatedAt: '1h ago', publishedAt: null, views: 0 },
  { id: 'page-005', title: 'Integrations Directory', slug: '/integrations', status: 'review', author: 'Lena Hartmann', authorInitials: 'LH', seoScore: 76, blocks: 31, createdAt: 'Apr 5, 2026', updatedAt: '6h ago', publishedAt: null, views: 0 },
  { id: 'page-006', title: 'Enterprise Pricing 2026', slug: '/pricing/enterprise', status: 'draft', author: 'Marcus Webb', authorInitials: 'MW', seoScore: 33, blocks: 8, createdAt: 'Apr 12, 2026', updatedAt: '3h ago', publishedAt: null, views: 0 },
  { id: 'page-007', title: 'Case Study: Acme Corp', slug: '/case-studies/acme', status: 'review', author: 'Sofia Andreescu', authorInitials: 'SA', seoScore: 42, blocks: 22, createdAt: 'Apr 8, 2026', updatedAt: '2d ago', publishedAt: null, views: 0 },
  { id: 'page-008', title: 'API Documentation Overview', slug: '/docs/api', status: 'published', author: 'Dev Patel', authorInitials: 'DP', seoScore: 87, blocks: 45, createdAt: 'Feb 1, 2026', updatedAt: '3d ago', publishedAt: 'Feb 15, 2026', views: 8910 },
  { id: 'page-009', title: 'Partner Program Benefits', slug: '/partners/benefits', status: 'draft', author: 'Lena Hartmann', authorInitials: 'LH', seoScore: 21, blocks: 16, createdAt: 'Apr 14, 2026', updatedAt: '4h ago', publishedAt: null, views: 0 },
  { id: 'page-010', title: 'Old Pricing — 2025', slug: '/old-pricing', status: 'archived', author: 'Marcus Webb', authorInitials: 'MW', seoScore: 68, blocks: 10, createdAt: 'Jan 5, 2026', updatedAt: '7d ago', publishedAt: null, views: 341 },
  { id: 'page-011', title: 'Security & Compliance Guide', slug: '/security/compliance', status: 'published', author: 'Dev Patel', authorInitials: 'DP', seoScore: 82, blocks: 28, createdAt: 'Mar 28, 2026', updatedAt: '4d ago', publishedAt: 'Apr 1, 2026', views: 1204 },
  { id: 'page-012', title: 'Changelog — Q1 2026', slug: '/changelog/q1-2026', status: 'published', author: 'Sofia Andreescu', authorInitials: 'SA', seoScore: 79, blocks: 7, createdAt: 'Mar 31, 2026', updatedAt: '5d ago', publishedAt: 'Apr 2, 2026', views: 3782 },
];

const STATUS_FILTERS: { label: string; value: PageStatus | 'all' }[] = [
  { label: 'All', value: 'all' },
  { label: 'Published', value: 'published' },
  { label: 'Draft', value: 'draft' },
  { label: 'In Review', value: 'review' },
  { label: 'Archived', value: 'archived' },
];

type SortField = 'title' | 'status' | 'seoScore' | 'blocks' | 'updatedAt' | 'views';
type SortDir = 'asc' | 'desc';

function SeoScore({ score }: { score: number }) {
  const color = score >= 90 ? 'text-emerald-400' : score >= 70 ? 'text-amber-400' : 'text-red-400';
  const bg = score >= 90 ? 'bg-emerald-500/10' : score >= 70 ? 'bg-amber-500/10' : 'bg-red-500/10';
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-bold tabular-nums ${color} ${bg}`}>
      {score}
    </span>
  );
}

export default function PageManagementContent() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<PageStatus | 'all'>('all');
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>('updatedAt');
  const [sortDir, setSortDir] = useState<SortDir>('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [inlineStatusMap, setInlineStatusMap] = useState<Record<string, PageStatus | null>>({});
  const [statusDropdownId, setStatusDropdownId] = useState<string | null>(null);
  const [loading] = useState(false);

  const filtered = useMemo(() => {
    let data = ALL_PAGES.filter((p) => {
      const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase()) || p.slug.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === 'all' || p.status === statusFilter;
      return matchSearch && matchStatus;
    });

    data = [...data].sort((a, b) => {
      let av: any = a[sortField];
      let bv: any = b[sortField];
      if (typeof av === 'string') av = av.toLowerCase();
      if (typeof bv === 'string') bv = bv.toLowerCase();
      if (av < bv) return sortDir === 'asc' ? -1 : 1;
      if (av > bv) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });

    return data;
  }, [search, statusFilter, sortField, sortDir]);

  const totalPages = Math.ceil(filtered.length / perPage);
  const paginated = filtered.slice((currentPage - 1) * perPage, currentPage * perPage);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  };

  const toggleSelect = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedIds(next);
  };

  const toggleSelectAll = () => {
    if (selectedIds.size === paginated.length) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(paginated.map((p) => p.id)));
    }
  };

  const handleDelete = async () => {
    // BACKEND INTEGRATION: DELETE /api/pages/[id]
    setDeletingLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setDeletingLoading(false);
    setDeleteModalOpen(false);
    toast.success('Page deleted successfully');
    setDeleteTarget(null);
  };

  const handleBulkDelete = async () => {
    // BACKEND INTEGRATION: POST /api/pages/bulk-delete with {ids: [...]}
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`${selectedIds.size} pages deleted`);
    setSelectedIds(new Set());
  };

  const handleBulkPublish = async () => {
    // BACKEND INTEGRATION: POST /api/pages/bulk-publish with {ids: [...]}
    await new Promise((r) => setTimeout(r, 800));
    toast.success(`${selectedIds.size} pages published`);
    setSelectedIds(new Set());
  };

  const handleStatusChange = (id: string, status: PageStatus) => {
    // BACKEND INTEGRATION: PATCH /api/pages/[id] with {status}
    setInlineStatusMap((prev) => ({ ...prev, [id]: status }));
    setStatusDropdownId(null);
    toast.success(`Status updated to ${status}`);
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ChevronsUpDown size={12} className="text-[hsl(var(--muted-foreground))] opacity-40" />;
    return sortDir === 'asc' ? <ChevronUp size={12} className="text-green-600" /> : <ChevronDown size={12} className="text-green-600" />;
  };

  const COLUMNS: { label: string; field?: SortField }[] = [
    { label: '' },
    { label: 'Page Title', field: 'title' },
    { label: 'Slug' },
    { label: 'Status', field: 'status' },
    { label: 'SEO Score', field: 'seoScore' },
    { label: 'Blocks', field: 'blocks' },
    { label: 'Author' },
    { label: 'Last Modified', field: 'updatedAt' },
    { label: 'Views', field: 'views' },
    { label: '' },
  ];

  return (
    <div className="p-6 xl:p-8 2xl:p-10 max-w-screen-2xl mx-auto space-y-5">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">Pages</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">{ALL_PAGES.length} total pages in your workspace</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="btn-secondary flex items-center gap-2 text-sm">
            <Download size={15} />
            Export
          </button>
          <Link href="/page-builder" className="btn-primary flex items-center gap-2 text-sm">
            <Plus size={15} />
            New Page
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        {/* Search */}
        <div className="relative flex-1 min-w-48 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
          <input
            type="text"
            value={search}
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            className="input pl-9 text-sm"
            placeholder="Search pages or slugs…"
          />
        </div>

        {/* Status filter chips */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {STATUS_FILTERS.map((f) => (
            <button
              key={`status-filter-${f.value}`}
              onClick={() => { setStatusFilter(f.value); setCurrentPage(1); }}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-150 border ${
                statusFilter === f.value
                  ? 'bg-green-800/20 text-green-600 border-green-700/30' :'bg-transparent text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:border-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
          <RefreshCw size={13} />
          <span>Live</span>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
                {/* Select all */}
                <th className="w-12 px-4 py-3">
                  <button onClick={toggleSelectAll} className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors">
                    {selectedIds.size === paginated.length && paginated.length > 0
                      ? <CheckSquare size={15} className="text-green-600" />
                      : <Square size={15} />
                    }
                  </button>
                </th>
                {COLUMNS.slice(1).map((col) => (
                  <th
                    key={`col-${col.label || 'actions'}`}
                    className={`px-4 py-3 text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap ${col.field ? 'cursor-pointer hover:text-[hsl(var(--foreground))] select-none' : ''}`}
                    onClick={col.field ? () => handleSort(col.field!) : undefined}
                  >
                    <span className="flex items-center gap-1.5">
                      {col.label}
                      {col.field && <SortIcon field={col.field} />}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>

            {loading ? (
              <TableSkeleton rows={8} cols={10} />
            ) : paginated.length === 0 ? (
              <tbody>
                <tr>
                  <td colSpan={10}>
                    <EmptyState
                      icon={FileText}
                      title="No pages found"
                      description="No pages match your current search or filter. Try a different query or create a new page."
                      action={{ label: 'Create New Page', onClick: () => {} }}
                    />
                  </td>
                </tr>
              </tbody>
            ) : (
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {paginated.map((page) => {
                  const effectiveStatus = inlineStatusMap[page.id] ?? page.status;
                  return (
                    <tr key={page.id} className={`table-row-hover transition-colors ${selectedIds.has(page.id) ? 'bg-green-800/5' : ''} group`}>
                      {/* Checkbox */}
                      <td className="w-12 px-4 py-3">
                        <button onClick={() => toggleSelect(page.id)} className="text-[hsl(var(--muted-foreground))] hover:text-green-600 transition-colors">
                          {selectedIds.has(page.id) ? <CheckSquare size={15} className="text-green-600" /> : <Square size={15} />}
                        </button>
                      </td>
                      {/* Title */}
                      <td className="px-4 py-3 min-w-[200px] max-w-[260px]">
                        <p className="font-medium text-[hsl(var(--foreground))] truncate" title={page.title}>{page.title}</p>
                        <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{page.createdAt}</p>
                      </td>
                      {/* Slug */}
                      <td className="px-4 py-3 min-w-[160px]">
                        <span className="font-mono text-xs text-[hsl(var(--muted-foreground))] truncate block max-w-[180px]" title={page.slug}>{page.slug}</span>
                      </td>
                      {/* Status — inline change */}
                      <td className="px-4 py-3 relative">
                        <button
                          onClick={() => setStatusDropdownId(statusDropdownId === page.id ? null : page.id)}
                          className="cursor-pointer"
                        >
                          <StatusBadge status={effectiveStatus} size="sm" />
                        </button>
                        {statusDropdownId === page.id && (
                          <div className="absolute z-20 top-10 left-4 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl shadow-xl overflow-hidden min-w-[140px] animate-scale-in">
                            {(['published', 'draft', 'review', 'archived'] as PageStatus[]).map((s) => (
                              <button
                                key={`inline-status-${page.id}-${s}`}
                                onClick={() => handleStatusChange(page.id, s)}
                                className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[hsl(var(--surface))] transition-colors text-left"
                              >
                                <StatusBadge status={s} size="sm" />
                              </button>
                            ))}
                          </div>
                        )}
                      </td>
                      {/* SEO score */}
                      <td className="px-4 py-3"><SeoScore score={page.seoScore} /></td>
                      {/* Blocks */}
                      <td className="px-4 py-3 tabular-nums text-[hsl(var(--muted-foreground))]">{page.blocks}</td>
                      {/* Author */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-green-700 to-green-900 flex items-center justify-center text-white text-[9px] font-bold flex-shrink-0">
                            {page.authorInitials}
                          </div>
                          <span className="text-[hsl(var(--muted-foreground))] text-xs truncate max-w-[100px]">{page.author}</span>
                        </div>
                      </td>
                      {/* Last modified */}
                      <td className="px-4 py-3 text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                        <span className="flex items-center gap-1"><Clock size={11} />{page.updatedAt}</span>
                      </td>
                      {/* Views */}
                      <td className="px-4 py-3 tabular-nums text-[hsl(var(--muted-foreground))] text-xs">
                        {page.views > 0 ? page.views.toLocaleString() : '—'}
                      </td>
                      {/* Actions */}
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link href="/page-builder" className="p-1.5 rounded-lg hover:bg-green-700/15 text-[hsl(var(--muted-foreground))] hover:text-green-600 transition-colors" title="Edit page in builder">
                            <Edit3 size={14} />
                          </Link>
                          <button className="p-1.5 rounded-lg hover:bg-emerald-500/15 text-[hsl(var(--muted-foreground))] hover:text-emerald-400 transition-colors" title="Preview page">
                            <Eye size={14} />
                          </button>
                          <button
                            className="p-1.5 rounded-lg hover:bg-red-500/15 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors"
                            title="Delete page — this cannot be undone"
                            onClick={() => { setDeleteTarget(page.id); setDeleteModalOpen(true); }}
                          >
                            <Trash2 size={14} />
                          </button>
                          <button className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" title="More actions">
                            <MoreHorizontal size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            )}
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-5 py-3.5 border-t border-[hsl(var(--border))]">
          <div className="flex items-center gap-3">
            <span className="text-xs text-[hsl(var(--muted-foreground))]">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
            </span>
            <div className="flex items-center gap-2">
              <label className="text-xs text-[hsl(var(--muted-foreground))]">Per page</label>
              <select
                value={perPage}
                onChange={(e) => { setPerPage(Number(e.target.value)); setCurrentPage(1); }}
                className="bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] text-xs text-[hsl(var(--foreground))] rounded-lg px-2 py-1.5 outline-none focus:border-green-700"
              >
                {[8, 16, 32, 64].map((n) => (
                  <option key={`perpage-${n}`} value={n}>{n}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft size={15} />
            </button>
            {Array.from({ length: totalPages }).map((_, i) => {
              const pageNum = i + 1;
              const isActive = pageNum === currentPage;
              if (totalPages > 7 && pageNum !== 1 && pageNum !== totalPages && Math.abs(pageNum - currentPage) > 2) {
                if (pageNum === 2 || pageNum === totalPages - 1) return <span key={`page-ellipsis-${pageNum}`} className="text-xs text-[hsl(var(--muted-foreground))] px-1">…</span>;
                return null;
              }
              return (
                <button
                  key={`page-btn-${pageNum}`}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold transition-all duration-150 ${isActive ? 'bg-green-800 text-white' : 'text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--surface-elevated))] hover:text-[hsl(var(--foreground))]'}`}
                >
                  {pageNum}
                </button>
              );
            })}
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="p-1.5 rounded-lg hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight size={15} />
            </button>
          </div>
        </div>
      </div>

      {/* Bulk action bar */}
      {selectedIds.size > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 animate-slide-up">
          <div className="flex items-center gap-3 px-5 py-3.5 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-2xl shadow-2xl shadow-black/40">
            <span className="text-sm font-semibold text-[hsl(var(--foreground))]">
              {selectedIds.size} selected
            </span>
            <div className="w-px h-5 bg-[hsl(var(--border))]" />
            <button
              onClick={handleBulkPublish}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-semibold transition-colors"
            >
              <Globe size={13} />
              Publish
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-500/10 text-zinc-400 hover:bg-zinc-500/20 text-xs font-semibold transition-colors">
              <Archive size={13} />
              Archive
            </button>
            <button
              onClick={handleBulkDelete}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors"
            >
              <Trash2 size={13} />
              Delete
            </button>
            <button
              onClick={() => setSelectedIds(new Set())}
              className="text-xs text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors ml-1"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Delete confirm modal */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Delete this page?"
        description="This will permanently remove the page and all its blocks. Published pages will be taken offline immediately. This action cannot be undone."
        confirmLabel="Delete Page"
        loading={deletingLoading}
        variant="danger"
      />
    </div>
  );
}