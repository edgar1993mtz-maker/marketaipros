import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface SniperCardProps {
  symbol: string;
  signal: 'BUY' | 'SELL' | 'HOLD';
  confidence: number;
  entry: number;
  target: number;
  stopLoss: number;
}

export default function SniperCard({
  symbol,
  signal,
  confidence,
  entry,
  target,
  stopLoss,
}: SniperCardProps) {
  const signalColor = signal === 'BUY' ? 'success' : signal === 'SELL' ? 'danger' : 'info';
  
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{symbol}</h3>
          <p className="text-sm text-slate-400">Sniper Entry</p>
        </div>
        <div className="text-right">
          <Badge variant={signalColor} className="mb-2">{signal}</Badge>
          <div className="text-xs text-slate-400">Confidence: {confidence}%</div>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-slate-400">Entry:</span>
          <span className="text-amber-400 font-bold">${entry}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Target:</span>
          <span className="text-green-400 font-bold">${target}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Stop Loss:</span>
          <span className="text-red-400 font-bold">${stopLoss}</span>
        </div>
        <div className="flex justify-between pt-2 border-t border-slate-700">
          <span className="text-slate-400">R/R Ratio:</span>
          <span className="text-yellow-400 font-bold">
            {((target - entry) / (entry - stopLoss)).toFixed(2)}:1
          </span>
        </div>
      </div>
    </Card>
  );
}
