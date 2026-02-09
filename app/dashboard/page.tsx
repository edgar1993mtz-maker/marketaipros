export default function DashboardPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-tron">Dashboard</h1>
      <p className="mt-2 text-gray-400">Your analytics and AI tools will appear here.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="p-6 bg-black border border-tron rounded-lg">
          <h2 className="text-xl font-semibold text-tron">Widget 1</h2>
          <p className="text-gray-400 mt-2">Placeholder for stats.</p>
        </div>

        <div className="p-6 bg-black border border-tron rounded-lg">
          <h2 className="text-xl font-semibold text-tron">Widget 2</h2>
          <p className="text-gray-400 mt-2">Placeholder for charts.</p>
        </div>

        <div className="p-6 bg-black border border-tron rounded-lg">
          <h2 className="text-xl font-semibold text-tron">Widget 3</h2>
          <p className="text-gray-400 mt-2">Placeholder for AI tools.</p>
        </div>
      </div>
    </div>
  );
}
