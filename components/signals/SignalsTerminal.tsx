"use client"

import { useEffect, useState } from "react"
import { Signal } from "@/types/signal"
import SignalsFilters from "./SignalsFilters"
import SignalsStatsBar from "./SignalsStatsBar"
import SignalsTable from "./SignalsTable"
import SignalSidePanel from "./SignalSidePanel"   // ⭐ NEW PANEL

export default function SignalsTerminal() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  const [filters, setFilters] = useState({
    timeframe: "",
    direction: "",
    status: "",
  })

// ⭐ SORTING STATE
const [sortBy, setSortBy] = useState<string>("")
const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc")

  // ⭐ PANEL STATE
  const [selectedSignal, setSelectedSignal] = useState<Signal | null>(null)

  const fetchSignals = async () => {
    setLoading(true)

    const query = new URLSearchParams(filters).toString()
    const res = await fetch(`/api/signals/list?${query}`)
    const json = await res.json()

    setSignals(json.data || [])
    setLoading(false)
  }

  useEffect(() => {
    fetchSignals()
  }, [filters])

  // ⭐ SORT SIGNALS BEFORE RENDERING
const sortedSignals = [...signals].sort((a, b) => {
  if (!sortBy) return 0

  const valA = a[sortBy as keyof Signal]
  const valB = b[sortBy as keyof Signal]

  if (valA < valB) return sortDirection === "asc" ? -1 : 1
  if (valA > valB) return sortDirection === "asc" ? 1 : -1
  return 0
})

  return (
    <div className="min-h-screen bg-blackSoft text-gold flex">

      {/* SIDEBAR */}
      <SignalsFilters filters={filters} setFilters={setFilters} />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-10 space-y-10">

        <h1 className="text-3xl font-bold tracking-wide text-goldLight">
          MarketAIPros Intelligence Terminal
        </h1>

        {/* STATS BAR */}
        <div className="rounded-xl bg-blackDeep border border-gold/20 p-6 shadow-gold">
          <SignalsStatsBar signals={signals} />
        </div>

        {/* TABLE */}
        <div className="rounded-xl bg-blackDeep border border-gold/20 p-6 shadow-gold">
          {loading ? (
            <p className="text-gold/60">Loading intelligence...</p>
          ) : (
      <SignalsTable
  signals={sortedSignals}
  onRowClick={setSelectedSignal}
  sortBy={sortBy}
  sortDirection={sortDirection}
  setSortBy={setSortBy}
  setSortDirection={setSortDirection}
/>
          )}
        </div>
      </div>

      {/* ⭐ RIGHT-SIDE PANEL (REPLACES MODAL) */}
      <SignalSidePanel
        signal={selectedSignal}
        onClose={() => setSelectedSignal(null)}
      />
    </div>
  )
}
