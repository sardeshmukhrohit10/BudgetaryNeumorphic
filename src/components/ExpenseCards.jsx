import React from "react";
import { FaBolt, FaGraduationCap, FaPlane, FaShoppingCart, FaHandHoldingHeart, FaGlassCheers } from "react-icons/fa";
import "./ExpenseCards.css";

const data = [
  { category: "Emergency Expenses", amount: 50, change: "+12%", icon: <FaBolt /> },
  { category: "Education", amount: 20, change: "+50%", icon: <FaGraduationCap /> },
  { category: "Travel Expenses", amount: 100, change: "-20%", icon: <FaPlane /> },
  { category: "Food & Groceries", amount: 150, change: "+45%", icon: <FaShoppingCart /> },
  { category: "Donation", amount: 10, change: "-15%", icon: <FaHandHoldingHeart /> },
  { category: "Party", amount: 150, change: "+50%", icon: <FaGlassCheers /> },
];

function ExpenseCards() {
  return (
    <div className="expense-cards">
      {data.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-header">
            <div className="icon-container">{item.icon}</div>
            <div>
              <h4>{item.category}</h4>
              <h3>€{item.amount}</h3>
            </div>
          </div>
          <p>
            This month <span style={{ color: item.change.includes("-") ? "red" : "green" }}>{item.change}</span>
          </p>
        </div>
      ))}
    </div>
  );
}

export default ExpenseCards;