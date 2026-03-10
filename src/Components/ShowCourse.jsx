import React, {useState} from "react";
import { FaBookReader } from "react-icons/fa";

import ShowCourseDetail from "./ShowCourseDetail";

import { useGetEnrolledCourseIds } from "../hooks/useCourse";

const ShowCourse = ({ title, data, isLoading, none }) => {
  const [visibleCount, setVisibleCount] = useState(5);
  const { data: enrolledCourseIds } = useGetEnrolledCourseIds();

  return (
    <div className="bg-white w-full rounded transition-all duration-300">
      { title && <h1 className="font-bold text-xl mb-4 text-black">{title}</h1>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6">
        {isLoading ? (
          <>
            <div className="skeleton w-full h-64 bg-neutral-200"></div>
            <div className="skeleton w-full h-64 bg-neutral-200"></div>
            <div className="skeleton w-full h-64 bg-neutral-200"></div>
            <div className="skeleton w-full h-64 bg-neutral-200"></div>
          </>
        ) : data?.courses.length === 0 ? (
          <div className="w-full mx-auto col-span-5 text-center py-10 text-gray-500 flex flex-col justify-center items-center">
            <FaBookReader size={40} className="mb-2 opacity-50" />
            <p>{none}</p>
          </div>
        ) : (
          data?.courses.slice(0, visibleCount).map((c) => (
            <ShowCourseDetail course={c} key={c._id} isEnrolled={enrolledCourseIds?.courseIds?.includes(c._id)} />
          ))
        )}
      </div>
      {data?.courses.length > visibleCount && (
        <div className="flex justify-center mt-4">
          <button
            className="btn btn-outline btn-secondary btn-sm w-32"
            onClick={() => setVisibleCount((prev) => prev + 10)}
          >
            Show more
          </button>
        </div>
      )}
    </div>
  );
};

export default ShowCourse;
