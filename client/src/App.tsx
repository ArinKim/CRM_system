import React from "react";
import "./App.css";
import ItemsPage from "./pages/ItemsPage";
import TopAppBar from "./components/AppBar/AppBar";
import { BrowserRouter, Routes, Route } from "react-router";
import UserPage from "./pages/UserPage";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="container">
          <TopAppBar />
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
