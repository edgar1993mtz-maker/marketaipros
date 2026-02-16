"use client";

import { useEffect, useState } from "react";
import type { MapScreenerRow } from "@/lib/map/types";

export default function ScreenerPage() {
  const [rows, setRows] = useState<MapScreenerRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      const res = await fetch("/api/screener");
      const data = (await res.json()) as MapScreenerRow[];
      setRows(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <div className="min-h-screen px-6 py-10 bg-black text-gold">
      <h1 className="text-3xl font-bold tracking-wide text-gold mb-6">
        MAP Screener — Prime Intelligence
      </h1>

      {loading && <p className="text-gold/70">Loading screener…</p>}

      {!loading && (
        <div className="overflow-x-auto rounded-xl border border-gold/30 bg-black/70">
          <table className="min-w-full text-sm">
            <thead className="bg-blackDeep text-gold/80">
              <tr>
                <th className="px-4 py-3 text-left">Symbol</th>
                <th className="px-4 py-3 text-left">Regime</th>
                <th className="px-4 py-3 text-left">Momentum</th>
                <th className="px-4 py-3 text-left">Flow</th>
                <th className="px-4 py-3 text-left">Structure</th>
                <th className="px-4 py-3 text-left">Tags</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  key={row.symbol}
                  className="border-t border-gold/15 hover:bg-gold/5 transition"
                >
                  <td className="px-4 py-3 font-semibold text-gold">
                    {row.symbol}
                  </td>
                  <td className="px-4 py-3 capitalize text-gold/80">
                    {row.regime.replace("_", " ")}
                  </td>
                  <td className="px-4 py-3 text-cyan-300">
                    {row.momentumScore.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-indigo-300">
                    {row.flowScore.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 text-goldLight">
                    {row.structureScore.toFixed(2)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {row.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 rounded-full text-[10px] uppercase tracking-wide bg-gold/10 border border-gold/40 text-gold/80"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                </tr>
              ))}
              {rows.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-6 text-center text-gold/60"
                  >
                    No results.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
