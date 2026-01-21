import React from "react";
import { Helmet } from "react-helmet";
import Header from "./Header.jsx";
import banner from "../assets/images/banner.png";

const Home = () => {
  return (
    <div className="relative">
      <Helmet>
        <title>Home Page</title>
      </Helmet>

      {/* Header */}
      <Header />

      {/* Banner */}
      <div className="absolute top-0 -z-10 px-42 min-h-screen bg-linear-to-b from-pink-100 to-pink-50 grid grid-cols-12 items-center rounded-b-4xl text-center text-base-100 mb-8 gap-12 user-select-none">
        <div className="col-span-6 flex flex-col items-start justify-center text-left">
          <button className="py-2 px-4 bg-base-100 text-pink-700 font-bold rounded select-none mb-6 mx-auto shadow-2xl">Welcome to Yalina</button>
          <p className="text-6xl font-bold text-start text-gray-900 capitalize select-none mb-4 text-shadow-md">An efficient and productivity management with <span className="inline-block text-rose-600">Minimum Cost.</span></p>
          <button className="mt-4 py-2 px-6 bg-rose-500 text-gray-100 drop-shadow rounded-md hover:bg-rose-700 hover:shadow-lg transition-all duration-300 text-md font-bold cursor-pointer">Let's Try</button>
        </div>

        <div className="col-span-6 flex justify-center bg-pink-200 rounded-full shadow-xl">
          <img src={banner} alt="banner" className="object-contain" />
        </div>
      </div>
    </div>
  );
};

export default Home;
