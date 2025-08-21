import React from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaHistory } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <h2>Budgetary</h2>

      <NavLink
        to="/dashboard"
        className={({ isActive }) =>
          `sidebar-btn ${isActive ? "sidebar-btn--active" : ""}`
        }
      >
        <FaHome /> Dashboard
      </NavLink>

      <NavLink
        to="/transactions"
        className={({ isActive }) =>
          `sidebar-btn ${isActive ? "sidebar-btn--active" : ""}`
        }
      >
        <FaHistory /> Transactional History
      </NavLink>
    </div>
  );
}

export default Sidebar;
