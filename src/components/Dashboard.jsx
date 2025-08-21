import React from "react";
import WelcomeCard from "./WelcomeCard";
import ExpenseCards from "./ExpenseCards";
import RecentTransactions from "./RecentTransactions";
import "./Dashboard.css";

function Dashboard({ transactions, totals, onOpenAddModal }) {
  const { income, expense, balance } = totals;

  return (
    <div className="dashboard">
      <div className="dashboard-main">
        <WelcomeCard
          income={income}
          expense={expense}
          balance={balance}
          rightSlot={
            <button className="add-transaction" onClick={onOpenAddModal}>
              + Add Transaction
            </button>
          }
        />

        <ExpenseCards transactions={transactions} />

        <button className="add-transaction" onClick={onOpenAddModal}>
          + Add Transaction
        </button>
      </div>

      <RecentTransactions transactions={transactions} />
    </div>
  );
}

export default Dashboard;
