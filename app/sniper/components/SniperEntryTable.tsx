"use client";

import { useEffect, useState } from "react";

interface SniperEntry {
  ticker: string;
  entry: number;
  sl: number;
  tp1: number;
  tp2: number;
  tp3: number;
}

export default function SniperEntryTable() {
  const [entries, setEntries] = useState<SniperEntry[]>([]);

  useEffect(() => {
    fetch("/sniper/data/sniper-top5.json")
      .then((res) => res.json())
      .then((json) => setEntries(json));
  }, []);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="p-3 text-left">Ticker</th>
          <th className="p-3 text-left">Entry</th>
          <th className="p-3 text-left">SL</th>
          <th className="p-3 text-left">TP1</th>
          <th className="p-3 text-left">TP2</th>
          <th className="p-3 text-left">TP3</th>
        </tr>
      </thead>

      <tbody>
        {entries.map((e, i) => (
          <tr key={i} className="border-b border-gray-800">
            <td className="p-3">{e.ticker}</td>
            <td className="p-3">{e.entry}</td>
            <td className="p-3">{e.sl}</td>
            <td className="p-3">{e.tp1}</td>
            <td className="p-3">{e.tp2}</td>
            <td className="p-3">{e.tp3}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
