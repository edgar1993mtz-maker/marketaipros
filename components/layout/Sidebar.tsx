'use client';

import Link from 'next/link';

export default function Sidebar() {
  return (
    <aside className="hidden lg:block w-64 bg-slate-900 border-r border-slate-800 p-6 fixed left-0 top-16 h-screen overflow-y-auto">
      <nav className="space-y-4">
        <h3 className="text-amber-400 font-bold text-sm uppercase">Analysis Tools</h3>
        <ul className="space-y-2">
          <li>
            <Link href="/buffet" className="text-slate-300 hover:text-amber-400 transition text-sm block py-2">
              Buffett Scoring
            </Link>
          </li>
          <li>
            <Link href="/sniper" className="text-slate-300 hover:text-amber-400 transition text-sm block py-2">
              Sniper Signals
            </Link>
          </li>
          <li>
            <Link href="/dashboard" className="text-slate-300 hover:text-amber-400 transition text-sm block py-2">
              Dashboard
            </Link>
          </li>
        </ul>

        <div className="border-t border-slate-700 pt-4 mt-4">
          <h3 className="text-amber-400 font-bold text-sm uppercase">Resources</h3>
          <ul className="space-y-2 mt-2">
            <li>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition text-sm block py-2">
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className="text-slate-400 hover:text-amber-400 transition text-sm block py-2">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </aside>
  );
}
