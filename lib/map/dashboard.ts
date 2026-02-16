// lib/map/dashboard.ts

import type { MapDashboardSnapshot } from "./types";

export async function getMapDashboardSnapshot(): Promise<MapDashboardSnapshot> {
  const now = new Date().toISOString();

  return {
    marketRegime: "expansion",
    volatilityState: "rising",
    sectorRotation: [
      { sector: "Technology", weight: "overweight" },
      { sector: "Energy", weight: "neutral" },
      { sector: "Financials", weight: "underweight" },
    ],
    etfFlows: [
      { symbol: "QQQ", flow: "inflow", intensity: "high" },
      { symbol: "SPY", flow: "inflow", intensity: "medium" },
      { symbol: "IWM", flow: "outflow", intensity: "low" },
    ],
    structureSummary: [
      "Market showing bullish displacement across major indices.",
      "Liquidity sweeps observed in tech leaders.",
      "Strong structural alignment in large caps.",
    ],
    reasoningSummary: [
      "Institutional flows favor growth sectors.",
      "Volatility expansion supports momentum continuation.",
      "Sector rotation indicates risk‑on behavior.",
    ],
    asOf: now,
  };
}
