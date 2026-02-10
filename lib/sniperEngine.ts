export interface SniperParams {
  sweep: number;
  displacement: number;
  origin: number;
}

export function sniperEntry(p: SniperParams) {
  return {
    entry: p.origin,
    sl: p.origin - p.displacement * 0.6,
    tp1: p.origin + p.displacement * 0.8,
    tp2: p.origin + p.displacement * 1.4,
    tp3: p.origin + p.displacement * 2.0,
  };
}
