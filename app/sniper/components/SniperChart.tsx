'use client';

import LineChart from '@/components/charts/LineChart';


interface SniperChartProps {
  data: any[];
}

export default function SniperChart({ data }: SniperChartProps) {
  return (
    <div className="w-full h-80 bg-slate-800/50 border border-slate-700 rounded-lg p-4">
      <h3 className="text-amber-400 font-bold mb-4">Price Action Analysis</h3>
      <LineChart data={data} />
    </div>
  );
}
