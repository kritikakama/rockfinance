import type { Transaction } from "../../types";
import TransactionRow from "./TransactionRow";

interface Props {
  transactions: Transaction[];
  onEdit: (t: Transaction) => void;
}

const TransactionList = ({ transactions, onEdit }: Props) => {
  if (transactions.length === 0) {
    return (
      <div className="text-center py-16 bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800">
        <p className="text-4xl mb-3">🫙</p>
        <p className="font-semibold text-gray-600 dark:text-gray-400">
          No transactions found
        </p>
        <p className="text-sm text-gray-400 mt-1">
          Try adjusting your filters or add a new transaction
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 divide-y divide-gray-50 dark:divide-gray-800">
      {transactions.map((t) => (
        <TransactionRow key={t.id} transaction={t} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default TransactionList;
