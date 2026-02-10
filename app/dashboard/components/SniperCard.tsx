import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface SniperCardProps {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  entryPrice: number;
  targetPrice: number;
  stopLoss: number;
}

export default function SniperCard({ symbol, signal, entryPrice, targetPrice, stopLoss }: SniperCardProps) {
  const signalColor = signal === 'BUY' ? 'success' : signal === 'SELL' ? 'danger' : 'info';
  
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{symbol}</h3>
          <p className="text-sm text-slate-400">Sniper Signal</p>
        </div>
        <Badge variant={signalColor}>{signal}</Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Entry:</span>
          <span className="text-amber-400 font-bold">${entryPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Target:</span>
          <span className="text-green-400">${targetPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Stop Loss:</span>
          <span className="text-red-400">${stopLoss.toFixed(2)}</span>
        </div>
      </div>
    </Card>
  );
}
