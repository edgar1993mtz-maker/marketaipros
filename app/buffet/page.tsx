import BuffettScoreTable from "./components/BuffettScoreTable";

export default function BuffettPage() {
  return (
    <main className="p-10 space-y-6">
      <h1 className="text-3xl font-bold">MAFI Buffett Strategy</h1>
      <BuffettScoreTable />
    </main>
  );
}
