import React from "react";
import { FaEuroSign, FaArrowUp, FaArrowDown } from "react-icons/fa";
import "./WelcomeCard.css";

function WelcomeCard({
  income = 0,
  expense = 0,
  balance = 0,
  title = "Summary",
  subtitle,
}) {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="welcome-card">
      <div className="welcome-left">
        <h2>{title}</h2>
        <p className="date">{today}</p>
        <p className="subtext">
          {subtitle || "Here's your financial overview for today"}
        </p>
      </div>

      <div className="summary">
        <div className="summary-item">
          <div className="icon-wrapper"><FaEuroSign className="summary-icon" /></div>
          <h3>€{Number(balance).toFixed(2)}</h3>
          <p>Total Balance</p>
        </div>
        <div className="summary-item">
          <div className="icon-wrapper"><FaArrowUp className="summary-icon" style={{ color: 'green' }} /></div>
          <h3 style={{ color: 'green' }}>€{Number(income).toFixed(2)}</h3>
          <p>This Month Income</p>
        </div>
        <div className="summary-item">
          <div className="icon-wrapper"><FaArrowDown className="summary-icon" style={{ color: 'red' }} /></div>
          <h3 style={{ color: 'red' }}>€{Number(expense).toFixed(2)}</h3>
          <p>This Month Expense</p>
        </div>
      </div>
    </div>
  );
}

export default WelcomeCard;
