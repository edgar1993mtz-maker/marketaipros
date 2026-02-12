import { Signal } from "@/types/signal"

interface Props {
  signals: Signal[]
}

export default function SignalsStatsBar({ signals }: Props) {
  const active = signals.filter(s => s.status === "ACTIVE").length

  const winRate =
    signals.length > 0
      ? (
          (signals.filter(s => s.status === "TP_HIT").length /
            signals.length) *
          100
        ).toFixed(1)
      : "0"

  const avgConfidence =
    signals.length > 0
      ? Math.round(
          signals.reduce((a, b) => a + b.confidence_score, 0) /
            signals.length
        )
      : 0

  const stats = [
    { label: "Active Signals", value: active },
    { label: "Win Rate", value: `${winRate}%` },
    { label: "Avg Confidence", value: avgConfidence },
    { label: "Total Signals", value: signals.length },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {stats.map((stat, i) => (
        <StatCard key={i} label={stat.label} value={stat.value} />
      ))}
    </div>
  )
}

function StatCard({ label, value }: any) {
  return (
    <div className="rounded-xl bg-blackDeep border border-gold/20 p-5 shadow-gold">
      <p className="text-gold/60 text-sm tracking-wide uppercase">
        {label}
      </p>
      <p className="text-2xl font-bold text-goldLight mt-1">
        {value}
      </p>
    </div>
  )
}
