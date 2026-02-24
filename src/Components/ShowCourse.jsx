import React from "react";
import { FaBookReader } from "react-icons/fa";

import ShowCourseDetail from "./ShowCourseDetail";

const ShowCourse = ({ title, data, isLoading, none }) => {
  return (
    <div className="bg-base-100 w-full rounded transition-all duration-300">
      { title && <h1 className="font-bold text-xl mb-4">{title}</h1>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {isLoading ? (
          <>
            <div className="skeleton w-full h-64"></div>
            <div className="skeleton w-full h-64"></div>
            <div className="skeleton w-full h-64"></div>
            <div className="skeleton w-full h-64"></div>
          </>
        ) : data?.courses.length === 0 ? (
          <div className="w-full mx-auto col-span-5 text-center py-10 text-gray-500 flex flex-col justify-center items-center">
            <FaBookReader size={40} className="mb-2 opacity-50" />
            <p>{none}</p>
          </div>
        ) : (
          data?.courses.map((c) => (
            <ShowCourseDetail course={c} key={c._id} />
          ))
        )}
      </div>
    </div>
  );
};

export default ShowCourse;
