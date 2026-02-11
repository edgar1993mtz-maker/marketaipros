'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur border-b border-amber-500/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          
          {/* Logo */}
          <Link
            href="/"
            className="text-2xl font-extrabold tracking-wide text-amber-400 hover:text-amber-300 transition"
          >
            MARKET<span className="text-white">AI</span>PROS
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-10">
            <Link href="/dashboard" prefetch={false} className="nav-link">Dashboard</Link>
            <Link href="/buffet" prefetch={false} className="nav-link">Buffett</Link>
            <Link href="/sniper" prefetch={false} className="nav-link">Sniper</Link>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex gap-4">
            <Link href="/login" prefetch={false} className="nav-link">Login</Link>
            <Link
              href="/register"
              prefetch={false}
              className="px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-600 transition shadow-md"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            aria-label="Toggle menu"
            className="md:hidden text-amber-400 text-2xl"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="pb-4 border-t border-amber-500/20 pt-4 space-y-2">
            <Link href="/dashboard" className="mobile-link" onClick={() => setIsOpen(false)}>Dashboard</Link>
            <Link href="/buffet" className="mobile-link" onClick={() => setIsOpen(false)}>Buffett</Link>
            <Link href="/sniper" className="mobile-link" onClick={() => setIsOpen(false)}>Sniper</Link>
            <Link href="/login" className="mobile-link" onClick={() => setIsOpen(false)}>Login</Link>
            <Link
              href="/register"
              className="block px-4 py-2 bg-amber-500 text-black rounded-lg font-semibold hover:bg-amber-600 transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
