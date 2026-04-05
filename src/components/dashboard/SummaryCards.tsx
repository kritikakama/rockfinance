import { Wallet, TrendingUp, TrendingDown } from "lucide-react";
import { useApp } from "../../context/AppContext";
import { getTotals } from "../../utils/calculation";
import SummaryCard from "./SummaryCard";

const SummaryCards = () => {
  const { transactions } = useApp();
  const { income, expenses, balance } = getTotals(transactions);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <SummaryCard
        title="Total Balance"
        amount={balance}
        icon={Wallet}
        color="blue"
        trend="This month"
      />
      <SummaryCard
        title="Total Income"
        amount={income}
        icon={TrendingUp}
        color="green"
        trend="↑ All time"
      />
      <SummaryCard
        title="Total Expenses"
        amount={expenses}
        icon={TrendingDown}
        color="red"
      />
    </div>
  );
};

export default SummaryCards;
