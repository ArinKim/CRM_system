import React from "react";
import "./App.css";
import ItemsPage from "./pages/Item/ItemsPage";
import TopAppBar from "./components/AppBar/TopAppBar";
import { BrowserRouter, Routes, Route } from "react-router";
import UserPage from "./pages/User/UserPage";
import HomePage from "./pages/Home/HomePage";
import FetchingTestPage from "./pages/FetchingTestPage";
import CustomerPage from "./pages/Customer/CustomerPage";
// import SideDrawer from "./components/Drawer/SideDrawer";
import MeetingPage from "./pages/Meeting/MeetingPage";

function App() {
  return (
    <BrowserRouter>
      <>
        <div className="container">
          <TopAppBar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/users" element={<UserPage />} />
            <Route path="/items" element={<ItemsPage />} />
            <Route path="/customers" element={<CustomerPage />} />
            <Route path="/fetching-test" element={<FetchingTestPage />} />
            <Route path="/meetings" element={<MeetingPage />} />
          </Routes>
        </div>
      </>
    </BrowserRouter>
  );
}

export default App;
