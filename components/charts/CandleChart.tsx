'use client';

import { ComposedChart, Area, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface CandleChartProps {
  data: any[];
  [key: string]: any;
}

export default function CandleChart({ data, ...props }: CandleChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ComposedChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
        <Legend />
        <Area type="monotone" dataKey="high" fill="#22c55e" stroke="none" />
        <Line type="monotone" dataKey="close" stroke="#f59e0b" strokeWidth={2} />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
