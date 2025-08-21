import React from "react";
import { 
  FaBolt, 
  FaGraduationCap, 
  FaPlane, 
  FaShoppingCart, 
  FaHandHoldingHeart, 
  FaGlassCheers, 

} from "react-icons/fa";
import "./ExpenseCards.css";

function ExpenseCards({ transactions = [] }) {
  const categories = {
    "Emergency Expenses": <FaBolt />,
    "Education": <FaGraduationCap />,
    "Travel Expenses": <FaPlane />,
    "Food & Groceries": <FaShoppingCart />,
    "Donation": <FaHandHoldingHeart />,
    "Party": <FaGlassCheers />,

  };

  // Prepare card data dynamically
  const cardData = Object.keys(categories).map((category) => {
    const total = transactions
      .filter(txn => txn.type === "Expense" && txn.category === category)
      .reduce((sum, txn) => sum + parseFloat(txn.amount), 0);

    return {
      category,
      total,
      icon: categories[category]
    };
  });

  return (
    <div className="expense-cards">
      {cardData.map((item, idx) => (
        <div className="card" key={idx}>
          <div className="card-header">
            <div className="icon-container">{item.icon}</div>
            <div className="card-text">
              <h4>{item.category}</h4>
              <h3>€{item.total.toFixed(2)}</h3>
            </div>
          </div>
          <p>This month</p>
        </div>
      ))}
    </div>
  );
}

export default ExpenseCards;
