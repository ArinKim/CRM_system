import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { NavLink } from "react-router";

function TopAppBar() {
  return (
    <header className="sticky flex justify-between items-center p-4 bg-gray-800 text-white shadow-md">
      <NavLink to="/" className="text-xl font-bold hover:text-gray-300">
        Home
      </NavLink>
      <NavLink to="/items" className="text-xl font-bold hover:text-gray-300">
        Items
      </NavLink>
      <NavLink to="/user" className="button rounded hover:text-gray-300">
        <span className="text-4xl">
          <FaUserCircle />
        </span>
      </NavLink>
    </header>
  );
}

export default TopAppBar;
