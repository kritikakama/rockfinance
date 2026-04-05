import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import type { ValueType } from "recharts/types/component/DefaultTooltipContent";
import { useApp } from "../../context/AppContext";
import { getMonthlySummaries, formatCurrency } from "../../utils/calculation";

const BalanceTrendChart = () => {
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
        Balance Trend
      </h3>
      <p className="text-lg font-bold mb-4">Monthly Overview</p>
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart
          data={data}
          margin={{ top: 5, right: 10, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="incomeGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#22c55e" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="expenseGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 11 }}
            tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
          />
          <Tooltip formatter={tooltipFormatter} />
          <Area
            type="monotone"
            dataKey="income"
            stroke="#22c55e"
            fill="url(#incomeGrad)"
            strokeWidth={2}
            name="Income"
          />
          <Area
            type="monotone"
            dataKey="expenses"
            stroke="#ef4444"
            fill="url(#expenseGrad)"
            strokeWidth={2}
            name="Expenses"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
