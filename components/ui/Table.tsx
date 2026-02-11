interface TableProps {
  headers: string[];
  rows: React.ReactNode[][];
  className?: string;
}

export default function Table({ headers, rows, className = '' }: TableProps) {
  return (
    <div className={`overflow-x-auto rounded-lg border border-slate-700/60 ${className}`}>
      <table className="w-full border-collapse">
        <thead className="bg-slate-800/60">
          <tr className="border-b border-slate-700">
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-amber-400 font-semibold tracking-wide uppercase text-sm"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row, idx) => (
            <tr
              key={idx}
              className={`border-b border-slate-800/40 transition-colors ${
                idx % 2 === 0 ? 'bg-slate-900/20' : 'bg-slate-900/40'
              } hover:bg-slate-700/30`}
            >
              {row.map((cell, cellIdx) => (
                <td key={cellIdx} className="px-4 py-3 text-slate-300 text-sm">
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
