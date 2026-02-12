import { Signal } from "@/types/signal"
import SignalRow from "./SignalRow"

export default function SignalsTable({
  signals,
  onRowClick,
  sortBy,
  sortDirection,
  setSortBy,
  setSortDirection
}: {
  signals: Signal[]
  onRowClick: (signal: Signal) => void
  sortBy: string
  sortDirection: "asc" | "desc"
  setSortBy: (col: string) => void
  setSortDirection: (dir: "asc" | "desc") => void
}) {

  // ⭐ SORT HANDLER
  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortBy(column)
      setSortDirection("asc")
    }
  }

  // ⭐ SORT ARROW
  const arrow = (column: string) => {
    if (sortBy !== column) return null
    return (
      <span className="ml-1 text-goldLight">
        {sortDirection === "asc" ? "▲" : "▼"}
      </span>
    )
  }

  return (
    <div className="overflow-x-auto max-h-[70vh]">
      <table className="w-full border border-gold/20 rounded-xl overflow-hidden">

        {/* HEADER — NOW STICKY */}
        <thead className="bg-blackDeep border-b border-gold/20 sticky top-0 z-20 shadow-gold/10">
          <tr className="text-goldLight text-sm uppercase tracking-wide">

            <th
              className="p-3 text-left cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("symbol")}
            >
              Symbol {arrow("symbol")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("direction")}
            >
              Dir {arrow("direction")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("entry_price")}
            >
              Entry {arrow("entry_price")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("stop_loss")}
            >
              SL {arrow("stop_loss")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("take_profit")}
            >
              TP {arrow("take_profit")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("rr_ratio")}
            >
              R:R {arrow("rr_ratio")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("confidence_score")}
            >
              Confidence {arrow("confidence_score")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("risk_score")}
            >
              Risk {arrow("risk_score")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("status")}
            >
              Status {arrow("status")}
            </th>

            <th
              className="p-3 text-center cursor-pointer hover:text-gold transition"
              onClick={() => handleSort("pnl_percent")}
            >
              PnL {arrow("pnl_percent")}
            </th>

          </tr>
        </thead>

        {/* BODY */}
        <tbody className="bg-blackSoft divide-y divide-gold/10">
          {signals.map(signal => (
            <SignalRow
              key={signal.id}
              signal={signal}
              onClick={() => onRowClick(signal)}
            />
          ))}
        </tbody>

      </table>
    </div>
  )
}
