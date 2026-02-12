import { Signal } from "@/types/signal"

export default function SignalRow({
  signal,
  onClick,
}: {
  signal: Signal
  onClick: () => void
}) {
  const statusStyles: Record<string, string> = {
    ACTIVE: "text-goldLight",
    TP_HIT: "text-green-400",
    SL_HIT: "text-red-400",
    EXPIRED: "text-gold/40",
  }

  return (
    <tr
      onClick={onClick}
      className="text-center text-gold hover:bg-gold/5 transition cursor-pointer"
    >
      <td className="p-3 font-bold text-goldLight text-left">
        {signal.symbol}
      </td>

      <td className="p-3">
        <span
          className={
            signal.direction === "LONG"
              ? "text-green-400 font-semibold"
              : "text-red-400 font-semibold"
          }
        >
          {signal.direction}
        </span>
      </td>

      <td className="p-3">{signal.entry_price}</td>
      <td className="p-3">{signal.stop_loss}</td>
      <td className="p-3">{signal.take_profit}</td>
      <td className="p-3">{signal.rr_ratio}</td>

      <td className="p-3">
        <div className="w-24 bg-blackDeep border border-gold/20 rounded h-2 overflow-hidden">
          <div
            className="bg-gold h-full"
            style={{ width: `${signal.confidence_score}%` }}
          />
        </div>
      </td>

      <td className="p-3">{signal.risk_score}</td>

      <td className={`p-3 font-semibold ${statusStyles[signal.status]}`}>
        {signal.status}
      </td>

      <td className="p-3">
        {signal.pnl_percent !== null ? (
          <span
            className={
              signal.pnl_percent > 0
                ? "text-green-400"
                : signal.pnl_percent < 0
                ? "text-red-400"
                : "text-gold/60"
            }
          >
            {signal.pnl_percent}%
          </span>
        ) : (
          <span className="text-gold/40">-</span>
        )}
      </td>
    </tr>
  )
}
