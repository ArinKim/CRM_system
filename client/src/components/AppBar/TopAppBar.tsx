import React from "react";
import "./TopAppBar.css";
import { NavLink } from "react-router";
import AccountMenu from "../Menu/AccountMenu";

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
        <AccountMenu />
      </div>
    </header>
  );
}

export default TopAppBar;
