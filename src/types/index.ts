export type TransactionType = "income" | "expense";

export type Category =
  | "Food & Dining"
  | "Transport"
  | "Shopping"
  | "Entertainment"
  | "Health"
  | "Utilities"
  | "Salary"
  | "Freelance"
  | "Investment"
  | "Other";

export type Role = "admin" | "viewer";

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  type: TransactionType;
  category: Category;
  date: string; // ISO string
  note?: string;
}

export interface MonthlySummary {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export interface AppContextType {
  role: Role;
  setRole: (role: Role) => void;
  transactions: Transaction[];
  addTransaction: (t: Transaction) => void;
  editTransaction: (t: Transaction) => void;
  deleteTransaction: (id: string) => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}
