import React from "react";
import "./App.css";
import ItemsPage from "./pages/ItemsPage";
import TopAppBar from "./components/AppBar/AppBar";
import { BrowserRouter, Routes, Route, NavLink } from "react-router";
import UserPage from "./pages/UserPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="container">
          <TopAppBar />
          <Routes>
            <Route path="/user" element={<UserPage />} />
            <Route path="/items" element={<ItemsPage />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
