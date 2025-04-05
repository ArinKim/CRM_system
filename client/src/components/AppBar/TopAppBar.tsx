import React from "react";
import "./TopAppBar.css";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router";

function TopAppBar() {
  return (
    <header className="appbar-header">
      <div className="nav-left">
        <NavLink to="/" className="navigation-home-appbar">
          Home
        </NavLink>
        <NavLink to="/items" className="navigation-items-appbar">
          Items
        </NavLink>
      </div>
      <div className="nav-right">
        <NavLink to="/user" className="navigation-icon-appbar">
          <span className="appbar-icon">
            <FaUserCircle />
          </span>
        </NavLink>
      </div>
    </header>
  );
}

export default TopAppBar;
