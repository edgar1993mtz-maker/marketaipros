'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface BarChartProps {
  data: any[];
  [key: string]: any;
}

export default function BarChartComponent({ data, ...props }: BarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} {...props}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis stroke="#94a3b8" />
        <YAxis stroke="#94a3b8" />
        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #475569' }} />
        <Legend />
        <Bar dataKey="value" fill="#f59e0b" />
      </BarChart>
    </ResponsiveContainer>
  );
}
