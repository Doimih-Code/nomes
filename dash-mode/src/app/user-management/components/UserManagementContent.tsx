'use client';
import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Search, Plus, Trash2, Edit3, Shield, Users, Clock, CheckCircle, XCircle, ChevronDown, Loader2, Mail, Key, AlertTriangle, Lock } from 'lucide-react';
import { RoleBadge } from '@/components/ui/StatusBadge';
import Modal from '@/components/ui/Modal';
import ConfirmModal from '@/components/ui/ConfirmModal';

import EmptyState from '@/components/ui/EmptyState';
import Icon from '@/components/ui/AppIcon';


type UserRole = 'superadmin' | 'seo' | 'editor';
type UserStatus = 'active' | 'inactive' | 'pending';

interface CMSUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
  initials: string;
  avatarColor: string;
  lastActive: string;
  pagesCreated: number;
  pagesPublished: number;
  joinedAt: string;
  twoFAEnabled: boolean;
}

// BACKEND INTEGRATION: GET /api/users — replace with API call
const MOCK_USERS: CMSUser[] = [
  { id: 'user-001', name: 'Sofia Andreescu', email: 'sofia@cmsbuilder.io', role: 'superadmin', status: 'active', initials: 'SA', avatarColor: 'from-green-700 to-green-900', lastActive: '2 min ago', pagesCreated: 47, pagesPublished: 38, joinedAt: 'Jan 12, 2026', twoFAEnabled: true },
  { id: 'user-002', name: 'Marcus Webb', email: 'marcus.seo@cmsbuilder.io', role: 'seo', status: 'active', initials: 'MW', avatarColor: 'from-cyan-500 to-cyan-700', lastActive: '14 min ago', pagesCreated: 12, pagesPublished: 9, joinedAt: 'Feb 3, 2026', twoFAEnabled: true },
  { id: 'user-003', name: 'Priya Nair', email: 'priya.editor@cmsbuilder.io', role: 'editor', status: 'active', initials: 'PN', avatarColor: 'from-orange-500 to-orange-700', lastActive: '1h ago', pagesCreated: 31, pagesPublished: 28, joinedAt: 'Feb 10, 2026', twoFAEnabled: false },
  { id: 'user-004', name: 'Dev Patel', email: 'dev@cmsbuilder.io', role: 'editor', status: 'active', initials: 'DP', avatarColor: 'from-emerald-500 to-emerald-700', lastActive: '3h ago', pagesCreated: 18, pagesPublished: 15, joinedAt: 'Mar 1, 2026', twoFAEnabled: true },
  { id: 'user-005', name: 'Lena Hartmann', email: 'lena.hartmann@cmsbuilder.io', role: 'editor', status: 'active', initials: 'LH', avatarColor: 'from-rose-500 to-rose-700', lastActive: '6h ago', pagesCreated: 22, pagesPublished: 19, joinedAt: 'Mar 8, 2026', twoFAEnabled: false },
  { id: 'user-006', name: 'Tomasz Kowalski', email: 'tomasz@cmsbuilder.io', role: 'seo', status: 'active', initials: 'TK', avatarColor: 'from-blue-500 to-blue-700', lastActive: '1d ago', pagesCreated: 4, pagesPublished: 2, joinedAt: 'Mar 15, 2026', twoFAEnabled: false },
  { id: 'user-007', name: 'Aisha Okonkwo', email: 'aisha@cmsbuilder.io', role: 'editor', status: 'pending', initials: 'AO', avatarColor: 'from-amber-500 to-amber-700', lastActive: 'Never', pagesCreated: 0, pagesPublished: 0, joinedAt: 'Apr 25, 2026', twoFAEnabled: false },
  { id: 'user-008', name: 'Rafael Mendez', email: 'rafael@cmsbuilder.io', role: 'editor', status: 'inactive', initials: 'RM', avatarColor: 'from-zinc-500 to-zinc-700', lastActive: '14d ago', pagesCreated: 7, pagesPublished: 5, joinedAt: 'Feb 20, 2026', twoFAEnabled: false },
  { id: 'user-009', name: 'Yuki Tanaka', email: 'yuki.seo@cmsbuilder.io', role: 'seo', status: 'active', initials: 'YT', avatarColor: 'from-indigo-500 to-indigo-700', lastActive: '2d ago', pagesCreated: 3, pagesPublished: 1, joinedAt: 'Apr 1, 2026', twoFAEnabled: true },
  { id: 'user-010', name: 'Elena Volkov', email: 'elena@cmsbuilder.io', role: 'superadmin', status: 'active', initials: 'EV', avatarColor: 'from-green-800 to-green-950', lastActive: '5h ago', pagesCreated: 29, pagesPublished: 24, joinedAt: 'Jan 20, 2026', twoFAEnabled: true },
];

