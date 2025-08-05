import React from "react";
import { FaHome, FaHistory } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Budgetary</h2>
      <button className="sidebar-btn"><FaHome /> Dashboard</button>
      <button className="sidebar-btn"><FaHistory /> Transactional History</button>
    </div>
  );
}

export default Sidebar;