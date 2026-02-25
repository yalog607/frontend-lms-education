import React from "react";
import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useCheckOwnCourse } from "../hooks/useCourse";

const ShowCourseDetail = ({ course: c }) => {
    const navigate = useNavigate();
    const { data: ownCourseData, isLoading } = useCheckOwnCourse(c._id);

    const handleCourseClick = (id) => {
        navigate(`/course/${id}`);
    }
  return (
    <div
      className="card bg-base-200/80 hover:drop-shadow-xl transition-all duration-300 hover:-translate-y-1 hover:scale-105  cursor-pointer border border-gray-500/10"
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
        <p className="text-success text-sm font-medium">
            {isLoading ? <span className="text-warning">Loading...</span> : ownCourseData?.isEnrolled ? 'Enrolled' : `$${c?.price.toLocaleString()}`}
        </p>
        <div className="flex justify-between items-center text-sm text-gray-700 flex-wrap">
          <div className="flex items-center justify-center gap-1">
            <FaChalkboardTeacher />
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
  );
};

export default ShowCourseDetail;
