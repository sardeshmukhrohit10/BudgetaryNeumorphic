import React, { useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TransactionHistory from "./components/TransactionHistory";
import AddTransactionModal from "./components/AddTransactionModal";
import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const totals = useMemo(() => {
    const income = transactions.filter(t => t.type === "Income")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = transactions.filter(t => t.type === "Expense")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const openAdd = () => { setEditIndex(null); setShowModal(true); };
  const openEdit = (index) => { setEditIndex(index); setShowModal(true); };

  const handleSubmitTxn = (txn) => {
    if (editIndex === null) {
      setTransactions(prev => [...prev, txn]);
    } else {
      setTransactions(prev => prev.map((t, i) => i === editIndex ? txn : t));
    }
    setShowModal(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setTransactions(prev => prev.filter((_, i) => i !== index));
  };

  const initialForEdit = editIndex !== null ? transactions[editIndex] : null;

  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <Routes>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route
            path="/dashboard"
            element={
              <Dashboard
                transactions={transactions}
                totals={totals}
                onOpenAddModal={openAdd}
              />
            }
          />
          <Route
            path="/transactions"
            element={
              <TransactionHistory
                transactions={transactions}
                totals={totals}
                onOpenAddModal={openAdd}
                onEdit={openEdit}
                onDelete={handleDelete}
              />
            }
          />
        </Routes>

        {showModal && (
          <AddTransactionModal
            onClose={() => { setShowModal(false); setEditIndex(null); }}
            onSubmit={handleSubmitTxn}
            initialTransaction={initialForEdit}
          />
        )}
      </div>
    </BrowserRouter>
  );
}

export default App;
