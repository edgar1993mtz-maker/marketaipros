interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export default function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto ${className}`}>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-slate-600">
            {headers.map((header) => (
              <th key={header} className="px-4 py-3 text-left text-amber-400 font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-b border-slate-700 hover:bg-slate-700/30 transition">
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-slate-300">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
