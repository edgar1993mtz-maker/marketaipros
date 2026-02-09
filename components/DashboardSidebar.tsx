import Link from "next/link";

export default function DashboardSidebar() {
  return (
    <aside className="w-64 bg-black border-r border-tron p-6 hidden md:block">
      <h2 className="text-tron text-2xl font-bold mb-8">MAP Dashboard</h2>

      <nav className="flex flex-col gap-4 text-gray-300">
        <Link href="/dashboard" className="hover:text-tron">Overview</Link>
        <Link href="/dashboard/analytics" className="hover:text-tron">Analytics</Link>
        <Link href="/dashboard/tools" className="hover:text-tron">AI Tools</Link>
        <Link href="/dashboard/settings" className="hover:text-tron">Settings</Link>
      </nav>
    </aside>
  );
}
