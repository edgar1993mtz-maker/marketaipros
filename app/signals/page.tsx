"use client";

import { useEffect, useState } from "react";
import type { MapSignal } from "@/lib/map/types";

export default function SignalsPage() {
  const [signals, setSignals] = useState<MapSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/signals");
      const data = (await res.json()) as MapSignal[];
      setSignals(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-black text-gold">
      <h1 className="text-3xl font-bold tracking-wide text-gold mb-6">
        MAP Signals Terminal
      </h1>

      {loading && <p className="text-gold/70">Loading signals…</p>}

      {!loading && (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {signals.map((sig) => (
            <div
              key={sig.id}
              className="rounded-xl bg-black/70 border border-gold/30 p-5 shadow-[0_0_20px_rgba(212,175,55,0.15)]"
            >
              <div className="text-xl font-bold text-gold mb-2">
                {sig.symbol}
              </div>
              <div className="text-sm uppercase tracking-wide text-gold/60 mb-3">
                {sig.category.replace("_", " ")}
              </div>
              <p className="text-gold/80 text-sm mb-3">{sig.summary}</p>
              <div className="text-xs text-gold/50">Score: {sig.score.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
