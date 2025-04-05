import React from "react";
import "./TopAppBar.css";
import SideDrawer from "../Drawer/SideDrawer";

function TopAppBar() {
  return (
    <header className="appbar-header">
      <SideDrawer />
    </header>
  );
}

export default TopAppBar;
