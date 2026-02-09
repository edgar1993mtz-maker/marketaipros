'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="flex justify-between items-center px-8 py-4 bg-black border-t border-tron text-tron">
      <div className="text-tron font-bold text-xl">MarketAIPros</div>

      <ul className="flex gap-6">
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/tools">Tools</Link>
        </li>
        <li>
          <Link href="/pricing">Pricing</Link>
        </li>
        <li>
          <Link href="/about">About</Link>
        </li>
        <li>
          <Link href="/contact">Contact</Link>
        </li>
      </ul>

      <div className="ml-4">© {new Date().getFullYear()} MarketAIPros</div>
    </footer>
  );
}
