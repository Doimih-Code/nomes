'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Loader2, Copy, Check, Layers, ArrowRight, FileText, Shield, Hammer } from 'lucide-react';
import AppLogo from '@/components/ui/AppLogo';

type AuthTab = 'login' | 'signup';
type Role = 'superadmin' | 'seo' | 'editor';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
}

const DEMO_CREDENTIALS = [
  { role: 'superadmin' as Role, email: 'sofia@cmsbuilder.io', password: 'Admin@2026', label: 'Superadmin', description: 'Full system access' },
  { role: 'seo' as Role, email: 'marcus.seo@cmsbuilder.io', password: 'Seo@2026!', label: 'SEO Manager', description: 'SEO & metadata tools' },
  { role: 'editor' as Role, email: 'priya.editor@cmsbuilder.io', password: 'Editor@2026', label: 'Content Editor', description: 'Pages & media only' },
];

const ROLE_ICONS = {
  superadmin: Shield,
  seo: Layers,
  editor: FileText,
};

function CopiedButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <button
      onClick={handleCopy}
      className="p-1 rounded hover:bg-[hsl(var(--surface-elevated))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
      title="Copy to clipboard"
    >
      {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
    </button>
  );
}

export default function AuthForm() {
  const router = useRouter();
  const [tab, setTab] = useState<AuthTab>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [signupLoading, setSignupLoading] = useState(false);

  const loginForm = useForm<LoginFormData>({
    defaultValues: { email: '', password: '', remember: false },
  });

  const signupForm = useForm<SignupFormData>({
    defaultValues: { name: '', email: '', password: '', confirmPassword: '', terms: false },
  });

  const handleAutofill = (email: string, password: string) => {
    loginForm.setValue('email', email);
    loginForm.setValue('password', password);
    setTab('login');
    toast.success('Credentials autofilled — click Sign In to continue');
  };

  const onLogin = async (data: LoginFormData) => {
    // BACKEND INTEGRATION: POST /api/auth/login with {email, password}
    setLoginLoading(true);
    await new Promise((r) => setTimeout(r, 1200));

    const match = DEMO_CREDENTIALS.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!match) {
      loginForm.setError('password', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      setLoginLoading(false);
      return;
    }

    toast.success(`Signed in as ${match.label}`);
    setLoginLoading(false);
    router.push('/cms-dashboard');
  };

  const onSignup = async (data: SignupFormData) => {
    // BACKEND INTEGRATION: POST /api/auth/register with {name, email, password, role}
    if (data.password !== data.confirmPassword) {
      signupForm.setError('confirmPassword', { message: 'Passwords do not match' });
      return;
    }
    setSignupLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    toast.success('Account created! Please sign in.');
    setSignupLoading(false);
    setTab('login');
  };

  return (
    <div className="min-h-screen flex bg-[hsl(var(--background))]">
      {/* Left brand panel */}
      <div className="hidden lg:flex lg:w-[52%] xl:w-[55%] relative flex-col justify-between p-10 overflow-hidden bg-gradient-to-br from-green-950 via-[hsl(var(--background))] to-[hsl(var(--background))]">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--border)) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-700/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-emerald-600/10 rounded-full blur-3xl pointer-events-none" />

        {/* Logo */}
        <div className="relative flex items-center gap-3">
          <AppLogo size={36} />
          <span className="font-bold text-lg text-gradient-violet tracking-tight">CMSBuilder</span>
        </div>

        {/* Center content */}
        <div className="relative space-y-6 max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-700/10 border border-green-700/20 text-green-600 text-xs font-semibold">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            Block-Based Page Builder
          </div>
          <h1 className="text-4xl xl:text-5xl font-bold text-[hsl(var(--foreground))] leading-tight">
            Build pages.<br />
            <span className="text-gradient-violet">Ship faster.</span>
          </h1>
          <p className="text-[hsl(var(--muted-foreground))] text-base leading-relaxed">
            A headless CMS built for editorial teams. Create, optimize, and publish pages with a visual block builder — no code required.
          </p>

          {/* Feature list */}
          <div className="grid grid-cols-1 gap-3 pt-2">
            {[
              { icon: Hammer, label: 'Visual block builder with animation support' },
              { icon: Layers, label: 'Role-based access: Editor, SEO, Superadmin' },
              { icon: FileText, label: 'Full SEO & Open Graph metadata control' },
            ].map((f) => {
              const FIcon = f.icon;
              return (
                <div key={`feature-${f.label}`} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-green-700/10 border border-green-700/20 flex items-center justify-center flex-shrink-0">
                    <FIcon size={15} className="text-green-600" />
                  </div>
                  <span className="text-sm text-[hsl(var(--muted-foreground))]">{f.label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative flex items-center gap-6">
          {[
            { value: '14k+', label: 'Pages published' },
            { value: '98%', label: 'SEO coverage' },
            { value: '3 roles', label: 'Access control' },
          ].map((s) => (
            <div key={`stat-${s.label}`}>
              <p className="text-xl font-bold text-[hsl(var(--foreground))] tabular-nums">{s.value}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-10 overflow-y-auto">
        <div className="w-full max-w-md space-y-6">
          {/* Mobile logo */}
          <div className="flex items-center gap-2 lg:hidden mb-2">
            <AppLogo size={28} />
            <span className="font-bold text-sm text-gradient-violet">CMSBuilder</span>
          </div>

          {/* Tab switcher */}
          <div>
            <div className="flex bg-[hsl(var(--surface-elevated))] rounded-xl p-1 gap-1">
              {(['login', 'signup'] as AuthTab[]).map((t) => (
                <button
                  key={`tab-${t}`}
                  onClick={() => setTab(t)}
                  className={`
                    flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200
                    ${tab === t
                      ? 'bg-[hsl(var(--surface))] text-[hsl(var(--foreground))] shadow-sm border border-[hsl(var(--border))]'
                      : 'text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]'
                    }
                  `}
                >
                  {t === 'login' ? 'Sign In' : 'Create Account'}
                </button>
              ))}
            </div>
          </div>

          {/* Login form */}
          {tab === 'login' && (
            <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-4 animate-fade-in">
              <div>
                <label className="label">Email address</label>
                <input
                  {...loginForm.register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                  type="email"
                  className="input"
                  placeholder="sofia@cmsbuilder.io"
                  autoComplete="email"
                />
                {loginForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-400">{loginForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="label mb-0">Password</label>
                  <button type="button" className="text-xs text-green-600 hover:text-green-500 transition-colors">
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <input
                    {...loginForm.register('password', { required: 'Password is required' })}
                    type={showPassword ? 'text' : 'password'}
                    className="input pr-10"
                    placeholder="••••••••"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {loginForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-400">{loginForm.formState.errors.password.message}</p>
                )}
              </div>

              <div className="flex items-center gap-2">
                <input
                  {...loginForm.register('remember')}
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] accent-green-700"
                />
                <label htmlFor="remember" className="text-sm text-[hsl(var(--muted-foreground))]">
                  Remember me for 30 days
                </label>
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                {loginLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          )}

          {/* Signup form */}
          {tab === 'signup' && (
            <form onSubmit={signupForm.handleSubmit(onSignup)} className="space-y-4 animate-fade-in">
              <div>
                <label className="label">Full name</label>
                <input
                  {...signupForm.register('name', { required: 'Full name is required', minLength: { value: 2, message: 'Name must be at least 2 characters' } })}
                  type="text"
                  className="input"
                  placeholder="Sofia Andreescu"
                  autoComplete="name"
                />
                {signupForm.formState.errors.name && (
                  <p className="mt-1 text-xs text-red-400">{signupForm.formState.errors.name.message}</p>
                )}
              </div>

              <div>
                <label className="label">Work email</label>
                <input
                  {...signupForm.register('email', {
                    required: 'Email is required',
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
                  })}
                  type="email"
                  className="input"
                  placeholder="you@company.io"
                  autoComplete="email"
                />
                {signupForm.formState.errors.email && (
                  <p className="mt-1 text-xs text-red-400">{signupForm.formState.errors.email.message}</p>
                )}
              </div>

              <div>
                <label className="label">Password</label>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mb-1.5">Must be 8+ characters with at least one uppercase letter and number.</p>
                <div className="relative">
                  <input
                    {...signupForm.register('password', {
                      required: 'Password is required',
                      minLength: { value: 8, message: 'Minimum 8 characters' },
                      pattern: { value: /(?=.*[A-Z])(?=.*\d)/, message: 'Include uppercase and a number' },
                    })}
                    type={showPassword ? 'text' : 'password'}
                    className="input pr-10"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" aria-label="Toggle password">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signupForm.formState.errors.password && (
                  <p className="mt-1 text-xs text-red-400">{signupForm.formState.errors.password.message}</p>
                )}
              </div>

              <div>
                <label className="label">Confirm password</label>
                <div className="relative">
                  <input
                    {...signupForm.register('confirmPassword', { required: 'Please confirm your password' })}
                    type={showConfirmPassword ? 'text' : 'password'}
                    className="input pr-10"
                    placeholder="••••••••"
                    autoComplete="new-password"
                  />
                  <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors" aria-label="Toggle confirm password">
                    {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {signupForm.formState.errors.confirmPassword && (
                  <p className="mt-1 text-xs text-red-400">{signupForm.formState.errors.confirmPassword.message}</p>
                )}
              </div>

              <div className="flex items-start gap-2">
                <input
                  {...signupForm.register('terms', { required: 'You must accept the terms' })}
                  id="terms"
                  type="checkbox"
                  className="w-4 h-4 mt-0.5 rounded border-[hsl(var(--border))] bg-[hsl(var(--surface-elevated))] accent-green-700"
                />
                <label htmlFor="terms" className="text-sm text-[hsl(var(--muted-foreground))]">
                  I agree to the{' '}
                  <a href="#" className="text-green-600 hover:text-green-500 underline">Terms of Service</a>
                  {' '}and{' '}
                  <a href="#" className="text-green-600 hover:text-green-500 underline">Privacy Policy</a>
                </label>
              </div>
              {signupForm.formState.errors.terms && (
                <p className="text-xs text-red-400">{signupForm.formState.errors.terms.message}</p>
              )}

              <button
                type="submit"
                disabled={signupLoading}
                className="w-full btn-primary flex items-center justify-center gap-2 py-3"
              >
                {signupLoading ? <Loader2 size={16} className="animate-spin" /> : 'Create Account'}
              </button>
            </form>
          )}

          {/* Demo credentials */}
          <div className="border border-[hsl(var(--border))] rounded-xl overflow-hidden">
            <div className="px-4 py-3 bg-[hsl(var(--surface-elevated))] border-b border-[hsl(var(--border))] flex items-center justify-between">
              <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wider">Demo Accounts</p>
              <span className="text-[10px] text-[hsl(var(--muted-foreground))]">Click a row to autofill</span>
            </div>
            <div className="divide-y divide-[hsl(var(--border))]">
              {DEMO_CREDENTIALS.map((cred) => {
                const RIcon = ROLE_ICONS[cred.role];
                return (
                  <div
                    key={`cred-${cred.role}`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-[hsl(var(--surface-elevated))] cursor-pointer transition-colors group"
                    onClick={() => handleAutofill(cred.email, cred.password)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleAutofill(cred.email, cred.password)}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${cred.role === 'superadmin' ? 'bg-green-700/15' : cred.role === 'seo' ? 'bg-cyan-500/15' : 'bg-orange-500/15'}`}>
                      <RIcon size={13} className={cred.role === 'superadmin' ? 'text-green-600' : cred.role === 'seo' ? 'text-cyan-400' : 'text-orange-400'} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-[hsl(var(--foreground))]">{cred.label}</p>
                      <p className="text-[10px] text-[hsl(var(--muted-foreground))] truncate font-mono">{cred.email}</p>
                    </div>
                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CopiedButton text={cred.email} />
                      <CopiedButton text={cred.password} />
                    </div>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))] font-mono hidden sm:block">{cred.password}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <p className="text-center text-xs text-[hsl(var(--muted-foreground))]">
            {tab === 'login' ? "Don't have an account? " : 'Already have an account? '}
            <button
              onClick={() => setTab(tab === 'login' ? 'signup' : 'login')}
              className="text-green-600 hover:text-green-500 font-semibold transition-colors"
            >
              {tab === 'login' ? 'Create one' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}