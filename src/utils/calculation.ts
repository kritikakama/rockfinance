import type { Transaction, MonthlySummary } from "../types";

export const getTotals = (transactions: Transaction[]) => {
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  return { income, expenses, balance: income - expenses };
};

export const getMonthlySummaries = (
  transactions: Transaction[],
): MonthlySummary[] => {
  const map: Record<string, MonthlySummary> = {};

  transactions.forEach((t) => {
    const month = t.date.slice(0, 7);
    if (!map[month]) map[month] = { month, income: 0, expenses: 0, balance: 0 };
    if (t.type === "income") map[month].income += t.amount;
    else map[month].expenses += t.amount;
    map[month].balance = map[month].income - map[month].expenses;
  });

  return Object.values(map).sort((a, b) => a.month.localeCompare(b.month));
};

export const getCategoryTotals = (transactions: Transaction[]) => {
  const map: Record<string, number> = {};

  transactions
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });

  return Object.entries(map)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value);
};

export const formatCurrency = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
