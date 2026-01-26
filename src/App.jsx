import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import { Toaster } from "react-hot-toast";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Toaster
        position="top-center"
        reverseOrder={true}
      />
    </>
  );
}

export default App;
