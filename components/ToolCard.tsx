import React from "react";

export default function ToolCard({ tool }: { tool: any }) {
  return (
    <div className="p-6 bg-black border border-tron rounded-lg hover:border-white transition">
      <h3 className="text-xl font-bold text-tron">{tool.name}</h3>
      <p className="text-gray-400 mt-2">{tool.description}</p>

      <button className="mt-4 px-4 py-2 bg-tron text-black font-bold rounded">
        Open Tool
      </button>
    </div>
  );
}
