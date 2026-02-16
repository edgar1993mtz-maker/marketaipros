// lib/map/screener.ts

import { getMapIntelligenceSnapshot } from "./intelligenceEngine";
import type { MapScreenerRow } from "./types";

const UNIVERSE: string[] = ["AAPL", "MSFT", "NVDA", "SPY", "QQQ", "TSLA", "META", "AMZN"];

function scoreMomentum(snapshot: Awaited<ReturnType<typeof getMapIntelligenceSnapshot>>): number {
  const hasMomentumPrime = snapshot.primeSignals.some(
    (s) => s.category === "momentum_leader"
  );
  const expansionBoost = snapshot.regime === "expansion" ? 0.2 : 0;
  return (hasMomentumPrime ? 0.7 : 0.3) + expansionBoost;
}

function scoreFlow(snapshot: Awaited<ReturnType<typeof getMapIntelligenceSnapshot>>): number {
  let score = 0.3;
  snapshot.flowSignals.forEach((f) => {
    if (f.intensity === "high") score += 0.4;
    if (f.intensity === "medium") score += 0.2;
  });
  return Math.min(score, 1);
}

function scoreStructure(snapshot: Awaited<ReturnType<typeof getMapIntelligenceSnapshot>>): number {
  if (!snapshot.structureSignals.length) return 0.3;
  const avg = snapshot.structureSignals.reduce((acc, s) => acc + s.confidence, 0) /
    snapshot.structureSignals.length;
  return avg;
}

export async function getMapScreenerRows(): Promise<MapScreenerRow[]> {
  const snapshots = await Promise.all(
    UNIVERSE.map((symbol) => getMapIntelligenceSnapshot(symbol))
  );

  const rows: MapScreenerRow[] = snapshots.map((snap) => {
    const momentumScore = scoreMomentum(snap);
    const flowScore = scoreFlow(snap);
    const structureScore = scoreStructure(snap);

    const tags: string[] = [];
    if (momentumScore > 0.75) tags.push("Momentum Leader");
    if (flowScore > 0.7) tags.push("Strong Flows");
    if (structureScore > 0.75) tags.push("Clean Structure");
    if (snap.regime === "expansion") tags.push("Expansion Regime");

    return {
      symbol: snap.symbol,
      regime: snap.regime,
      momentumScore: Number(momentumScore.toFixed(2)),
      flowScore: Number(flowScore.toFixed(2)),
      structureScore: Number(structureScore.toFixed(2)),
      tags,
    };
  });

  // Rank by momentum first, then flow, then structure
  return rows.sort((a, b) => {
    if (b.momentumScore !== a.momentumScore) {
      return b.momentumScore - a.momentumScore;
    }
    if (b.flowScore !== a.flowScore) {
      return b.flowScore - a.flowScore;
    }
    return b.structureScore - a.structureScore;
  });
}
