import React from "react";
import { Helmet } from "react-helmet";
import { NavLink } from "react-router-dom";
import Logo from "../assets/images/icon.png";

const Home = () => {
  return (
    <div>
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      {/* Header */}
      <div className="bg-rose-50 p-2 text-gray-800 font-bold flex flex-row justify-around items-center">
        <img
          src={Logo}
          alt="E-Come"
          className="max-w-12 rounded-full drop-shadow-2xl shadow-2xl cursor-pointer border border-gray-300 hover:border-rose-100 hover:border-2"
        />

        <div className="flex justify-around w-2/5 gap-4 text-rose-400">
          <NavLink
            exact
            to="/"
            className="px-4 py-2 rounded-md hover:bg-rose-300 hover:text-gray-50 transition-colors duration-300"
          >
            Home
          </NavLink>
          <NavLink
            exact
            to="/aboutus"
            className="px-4 py-2 rounded-md hover:bg-rose-300 hover:text-gray-50 transition-colors duration-300"
          >
            About Us
          </NavLink>
          <NavLink
            exact
            to="/contact"
            className="px-4 py-2 rounded-md hover:bg-rose-300 hover:text-gray-50 transition-colors duration-300"
          >
            Contact
          </NavLink>
        </div>

        <div className="justify-between hidden md:flex md:w-1/12 gap-4">
          <button className="btn btn-outline border-rose-400 text-rose-400 hover:bg-rose-400 hover:text-gray-100">Login</button>
          <button className="btn btn-soft border-rose-400 text-rose-400 bg-rose-50 hover:bg-rose-400 hover:text-gray-100">Sign Up</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
