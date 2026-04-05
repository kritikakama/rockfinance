import type { Insight } from "../../utils/insights";
import InsightCard from "./InsightCard";

const InsightsSection = ({ insights }: { insights: Insight[] }) => {
  if (insights.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <p className="text-4xl mb-3">🔍</p>
        <p className="font-semibold text-gray-500">No insights yet</p>
        <p className="text-sm text-gray-400 mt-1">
          Add some transactions to get started
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {insights.map((insight) => (
        <InsightCard key={insight.id} insight={insight} />
      ))}
    </div>
  );
};

export default InsightsSection;
