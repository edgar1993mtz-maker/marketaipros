"use client"

import { Signal } from "@/types/signal"

interface Props {
  signal: Signal | null
  onClose: () => void
}

export default function SignalModal({ signal, onClose }: Props) {
  if (!signal) return null

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      
      {/* MODAL PANEL */}
      <div className="w-full max-w-2xl bg-blackDeep border border-gold/20 rounded-xl shadow-gold p-8 relative">

        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gold/60 hover:text-goldLight transition"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-bold text-goldLight mb-6 tracking-wide">
          {signal.symbol} — AI Intelligence Report
        </h2>

        {/* GRID INFO */}
        <div className="grid grid-cols-2 gap-6 mb-8">

          <div>
            <p className="text-gold/60 text-sm uppercase tracking-wide">Direction</p>
            <p className="text-goldLight text-lg font-semibold">
              {signal.direction}
            </p>
          </div>

          <div>
            <p className="text-gold/60 text-sm uppercase tracking-wide">Timeframe</p>
            <p className="text-goldLight text-lg font-semibold">
              {signal.timeframe}
            </p>
          </div>

          <div>
            <p className="text-gold/60 text-sm uppercase tracking-wide">Model Version</p>
            <p className="text-goldLight text-lg font-semibold">
              {signal.ai_model_version}
            </p>
          </div>

          <div>
            <p className="text-gold/60 text-sm uppercase tracking-wide">Created</p>
            <p className="text-goldLight text-lg font-semibold">
              {new Date(signal.created_at).toLocaleString()}
            </p>
          </div>

        </div>

        {/* AI REASONING BLOCK */}
        <div className="bg-blackSoft border border-gold/20 rounded-xl p-6 shadow-gold/20">
          <p className="text-gold/60 text-sm uppercase tracking-wide mb-3">
            AI Reasoning
          </p>
          <p className="text-goldLight leading-relaxed whitespace-pre-line">
            {signal.reasoning}
          </p>
        </div>

      </div>
    </div>
  )
}
