import Card from '@/components/ui/Card';

export default function SectorRotationCard() {
  return (
    <Card>
      <h3 className="text-amber-400 font-bold mb-4">Sector Rotation</h3>
      <div className="space-y-3">
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300">Technology</span>
            <span className="text-green-400">↑ Strong</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-green-500" style={{ width: '85%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300">Healthcare</span>
            <span className="text-amber-400">→ Neutral</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-amber-500" style={{ width: '50%' }} />
          </div>
        </div>
        <div>
          <div className="flex justify-between mb-1">
            <span className="text-slate-300">Energy</span>
            <span className="text-red-400">↓ Weak</span>
          </div>
          <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
            <div className="h-full bg-red-500" style={{ width: '30%' }} />
          </div>
        </div>
      </div>
    </Card>
  );
}
