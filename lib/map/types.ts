// lib/map/types.ts

export type MapRegime =
  | "compression"
  | "expansion"
  | "transition"
  | "trend_up"
  | "trend_down";

export type MapStructureSignal = {
  id: string;
  label: string;
  description: string;
  confidence: number; // 0–1
};

export type MapFlowSignal = {
  id: string;
  label: string;
  description: string;
  intensity: "low" | "medium" | "high";
};

export type MapBehaviorSignal = {
  id: string;
  label: string;
  description: string;
};

export type MapPrimeSignal = {
  id: string;
  category: "momentum_leader" | "reversal_watch" | "accumulation_zone";
  symbol: string;
  summary: string;
};

export type MapIntelligenceSnapshot = {
  symbol: string;
  regime: MapRegime;
  structureSignals: MapStructureSignal[];
  flowSignals: MapFlowSignal[];
  behaviorSignals: MapBehaviorSignal[];
  primeSignals: MapPrimeSignal[];
  reasoningChain: string[];
  asOf: string;
};
export type MapScreenerRow = {
  symbol: string;
  regime: MapRegime;
  momentumScore: number;
  flowScore: number;
  structureScore: number;
  tags: string[];
};
export type MapSignal = {
  id: string;
  symbol: string;
  category:
    | "momentum_leader"
    | "reversal_watch"
    | "accumulation_zone"
    | "expansion_regime"
    | "flow_pressure"
    | "structure_confidence";
  score: number;
  summary: string;
};
export type MapDashboardSnapshot = {
  marketRegime: MapRegime;
  volatilityState: "rising" | "falling" | "stable";
  sectorRotation: {
    sector: string;
    weight: "overweight" | "underweight" | "neutral";
  }[];
  etfFlows: {
    symbol: string;
    flow: "inflow" | "outflow";
    intensity: "low" | "medium" | "high";
  }[];
  structureSummary: string[];
  reasoningSummary: string[];
  asOf: string;
};
