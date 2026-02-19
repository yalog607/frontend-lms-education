import React from "react";
import { useNavigate } from "react-router-dom";

import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";

const ShowCourse = ({ title, data, isLoading, none }) => {
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };
  return (
    <div className="bg-base-100 w-full rounded transition-all duration-300">
      <h1 className="font-bold text-xl mb-4">{title}</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {isLoading ? (
          <>
            <div className="skeleton w-full h-64"></div>
          </>
        ) : data?.courses.length === 0 ? (
          <div className="w-full mx-auto col-span-5 text-center py-10 text-gray-500 flex flex-col justify-center items-center">
            <FaBookReader size={40} className="mb-2 opacity-50" />
            <p>{none}</p>
          </div>
        ) : (
          data?.courses.map((c) => (
            <div
              className="card bg-base-200/80 hover:drop-shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border border-gray-500/10"
              onClick={() => handleCourseClick(c?._id)}
              key={c?._id}
            >
              <figure className="w-full h-48 bg-gray-100">
                <img
                  className="w-full h-full object-cover"
                  src={c?.thumbnail}
                  alt="Course"
                />
              </figure>
              <div className="p-4 md:p-6 flex flex-col gap-2 justify-start">
                <h2 className="font-medium text-md truncate w-full text-gray-800/80 line-clamp-2">
                  {c?.name}
                </h2>
                <p className="text-orange-600 text-sm font-medium">
                  ${c?.price.toLocaleString()}
                </p>
                <div className="flex justify-between items-center text-sm text-gray-700 flex-wrap">
                  <div className="flex items-center justify-center gap-1">
                    <MdOutlineSlowMotionVideo />
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
  );
};

export default ShowCourse;
