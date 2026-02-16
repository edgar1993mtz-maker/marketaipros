"use client";

import { useEffect, useState } from "react";

export default function FxDashboard() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000/ws/forex");

    ws.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setData(payload);
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => ws.close();
  }, []);

  if (!data) {
    return (
      <div className="text-center text-neutral-400 mt-20 text-2xl">
        Connecting to live FX engine…
      </div>
    );
  }

  return (
    <div className="p-12 space-y-16">

      {/* ---------------------- */}
      {/* REGIME STRIP */}
      {/* ---------------------- */}
      <div className="flex gap-6 mb-10">

        {/* USD REGIME */}
        <div className="px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900">
          <div className="text-neutral-400 text-sm">USD Regime</div>
          <div
            className={`mt-1 text-xl font-bold ${
              data.usd_index.regime === "STRONG"
                ? "text-emerald-400"
                : data.usd_index.regime === "WEAK"
                ? "text-red-400"
                : "text-yellow-300"
            }`}
          >
            {data.usd_index.regime} · {Math.round(data.usd_index.value)}
          </div>
        </div>

        {/* LATAM RISK */}
        <div className="px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900">
          <div className="text-neutral-400 text-sm">LATAM Risk</div>
          <div
            className={`mt-1 text-xl font-bold ${
              data.latam_risk.regime === "STRESSED"
                ? "text-red-400"
                : data.latam_risk.regime === "ELEVATED"
                ? "text-yellow-300"
                : "text-emerald-400"
            }`}
          >
            {data.latam_risk.regime} · {Math.round(data.latam_risk.value)}
          </div>
        </div>

        {/* GLOBAL VOLATILITY */}
        <div className="px-6 py-3 rounded-xl border border-neutral-700 bg-neutral-900">
          <div className="text-neutral-400 text-sm">Volatility Regime</div>
          <div
            className={`mt-1 text-xl font-bold ${
              Object.values(data.vol_regimes).some((v: any) => v.regime === "HIGH")
                ? "text-red-400"
                : Object.values(data.vol_regimes).some((v: any) => v.regime === "LOW")
                ? "text-emerald-400"
                : "text-yellow-300"
            }`}
          >
            {
              Object.values(data.vol_regimes).some((v: any) => v.regime === "HIGH")
                ? "HIGH"
                : Object.values(data.vol_regimes).some((v: any) => v.regime === "LOW")
                ? "LOW"
                : "NORMAL"
            }
          </div>
        </div>

      </div>
      {/* ---------------------- */}
{/* AI EXPLANATION PANEL */}
{/* ---------------------- */}
<div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700 space-y-4">
  <h2 className="text-3xl font-bold text-yellow-300">AI Market Explanation</h2>

{/* ---------------------- */}
{/* PAIR-BY-PAIR AI EXPLANATION */}
{/* ---------------------- */}
<div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
  <h2 className="text-3xl font-bold mb-6 text-yellow-300">Pair‑by‑Pair AI Analysis</h2>

  <div className="space-y-6">
    {Object.entries(data.pair_explanations).map(([pair, explanation]: any) => (
      <div key={pair} className="p-4 bg-neutral-800 rounded-lg border border-neutral-700">
        <div className="text-xl font-bold text-neutral-200">{pair}</div>
        <div className="text-neutral-400 text-lg mt-2">{explanation}</div>
      </div>
    ))}
  </div>
</div>
{/* ---------------------- */}
{/* MAP TRADE IDEAS */}
{/* ---------------------- */}
<div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
  <h2 className="text-3xl font-bold mb-6 text-emerald-400">MAP Trade Ideas</h2>

  {data.trade_ideas.length === 0 && (
    <div className="text-neutral-400 text-lg">
      No actionable trade ideas at the moment. Market conditions may be mixed or neutral.
    </div>
  )}

  <div className="space-y-6">
    {data.trade_ideas.map((idea: any, idx: number) => (
      <div
        key={idx}
        className="p-4 bg-neutral-800 rounded-lg border border-neutral-700"
      >
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold text-neutral-200">{idea.pair}</div>
          <div
            className={`text-2xl font-bold ${
              idea.direction === "BUY" ? "text-green-400" : "text-red-400"
            }`}
          >
            {idea.direction}
          </div>
        </div>

        <div className="text-neutral-400 text-lg mt-3">
          {idea.explanation}
        </div>
      </div>
    ))}
  </div>
</div>

  {/* USD EXPLANATION */}
  <div>
    <h3 className="text-xl font-semibold text-neutral-300">USD Outlook</h3>
    <p className="text-neutral-400 text-lg mt-1">
      {data.usd_index.regime === "STRONG" &&
        "The USD is currently strong, supported by broad risk aversion and favorable macro flows. This environment typically pressures high-beta currencies and favors USD‑based long setups."}

      {data.usd_index.regime === "WEAK" &&
        "The USD is weakening, suggesting improving global risk sentiment or softer macro conditions in the US. This environment tends to support risk‑on currencies and weaken USD‑based long setups."}

      {data.usd_index.regime === "MIXED" &&
        "USD conditions are mixed, with no clear directional dominance. Market participants may be waiting for catalysts, leading to choppy price action across major pairs."}
    </p>
  </div>

  {/* LATAM EXPLANATION */}
  <div>
    <h3 className="text-xl font-semibold text-neutral-300">LATAM Risk</h3>
    <p className="text-neutral-400 text-lg mt-1">
      {data.latam_risk.regime === "STRESSED" &&
        "LATAM markets are under stress, reflected in elevated volatility and USD appreciation against MXN and BRL. This typically signals regional risk aversion and defensive positioning."}

      {data.latam_risk.regime === "ELEVATED" &&
        "LATAM risk is elevated, with moderate volatility and mixed flows. Conditions are unstable but not fully stressed, requiring selective positioning."}

      {data.latam_risk.regime === "CALM" &&
        "LATAM markets are calm, with stable volatility and balanced flows. This environment supports carry trades and risk‑on positioning in MXN and BRL."}
    </p>
  </div>

  {/* VOLATILITY EXPLANATION */}
  <div>
    <h3 className="text-xl font-semibold text-neutral-300">Volatility Conditions</h3>
    <p className="text-neutral-400 text-lg mt-1">
      {Object.values(data.vol_regimes).some((v: any) => v.regime === "HIGH") &&
        "Market volatility is elevated across several FX pairs, increasing risk and widening ranges. High‑volatility environments favor momentum strategies but require tighter risk controls."}

      {!Object.values(data.vol_regimes).some((v: any) => v.regime === "HIGH") &&
        Object.values(data.vol_regimes).some((v: any) => v.regime === "LOW") &&
        "Volatility is low across most FX pairs, indicating stable conditions. Low‑volatility environments favor mean‑reversion strategies and reduce breakout reliability."}

      {!Object.values(data.vol_regimes).some((v: any) => v.regime === "HIGH") &&
        !Object.values(data.vol_regimes).some((v: any) => v.regime === "LOW") &&
        "Volatility is normal across the FX board, suggesting balanced market conditions. Trend and range strategies both perform reliably in this environment."}
    </p>
  </div>

  {/* SIGNAL SUMMARY */}
  <div>
    <h3 className="text-xl font-semibold text-neutral-300">Signal Overview</h3>
    <p className="text-neutral-400 text-lg mt-1">
      The engine currently identifies{" "}
      <span className="text-yellow-300 font-semibold">
        {data.intelligence_summary.buy_signals.length} buy
      </span>{" "}
      and{" "}
      <span className="text-yellow-300 font-semibold">
        {data.intelligence_summary.sell_signals.length} sell
      </span>{" "}
      opportunities across the FX universe. These signals reflect the combined
      influence of trend, volatility, and strength differentials.
    </p>
  </div>
</div>


      {/* ---------------------- */}
      {/* INTELLIGENCE SUMMARY */}
      {/* ---------------------- */}
      <div>
        <h1 className="text-4xl font-bold mb-6">MAP Intelligence Summary</h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
            <div className="text-neutral-400 text-lg">Strongest Currency</div>
            <div className="text-4xl font-bold mt-2">
              {data.intelligence_summary.strongest_currency}
            </div>
          </div>

          <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700">
            <div className="text-neutral-400 text-lg">Weakest Currency</div>
            <div className="text-4xl font-bold mt-2">
              {data.intelligence_summary.weakest_currency}
            </div>
          </div>

          <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700 col-span-2">
            <div className="text-neutral-400 text-lg">Buy Signals</div>
            <div className="text-xl mt-2">
              {data.intelligence_summary.buy_signals.join(", ")}
            </div>
          </div>

          <div className="p-6 bg-neutral-900 rounded-xl border border-neutral-700 col-span-2">
            <div className="text-neutral-400 text-lg">Sell Signals</div>
            <div className="text-xl mt-2">
              {data.intelligence_summary.sell_signals.join(", ")}
            </div>
          </div>
        </div>
      </div>

      {/* ---------------------- */}
      {/* FX HEATMAP */}
      {/* ---------------------- */}
      <div>
        <h2 className="text-3xl font-bold mb-6">FX Strength Heatmap</h2>

        <div className="grid grid-cols-4 gap-6">
          {Object.entries(data.fx_heatmap).map(([currency, score]) => (
            <div
              key={currency}
              className="p-6 bg-neutral-900 rounded-xl border border-neutral-700"
            >
              <div className="text-neutral-400 text-lg">{currency}</div>
              <div className="text-3xl font-bold mt-2">{score}</div>

              <div
                className="h-3 rounded mt-3"
                style={{
                  background: `linear-gradient(90deg, #ff0000 ${score}%, #00ff00 ${score}%)`,
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* ---------------------- */}
      {/* SIGNAL BOARD */}
      {/* ---------------------- */}
      <div>
        <h2 className="text-3xl font-bold mb-6">FX Signal Board</h2>

        <table className="w-full text-left border-collapse text-lg">
          <thead>
            <tr className="border-b border-neutral-700 text-neutral-400 text-xl">
              <th className="p-4">Pair</th>
              <th className="p-4">Trend</th>
              <th className="p-4">Volatility</th>
              <th className="p-4">Vol Regime</th>
              <th className="p-4">Strength Diff</th>
              <th className="p-4">Signal</th>
            </tr>
          </thead>

          <tbody>
            {Object.entries(data.signals).map(([pair, info]: any) => (
              <tr key={pair} className="border-b border-neutral-800">
                <td className="p-4 font-semibold text-xl">{pair}</td>
                <td className="p-4">{info.trend}</td>
                <td className="p-4">{info.volatility}</td>

                {/* VOL REGIME */}
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      data.vol_regimes[pair].regime === "HIGH"
                        ? "bg-red-900/40 text-red-300 border border-red-500/60"
                        : data.vol_regimes[pair].regime === "LOW"
                        ? "bg-emerald-900/40 text-emerald-300 border border-emerald-500/60"
                        : "bg-yellow-900/40 text-yellow-300 border border-yellow-500/60"
                    }`}
                  >
                    {data.vol_regimes[pair].regime}
                  </span>
                </td>

                <td className="p-4">{info.strength_diff}</td>

                <td
                  className={`p-4 font-bold text-xl ${
                    info.signal === "BUY"
                      ? "text-green-400"
                      : info.signal === "SELL"
                      ? "text-red-400"
                      : "text-neutral-300"
                  }`}
                >
                  {info.signal}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
