'use client';

import {
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface CandleChartProps {
  data: any[];
  height?: number;
  showLegend?: boolean;
  areaKey?: string;
  lineKey?: string;
}

export default function CandleChart({
  data,
  height = 320,
  showLegend = true,
  areaKey = 'high',
  lineKey = 'close',
}: CandleChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <ComposedChart data={data}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#22c55e" stopOpacity={0.4} />
            <stop offset="100%" stopColor="#22c55e" stopOpacity={0.05} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />

        <XAxis
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#475569' }}
        />

        <YAxis
          stroke="#94a3b8"
          tick={{ fill: '#94a3b8', fontSize: 12 }}
          axisLine={{ stroke: '#475569' }}
        />

        <Tooltip
          contentStyle={{
            backgroundColor: '#0f172a',
            border: '1px solid #475569',
            borderRadius: '6px',
            color: '#e2e8f0',
          }}
          labelStyle={{ color: '#f8fafc' }}
        />

        {showLegend && <Legend />}

        <Area
          type="monotone"
          dataKey={areaKey}
          fill="url(#areaGradient)"
          stroke="none"
        />

        <Line
          type="monotone"
          dataKey={lineKey}
          stroke="#f59e0b"
          strokeWidth={2}
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
