'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-slate-950 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-amber-400 hover:text-amber-300 transition">
            🚀 MarketAI
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8">
            <Link href="/dashboard" className="text-slate-300 hover:text-amber-400 transition">Dashboard</Link>
            <Link href="/buffet" className="text-slate-300 hover:text-amber-400 transition">Buffett</Link>
            <Link href="/sniper" className="text-slate-300 hover:text-amber-400 transition">Sniper</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <Link href="/login" className="text-slate-300 hover:text-amber-400 transition">Login</Link>
            <Link href="/register" className="px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-600 transition">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-amber-400"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 border-t border-slate-800 pt-4 space-y-2">
            <Link href="/dashboard" className="block text-slate-300 hover:text-amber-400 transition py-2">Dashboard</Link>
            <Link href="/buffet" className="block text-slate-300 hover:text-amber-400 transition py-2">Buffett</Link>
            <Link href="/sniper" className="block text-slate-300 hover:text-amber-400 transition py-2">Sniper</Link>
            <Link href="/login" className="block text-slate-300 hover:text-amber-400 transition py-2">Login</Link>
            <Link href="/register" className="block px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-600 transition">
              Sign Up
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
