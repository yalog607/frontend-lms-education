// pages/CourseDetail.jsx
import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import {
  FaCheck,
  FaPlayCircle,
  FaBatteryFull,
  FaFilm,
  FaClock,
  FaInfinity,
  FaPlay,
} from "react-icons/fa";
import { IoIosAdd, IoIosRemove, IoMdArrowRoundBack } from "react-icons/io";

import { useCourseById } from "../hooks/useCourse";
import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import HeaderProfile from "../Components/HeaderProfile";
import useAuthStore from "../store/useAuthStore";
import Header from "../Components/Header";
import Footer from "../Components/Footer";

const formatDuration = (totalMinutes) => {
    if (!totalMinutes) return "0 minute";
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;

    let mStr = minutes > 0 ? "minutes" : "minute";
    let hStr = hours > 0 ? "hours" : "hour";

    if (hours > 0) {
        return `${hours} ${mStr} ${minutes} ${hStr}`;
    }
    return `${minutes} ${mStr}`;
};

const CourseDetail = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const { id } = useParams();

  const { data: Course, isLoading } = useCourseById(id);

  const [openChapters, setOpenChapters] = useState([]);

  const benefits = [
    "Learn from every time, everywhere",
    "Online professional instructors",
    "Friendly user interface",
    "Support 24/7",
  ];

  const toggleChapter = (chapterId) => {
    if (openChapters.includes(chapterId)) {
      setOpenChapters(openChapters.filter((c) => c !== chapterId));
    } else {
      setOpenChapters([...openChapters, chapterId]);
    }
  };

  const handleExpandAll = () => {
    const allSectionIds = Course.course.sections.map((c) => c._id);
    if (openChapters.length === allSectionIds.length) {
      setOpenChapters([]);
    } else {
      setOpenChapters(allSectionIds);
    }
  };

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-base-100 font-sans items-start">
        {user && <Sidebar />}
        <div className="container w-full flex-1 mx-auto min-h-screen bg-base-100 flex flex-col p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <div
              className="flex items-center justify-start gap-1 cursor-pointer hover:-translate-x-1 transition-all duration-200"
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

          <div className="w-full grid cols-1 md:grid-cols-3 mt-4 md:mt-6 gap-4 md:gap-8">
            <div className="lg:col-span-2">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                {Course.course.name}
              </h1>
              <p className="text-gray-600 mb-8">{Course.course.description}</p>

              {/* Mục: Bạn sẽ học được gì */}
              <div className="mb-10">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  What do you have?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {benefits.map((item, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <FaCheck
                        className="text-rose-500 mt-1 shrink-0"
                        size={14}
                      />
                      <span className="text-gray-600 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mục: Nội dung khóa học */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-800">
                    Course content
                  </h2>
                </div>

                {/* Thống kê nhỏ */}
                <div className="flex justify-between items-center text-sm text-gray-600 mb-3">
                  <span>
                    <strong>{Course.course.sections.length}</strong>{" "}
                    {Course.course.sections.length > 0 ? "sections" : "section"}{" "}
                    •<strong> {Course.course.lessons_length}</strong>{" "}
                    {Course.course.lessons_length > 0 ? "lessons" : "lesson"} •
                    Duration <strong>{Course.course.totalDuration}</strong>
                  </span>
                  <button
                    onClick={handleExpandAll}
                    className={`text-rose-500 font-semibold hover:text-rose-600 cursor-pointer select-none ${Course.course.lessons_length == 0 && "hidden"}`}
                  >
                    {openChapters.length === Course.course.sections.length
                      ? "Collapse all"
                      : "Expand all"}
                  </button>
                </div>

                {/* Danh sách Chương (Accordion) */}
                <div className="flex flex-col gap-2">
                  {Course.course.sections.map((chapter) => (
                    <div
                      key={chapter._id}
                      className="border border-gray-200 rounded-lg overflow-hidden"
                    >
                      {/* Header của Chương */}
                      <div
                        className="bg-gray-100 p-4 flex justify-between items-center cursor-pointer hover:bg-gray-200 transition-colors select-none"
                        onClick={() => toggleChapter(chapter._id)}
                      >
                        <div className="flex items-center gap-2 font-semibold text-gray-800">
                          {openChapters.includes(chapter._id) ? (
                            <IoIosRemove />
                          ) : (
                            <IoIosAdd />
                          )}
                          {chapter.title}
                        </div>
                        <span className="text-sm text-gray-500">
                          {chapter.lessons.length} bài học
                        </span>
                      </div>

                      {/* Nội dung bài học (Collapse) */}
                      <div
                        className={`bg-white transition-all duration-300 ease-in-out ${openChapters.includes(chapter._id) ? " opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}
                      >
                        <ul className="divide-y divide-gray-100">
                          {chapter.lessons.map((lesson) => (
                            <li
                              key={lesson._id}
                              className="flex justify-between items-center p-3 px-4 hover:bg-gray-50 cursor-pointer group"
                            >
                              <div className="flex items-center gap-3">
                                <FaPlayCircle className="text-rose-400 group-hover:text-rose-500 text-lg" />
                                <span className="text-gray-700 text-sm group-hover:text-gray-900">
                                  {lesson.title}
                                </span>
                              </div>
                              <span className="text-xs font-medium text-gray-500">{formatDuration(lesson.duration)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="md:col-span-1">
              <div className="sticky top-4 bg-base-100 overflow-hidden pb-4 md:pb-6">
                <div className="relative overflow-hidden rounded-2xl shadow-sm cursor-pointer group aspect-video mb-5">
                  <img
                    src={Course.course.thumbnail}
                    alt={Course.course.name}
                    className="w-full h-full object-cover"
                  />
                  {/* Overlay Play Button */}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all flex items-center justify-center z-20">
                    <FaPlayCircle className="text-white text-6xl drop-shadow-xl" />
                  </div>
                </div>

                <div className="text-center px-4">
                  <h2 className="text-3xl font-light text-orange-600 mb-4">
                    {Course.course.price > 0
                      ? `$${Course.course.price.toLocaleString("en-US")}`
                      : "Free"}
                  </h2>

                  <button className="btn btn-secondary text-white rounded-full w-full lg:w-1/2 font-bold text-md mb-6 shadow-md">
                    Enroll
                  </button>

                  {/* List thông tin chi tiết */}
                  <ul className="text-left space-y-3">
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <FaBatteryFull className="text-gray-800" />
                      <span className="">
                        Level:{" "}
                        <span className="font-medium">
                          {Course.course.level}
                        </span>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <FaFilm className="text-gray-800" />
                      <span>
                        Tổng số <strong>{Course.course.lessons_length}</strong>{" "}
                        bài học
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <FaClock className="text-gray-800" />
                      <span>
                        Thời lượng{" "}
                        <strong>{Course.course.totalDuration}</strong>
                      </span>
                    </li>
                    <li className="flex items-center gap-3 text-gray-600 text-sm">
                      <FaInfinity className="text-gray-800" />
                      <span>Learn from every time, everywhere</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseDetail;
