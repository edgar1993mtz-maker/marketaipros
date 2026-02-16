// lib/map/signals.ts

import { getMapIntelligenceSnapshot } from "./intelligenceEngine";
import type { MapSignal } from "./types";

const UNIVERSE = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN", "META", "SPY", "QQQ"];

export async function getMapSignals(): Promise<MapSignal[]> {
  const snapshots = await Promise.all(
    UNIVERSE.map((symbol) => getMapIntelligenceSnapshot(symbol))
  );

  const signals: MapSignal[] = [];

  for (const snap of snapshots) {
    // Momentum Leader
    if (snap.primeSignals.some((s) => s.category === "momentum_leader")) {
      signals.push({
        id: `momentum-${snap.symbol}`,
        symbol: snap.symbol,
        category: "momentum_leader",
        score: 0.8,
        summary: "High‑velocity upside continuation candidate.",
      });
    }

    // Reversal Watch
    if (snap.primeSignals.some((s) => s.category === "reversal_watch")) {
      signals.push({
        id: `reversal-${snap.symbol}`,
        symbol: snap.symbol,
        category: "reversal_watch",
        score: 0.7,
        summary: "Liquidity sweep detected — possible structural reversal.",
      });
    }

    // Accumulation Zone
    if (snap.primeSignals.some((s) => s.category === "accumulation_zone")) {
      signals.push({
        id: `accum-${snap.symbol}`,
        symbol: snap.symbol,
        category: "accumulation_zone",
        score: 0.75,
        summary: "Institutional accumulation pressure rising.",
      });
    }

    // Expansion Regime
    if (snap.regime === "expansion") {
      signals.push({
        id: `expansion-${snap.symbol}`,
        symbol: snap.symbol,
        category: "expansion_regime",
        score: 0.65,
        summary: "Aligned with expansion regime conditions.",
      });
    }

    // Flow Pressure
    if (snap.flowSignals.some((f) => f.intensity === "high")) {
      signals.push({
        id: `flow-${snap.symbol}`,
        symbol: snap.symbol,
        category: "flow_pressure",
        score: 0.85,
        summary: "Strong ETF and sector inflow pressure.",
      });
    }

    // Structure Confidence
    const avgStructure =
      snap.structureSignals.reduce((acc, s) => acc + s.confidence, 0) /
      snap.structureSignals.length;

    if (avgStructure > 0.75) {
      signals.push({
        id: `structure-${snap.symbol}`,
        symbol: snap.symbol,
        category: "structure_confidence",
        score: avgStructure,
        summary: "High‑confidence structural alignment.",
      });
    }
  }

  return signals.sort((a, b) => b.score - a.score);
}
