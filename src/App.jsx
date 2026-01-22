import React from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import Home from "./Pages/Home.jsx";
import Aboutus from "./Components/Aboutus.jsx";
import Login from "./Pages/Login.jsx";
import Contact from "./Components/Contact.jsx";

function App() {
  
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />  
        <Route path="/aboutus" element={<Aboutus />} />  
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
