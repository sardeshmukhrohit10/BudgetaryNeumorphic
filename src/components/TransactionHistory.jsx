import React, { useMemo, useState } from "react";
import WelcomeCard from "./WelcomeCard";
import "./TransactionHistory.css";

const BASE_CATEGORIES = [
  "Food & Groceries",
  "Health Insurance",
  "Travel Expenses",
  "Rent",
  "Emergency Expenses",
  "Education",
  "Donation",
  "Party",
  "Salary",
];

function TransactionHistory({
  transactions = [],
  totals,
  onOpenAddModal,
  onEdit,
  onDelete,
}) {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All Transactions");
  const [catFilter, setCatFilter] = useState("All Categories");

  const categories = useMemo(() => {
    const fromData = Array.from(
      new Set(transactions.map((t) => t.category).filter(Boolean))
    );

    const extras = fromData.filter((c) => !BASE_CATEGORIES.includes(c)).sort();

    return ["All Categories", ...BASE_CATEGORIES, ...extras];
  }, [transactions]);

  const income =
    totals?.income ??
    transactions
      .filter((t) => t.type === "Income")
      .reduce((s, t) => s + Number(t.amount || 0), 0);

  const expense =
    totals?.expense ??
    transactions
      .filter((t) => t.type === "Expense")
      .reduce((s, t) => s + Number(t.amount || 0), 0);

  const balance = totals?.balance ?? income - expense;

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return transactions
      .map((t, i) => ({ ...t, _index: i }))
      .filter((t) => {
        if (typeFilter !== "All Transactions" && t.type !== typeFilter) return false;
        if (catFilter !== "All Categories" && t.category !== catFilter) return false;

        if (
          q &&
          !String(t.description || "").toLowerCase().includes(q) &&
          !String(t.category || "").toLowerCase().includes(q) &&
          !String(t.amount || "").toLowerCase().includes(q) &&
          !String(t.date || "").toLowerCase().includes(q)
        ) return false;

        return true;
      });
  }, [transactions, search, typeFilter, catFilter]);

  return (
    <div className="th-page">
      <WelcomeCard
        title="Transaction History"
        income={income}
        expense={expense}
        balance={balance}
      />

      <div className="th-toolbar">
        <div className="th-search-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="th-search-icon"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 104.5 4.5a7.5 7.5 0 0012.15 12.15z"
            />
          </svg>
          <input
            className="th-search-input"
            type="text"
            placeholder="Search transactions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <select
          className="th-select"
          value={catFilter}
          onChange={(e) => setCatFilter(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="th-select"
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
        >
          <option>All Transactions</option>
          <option>Income</option>
          <option>Expense</option>
        </select>

        <button className="th-add-btn" onClick={() => onOpenAddModal?.()}>
          + Add Transaction
        </button>
      </div>

      <div className="th-table-wrap">
      <div className="table-scroll">
          <table className="th-table">
          <thead>
            <tr>
              <th>Description</th>
              <th>Date</th>
              <th>Category</th>
              <th className="center">Type</th>
              <th className="center">Amount</th>
              <th className="center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan="6" className="empty">No transactions found.</td>
              </tr>
            ) : (
              filtered.map((t) => (
                <tr key={`${t.description}-${t.date}-${t._index}`}>
                  <td className="left">{t.description}</td>
                  <td className="left">{t.date}</td>
                  <td className="left">
                    <span className="pill">{t.category}</span>
                  </td>

                  <td className="center">
                    <span
                      className={`pill ${t.type === "Income" ? "pill-green" : "pill-red"}`}
                    >
                      {t.type}
                    </span>
                  </td>

                  <td
                    className={`center ${t.type === "Income" ? "amount-income" : "amount-expense"}`}
                  >
                    {t.type === "Income" ? "+" : "-"}€{Number(t.amount).toFixed(2)}
                  </td>

                  <td className="center">
                    <div className="th-actions">
                      <button className="th-btn th-edit" onClick={() => onEdit?.(t._index)}>
                        Edit
                      </button>
                      <button className="th-btn th-delete" onClick={() => onDelete?.(t._index)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>   
      </div>
    </div>
  );
}

export default TransactionHistory;
