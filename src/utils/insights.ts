import type { Transaction } from "../types";
import {
  getCategoryTotals,
  getMonthlySummaries,
  formatCurrency,
} from "./calculation";

export interface Insight {
  id: string;
  emoji: string;
  title: string;
  description: string;
  type: "positive" | "negative" | "neutral";
}

export const generateInsights = (transactions: Transaction[]): Insight[] => {
  const insights: Insight[] = [];
  const categoryTotals = getCategoryTotals(transactions);
  const monthlySummaries = getMonthlySummaries(transactions);

  // Highest spending category
  if (categoryTotals.length > 0) {
    const top = categoryTotals[0];
    insights.push({
      id: "top-category",
      emoji: "🏆",
      title: "Top Spending Category",
      description: `You spend the most on ${top.name} — ${formatCurrency(top.value)} in total. Consider setting a budget for this category.`,
      type: "negative",
    });
  }

  // Monthly comparison
  if (monthlySummaries.length >= 2) {
    const last = monthlySummaries[monthlySummaries.length - 1];
    const prev = monthlySummaries[monthlySummaries.length - 2];
    const diff = last.expenses - prev.expenses;
    const pct = Math.abs(Math.round((diff / prev.expenses) * 100));
    insights.push({
      id: "monthly-compare",
      emoji: diff < 0 ? "📉" : "📈",
      title: "Month-over-Month Expenses",
      description:
        diff < 0
          ? `Great job! You spent ${pct}% less this month compared to last month. You saved ${formatCurrency(Math.abs(diff))}.`
          : `You spent ${pct}% more this month compared to last month — ${formatCurrency(diff)} extra.`,
      type: diff < 0 ? "positive" : "negative",
    });
  }

  // Savings rate
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((s, t) => s + t.amount, 0);
  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((s, t) => s + t.amount, 0);
  if (income > 0) {
    const savingsRate = Math.round(((income - expenses) / income) * 100);
    insights.push({
      id: "savings-rate",
      emoji: savingsRate >= 20 ? "🎯" : "⚠️",
      title: "Savings Rate",
      description:
        savingsRate >= 20
          ? `You're saving ${savingsRate}% of your income. That's above the recommended 20% — excellent discipline!`
          : `You're saving ${savingsRate}% of your income. Financial experts recommend saving at least 20%.`,
      type: savingsRate >= 20 ? "positive" : "negative",
    });
  }

  // Most active category count
  const categoryCount: Record<string, number> = {};
  transactions.forEach((t) => {
    categoryCount[t.category] = (categoryCount[t.category] || 0) + 1;
  });
  const mostFrequent = Object.entries(categoryCount).sort(
    (a, b) => b[1] - a[1],
  )[0];
  if (mostFrequent) {
    insights.push({
      id: "most-frequent",
      emoji: "🔁",
      title: "Most Frequent Category",
      description: `${mostFrequent[0]} appears ${mostFrequent[1]} times in your transactions — it's your most active spending area.`,
      type: "neutral",
    });
  }

  // Income diversity
  const incomeSources = [
    ...new Set(
      transactions.filter((t) => t.type === "income").map((t) => t.category),
    ),
  ];
  insights.push({
    id: "income-diversity",
    emoji: incomeSources.length > 1 ? "💡" : "📌",
    title: "Income Sources",
    description:
      incomeSources.length > 1
        ? `You have ${incomeSources.length} income sources: ${incomeSources.join(", ")}. Diversified income is a great financial habit.`
        : `You currently rely on a single income source (${incomeSources[0] || "none"}). Consider diversifying.`,
    type: incomeSources.length > 1 ? "positive" : "neutral",
  });

  return insights;
};
