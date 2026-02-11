import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import HeaderProfile from "../Components/HeaderProfile";

import { MdAccountBalance } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { FaArrowRight } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import { useGetCourse } from "../hooks/useCourse";

const Home = () => {
  const { user } = useAuthStore();
  const { data: Courses, isLoading } = useGetCourse();
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  }

  useEffect(() => {
    document.title = "Yalina | Dashboard";
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-base-200 font-sans">
        <Sidebar />
        <div className="w-full mx-auto flex-1 flex flex-col bg-base-300 p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex-1">
              <SearchBar />
            </div>
            <HeaderProfile />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {/* Card 1: User */}
            <div className="stat bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl hover:-translate-y-1 border border-base-200/50">
              <div className="stat-figure text-rose-500 bg-rose-50 p-3 rounded-xl">
                <IoInformationCircleOutline className="h-7 w-7 inline-block stroke-current" />
              </div>
              <div className="stat-title text-gray-500 font-medium">
                User Profile
              </div>
              <div className="stat-value text-2xl truncate mt-1">
                {user?.first_name} {user?.last_name}
              </div>
              <div className="stat-desc mt-1 font-medium text-gray-500 capitalize">
                Role: <span className="text-rose-500">{user?.role}</span>
              </div>
              <div
                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between rounded cursor-pointer group"
                onClick={() => navigate("/profile")}
              >
                <Link
                  to="/profile"
                  className="text-sm font-semibold text-gray-500 group-hover:text-rose-500 transition-colors"
                >
                  View details
                </Link>
                <FaArrowRight className="text-gray-400 group-hover:text-rose-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Card 2: Enrolled Courses */}
            <div className="stat bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl hover:-translate-y-1 border border-base-200/50">
              <div className="stat-figure text-blue-500 bg-blue-50 p-3 rounded-xl">
                <FaBookReader className="h-7 w-7 stroke-current" />
              </div>
              <div className="stat-title text-gray-500 font-medium">
                Enrolled Courses
              </div>
              <div className="stat-value text-2xl mt-1 text-blue-600">
                {user?.enrolled_courses?.length || 0}
              </div>
              <div
                className="stat-desc mt-1 truncate max-w-50"
                title={
                  user?.enrolled_courses?.length
                    ? user.enrolled_courses[0]?.name
                    : ""
                }
              >
                {user?.enrolled_courses?.length
                  ? `Latest: ${user.enrolled_courses[0]?.name}`
                  : "You haven't taken any courses"}
              </div>
              <div
                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between rounded cursor-pointer group"
                onClick={() => navigate("/courses")}
              >
                <Link
                  to="/courses"
                  className="text-sm font-semibold text-gray-500 group-hover:text-blue-500 transition-colors"
                >
                  View details
                </Link>
                <FaArrowRight className="text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>

            {/* Card 3: Balance */}
            <div className="stat bg-base-100 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl hover:-translate-y-1 border border-base-200/50 md:col-span-2 lg:col-span-1">
              <div className="stat-figure text-emerald-500 bg-emerald-50 p-3 rounded-xl">
                <MdAccountBalance className="h-7 w-7 stroke-current" />
              </div>
              <div className="stat-title text-gray-500 font-medium">
                Balance
              </div>
              <div className="stat-value text-2xl mt-1 text-emerald-600">
                <span className="text-2xl">$</span>
                {user?.balance?.toLocaleString("vi-VN")}{" "}
              </div>
              <div className="stat-desc mt-1 truncate max-w-50">
                Updated:{" "}
                {user?.updatedAt
                  ? new Date(user.updatedAt).toLocaleString("vi-VN")
                  : "N/A"}
              </div>
              <div
                className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between rounded cursor-pointer group"
                onClick={() => navigate("/profile")}
              >
                <Link
                  to="/profile"
                  className="text-sm font-semibold text-gray-500 group-hover:text-emerald-500 transition-colors"
                >
                  Manage funds
                </Link>
                <FaArrowRight className="text-gray-400 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </div>

          <div className="bg-base-100 w-full rounded drop-shadow-md transition-all duration-300 p-6">
            <h1 className="font-bold text-xl text-stone-900 mb-4">Courses</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-10">
                  <span className="loading loading-spinner loading-lg text-rose-500"></span>
                </div>
              ) : (
                Courses?.courses.map((c) => (
                  <div className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                    onClick={() => handleCourseClick(c?._id)}
                    key={c?._id}
                  >
                    <figure className="w-full h-48 bg-gray-100">
                      <img className="w-full h-full object-cover" src={c?.thumbnail} alt="Course" />
                    </figure>
                    <div className="p-4 md:p-6 flex flex-col gap-2 justify-start">
                      <h2 className="font-medium text-md truncate w-full text-gray-800/80">{c?.name}</h2>
                      <p className="text-red-500/90 font-medium">${c?.price.toLocaleString()}</p>
                      <div className="flex justify-between items-center text-sm text-gray-900/80">
                        <div className="hidden md:flex items-center justify-center gap-1">
                          <MdOutlineSlowMotionVideo  />
                          <p>{c?.teacher_id?.first_name || "Instructor"} </p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <RiAccountCircleLine />
                          <p>{c?.studentCount} </p>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <RiDashboard3Line />
                          <p>{c?.level} </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
