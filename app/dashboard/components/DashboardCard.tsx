"use client";

import { useEffect, useState } from "react";

interface Props {
  title: string;
  file: string;
}

export default function DashboardCard({ title, file }: Props) {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    fetch(`/dashboard/data/${file}`)
      .then((res) => res.json())
      .then((json) => setData(json));
  }, [file]);

  return (
    <div className="border border-gray-800 rounded-xl p-6 bg-black/40 backdrop-blur">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>

      {!data && <p className="text-gray-500">Loading...</p>}

      {data && (
        <pre className="text-xs text-green-400 overflow-auto">
          {JSON.stringify(data, null, 2)}
        </pre>
      )}
    </div>
  );
}
