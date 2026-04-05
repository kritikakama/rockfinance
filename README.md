# 💰 RockFinance — Personal Finance Dashboard

A clean, interactive personal finance dashboard built with React, TypeScript, Tailwind CSS, and Recharts. Designed to help users track income, expenses, and understand spending patterns at a glance.

---

## 🚀 Live Demo

> _Add your deployment link here (Vercel / Netlify)_

---

## ✨ Features

### 📊 Dashboard
- Summary cards — Total Balance, Income, Expenses
- Balance trend area chart (monthly)
- Spending breakdown donut chart (by category)

### 💳 Transactions
- Full transaction list with date, title, category, type and amount
- Search by title
- Filter by type (income / expense) and category
- Sort by date or amount
- Export to CSV

### 🧠 Insights
- Auto-generated smart insights (savings rate, top category, income diversity)
- Monthly income vs expenses bar chart
- Top 5 spending categories with progress bars

### 👥 Role Based UI
- **Viewer** — read-only access, no edit/delete/add controls visible
- **Admin** — can add, edit, and delete transactions via modal
- Switch roles instantly via the header toggle (persisted to localStorage)

### 🌙 Dark Mode
- Full dark mode support toggled from the header
- Persisted across sessions via localStorage

### 💾 Data Persistence
- All transactions and preferences saved to localStorage automatically

---

## 🛠️ Tech Stack

| Layer       | Technology                        |
|-------------|-----------------------------------|
| Framework   | React 18 + TypeScript             |
| Styling     | Tailwind CSS                      |
| Charts      | Recharts                          |
| Routing     | React Router v6                   |
| State       | Context API + localStorage        |
| Icons       | Lucide React                      |
| Bundler     | Vite                              |

---

## 📁 Project Structure
```
src/
├── components/
│   ├── layout/         # AppShell, Sidebar, Header, RoleSwitcher
│   ├── dashboard/      # SummaryCards, BalanceTrendChart, SpendingBreakdownChart
│   ├── transactions/   # TransactionList, TransactionRow, TransactionFilters, AddTransactionModal
│   └── insights/       # InsightsSection, InsightCard, MonthlyComparisonChart
├── context/            # AppContext — global state
├── data/               # mockData.ts — seed transactions
├── pages/              # DashboardPage, TransactionsPage, InsightsPage
├── types/              # TypeScript interfaces
└── utils/              # calculations.ts, insights.ts
```

> Every file is kept under 100 lines for readability and maintainability.

---

## ⚙️ Getting Started
```bash
# 1. Clone the repo
git clone https://github.com/YOUR_USERNAME/RockFinance.git
cd RockFinance

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
```

App runs at `http://localhost:5173`

---

## 🎭 Role Switching

Use the **Viewer / Admin toggle** in the top-right header to switch roles.

| Feature              | Viewer | Admin |
|----------------------|--------|-------|
| View dashboard       | ✅     | ✅    |
| View transactions    | ✅     | ✅    |
| Add transaction      | ❌     | ✅    |
| Edit transaction     | ❌     | ✅    |
| Delete transaction   | ❌     | ✅    |
| Export CSV           | ✅     | ✅    |
| View insights        | ✅     | ✅    |

---

## 📐 Design Decisions

- **Component size limit** — every file stays under 100 lines to keep things focused and readable
- **Context API over Redux** — the app state is simple enough that Redux would be overkill
- **Mock data is INR-based** — relatable for Indian users, using Intl.NumberFormat for formatting
- **Insights are computed** — not hardcoded, they react to actual transaction data
- **Dark mode via class strategy** — Tailwind's `darkMode: 'class'` for full control

---

## 🙌 Author

Built with ❤️ as part of a frontend assignment.
