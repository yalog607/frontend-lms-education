import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./Components/Home.jsx";
import Login from "./Components/Login.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
