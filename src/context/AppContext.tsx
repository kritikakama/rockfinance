import { createContext, useContext, useEffect, useState } from "react";
import { mockTransactions } from "../data/mockData";
import type { AppContextType, Role, Transaction } from "../types";

const AppContext = createContext<AppContextType | null>(null);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [role, setRole] = useState<Role>(() => {
    return (localStorage.getItem("finly_role") as Role) || "viewer";
  });

  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const stored = localStorage.getItem("finly_transactions");
    return stored ? JSON.parse(stored) : mockTransactions;
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem("finly_dark") === "true";
    document.documentElement.classList.toggle("dark", stored);
    return stored;
  });

  useEffect(() => {
    localStorage.setItem("finly_transactions", JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem("finly_role", role);
  }, [role]);

  useEffect(() => {
    localStorage.setItem("finly_dark", String(darkMode));
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const addTransaction = (t: Transaction) =>
    setTransactions((prev) => [t, ...prev]);

  const editTransaction = (updated: Transaction) =>
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );

  const deleteTransaction = (id: string) =>
    setTransactions((prev) => prev.filter((t) => t.id !== id));

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        transactions,
        addTransaction,
        editTransaction,
        deleteTransaction,
        darkMode,
        toggleDarkMode,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp must be used inside AppProvider");
  return ctx;
};
