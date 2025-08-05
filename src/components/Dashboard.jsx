import React, { useState } from "react";
import WelcomeCard from "./WelcomeCard";
import ExpenseCards from "./ExpenseCards";
import RecentTransactions from "./RecentTransactions";
import AddTransactionModal from "./AddTransactionModal";
import "./Dashboard.css";

function Dashboard() {
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);

  const addTransaction = (newTxn) => {
    setTransactions((prev) => [...prev, newTxn]);
    setShowModal(false);
  };

  const income = transactions
    .filter((txn) => txn.type === "Income")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const expense = transactions
    .filter((txn) => txn.type === "Expense")
    .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

  const balance = income - expense;

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <WelcomeCard income={income} expense={expense} balance={balance} />
        <ExpenseCards />
        <button className="add-transaction" onClick={() => setShowModal(true)}>
          + Add Transaction
        </button>
      </div>
      <RecentTransactions transactions={transactions} />
      {showModal && <AddTransactionModal onClose={() => setShowModal(false)} onSubmit={addTransaction} />}
    </div>
  );
}

export default Dashboard;