'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface LineChartProps {
  data: any[];
  [key: string]: any;
}

export default function LineChartComponent({ data, ...props }: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
        <Legend />
        <Line type="monotone" dataKey="value" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
}
