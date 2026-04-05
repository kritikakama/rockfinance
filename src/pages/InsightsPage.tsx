import { useApp } from "../context/AppContext";
import { generateInsights } from "../utils/insights";
import InsightsSection from "../components/insights/InsightsSection";
import MonthlyComparisonChart from "../components/insights/MonthlyComparisonChart";
import { formatCurrency, getCategoryTotals } from "../utils/calculation";

const InsightsPage = () => {
  const { transactions } = useApp();
  const insights = generateInsights(transactions);
  const topCategories = getCategoryTotals(transactions).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Insights</h1>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Smart observations about your finances
        </p>
      </div>

      <InsightsSection insights={insights} />

      <MonthlyComparisonChart />

      <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800">
        <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 mb-1">
          Top Spending
        </h3>
        <p className="text-lg font-bold mb-4">Where your money goes</p>
        <div className="space-y-3">
          {topCategories.map((cat, i) => {
            const total = topCategories.reduce((s, c) => s + c.value, 0);
            const pct = Math.round((cat.value / total) * 100);
            return (
              <div key={cat.name}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="font-medium">{cat.name}</span>
                  <span className="text-gray-500">
                    {formatCurrency(cat.value)} · {pct}%
                  </span>
                </div>
                <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${pct}%`,
                      backgroundColor: [
                        "#22c55e",
                        "#3b82f6",
                        "#f59e0b",
                        "#ef4444",
                        "#8b5cf6",
                      ][i % 5],
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default InsightsPage;
