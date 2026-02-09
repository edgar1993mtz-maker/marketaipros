import { TOOLS } from "../../../utils/tools/metadata";
import { TOOL_CATEGORIES } from "../../../utils/tools/categories";
import ToolCard from "../../../components/ToolCard";

export default function ToolsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-tron">AI Tools</h1>
      <p className="mt-2 text-gray-400">Choose a tool to get started.</p>

      {TOOL_CATEGORIES.map((cat) => (
        <section key={cat.id} className="mt-10">
          <h2 className="text-2xl font-semibold text-white">{cat.name}</h2>
          <p className="text-gray-500">{cat.description}</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {TOOLS.filter((t) => t.category === cat.id).map((tool) => (
              <ToolCard key={tool.id} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
