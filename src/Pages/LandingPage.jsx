import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import banner from "../assets/images/banner.png";
import Footer from "../Components/Footer.jsx";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="">
      <title>Hello, Yalina</title>

      <div className="w-full h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Banner */}
        <div className="flex-1 px-4 sm:px-8 md:px-12 lg:px-40 bg-linear-to-b from-pink-100 to-white grid grid-cols-1 lg:grid-cols-12 items-center justify-items-center lg:justify-items-start rounded-b-4xl text-center lg:text-left text-base-100 gap-8 lg:gap-12 user-select-none pb-8">
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left w-full px-4 sm:px-6 md:p -8">
            <button className="py-2 px-4 md:py-3 md:px-6 bg-base-100 text-pink-700 font-bold rounded select-none mb-4 md:mb-6 shadow-lg hover:shadow-xl transition-shadow">
              Welcome to Yalina
            </button>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 capitalize select-none mb-3 md:mb-4 leading-tight text-shadow-md">
              <span className="inline-block text-rose-600">Y</span>ield{" "}
              <span className="inline-block text-rose-600">a</span>ccess to{" "}
              <span className="inline-block text-rose-600">L</span>earning,{" "}
              <span className="inline-block text-rose-600">I</span>nspiration,{" "}
              <span className="inline-block text-rose-600">N</span>ew{" "}
              <span className="inline-block text-rose-600">A</span>bilities
            </p>
            <button
              className="mt-4 md:mt-6 py-2 px-6 md:py-3 md:px-8 bg-rose-500 text-gray-100 drop-shadow rounded-md hover:bg-rose-700 hover:shadow-lg transition-all duration-300 text-sm md:text-md font-bold cursor-pointer"
              onClick={handleLoginClick}
            >
              Let's Try
            </button>
          </div>

          <div className="col-span-1 lg:col-span-6 w-full flex justify-center px-4 sm:px-6 md:px-8">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full bg-pink-200 rounded-full shadow-lg md:shadow-xl flex items-center justify-center p-4 md:p-8 hover:shadow-2xl transition-all duration-300">
              <img src={banner} alt="banner" />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
