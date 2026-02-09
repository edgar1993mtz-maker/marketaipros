export default function DashboardTopbar() {
  return (
    <header className="w-full bg-black border-b border-tron p-4 flex justify-between items-center">
      <h1 className="text-tron font-bold text-xl">MarketAIPros Dashboard</h1>

      <div className="text-gray-300">
        Logged in as <span className="text-tron">User</span>
      </div>
    </header>
  );
}
