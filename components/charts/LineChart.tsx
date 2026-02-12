'use client';

import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

interface ChartPoint {
  name?: string;
  value: number;
  [key: string]: any;
}

interface LineChartProps {
  data: ChartPoint[];
  dataKey?: string;
  [key: string]: any;
}

export default function LineChart({
  data,
  dataKey = "value",
  ...props
}: LineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data} {...props}>

        {/* Grid */}
        <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />

        {/* Axes */}
        <XAxis dataKey="name" stroke="#D4AF37" tick={{ fill: "#D4AF37" }} />
        <YAxis stroke="#D4AF37" tick={{ fill: "#D4AF37" }} />

        {/* Tooltip */}
        <Tooltip
          contentStyle={{
            backgroundColor: '#0a0a0a',
            border: '1px solid rgba(212,175,55,0.3)',
            color: '#D4AF37'
          }}
          labelStyle={{ color: '#f5d98c' }}
        />

        {/* Legend */}
        <Legend
          wrapperStyle={{
            color: '#D4AF37'
          }}
        />

        {/* Line */}
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke="#D4AF37"
          strokeWidth={2}
          dot={{ r: 3, fill: "#D4AF37" }}
          activeDot={{ r: 5, fill: "#f5d98c" }}
        />

      </RechartsLineChart>
    </ResponsiveContainer>
  );
}
