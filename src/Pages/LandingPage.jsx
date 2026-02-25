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

import { FcRuler } from "react-icons/fc";
import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FaArrowDown } from "react-icons/fa";

import { useGetLatestCourse } from "../hooks/useCourse.js";
import { FaBookReader } from "react-icons/fa";

import pink_bg from "../assets/images/pink-banner.jpg";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";

const LandingPage = () => {
  const navigate = useNavigate();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const { data: latestCourses, isLoading } = useGetLatestCourse();

  const listCard = [
    { name: "Bill Gates", url: BillGates, talk: "Microsoft is the best" },
    { name: "Tim Cook", url: TimCook, talk: "Apple is the best" },
    { name: "Jensen Huang", url: JensenHuang, talk: "Nvidia is the best" },
  ];
  return (
    <div className="">
      <title>Yalina - Learn from anywhere</title>

      {/* Header */}
      <Header />
      <div className="w-full min-h-screen flex flex-col">
        {/* Banner */}
        <div className="h-screen z-0 relative flex-1 px-4 sm:px-8 md:px-12 lg:px-40 bg-base-100 grid grid-cols-1 lg:grid-cols-12 items-center justify-items-center lg:justify-items-start text-center lg:text-left text-base-100 gap-8 lg:gap-12 select-none overflow-hidden">
          <div
            className="absolute inset-0 z-[-1] h-full w-full bg-cover bg-center bg-no-repeat opacity-70"
            style={{ backgroundImage: `url(${pink_bg})` }}
          ></div>

          <div className="col-span-1 lg:col-span-6 flex flex-col items-center lg:items-start justify-center text-center lg:text-left w-full px-4 sm:px-6 md:px-8">
            <button className="py-2 px-4 md:py-3 md:px-6 bg-base-100 text-pink-700 font-bold rounded select-none mb-4 md:mb-6 shadow-lg hover:shadow-xl transition-shadow">
              Welcome to Yalina
            </button>
            <p className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-base-100 capitalize select-none mb-3 md:mb-4 leading-tight text-shadow-md">
              <span>Be the best </span>
              <span className="font-extrabold text-rose-500 text-shadow-lg underline decoration-rose-500 inline-block">
                Individual{" "}
              </span>
              <span> You can with </span>
              <span className="font-extrabold text-rose-500 text-shadow-lg inline-block">
                E-Learning
              </span>
            </p>
            <p className="text-base-100 font-medium text-lg">
              Unlock your potential with our extensive library of courses. From
              technical skills to creative arts, we provide the tools you need
              to advance your career and achieve your personal goals, no matter
              where you are located.
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
            <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-full bg-transparent flex items-center justify-center p-4 md:p-8">
              <img src={banner} alt="banner" />
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-0 w-full flex flex-col px-8 sm:px-16 md:px-18 lg:px-40 pt-12 md:pt-20 pb-6 md:pb-8 justify-center items-center border-y border-gray-500/10 overflow-hidden bg-linear-to-br from-rose-50 via-base-100 to-rose-50">
        <div className="absolute top-20 left-40 text-indigo-500 opacity-100 text-7xl -rotate-25 hidden md:block select-none">
          ✦
        </div>
        <div className="absolute top-40 right-20 text-pink-500 opacity-100 text-5xl rotate-30 hidden md:block select-none">
          +
        </div>
        <div className="absolute bottom-10 right-1/3 text-5xl rotate-30 hidden md:block select-none">
          <FcRuler />
        </div>

        <div className="flex-1 mb-12 bg-white py-2 md:py-3 lg:px-12 md:px-6 px-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-250 items-center">
          <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-rose-600 text-shadow-sm">
            Latest Courses
          </span>
        </div>

        <div className="flex-1 w-full transition-all duration-300 mb-10">
          {isLoading ? (
            // Lúc loading
            <div className="flex gap-4 sm:gap-6 w-full overflow-hidden">
              <div className="skeleton min-w-70 h-64"></div>
              <div className="skeleton min-w-70 h-64"></div>
              <div className="skeleton min-w-70 h-64"></div>
              <div className="skeleton min-w-70 h-64"></div>
            </div>
          ) : latestCourses?.courses.length === 0 ? (
            <div className="w-full mx-auto text-center py-10 text-gray-500 flex flex-col justify-center items-center">
              <FaBookReader size={40} className="mb-2 opacity-50" />
              <p>No courses available</p>
            </div>
          ) : (
            <Swiper
              modules={[Autoplay]}
              loop={true}
              speed={3000}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
              }}
              spaceBetween={20}
              breakpoints={{
                320: { slidesPerView: 1.2, spaceBetween: 15 },
                640: { slidesPerView: 2, spaceBetween: 20 },
                1024: { slidesPerView: 3, spaceBetween: 24 },
                1280: { slidesPerView: 4, spaceBetween: 24 },
              }}
              className="continuous-slider w-full"
            >
              {latestCourses?.courses.map((c) => (
                <SwiperSlide key={c?._id} className="h-auto p-4">
                  <div
                    className="h-full overflow-hidden card bg-base-200/80 transition-all duration-300 hover:scale-105 hover:shadow-sm cursor-pointer border border-gray-500/10"
                    onClick={() => navigate(`/course/${c?._id}`)}
                  >
                    <figure className="w-full h-64 bg-base-100 shrink-0">
                      <img
                        className="w-full h-full object-cover"
                        src={c?.thumbnail}
                        alt={c?.name || "Course"}
                      />
                    </figure>
                    <div className="p-4 md:p-6 flex flex-col gap-2 justify-start flex-1">
                      <h2 className="font-medium text-md truncate w-full text-gray-800/80 line-clamp-2">
                        {c?.name}
                      </h2>
                      <p className="text-success text-sm font-bold">
                        ${c?.price.toLocaleString()}
                      </p>
                      <div className="flex justify-between items-center text-sm text-gray-700 flex-wrap gap-y-2 mt-auto pt-2">
                        <div className="flex items-center justify-center gap-1">
                          <FaChalkboardTeacher />
                          <p className="line-clamp-1 max-w-20">
                            {c?.teacher_id?.first_name || "Instructor"}
                          </p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <RiAccountCircleLine />
                          <p>{c?.studentCount}</p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <RiDashboard3Line />
                          <p>{c?.level}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>

        <div className="flex-1 w-full text-center">
          <button
            onClick={() => navigate("/all-courses")}
            className="btn btn-outline outline-none btn-ghost border-2 border-rose-500 text-rose-500 hover:bg-rose-500 hover:text-base-100 transition-all duration-300 font-bold"
          >
            <FaArrowDown /> Show more
          </button>
        </div>
      </div>

      {/* Feedback */}
      <div className="w-full flex flex-col px-8 sm:px-16 md:px-18 lg:px-40 py-12 md:py-20 text-lg text-gray-800 justify-center items-center bg-linear-to-tr from-base-300 via-base-100 to-base-300">
        <div className="flex-1 mb-12 bg-white py-2 md:py-3 lg:px-12 md:px-6 px-4 rounded-full shadow-md hover:shadow-xl transition-shadow duration-250 items-center">
          <span className="font-bold text-3xl sm:text-4xl md:text-5xl text-rose-600 text-shadow-sm">
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
                <figcaption className="absolute bottom-0 w-full bg-black/50 text-white text-xs p-1 text-center rounded-t-full">
                  Hình ảnh mang tính minh họa
                </figcaption>
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
      <div className="w-full px-8 sm:px-16 md:px-18 lg:px-40 py-12 md:py-20 flex flex-wrap flex-col md:flex-row gap-4 md:gap-6 bg-rose-50 justify-between items-center md:items-start">
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
