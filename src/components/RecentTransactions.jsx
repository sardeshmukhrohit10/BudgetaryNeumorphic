import React from "react";
import "./RecentTransactions.css";

function RecentTransactions({ transactions }) {
  return (
    <div className="recent-transactions">
      <h3>Recent Transactions</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions">No transactions to show.</p>
      ) : (
        <ul>
          {transactions.map((txn, idx) => (
            <li key={idx}>
              <div className="txn-date">{txn.date}</div>
              <div className="txn-row">
                <div className="txn-category">{txn.category}</div>
                <div className="txn-amount">€{txn.amount}</div>
              </div>
              <div className="txn-divider" />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentTransactions;