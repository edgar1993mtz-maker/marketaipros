import { run_forex_pipeline } from "@/services/engine/pipelines/forex_pipeline";
import { buildFxSummary } from "@/services/engine/builders/fx_summary";

export async function getFxDashboardSnapshot() {
  const fx = await run_forex_pipeline();

  return {
    updated_at: new Date().toISOString(),
    fx_dashboard: {
      summary: buildFxSummary(fx.trend, fx.volatility, fx.strength),
      trend: fx.trend,
      volatility: fx.volatility,
      strength_matrix: fx.strength,
    },
  };
}
