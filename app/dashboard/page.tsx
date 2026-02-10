import DashboardHeader from "./components/DashboardHeader";
import DashboardCard from "./components/DashboardCard";

export default function DashboardPage() {
  return (
    <main className="p-10 space-y-8">
      <DashboardHeader />

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <DashboardCard title="MAFI Buffett Score" file="buffet.json" />
        <DashboardCard title="Sniper Entries" file="sniper.json" />
        <DashboardCard title="Sector Rotation" file="rotation.json" />
        <DashboardCard title="Weekly Update" file="weekly.json" />
      </section>
    </main>
  );
}
