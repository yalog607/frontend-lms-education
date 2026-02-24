// pages/CourseDetail.jsx
import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

import { IoMdArrowRoundBack } from "react-icons/io";

import SearchBar from "../Components/SearchBar";
import HeaderProfile from "../Components/HeaderProfile";
import useAuthStore from "../store/useAuthStore";
import { useGetCourse } from "../hooks/useCourse";
import ShowCourse from "../Components/ShowCourse";

const AllCourses = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();

  const { data: AllCourses, isLoading } = useGetCourse();

  useEffect(() => {
    document.title = "All Courses";
  }, []);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col min-h-screen bg-base-100 font-sans items-start">
        <div className="container w-full flex-1 mx-auto min-h-screen bg-base-100 flex flex-col p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <div
              className="flex items-center justify-start gap-1 cursor-pointer hover:-translate-x-1 hover:text-rose-500 transition-all duration-200"
              onClick={() => navigate(-1)}
            >
              <IoMdArrowRoundBack />
              <span className="">Back</span>
            </div>
            <div className="flex-1">
              <SearchBar />
            </div>
            {user ? (
              <HeaderProfile />
            ) : (
              <Link
                to={"/home"}
                className="btn px-8 py-1 rounded-lg border-2 border-rose-500 bg-rose-50 text-rose-500 hover:bg-rose-600 hover:text-base-100 transition-colors duration-300 font-bold"
              >
                Let's Try
              </Link>
            )}
          </div>

          <div className="w-full p-4 md:p-8">
            <ShowCourse
              title="All Courses"
              data={AllCourses}
              isLoading={isLoading}
              none={"No Courses Found"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AllCourses;
