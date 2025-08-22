import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import TransactionHistory from "./components/TransactionHistory";
import AddTransactionModal from "./components/AddTransactionModal";

import DeviceGuard from "./components/DeviceGuard";
import TaskPanel from "./components/TaskPanel";
import { initStudy, installCustomEventBridges } from "./studylogger";

import "./App.css";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    initStudy();
    installCustomEventBridges();
  }, []);

  // ---- Totals ----
  const totals = useMemo(() => {
    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    const expense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((s, t) => s + Number(t.amount || 0), 0);
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const openAdd = () => { setEditIndex(null); setShowModal(true); };
  const openEdit = (index) => { setEditIndex(index); setShowModal(true); };

  const isValid = (txn) => {
    const amt = Number(txn?.amount);
    const descOk = typeof txn?.description === "string" && txn.description.trim().length > 0;
    const typeOk = txn?.type === "Income" || txn?.type === "Expense";
    const amtOk = !Number.isNaN(amt) && Number.isFinite(amt);
    return descOk && typeOk && amtOk;
  };

  const handleSubmitTxn = (txn) => {
    try {
      if (!isValid(txn)) {
        window.dispatchEvent(new Event(editIndex === null ? "study:add_err" : "study:edit_err"));
        setShowModal(false);
        setEditIndex(null);
        return;
      }

      if (editIndex === null) {
        const withId = txn.id ? txn : { ...txn, id: (crypto?.randomUUID?.() ?? Date.now().toString()) };
        setTransactions((prev) => [...prev, withId]);
        window.dispatchEvent(new Event("study:add_ok"));
      } else {
        const priorId = transactions[editIndex]?.id;
        const withId = txn.id ? txn : { ...txn, id: (priorId || (crypto?.randomUUID?.() ?? Date.now().toString())) };
        setTransactions((prev) => prev.map((t, i) => (i === editIndex ? withId : t)));
        window.dispatchEvent(new Event("study:edit_ok"));
      }

      setShowModal(false);
      setEditIndex(null);
    } catch {
      window.dispatchEvent(new Event(editIndex === null ? "study:add_err" : "study:edit_err"));
      setShowModal(false);
      setEditIndex(null);
    }
  };

  const handleDelete = (index) => {
    try {
      setTransactions((prev) => prev.filter((_, i) => i !== index));
      window.dispatchEvent(new Event("study:delete_ok"));
    } catch {
      window.dispatchEvent(new Event("study:delete_err"));
    }
  };

  const initialForEdit = editIndex !== null ? transactions[editIndex] : null;

  return (
    <BrowserRouter>
      <DeviceGuard>
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

          <TaskPanel />
        </div>
      </DeviceGuard>
    </BrowserRouter>
  );
}

export default App;
