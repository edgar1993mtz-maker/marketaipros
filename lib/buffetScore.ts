export interface ScoreInput {
  value: number;
  quality: number;
  cashflow: number;
  safety: number;
  momentum: number;
  sector: number;
}

export function calculateBuffettScore(s: ScoreInput): number {
  return (
    s.value * 0.25 +
    s.quality * 0.25 +
    s.cashflow * 0.2 +
    s.safety * 0.15 +
    s.momentum * 0.1 +
    s.sector * 0.05
  );
}
