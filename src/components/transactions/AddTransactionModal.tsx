import { useState } from "react";
import { X } from "lucide-react";
import type { Transaction, Category, TransactionType } from "../../types";
import { useApp } from "../../context/AppContext";

const categories: Category[] = [
  "Food & Dining",
  "Transport",
  "Shopping",
  "Entertainment",
  "Health",
  "Utilities",
  "Salary",
  "Freelance",
  "Investment",
  "Other",
];

interface Props {
  onClose: () => void;
  editData?: Transaction | null;
}

const emptyForm = {
  title: "",
  amount: "",
  type: "expense" as TransactionType,
  category: "Food & Dining" as Category,
  date: new Date().toISOString().slice(0, 10),
  note: "",
};

const AddTransactionModal = ({ onClose, editData }: Props) => {
  const { addTransaction, editTransaction } = useApp();
  const [form, setForm] = useState(
    editData ? { ...editData, amount: String(editData.amount) } : emptyForm,
  );

  const set = (key: string, val: string) =>
    setForm((p) => ({ ...p, [key]: val }));

  const handleSubmit = () => {
    if (!form.title || !form.amount) return;

    const t: Transaction = {
      ...form,
      id: editData?.id || Date.now().toString(),
      amount: Number(form.amount),
    };

    if (editData) {
      editTransaction(t);
    } else {
      addTransaction(t);
    }

    onClose();
  };

  const inputClass =
    "w-full px-3 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl w-full max-w-md shadow-xl">
        <div className="flex items-center justify-between p-5 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-bold text-lg">
            {editData ? " Edit Transaction" : " Add Transaction"}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
          >
            <X size={18} />
          </button>
        </div>
        <div className="p-5 space-y-3">
          <input
            className={inputClass}
            placeholder="Title e.g. Zomato Order"
            value={form.title}
            onChange={(e) => set("title", e.target.value)}
          />
          <input
            className={inputClass}
            type="number"
            placeholder="Amount (₹)"
            value={form.amount}
            onChange={(e) => set("amount", e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <select
              className={inputClass}
              value={form.type}
              onChange={(e) => set("type", e.target.value)}
            >
              <option value="expense"> Expense</option>
              <option value="income"> Income</option>
            </select>
            <input
              className={inputClass}
              type="date"
              value={form.date}
              onChange={(e) => set("date", e.target.value)}
            />
          </div>
          <select
            className={inputClass}
            value={form.category}
            onChange={(e) => set("category", e.target.value)}
          >
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <input
            className={inputClass}
            placeholder="Note (optional)"
            value={form.note}
            onChange={(e) => set("note", e.target.value)}
          />
        </div>
        <div className="flex gap-3 p-5 pt-0">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
          >
            {editData ? "Save Changes" : "Add Transaction"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddTransactionModal;
