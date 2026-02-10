import Card from '@/components/ui/Card';
import DividerGold from '@/components/ui/DividerGold';

interface BuffettCategoryBlockProps {
  category: string;
  score: number;
  color: string;
  details: string[];
}

export default function BuffettCategoryBlock({ category, score, color, details }: BuffettCategoryBlockProps) {
  return (
    <Card className={`border-${color}-500`}>
      <h3 className={`text-${color}-400 font-bold text-xl mb-4`}>{category}</h3>
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <span className="text-slate-300">Score</span>
          <span className={`text-${color}-400 font-bold`}>{score.toFixed(1)}/10</span>
        </div>
        <div className="h-3 bg-slate-700 rounded-full overflow-hidden">
          <div
            className={`h-full bg-${color}-500`}
            style={{ width: `${(score / 10) * 100}%` }}
          />
        </div>
      </div>
      <DividerGold />
      <ul className="mt-4 space-y-2">
        {details.map((detail, idx) => (
          <li key={idx} className="text-sm text-slate-400">• {detail}</li>
        ))}
      </ul>
    </Card>
  );
}
