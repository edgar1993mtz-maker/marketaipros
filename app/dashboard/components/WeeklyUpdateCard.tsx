import Card from '@/components/ui/Card';
import DividerGold from '@/components/ui/DividerGold';

export default function WeeklyUpdateCard() {
  return (
    <Card>
      <h3 className="text-amber-400 font-bold mb-4">Weekly Update</h3>
      <div className="space-y-3">
        <div>
          <p className="text-sm text-slate-300 mb-1">Market Outlook</p>
          <p className="text-slate-400 text-xs">Strong bullish momentum observed in tech sector with healthy pullback opportunities.</p>
        </div>
        <DividerGold />
        <div>
          <p className="text-sm text-slate-300 mb-1">Key Events</p>
          <ul className="text-slate-400 text-xs space-y-1">
            <li>• Fed Decision - Tomorrow</li>
            <li>• Earnings Season - In Progress</li>
            <li>• GDP Report - Next Week</li>
          </ul>
        </div>
      </div>
    </Card>
  );
}
