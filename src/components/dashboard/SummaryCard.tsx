import type { LucideIcon } from "lucide-react";
import { formatCurrency } from "../../utils/calculation";

interface Props {
  title: string;
  amount: number;
  icon: LucideIcon;
  trend?: string;
  color: "green" | "red" | "blue";
}

const colorMap = {
  green: "bg-green-50 dark:bg-green-950 text-green-600 dark:text-green-400",
  red: "bg-red-50 dark:bg-red-950 text-red-500 dark:text-red-400",
  blue: "bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400",
};

const SummaryCard = ({ title, amount, icon: Icon, trend, color }: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`p-2.5 rounded-xl ${colorMap[color]}`}>
          <Icon size={20} />
        </div>
        {trend && (
          <span className="text-xs font-medium text-green-500 bg-green-50 dark:bg-green-950 px-2 py-1 rounded-full">
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{title}</p>
      <p className="text-2xl font-bold tracking-tight">
        {formatCurrency(amount)}
      </p>
    </div>
  );
};

export default SummaryCard;