const PERMISSIONS_MATRIX = [
  { action: 'Create pages', superadmin: true, seo: false, editor: true },
  { action: 'Publish pages', superadmin: true, seo: false, editor: true },
  { action: 'Delete pages', superadmin: true, seo: false, editor: false },
  { action: 'Edit SEO metadata', superadmin: true, seo: true, editor: false },
  { action: 'Manage sitemap', superadmin: true, seo: true, editor: false },
  { action: 'Upload media', superadmin: true, seo: false, editor: true },
  { action: 'Delete media', superadmin: true, seo: false, editor: false },
  { action: 'Invite users', superadmin: true, seo: false, editor: false },
  { action: 'Manage roles', superadmin: true, seo: false, editor: false },
  { action: 'View audit logs', superadmin: true, seo: true, editor: false },
];

interface InviteFormData {
  email: string;
  name: string;
  role: UserRole;
}

const STATUS_CONFIG: Record<UserStatus, { label: string; className: string; dot: string }> = {
  active: { label: 'Active', className: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/25', dot: 'bg-emerald-400' },
  inactive: { label: 'Inactive', className: 'bg-zinc-500/15 text-zinc-400 border-zinc-500/25', dot: 'bg-zinc-400' },
  pending: { label: 'Pending', className: 'bg-amber-500/15 text-amber-400 border-amber-500/25', dot: 'bg-amber-400' },
};

function UserStatusBadge({ status }: { status: UserStatus }) {
  const config = STATUS_CONFIG[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-md text-xs font-semibold border ${config.className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
      {config.label}
    </span>
  );
}

export default function UserManagementContent() {
  const [search, setSearch] = useState('');
  const [roleFilter, setRoleFilter] = useState<UserRole | 'all'>('all');
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [deletingLoading, setDeletingLoading] = useState(false);
  const [inviteLoading, setInviteLoading] = useState(false);
  const [roleDropdownId, setRoleDropdownId] = useState<string | null>(null);
  const [inlineRoleMap, setInlineRoleMap] = useState<Record<string, UserRole>>({});
  const [activeTab, setActiveTab] = useState<'users' | 'permissions'>('users');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<InviteFormData>({
    defaultValues: { email: '', name: '', role: 'editor' },
  });

  const filtered = useMemo(() => {
    return MOCK_USERS.filter((u) => {
      const matchSearch = !search || u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
      const matchRole = roleFilter === 'all' || u.role === roleFilter;
      return matchSearch && matchRole;
    });
  }, [search, roleFilter]);

  const roleCount = (role: UserRole) => MOCK_USERS.filter((u) => u.role === role).length;

  const onInvite = async (data: InviteFormData) => {
    // BACKEND INTEGRATION: POST /api/users/invite with {email, name, role}
    setInviteLoading(true);
    await new Promise((r) => setTimeout(r, 1100));
    setInviteLoading(false);
    setInviteModalOpen(false);
    reset();
    toast.success(`Invitation sent to ${data.email}`);
  };

  const handleDelete = async () => {
    // BACKEND INTEGRATION: DELETE /api/users/[id]
    setDeletingLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setDeletingLoading(false);
    setDeleteModalOpen(false);
    toast.success('User removed from workspace');
  };

  const handleRoleChange = (userId: string, role: UserRole) => {
    // BACKEND INTEGRATION: PATCH /api/users/[id] with {role}
    setInlineRoleMap((prev) => ({ ...prev, [userId]: role }));
    setRoleDropdownId(null);
    toast.success(`Role updated to ${role}`);
  };

  return (
    <div className="p-6 xl:p-8 2xl:p-10 max-w-screen-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold text-[hsl(var(--foreground))]">User Management</h1>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-0.5">
            {MOCK_USERS.length} members · superadmin access required
          </p>
        </div>
        <button
          onClick={() => setInviteModalOpen(true)}
          className="btn-primary flex items-center gap-2 text-sm"
        >
          <Plus size={15} />
          Invite User
        </button>
      </div>

      {/* KPI cards — 4 cards, 2×2 */}
      <div className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
        <div className="card p-5">
          <p className="label">Total Members</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">{MOCK_USERS.length}</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{MOCK_USERS.filter(u => u.status === 'active').length} active</p>
        </div>
        <div className="card p-5">
          <p className="label">By Role</p>
          <div className="mt-2 space-y-1.5">
            <div className="flex justify-between text-xs">
              <span className="text-green-600 font-semibold">Superadmin</span>
              <span className="tabular-nums font-bold text-[hsl(var(--foreground))]">{roleCount('superadmin')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-cyan-400 font-semibold">SEO</span>
              <span className="tabular-nums font-bold text-[hsl(var(--foreground))]">{roleCount('seo')}</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-orange-400 font-semibold">Editor</span>
              <span className="tabular-nums font-bold text-[hsl(var(--foreground))]">{roleCount('editor')}</span>
            </div>
          </div>
        </div>
        <div className="card p-5 border-amber-500/25 bg-amber-500/5">
          <p className="label text-amber-400/70">Pending Invites</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">
            {MOCK_USERS.filter((u) => u.status === 'pending').length}
          </p>
          <p className="text-xs text-amber-400 mt-1 font-medium">Awaiting first login</p>
        </div>
        <div className="card p-5">
          <p className="label">2FA Enabled</p>
          <p className="text-3xl font-bold tabular-nums text-[hsl(var(--foreground))] mt-1">
            {MOCK_USERS.filter((u) => u.twoFAEnabled).length}
          </p>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">
            of {MOCK_USERS.length} members secured
          </p>
          <div className="mt-2 h-1.5 bg-[hsl(var(--surface-elevated))] rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(MOCK_USERS.filter(u => u.twoFAEnabled).length / MOCK_USERS.length) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-[hsl(var(--surface-elevated))] rounded-xl p-1 w-fit border border-[hsl(var(--border))]">
        {[
          { value: 'users', label: 'Team Members', icon: Users },
          { value: 'permissions', label: 'Permission Matrix', icon: Shield },
        ].map(({ value, label, icon: Icon }) => (
          <button
            key={`user-tab-${value}`}
            onClick={() => setActiveTab(value as any)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-150 ${activeTab === value ? 'bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] border border-[hsl(var(--border))] shadow-sm' : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'}`}
          >
            <Icon size={14} />
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'users' && (
        <>
          {/* Filters */}
          <div className="flex items-center gap-3 flex-wrap">
            <div className="relative flex-1 min-w-40 max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))]" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="input pl-9 text-sm"
                placeholder="Search by name or email…"
              />
            </div>
            <div className="flex items-center gap-1.5">
              {(['all', 'superadmin', 'seo', 'editor'] as (UserRole | 'all')[]).map((r) => (
                <button
                  key={`role-filter-${r}`}
                  onClick={() => setRoleFilter(r)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${roleFilter === r ? 'bg-green-800/20 text-green-600 border-green-700/30' : 'bg-transparent text-[hsl(var(--muted-foreground))] border-[hsl(var(--border))] hover:text-[hsl(var(--foreground))]'}`}
                >
                  {r === 'all' ? 'All Roles' : r.charAt(0).toUpperCase() + r.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Users table */}
          <div className="card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
                    {['Member', 'Role', 'Status', '2FA', 'Pages Created', 'Pages Published', 'Last Active', 'Joined', ''].map((h) => (
                      <th key={`user-th-${h}`} className="px-5 py-3 text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider whitespace-nowrap">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[hsl(var(--border))]">
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={9}>
                        <EmptyState
                          icon={Users}
                          title="No users found"
                          description="No team members match your search or filter. Invite a new member to get started."
                          action={{ label: 'Invite User', onClick: () => setInviteModalOpen(true) }}
                        />
                      </td>
                    </tr>
                  ) : (
                    filtered.map((user) => {
                      const effectiveRole = inlineRoleMap[user.id] ?? user.role;
                      return (
                        <tr key={user.id} className="table-row-hover group">
                          {/* Member */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-3">
                              <div className={`w-9 h-9 rounded-full bg-gradient-to-br ${user.avatarColor} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                                {user.initials}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-[hsl(var(--foreground))] truncate">{user.name}</p>
                                <p className="text-xs text-[hsl(var(--muted-foreground))] truncate font-mono">{user.email}</p>
                              </div>
                            </div>
                          </td>
                          {/* Role — inline change */}
                          <td className="px-5 py-3.5 relative">
                            <button
                              onClick={() => setRoleDropdownId(roleDropdownId === user.id ? null : user.id)}
                              className="flex items-center gap-1 group/role"
                            >
                              <RoleBadge role={effectiveRole} size="sm" />
                              <ChevronDown size={11} className="text-[hsl(var(--muted-foreground))] opacity-0 group-hover/role:opacity-100 transition-opacity" />
                            </button>
                            {roleDropdownId === user.id && (
                              <div className="absolute z-20 top-10 left-5 bg-[hsl(var(--surface-elevated))] border border-[hsl(var(--border))] rounded-xl shadow-xl overflow-hidden min-w-[140px] animate-scale-in">
                                {(['superadmin', 'seo', 'editor'] as UserRole[]).map((r) => (
                                  <button
                                    key={`role-change-${user.id}-${r}`}
                                    onClick={() => handleRoleChange(user.id, r)}
                                    className="w-full flex items-center gap-2 px-3 py-2.5 hover:bg-[hsl(var(--surface))] transition-colors"
                                  >
                                    <RoleBadge role={r} size="sm" />
                                  </button>
                                ))}
                              </div>
                            )}
                          </td>
                          {/* Status */}
                          <td className="px-5 py-3.5"><UserStatusBadge status={user.status} /></td>
                          {/* 2FA */}
                          <td className="px-5 py-3.5">
                            {user.twoFAEnabled
                              ? <CheckCircle size={15} className="text-emerald-400" />
                              : <XCircle size={15} className="text-zinc-600" />
                            }
                          </td>
                          {/* Pages created */}
                          <td className="px-5 py-3.5 tabular-nums text-[hsl(var(--muted-foreground))]">{user.pagesCreated}</td>
                          {/* Pages published */}
                          <td className="px-5 py-3.5 tabular-nums text-[hsl(var(--muted-foreground))]">{user.pagesPublished}</td>
                          {/* Last active */}
                          <td className="px-5 py-3.5 text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">
                            <span className="flex items-center gap-1"><Clock size={11} />{user.lastActive}</span>
                          </td>
                          {/* Joined */}
                          <td className="px-5 py-3.5 text-xs text-[hsl(var(--muted-foreground))] whitespace-nowrap">{user.joinedAt}</td>
                          {/* Actions */}
                          <td className="px-5 py-3.5">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                className="p-1.5 rounded-lg hover:bg-green-700/15 text-[hsl(var(--muted-foreground))] hover:text-green-600 transition-colors"
                                title="Edit user details"
                              >
                                <Edit3 size={13} />
                              </button>
                              <button
                                className="p-1.5 rounded-lg hover:bg-amber-500/15 text-[hsl(var(--muted-foreground))] hover:text-amber-400 transition-colors"
                                title="Reset password — sends email to user"
                              >
                                <Key size={13} />
                              </button>
                              <button
                                onClick={() => { setDeleteTarget(user.id); setDeleteModalOpen(true); }}
                                className="p-1.5 rounded-lg hover:bg-red-500/15 text-[hsl(var(--muted-foreground))] hover:text-red-400 transition-colors"
                                title="Remove user from workspace — cannot be undone"
                              >
                                <Trash2 size={13} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Table footer */}
            <div className="flex items-center justify-between px-5 py-3 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
              <p className="text-xs text-[hsl(var(--muted-foreground))]">
                Showing {filtered.length} of {MOCK_USERS.length} members
              </p>
              <div className="flex items-center gap-2 text-xs text-[hsl(var(--muted-foreground))]">
                <Lock size={11} />
                <span>Superadmin access required to manage users</span>
              </div>
            </div>
          </div>
        </>
      )}

      {activeTab === 'permissions' && (
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-[hsl(var(--border))]">
            <h3 className="text-sm font-semibold text-[hsl(var(--foreground))]">Role Permission Matrix</h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
              Overview of what each role can do in CMSBuilder. Contact a superadmin to request changes.
            </p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
                  <th className="px-5 py-3.5 text-left text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider w-64">
                    Permission
                  </th>
                  {(['superadmin', 'seo', 'editor'] as UserRole[]).map((role) => (
                    <th key={`perm-header-${role}`} className="px-5 py-3.5 text-center">
                      <RoleBadge role={role} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[hsl(var(--border))]">
                {PERMISSIONS_MATRIX.map((perm) => (
                  <tr key={`perm-${perm.action}`} className="table-row-hover">
                    <td className="px-5 py-3.5 text-sm text-[hsl(var(--foreground))] font-medium">{perm.action}</td>
                    {(['superadmin', 'seo', 'editor'] as UserRole[]).map((role) => (
                      <td key={`perm-${perm.action}-${role}`} className="px-5 py-3.5 text-center">
                        {perm[role]
                          ? <CheckCircle size={16} className="text-emerald-400 mx-auto" />
                          : <XCircle size={16} className="text-zinc-700 mx-auto" />
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="px-5 py-3.5 border-t border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))]">
            <p className="text-xs text-[hsl(var(--muted-foreground))] flex items-center gap-1.5">
              <AlertTriangle size={11} className="text-amber-400" />
              Permission changes require a superadmin to update role definitions in the backend.
            </p>
          </div>
        </div>
      )}

      {/* Invite user modal */}
      <Modal
        open={inviteModalOpen}
        onClose={() => { setInviteModalOpen(false); reset(); }}
        title="Invite Team Member"
        description="Send an invitation email with a secure sign-in link. The user will be prompted to set their password on first login."
        size="md"
      >
        <form onSubmit={handleSubmit(onInvite)} className="space-y-4">
          <div>
            <label className="label">Full Name</label>
            <input
              {...register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Minimum 2 characters' } })}
              type="text"
              className="input"
              placeholder="Sofia Andreescu"
              autoComplete="name"
            />
            {errors.name && <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>}
          </div>

          <div>
            <label className="label">Work Email</label>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">An invitation link will be sent to this address.</p>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email address' },
              })}
              type="email"
              className="input"
              placeholder="colleague@company.io"
              autoComplete="email"
            />
            {errors.email && <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>}
          </div>

          <div>
            <label className="label">Assign Role</label>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">This determines what the user can see and do in CMSBuilder.</p>
            <div className="relative">
              <select
                {...register('role', { required: 'Role is required' })}
                className="input appearance-none pr-8 cursor-pointer"
              >
                <option value="editor">Editor — can create and publish pages, upload media</option>
                <option value="seo">SEO Manager — can edit SEO metadata and manage sitemap</option>
                <option value="superadmin">Superadmin — full access including user management</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] pointer-events-none" />
            </div>
            {errors.role && <p className="mt-1 text-xs text-red-400">{errors.role.message}</p>}
          </div>

          {/* Role info box */}
          <div className="bg-violet-500/5 border border-violet-500/20 rounded-xl p-3.5 space-y-1.5">
            <p className="text-xs font-semibold text-violet-400 flex items-center gap-1.5">
              <Shield size={12} />
              Role permissions summary
            </p>
            <div className="space-y-1">
              {[
                { role: 'editor', desc: 'Create, edit, and publish pages. Upload and manage media files.' },
                { role: 'seo', desc: 'Edit SEO metadata, manage sitemap and robots.txt. Read-only pages.' },
                { role: 'superadmin', desc: 'All permissions including user management, audit logs, and system settings.' },
              ].map((r) => (
                <p key={`role-desc-${r.role}`} className="text-[10px] text-[hsl(var(--muted-foreground))]">
                  <span className="font-semibold text-[hsl(var(--foreground))] capitalize">{r.role}:</span> {r.desc}
                </p>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={() => { setInviteModalOpen(false); reset(); }}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={inviteLoading}
              className="btn-primary flex-1 flex items-center justify-center gap-2"
            >
              {inviteLoading ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <>
                  <Mail size={14} />
                  Send Invitation
                </>
              )}
            </button>
          </div>
        </form>
      </Modal>

      {/* Delete confirm */}
      <ConfirmModal
        open={deleteModalOpen}
        onClose={() => { setDeleteModalOpen(false); setDeleteTarget(null); }}
        onConfirm={handleDelete}
        title="Remove this user?"
        description="This will revoke their access to CMSBuilder immediately. Their pages and media will remain in the workspace. This action cannot be undone."
        confirmLabel="Remove User"
        loading={deletingLoading}
        variant="danger"
      />
    </div>
  );
}