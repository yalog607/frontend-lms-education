import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import HeaderProfile from "../Components/HeaderProfile";

import Slideshow from "../Components/Slideshow";
import ShowCourse from "../Components/ShowCourse";

import { useGetCourse } from "../hooks/useCourse";

const Home = () => {
  const { data: AllCourses, isLoading } = useGetCourse();
  useEffect(() => {
    document.title = "Dashboard";
  }, []);
  return (
    <>
      <Helmet>
        <title>Yalina - Dashboard</title>
        <meta name="description" content="Khám phá các khóa học mới nhất trên Yalina." />
        <meta property="og:title" content="Yalina - Dashboard" />
        <meta property="og:description" content="Khám phá các khóa học mới nhất trên Yalina." />
      </Helmet>
      <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans items-start">
        <Sidebar />
        <div className="container w-full min-h-screen mx-auto flex-1 flex flex-col bg-white p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex-1">
              <SearchBar />
            </div>
            <HeaderProfile />
          </div>

          <Slideshow />

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

export default Home;
