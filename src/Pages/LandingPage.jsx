import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header.jsx";
import banner from "../assets/images/banner.png";
import Footer from "../Components/Footer.jsx";
import { FiArrowRight } from "react-icons/fi";
import BillGates from "../assets/images/billgates.webp";
import JensenHuang from "../assets/images/jensenhuang.webp";
import TimCook from "../assets/images/timcook.jpg";
import { Link } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const listCard = [
    { name: "Bill Gates", url: BillGates, talk: "Microsoft is the best" },
    { name: "Tim Cook", url: TimCook, talk: "Apple is the best" },
    { name: "Jensen Huang", url: JensenHuang, talk: "Nvidia is the best" },
  ];
  return (
    <div className="">
      <title>Yalina - Learn from anywhere</title>

      <div className="w-full min-h-screen flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Banner */}
        <div className="h-screen flex-1 px-4 sm:px-8 md:px-12 lg:px-40 bg-linear-to-b from-pink-50 to-white grid grid-cols-1 lg:grid-cols-12 items-center justify-items-center lg:justify-items-start rounded-b-4xl text-center lg:text-left text-base-100 gap-8 lg:gap-12 user-select-none pb-8">
          <div className="col-span-1 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left w-full px-4 sm:px-6 md:px-8">
            <button className="py-2 px-4 md:py-3 md:px-6 bg-base-100 text-pink-700 font-bold rounded select-none mb-4 md:mb-6 shadow-lg hover:shadow-xl transition-shadow">
              Welcome to Yalina
            </button>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 capitalize select-none mb-3 md:mb-4 leading-tight text-shadow-md">
              <span>Be the best{" "}</span>
              <span className="font-extrabold text-rose-500 text-shadow-lg underline decoration-rose-500 inline-block">
                Student{" "}
              </span>
              <span>You can with{" "}</span>
              <span className="font-extrabold text-rose-500 text-shadow-lg inline-block">
                E-Learning
              </span>
            </p>
            <p className="text-gray-950/70 font-medium text-lg">
              Unlock your potential with our extensive library of courses. From
              technical skills to creative arts, we provide the tools you need to
              advance your career and achieve your personal goals, no matter where
              you are located.
            </p>
            <button
              className="mt-4 md:mt-6 py-2 px-6 md:py-3 md:px-8 bg-rose-500 text-gray-100 drop-shadow rounded-md hover:bg-rose-700 hover:shadow-lg transition-all duration-300 text-sm md:text-md font-bold cursor-pointer"
              onClick={handleLoginClick}
            >
              Get Started{" "}
              <span className="">
                <FiArrowRight size={20} className="inline-block" />
              </span>
            </button>
          </div>

          <div className="col-span-1 lg:col-span-6 w-full flex justify-center px-4 sm:px-6 md:px-8">
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full bg-rose-200 rounded-full shadow-lg md:shadow-xl flex items-center justify-center p-4 md:p-8 hover:shadow-2xl transition-all duration-300">
              <img src={banner} alt="banner" />
            </div>
          </div>
        </div>
      </div>

      {/* Feedback */}
      <div className="w-full flex flex-col px-8 sm:px-16 md:px-18 lg:px-40 py-12 md:py-20 text-lg text-gray-800 justify-center items-center bg-rose-50 rounded-t-4xl">
        <div className="flex-1 mb-12 bg-white py-2 md:py-3 lg:px-12 md:px-6 px-4 rounded shadow-md hover:shadow-xl transition-shadow duration-250 items-center">
          <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-pink-700 text-shadow-sm">
            What Our Clients Say
          </span>
        </div>
        <div className="flex flex-col md:flex-row gap-4 w-full justify-between items-center">
          {listCard.map((item) => (
            <div
              key={item.name}
              className="card bg-base-100 w-96 shadow-md hover:shadow-2xl transition-shadow duration-250"
            >
              <figure className="px-10 pt-10 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.name}
                  className="rounded-xl w-full h-48 md:h-64 object-cover"
                />
              </figure>
              <div className="card-body items-center text-center">
                <h2 className="card-title text-xl">{item.name}</h2>
                <p>{item.talk}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/*  */}
      <div className="w-full flex flex-col bg-linear-to-br from-rose-800 to-rose-600 text-base-300 px-8 sm:px-16 md:px-18 lg:px-40 py-12 md:py-20 gap-4 md:gap-6">
        <h1 className="font-bold text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
          Your learn, everywhere you are
        </h1>
        <span className="font-semibold text-lg">
          Access a world of knowledge anytime, anywhere. Whether you're at home,
          at a coffee shop, or on the go, Yalina helps you break free from
          boundaries and take your learning journey to the next level at your
          own pace.
        </span>
      </div>

      {/* Contact */}
      <div className="w-full px-8 sm:px-16 md:px-18 lg:px-40 py-12 md:py-20 flex flex-col md:flex-row gap-4 md:gap-6 bg-rose-50 justify-between items-center md:items-start">
        <div className="flex flex-col gap-2 w-1/2 md:w-1/5 items-center md:items-start">
          <h1 className="font-bold text-2xl md:text-4xl bg-linear-to-r bg-clip-text text-transparent from-rose-700 to-rose-500">
            Yalina
          </h1>
          <p className="text-gray-700">
            E-Learning platform created by{" "}
            <Link
              to={"https://www.facebook.com/yalog.dev"}
              target="blank"
              className="font-semibold hover:underline cursor-pointer"
            >
              Yalog & Elina
            </Link>
            . We always try to make better classes everyday.
          </p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
            Product
          </h1>
          <p className="text-gray-700">Yalina</p>
          <p className="text-gray-700">Yorina</p>
          <p className="text-gray-700">APU</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
            Elina
          </h1>
          <p className="text-gray-700">Designer</p>
          <p className="text-gray-700">UI/UX Designer</p>
          <p className="text-gray-700">Brand Identify</p>
        </div>

        <div className="flex flex-col gap-2 items-center">
          <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
            Yalog
          </h1>
          <p className="text-gray-700">Developer</p>
          <p className="text-gray-700">Web Developer</p>
          <p className="text-gray-700">Mobile & Desktop App</p>
        </div>

        <div className="flex flex-col gap-2 flex-1 md:items-end w-full">
          <div className="flex flex-col items-center md:items-start gap-2">
            <h1 className="font-bold text-2xl md:text-4xl text-gray-800">
              Contact us
            </h1>
            <fieldset className="w-80">
              <label>Enter your email address</label>
              <div className="join">
                <input
                  type="email"
                  placeholder="username@site.com"
                  className="input input-bordered join-item"
                />
                <button className="btn join-item bg-rose-500 text-base-200">
                  Subscribe
                </button>
              </div>
            </fieldset>
          </div>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default LandingPage;
