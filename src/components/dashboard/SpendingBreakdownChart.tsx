import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { getCategoryTotals, formatCurrency } from "../../utils/calculation";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

const COLORS = [
  "#22c55e",
  "#3b82f6",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#14b8a6",
  "#f97316",
];

const SpendingBreakdownChart = () => {
  const { transactions } = useApp();
  const data = getCategoryTotals(transactions);
  const tooltipFormatter = (value: ValueType | undefined) =>
    typeof value === "number" ? formatCurrency(value) : "";
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
        Spending Breakdown
      </h3>
      <p className="text-lg font-bold mb-4">By Category</p>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={55}
            outerRadius={85}
            dataKey="value"
            nameKey="name"
            paddingAngle={3}
          >
            {data.map((_, i) => (
              <Cell key={i} fill={COLORS[i % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={tooltipFormatter} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px" }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpendingBreakdownChart;
