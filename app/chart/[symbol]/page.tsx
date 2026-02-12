"use client"

import { useEffect, useRef, useState } from "react"
import { useParams } from "next/navigation"
import { createChart, ColorType } from "lightweight-charts"
import { SMA, EMA } from "@/lib/indicators"

const TIMEFRAMES = ["5m", "15m", "1H", "4H", "1D", "1W"]

export default function ChartPage() {
  const { symbol } = useParams()
  const chartContainerRef = useRef<HTMLDivElement | null>(null)
  const tooltipRef = useRef<HTMLDivElement | null>(null)
  const chartRef = useRef<any>(null)

  const [candles, setCandles] = useState<any[]>([])
  const [tf, setTf] = useState("1D")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [company, setCompany] = useState<string>("")
  const [autoFit, setAutoFit] = useState<boolean>(true)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  // ⭐ Load theme from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("theme") || "dark"
    if (saved === "light") {
      document.documentElement.classList.remove("dark")
    } else {
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleTheme = () => {
    const html = document.documentElement
    const isDark = html.classList.contains("dark")

    if (isDark) {
      html.classList.remove("dark")
      localStorage.setItem("theme", "light")
    } else {
      html.classList.add("dark")
      localStorage.setItem("theme", "dark")
    }
  }

  // ⭐ Load auto-fit preference
  useEffect(() => {
    const saved = localStorage.getItem("autoFit")
    if (saved !== null) setAutoFit(saved === "true")
  }, [])

  const toggleAutoFit = () => {
    const newVal = !autoFit
    setAutoFit(newVal)
    localStorage.setItem("autoFit", String(newVal))
  }

  // ⭐ Fetch company name
  useEffect(() => {
    const loadCompany = async () => {
      try {
        const res = await fetch(`/api/profile/${symbol}`)
        if (!res.ok) return
        const json = await res.json()
        setCompany(json.name || "")
      } catch {}
    }
    loadCompany()
  }, [symbol])

  // ⭐ Fetch candles
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await fetch(`/api/prices/${symbol}?tf=${tf}`)
        if (!res.ok) throw new Error(`Failed to load data (${res.status})`)

        const json = await res.json()
        if (!json.candles || json.candles.length === 0)
          throw new Error("No data available for this symbol/timeframe.")

        setCandles(json.candles)
      } catch (err: any) {
        setError(err.message || "Unable to load chart data.")
        setCandles([])
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [symbol, tf])

  // ⭐ Render chart
  useEffect(() => {
    if (!chartContainerRef.current || candles.length === 0) return

    const isDark = document.documentElement.classList.contains("dark")

    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 650,
      layout: {
        background: {
          type: ColorType.Solid,
          color: isDark ? "#0A0A0A" : "#FFFFFF",
        },
        textColor: isDark ? "#D4AF37" : "#333",
      },
      grid: {
        vertLines: { color: isDark ? "rgba(212,175,55,0.1)" : "rgba(0,0,0,0.1)" },
        horzLines: { color: isDark ? "rgba(212,175,55,0.1)" : "rgba(0,0,0,0.1)" },
      },
      timeScale: {
        borderColor: isDark ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.2)",
      },
      rightPriceScale: {
        borderColor: isDark ? "rgba(212,175,55,0.2)" : "rgba(0,0,0,0.2)",
      },
      crosshair: { mode: 1 },
    })

    chartRef.current = chart

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#00C46A",
      downColor: "#FF4D4D",
      borderUpColor: "#00C46A",
      borderDownColor: "#FF4D4D",
      wickUpColor: "#00C46A",
      wickDownColor: "#FF4D4D",
    })
    candleSeries.setData(candles)

    const volumeSeries = chart.addHistogramSeries({
      priceFormat: { type: "volume" },
      priceScaleId: "",
      scaleMargins: { top: 0.8, bottom: 0 },
    })
    volumeSeries.setData(
      candles.map(c => ({
        time: c.time,
        value: c.volume || 0,
        color: c.close >= c.open ? "rgba(0,196,106,0.6)" : "rgba(255,77,77,0.6)",
      }))
    )

    const sma20 = SMA(candles, 20)
    const ema50 = EMA(candles, 50)

    chart.addLineSeries({ color: "#D4AF37", lineWidth: 2 }).setData(sma20)
    chart.addLineSeries({ color: "#00A8FF", lineWidth: 2 }).setData(ema50)

    if (autoFit) chart.timeScale().fitContent()

    const tooltip = tooltipRef.current
    if (tooltip) tooltip.style.display = "none"

    chart.subscribeCrosshairMove(param => {
      if (!tooltip || !param.time || !param.seriesData) {
        if (tooltip) tooltip.style.display = "none"
        return
      }

      const data = param.seriesData.get(candleSeries)
      if (!data) return

      tooltip.style.display = "block"
      tooltip.style.left = param.point?.x + 20 + "px"
      tooltip.style.top = param.point?.y + 20 + "px"

      tooltip.innerHTML = `
        <div class="text-goldLight font-semibold">${symbol}</div>
        <div class="text-gold/70 text-sm">O: ${data.open.toFixed(2)}</div>
        <div class="text-gold/70 text-sm">H: ${data.high.toFixed(2)}</div>
        <div class="text-gold/70 text-sm">L: ${data.low.toFixed(2)}</div>
        <div class="text-gold/70 text-sm">C: ${data.close.toFixed(2)}</div>
      `
    })

    const handleResize = () => {
      if (chartContainerRef.current) {
        chart.applyOptions({ width: chartContainerRef.current.clientWidth })
      }
    }

    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
      chart.remove()
    }
  }, [candles, autoFit])

  // ⭐ Reset Zoom
  const resetZoom = () => {
    if (chartRef.current) {
      chartRef.current.timeScale().fitContent()
    }
  }

  // ⭐ Screenshot: Download PNG
  const downloadPng = () => {
    if (!chartRef.current) return
    chartRef.current.takeScreenshot().then((blob: Blob) => {
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `${symbol}-${tf}.png`
      a.click()
      URL.revokeObjectURL(url)
    })
  }

  // ⭐ Screenshot: Copy to Clipboard
  const copyPng = () => {
    if (!chartRef.current) return
    chartRef.current.takeScreenshot().then((blob: Blob) => {
      navigator.clipboard.write([
        new ClipboardItem({ "image/png": blob })
      ])
    })
  }

  // ⭐ Header values
  const last = candles[candles.length - 1]
  const prev = candles[candles.length - 2]
  const lastPrice = last?.close ?? null
  const prevPrice = prev?.close ?? null
  const change = lastPrice && prevPrice ? lastPrice - prevPrice : 0
  const pct = prevPrice ? (change / prevPrice) * 100 : 0
  const isUp = change >= 0

  return (
    <div className="min-h-screen bg-blackSoft dark:bg-black text-gold dark:text-gold p-10 relative">

      {/* ⭐ HEADER */}
      <div className="flex items-end gap-4 mb-6">
        <div>
          <h1 className="text-4xl font-bold text-goldLight">{symbol}</h1>
          {company && (
            <div className="text-gold/70 text-sm mt-1">{company}</div>
          )}
        </div>

        {lastPrice && (
          <div className="text-2xl font-semibold">{lastPrice.toFixed(2)}</div>
        )}

        {lastPrice && (
          <div
            className={`text-lg font-semibold ${
              isUp ? "text-green-400" : "text-red-400"
            }`}
          >
            {isUp ? "+" : ""}
            {change.toFixed(2)} ({pct.toFixed(2)}%)
          </div>
        )}

        {/* ⭐ TRADINGVIEW TOOLBAR */}
        <div className="ml-auto flex items-center gap-3">

          {/* Reset Zoom */}
          <button
            onClick={resetZoom}
            className="px-3 py-1 text-sm border border-gold/30 rounded-lg hover:border-gold/60"
          >
            🔄
          </button>

          {/* Screenshot Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="px-3 py-1 text-sm border border-gold/30 rounded-lg hover:border-gold/60"
            >
              📸 ▼
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-blackDeep border border-gold/30 rounded-lg shadow-lg p-2 text-sm z-50">
                <button
                  onClick={downloadPng}
                  className="block w-full text-left px-3 py-1 hover:bg-gold/10 rounded"
                >
                  Download PNG
                </button>
                <button
                  onClick={copyPng}
                  className="block w-full text-left px-3 py-1 hover:bg-gold/10 rounded"
                >
                  Copy to Clipboard
                </button>
                <button
                  onClick={toggleAutoFit}
                  className="block w-full text-left px-3 py-1 hover:bg-gold/10 rounded"
                >
                  Auto‑Fit: {autoFit ? "ON" : "OFF"}
                </button>
              </div>
            )}
          </div>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="px-3 py-1 text-sm border border-gold/30 rounded-lg hover:border-gold/60"
          >
            {document.documentElement.classList.contains("dark") ? "🌙" : "☀️"}
          </button>
        </div>
      </div>

      {/* ⭐ TIMEFRAMES */}
      <div className="flex gap-3 mb-4">
        {TIMEFRAMES.map(t => (
          <button
            key={t}
            onClick={() => setTf(t)}
            className={`
              px-4 py-2 rounded-lg text-sm font-semibold border
              ${
                tf === t
                  ? "bg-gold text-black border-gold"
                  : "bg-blackDeep text-goldLight border-gold/20 hover:border-gold/40"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* ⭐ INDICATOR LABELS */}
      <div className="flex gap-6 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#D4AF37]" />
          <span className="text-goldLight text-sm">SMA‑20</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 rounded bg-[#00A8FF]" />
          <span className="text-goldLight text-sm">EMA‑50</span>
        </div>
      </div>

      {/* ⭐ LOADING / ERROR */}
      {loading && (
        <div className="mb-4 px-4 py-3 rounded-lg border border-gold/30 bg-blackDeep text-goldLight text-sm">
          Loading chart data…
        </div>
      )}

      {error && !loading && (
        <div className="mb-4 px-4 py-3 rounded-lg border border-red-500/60 bg-blackDeep text-red-300 text-sm">
          {error}
        </div>
      )}

      {/* ⭐ CHART */}
      <div
        ref={chartContainerRef}
        className="bg-blackDeep dark:bg-black border border-gold/20 rounded-xl shadow-gold h-[650px]"
      />

      {/* ⭐ TOOLTIP */}
      <div
        ref={tooltipRef}
        className="absolute pointer-events-none p-3 rounded-lg bg-blackDeep border border-gold/30 shadow-gold text-goldLight text-sm"
      />
    </div>
  )
}
