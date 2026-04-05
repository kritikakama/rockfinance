import { Trash2, Pencil } from "lucide-react";
import type { Transaction } from "../../types";
import { formatCurrency } from "../../utils/calculation";
import { useApp } from "../../context/AppContext";

const categoryEmoji: Record<string, string> = {
  "Food & Dining": "🍔",
  Transport: "🚗",
  Shopping: "🛍️",
  Entertainment: "🎮",
  Health: "💊",
  Utilities: "💡",
  Salary: "💼",
  Freelance: "💻",
  Investment: "📈",
  Other: "📦",
};

interface Props {
  transaction: Transaction;
  onEdit: (t: Transaction) => void;
}

const TransactionRow = ({ transaction, onEdit }: Props) => {
  const { role, deleteTransaction } = useApp();
  const { id, title, amount, type, category, date } = transaction;

  return (
    <div className="flex items-center justify-between p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 rounded-xl transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-lg flex-shrink-0">
          {categoryEmoji[category] || "📦"}
        </div>
        <div>
          <p className="text-sm font-semibold">{title}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            {category} ·{" "}
            {new Date(date).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`text-sm font-bold ${type === "income" ? "text-green-500" : "text-red-500"}`}
        >
          {type === "income" ? "+" : "-"}
          {formatCurrency(amount)}
        </span>
        {role === "admin" && (
          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(transaction)}
              className="p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-950 text-blue-500 transition-colors"
            >
              <Pencil size={14} />
            </button>
            <button
              onClick={() => deleteTransaction(id)}
              className="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-950 text-red-500 transition-colors"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionRow;
