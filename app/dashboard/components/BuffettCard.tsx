import Card from '@/components/ui/Card';
import Badge from '@/components/ui/Badge';

interface BuffettCardProps {
  symbol: string;
  score: number;
  price: number;
  change: number;
}

export default function BuffettCard({ symbol, score, price, change }: BuffettCardProps) {
  return (
    <Card>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-slate-100">{symbol}</h3>
          <p className="text-sm text-slate-400">Buffett Score</p>
        </div>
        <Badge variant={score > 8 ? 'success' : score > 6 ? 'warning' : 'danger'}>
          {score.toFixed(1)}/10
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-slate-400">Price:</span>
          <span className="text-amber-400 font-bold">${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-400">Change:</span>
          <span className={change > 0 ? 'text-green-400' : 'text-red-400'}>
            {change > 0 ? '+' : ''}{change.toFixed(2)}%
          </span>
        </div>
      </div>
    </Card>
  );
}
