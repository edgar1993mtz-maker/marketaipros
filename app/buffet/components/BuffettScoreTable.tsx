"use client";

import { useEffect, useState } from "react";

interface BuffettRow {
  ticker: string;
  score: number;
  category: string;
}

export default function BuffettScoreTable() {
  const [rows, setRows] = useState<BuffettRow[]>([]);

  useEffect(() => {
    fetch("/buffet/data/buffet-50.json")
      .then((res) => res.json())
      .then((json) => setRows(json));
  }, []);

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-gray-700">
          <th className="p-3 text-left">Ticker</th>
          <th className="p-3 text-left">Score</th>
          <th className="p-3 text-left">Category</th>
        </tr>
      </thead>

      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className="border-b border-gray-800">
            <td className="p-3">{row.ticker}</td>
            <td className="p-3">{row.score}</td>
            <td className="p-3">{row.category}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
