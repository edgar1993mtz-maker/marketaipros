'use client';

import Link from 'next/link';
import { useState } from 'react';
import Button from '@/components/ui/Button';

export default function RegisterPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('Register:', { email, password });
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-lg p-8">
        <h1 className="text-3xl font-bold text-amber-400 mb-6">Sign Up</h1>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-slate-300 mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>

          <div>
            <label className="block text-slate-300 mb-2">Confirm Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-slate-100 focus:outline-none focus:border-amber-500"
              placeholder="••••••••"
            />
          </div>

          <Button variant="primary" className="w-full">
            Create Account
          </Button>
        </form>

        <p className="mt-6 text-center text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="text-amber-400 hover:text-amber-300">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
