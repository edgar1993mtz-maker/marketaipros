import SniperEntryTable from "./components/SniperEntryTable";

export default function SniperPage() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">Sniper Entries</h1>
      <SniperEntryTable />
    </main>
  );
}
