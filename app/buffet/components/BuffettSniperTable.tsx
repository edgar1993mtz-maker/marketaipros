import Table from '@/components/ui/Table';
import Badge from '@/components/ui/Badge';

interface BuffettSniperTableProps {
  data: any[];
}

export default function BuffettSniperTable({ data }: BuffettSniperTableProps) {
  const headers = ['Symbol', 'Buffett Score', 'Sniper Signal', 'Entry', 'Target', 'Win Rate'];
  const rows = data.map((item) => [
    <span key="symbol" className="font-bold">{item.symbol}</span>,
    <Badge key="buffett" variant="success">{item.buffettScore.toFixed(1)}</Badge>,
    <Badge key="signal" variant={item.signal === 'BUY' ? 'success' : 'warning'}>{item.signal}</Badge>,
    <span key="entry">${item.entry}</span>,
    <span key="target">${item.target}</span>,
    <span key="winrate" className="text-green-400 font-bold">{item.winRate}%</span>,
  ]);

  return <Table headers={headers} rows={rows} />;
}
