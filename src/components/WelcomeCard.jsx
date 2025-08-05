import React from "react";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./WelcomeCard.css";

function WelcomeCard({ income, expense, balance }) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="welcome-card">
      <div className="welcome-left">
        <h2>Welcome back!</h2>
        <p className="date">{today}</p>
        <p className="subtext">Here's your financial overview for today</p>
      </div>

      <div className="summary">
        <div className="summary-item">
          <div className="icon-wrapper"><FaEuroSign className="summary-icon" /></div>
          <h3>€{balance.toFixed(2)}</h3>
          <p>Total Balance</p>
        </div>
        <div className="summary-item">
          <div className="icon-wrapper"><FaArrowUp className="summary-icon" style={{ color: 'green' }} /></div>
          <h3 style={{ color: 'green' }}>€{income.toFixed(2)}</h3>
          <p>This Month Income</p>
        </div>
        <div className="summary-item">
          <div className="icon-wrapper"><FaArrowDown className="summary-icon" style={{ color: 'red' }} /></div>
          <h3 style={{ color: 'red' }}>€{expense.toFixed(2)}</h3>
          <p>This Month Expense</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;