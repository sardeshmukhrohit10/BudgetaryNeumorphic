import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { FaHome, FaHistory, FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";

function Sidebar() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const linkClass = ({ isActive }) =>
    `sidebar-btn ${isActive ? "sidebar-btn--active" : ""}`;

  return (
    <>
      {/* Desktop / Tablet sidebar (unchanged layout) */}
      <aside className="sidebar sidebar--desktop" role="navigation" aria-label="Main">
        <h2>Budgetary</h2>

        <NavLink to="/dashboard" className={linkClass}>
          <FaHome />
          <span className="label">Dashboard</span>
        </NavLink>

        <NavLink to="/transactions" className={linkClass}>
          <FaHistory />
          <span className="label">Transaction History</span>
        </NavLink>
      </aside>

      {/* Mobile top bar */}
      <div className="sidebar-mobilebar">
        <button
          className="sidebar-burger"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <FaBars />
        </button>
        <div className="sidebar-mobile-title">Budgetary</div>
      </div>

      {/* Mobile drawer + overlay */}
      <div
        className={`sidebar-overlay ${open ? "show" : ""}`}
        onClick={close}
        aria-hidden={!open}
      />
      <nav
        className={`sidebar-drawer ${open ? "open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile menu"
      >
        <div className="drawer-header">
          <h2>Budgetary</h2>
          <button
            className="drawer-close"
            aria-label="Close menu"
            onClick={close}
          >
            <FaTimes />
          </button>
        </div>

        <NavLink to="/dashboard" className={linkClass} onClick={close}>
          <FaHome />
          <span className="label">Dashboard</span>
        </NavLink>

        <NavLink to="/transactions" className={linkClass} onClick={close}>
          <FaHistory />
          <span className="label">Transaction History</span>
        </NavLink>
      </nav>
    </>
  );
}

export default Sidebar;
