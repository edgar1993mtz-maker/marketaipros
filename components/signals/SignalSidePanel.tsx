"use client"

import { Signal } from "@/types/signal"
import { Sparklines, SparklinesLine } from "react-sparklines"
import Link from "next/link"

interface Props {
  signal: Signal | null
  onClose: () => void
}

export default function SignalSidePanel({ signal, onClose }: Props) {
  if (!signal) {
    return (
      <div
        className="
          fixed top-0 right-0 h-full w-[420px] bg-blackDeep
          border-l border-gold/20 shadow-gold z-50
          transform translate-x-full transition-transform duration-300
        "
      />
    )
  }

  // ⭐ Determine sparkline color based on trend
  const spark = signal.sparkline || []
  const trendUp = spark.length > 1 && spark[spark.length - 1] > spark[0]
  const trendDown = spark.length > 1 && spark[spark.length - 1] < spark[0]

  const sparkColor = trendUp
    ? "#00C46A" // green
    : trendDown
    ? "#FF4D4D" // red
    : "#D4AF37" // gold (flat)

  return (
    <div
      className={`
        fixed top-0 right-0 h-full w-[420px] bg-blackDeep
        border-l border-gold/20 shadow-gold z-50
        transform transition-transform duration-300
        ${signal ? "translate-x-0" : "translate-x-full"}
      `}
    >
      {/* HEADER */}
      <div className="p-6 border-b border-gold/20 flex justify-between items-center">
        <h2 className="text-xl font-bold text-goldLight tracking-wide">
          {signal.symbol} Intelligence
        </h2>

        <button
          onClick={onClose}
          className="text-gold/60 hover:text-goldLight transition"
        >
          ✕
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-6 space-y-8 overflow-y-auto h-[calc(100%-80px)]">

        {/* MINI CHART PREVIEW */}
        <div className="bg-blackSoft border border-gold/20 rounded-xl p-5 shadow-gold/20">
          <p className="text-gold/60 text-sm uppercase tracking-wide mb-2">
            Price Preview
          </p>

          <Sparklines data={spark} height={60}>
            <SparklinesLine color={sparkColor} />
          </Sparklines>

          {/* ⭐ VIEW FULL CHART BUTTON */}
          <Link
            href={`/chart/${signal.symbol}`}
            className="
              mt-4 inline-block w-full text-center
              bg-gold/20 hover:bg-gold/30
              text-goldLight font-semibold
              py-2 rounded-lg transition
            "
          >
            View Full Chart
          </Link>
        </div>

        {/* GRID INFO */}
        <div className="grid grid-cols-2 gap-6">
          <Info label="Direction" value={signal.direction} />
          <Info label="Timeframe" value={signal.timeframe} />
          <Info label="Model Version" value={signal.ai_model_version} />
          <Info
            label="Created"
            value={new Date(signal.created_at).toLocaleString()}
          />
        </div>

        {/* AI REASONING */}
        <div className="bg-blackSoft border border-gold/20 rounded-xl p-5 shadow-gold/20">
          <p className="text-gold/60 text-sm uppercase tracking-wide mb-2">
            AI Reasoning
          </p>
          <p className="text-goldLight leading-relaxed whitespace-pre-line">
            {signal.reasoning}
          </p>
        </div>

        {/* CONFIDENCE + RISK */}
        <div className="grid grid-cols-2 gap-6">
          <Info label="Confidence" value={`${signal.confidence_score}%`} />
          <Info label="Risk Score" value={signal.risk_score} />
        </div>

      </div>
    </div>
  )
}

function Info({ label, value }: { label: string; value: any }) {
  return (
    <div>
      <p className="text-gold/60 text-xs uppercase tracking-wide">{label}</p>
      <p className="text-goldLight text-lg font-semibold">{value}</p>
    </div>
  )
}
