export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-blackSoft text-gold px-6 py-10">
      <div className="max-w-7xl mx-auto space-y-10">

        <h1 className="text-3xl font-bold tracking-wide text-gold">
          Dashboard Overview
        </h1>

        {/* GRID */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {/* CARD 1 */}
          <div className="rounded-xl bg-blackDeep border border-gold/20 p-5 shadow-gold">
            <h2 className="text-goldLight mb-3">Price Action</h2>
            <LineChart data={data} />
          </div>

          {/* CARD 2 */}
          <div className="rounded-xl bg-blackDeep border border-gold/20 p-5 shadow-gold">
            <h2 className="text-goldLight mb-3">Momentum</h2>
            <MomentumWidget />
          </div>

          {/* CARD 3 */}
          <div className="rounded-xl bg-blackDeep border border-gold/20 p-5 shadow-gold">
            <h2 className="text-goldLight mb-3">ETF Flows</h2>
            <ETFTable />
          </div>

        </div>

      </div>
    </main>
  );
}
