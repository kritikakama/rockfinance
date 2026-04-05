import { Search } from "lucide-react";
import type { Category, TransactionType } from "../../types";

interface Props {
  search: string;
  setSearch: (v: string) => void;
  filterType: TransactionType | "all";
  setFilterType: (v: TransactionType | "all") => void;
  filterCategory: Category | "all";
  setFilterCategory: (v: Category | "all") => void;
  sortBy: "date" | "amount";
  setSortBy: (v: "date" | "amount") => void;
}

const categories: (Category | "all")[] = [
  "all",
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

const TransactionFilters = ({
  search,
  setSearch,
  filterType,
  setFilterType,
  filterCategory,
  setFilterCategory,
  sortBy,
  setSortBy,
}: Props) => {
  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 space-y-3">
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search transactions..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-brand-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {(["all", "income", "expense"] as const).map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
              ${
                filterType === type
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            {type === "all" ? " All" : type === "income" ? "Income" : "Expense"}
          </button>
        ))}
        <div className="ml-auto flex items-center gap-2">
          <span className="text-xs text-gray-400">Sort:</span>
          {(["date", "amount"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setSortBy(s)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all
                ${
                  sortBy === s
                    ? "bg-gray-800 dark:bg-gray-200 text-white dark:text-gray-900"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400"
                }`}
            >
              {s === "date" ? "Date" : "Amount"}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setFilterCategory(cat)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all
              ${
                filterCategory === cat
                  ? "bg-brand-500 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 hover:bg-gray-200"
              }`}
          >
            {cat === "all" ? "All Categories" : cat}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TransactionFilters;
