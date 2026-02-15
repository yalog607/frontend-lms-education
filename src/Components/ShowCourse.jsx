import React, {  } from "react";
import { useNavigate } from "react-router-dom";

import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineSlowMotionVideo } from "react-icons/md";

import { useGetCourse } from "../hooks/useCourse";

const ShowCourse = ({title}) => {
  const { data: AllCourses, isLoadingAllCourses } = useGetCourse();
  const navigate = useNavigate();

  const handleCourseClick = (id) => {
    navigate(`/course/${id}`);
  };
  return (
    <div className="bg-base-100 w-full rounded drop-shadow-md transition-all duration-300 p-6">
      <h1 className="font-bold text-lg">{title}</h1>
      <div className="w-full divider my-2"></div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {isLoadingAllCourses ? (
          <div className="col-span-full flex justify-center py-10">
            <span className="loading loading-spinner loading-lg text-rose-500"></span>
          </div>
        ) : (
          AllCourses?.courses.map((c) => (
            <div
              className="card bg-base-200/80 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
