import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import { useApp } from "../../context/AppContext";
import { getMonthlySummaries, formatCurrency } from "../../utils/calculation";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";

const MonthlyComparisonChart = () => {
  const { transactions } = useApp();
  const data = getMonthlySummaries(transactions).map((d) => ({
    ...d,
    month: new Date(d.month + "-01").toLocaleString("default", {
      month: "short",
      year: "2-digit",
    }),
  }));
  const tooltipFormatter = (value: ValueType | undefined) =>
    typeof value === "number" ? formatCurrency(value) : "";

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
        Monthly Comparison
      </h3>
      <p className="text-lg font-bold mb-4">Income vs Expenses</p>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
          barGap={4}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip formatter={tooltipFormatter} />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: "12px" }}
          />
          <Bar
            dataKey="income"
            name="Income"
            fill="#22c55e"
            radius={[6, 6, 0, 0]}
          />
          <Bar
            dataKey="expenses"
            name="Expenses"
            fill="#ef4444"
            radius={[6, 6, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyComparisonChart;
