import type { Insight } from "../../utils/insights";

const colorMap = {
  positive:
    "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-950/40",
  negative: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/40",
  neutral:
    "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40",
};

const badgeMap = {
  positive: "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300",
  negative: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300",
  neutral: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300",
};

const labelMap = {
  positive: "Good news",
  negative: "Heads up",
  neutral: "Info",
};

const InsightCard = ({ insight }: { insight: Insight }) => {
  return (
    <div className={`rounded-2xl border p-5 ${colorMap[insight.type]}`}>
      <div className="flex items-start justify-between mb-3">
        <span className="text-3xl">{insight.emoji}</span>
        <span
          className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badgeMap[insight.type]}`}
        >
          {labelMap[insight.type]}
        </span>
      </div>
      <h3 className="font-bold text-gray-800 dark:text-gray-100 mb-1">
        {insight.title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
        {insight.description}
      </p>
    </div>
  );
};

export default InsightCard;
