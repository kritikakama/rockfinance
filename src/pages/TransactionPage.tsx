import { useState } from "react";
import { Plus, Download } from "lucide-react";
import { useApp } from "../context/AppContext";
import type { Category, Transaction, TransactionType } from "../types";
import TransactionFilters from "../components/transactions/TransactionFilters";
import TransactionList from "../components/transactions/TransactionList";
import AddTransactionModal from "../components/transactions/AddTransactionModal";

const TransactionsPage = () => {
  const { transactions, role } = useApp();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<TransactionType | "all">("all");
  const [filterCategory, setFilterCategory] = useState<Category | "all">("all");
  const [sortBy, setSortBy] = useState<"date" | "amount">("date");
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState<Transaction | null>(null);

  const filtered = transactions
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()))
    .filter((t) => filterType === "all" || t.type === filterType)
    .filter((t) => filterCategory === "all" || t.category === filterCategory)
    .sort((a, b) =>
      sortBy === "date"
        ? new Date(b.date).getTime() - new Date(a.date).getTime()
        : b.amount - a.amount,
    );

  const handleEdit = (t: Transaction) => {
    setEditData(t);
    setShowModal(true);
  };

  const handleExport = () => {
    const csv = [
      "Date,Title,Category,Type,Amount",
      ...filtered.map(
        (t) => `${t.date},${t.title},${t.category},${t.type},${t.amount}`,
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "finly_transactions.csv";
    a.click();
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Transactions</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {filtered.length} transactions found
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 transition-colors"
          >
            <Download size={16} /> Export
          </button>
          {role === "admin" && (
            <button
              onClick={() => {
                setEditData(null);
                setShowModal(true);
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold bg-brand-500 hover:bg-brand-600 text-white transition-colors"
            >
              <Plus size={16} /> Add
            </button>
          )}
        </div>
      </div>
      <TransactionFilters
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
        filterCategory={filterCategory}
        setFilterCategory={setFilterCategory}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <TransactionList transactions={filtered} onEdit={handleEdit} />
      {showModal && (
        <AddTransactionModal
          onClose={() => setShowModal(false)}
          editData={editData}
        />
      )}
    </div>
  );
};

export default TransactionsPage;
