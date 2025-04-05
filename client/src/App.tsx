import React from "react";
import "./App.css";
import ItemsPage from "./pages/ItemsPage";
import TopAppBar from "./components/AppBar/TopAppBar";
import { BrowserRouter, Routes, Route } from "react-router";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";
import SideDrawer from "./components/Drawer/SideDrawer";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="container">
          <SideDrawer />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/user" element={<UserPage />} />
            <Route path="/items" element={<ItemsPage />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
