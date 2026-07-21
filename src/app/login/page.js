"use client";

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from '@/lib/auth-client';
import { Eye, EyeOff, Leaf } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const { error } = await signIn.email({
      email: form.email,
      password: form.password,
    });

    if (error) {
      setError(error.message || 'Login failed. Please check your credentials.');
      setLoading(false);
    } else {
      router.push('/explore');
    }
  };

  const handleDemo = async () => {
    setLoading(true);
    setError('');
    const { error } = await signIn.email({
      email: 'demo@rooted.com',
      password: 'demo1234',
    });
    if (error) {
      setError('Demo account not available. Please register first.');
      setLoading(false);
    } else {
      router.push('/explore');
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({ provider: 'google', callbackURL: '/explore' });
  };

  return (
    <div className="min-h-screen flex">
      {/* Left — Brand Visual */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-brand-accent via-brand-accent/90 to-brand-primary relative overflow-hidden items-center justify-center p-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)', backgroundSize: '30px 30px' }} />
        </div>
        <div className="relative z-10 text-center">
          <Leaf className="w-20 h-20 text-white/80 mx-auto mb-8" />
          <h2 className="font-heading text-5xl font-bold text-white mb-6">Welcome Back</h2>
          <p className="text-white/80 text-xl max-w-md leading-relaxed">
            Your roots are waiting. Sign in to continue your journey home.
          </p>
        </div>
      </div>

      {/* Right — Form */}
      <div className="flex-1 flex items-center justify-center p-8 bg-brand-bg">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-10 text-brand-primary">
            <Leaf className="w-6 h-6" />
            <span className="font-heading text-2xl font-bold">Rooted</span>
          </Link>

          <h1 className="font-heading text-3xl font-bold text-brand-text mb-2">Sign In</h1>
          <p className="text-gray-500 mb-8">Don't have an account? <Link href="/register" className="text-brand-primary font-semibold hover:underline">Register →</Link></p>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm px-4 py-3 rounded-xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-brand-text mb-1 block">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="you@example.com"
                className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-brand-text mb-1 block">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-primary/30 focus:border-brand-primary transition-all pr-12"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-brand-primary text-white font-bold rounded-xl hover:bg-brand-primary/90 transition-all disabled:opacity-50 shadow-md hover:shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <button
            onClick={handleDemo}
            disabled={loading}
            className="w-full py-3.5 mt-3 bg-brand-accent/10 text-brand-accent font-bold rounded-xl border border-brand-accent/30 hover:bg-brand-accent/20 transition-all disabled:opacity-50"
          >
            Try Demo Account
          </button>

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-sm text-gray-400 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          <button
            onClick={handleGoogleLogin}
            className="w-full py-3.5 bg-white text-brand-text font-semibold rounded-xl border border-gray-200 hover:bg-gray-50 transition-all flex items-center justify-center gap-3 shadow-sm"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}
