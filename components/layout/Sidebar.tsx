'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const linkBase =
    'block py-2 px-2 text-sm rounded-md transition font-medium';
  const linkInactive =
    'text-slate-300 hover:text-amber-400 hover:bg-slate-800/40';
  const linkActive =
    'text-amber-400 bg-slate-800/60 border-l-2 border-amber-500 pl-3';

  const linkClass = (path: string) =>
    `${linkBase} ${pathname === path ? linkActive : linkInactive}`;

  return (
    <aside
      className="hidden lg:block w-64 bg-gradient-to-b from-slate-950 to-slate-900 border-r border-slate-800 p-6 fixed left-0 top-16 h-screen overflow-y-auto"
      role="navigation"
      aria-label="Sidebar"
    >
      <nav className="space-y-6">

        {/* Analysis Tools */}
        <div>
          <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 opacity-90">
            Analysis Tools
          </h3>
          <ul className="space-y-1">
            <li>
              <Link href="/buffet" prefetch={false} className={linkClass('/buffet')}>
                Buffett Scoring
              </Link>
            </li>
            <li>
              <Link href="/sniper" prefetch={false} className={linkClass('/sniper')}>
                Sniper Signals
              </Link>
            </li>
            <li>
              <Link href="/dashboard" prefetch={false} className={linkClass('/dashboard')}>
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div className="border-t border-slate-700 pt-4">
          <h3 className="text-amber-400 font-bold text-xs uppercase tracking-wider mb-2 opacity-90">
            Resources
          </h3>
          <ul className="space-y-1">
            <li>
              <a href="#" className={`${linkBase} ${linkInactive}`}>
                Documentation
              </a>
            </li>
            <li>
              <a href="#" className={`${linkBase} ${linkInactive}`}>
                Blog
              </a>
            </li>
          </ul>
        </div>

      </nav>
    </aside>
  );
}
