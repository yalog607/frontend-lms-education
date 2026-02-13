import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Sidebar from "../Components/Sidebar";
import SearchBar from "../Components/SearchBar";
import HeaderProfile from "../Components/HeaderProfile";

import { MdAccountBalance } from "react-icons/md";
import { FaBookReader } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { IoInformationCircleOutline } from "react-icons/io5";
import { RiDashboard3Line } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { MdOutlineSlowMotionVideo } from "react-icons/md";
import { GrCaretPrevious, GrCaretNext } from "react-icons/gr";

import { useGetUserCourse } from "../hooks/useCourse";
import { useGetUserEnrollment } from "../hooks/useEnrollment";

const Courses = () => {
  const { data: Courses, isLoading } = useGetUserCourse();
  const { data: enrollments, isLoading: isGettingEnrollment } =
    useGetUserEnrollment();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const allEnrollments = enrollments?.enrollments || [];

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  const currentItems = allEnrollments.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(allEnrollments.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleCourseClick = (id) => {
    navigate(`/courses/${id}`);
  };

  useEffect(() => {
    document.title = "My Courses";
  }, []);
  return (
    <>
      <div className="flex flex-col md:flex-row min-h-screen bg-base-200 font-sans items-start">
        <Sidebar />
        <div className="w-full min-h-screen mx-auto flex-1 flex flex-col bg-base-300 p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <div className="flex items-center justify-between gap-4 w-full">
            <div className="flex-1">
              <SearchBar />
            </div>
            <HeaderProfile />
          </div>

          <div className="bg-base-100 w-full rounded drop-shadow-md transition-all duration-300 p-6">
            <h1 className="font-bold text-lg mb-4 badge badge-soft badge-neutral">
              Enrolled Courses
            </h1>
            <div className="">
              {isLoading ? (
                <div className="col-span-full flex justify-center py-10">
                  <span className="loading loading-spinner loading-lg text-rose-500"></span>
                </div>
              ) : (
                <div className="w-full">
                  {Courses?.courses?.length === 0 ? (
                    <div className="w-full text-center py-10 text-gray-500 flex flex-col justify-center items-center">
                      <FaBookReader size={40} className="mb-2 opacity-50" />
                      <p>You haven't enrolled in any courses yet.</p>
                      <Link
                        to="/home"
                        className="btn btn-secondary btn-sm mt-4 text-white"
                      >
                        Browse Courses
                      </Link>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {Courses?.courses.map((c) => (
                        <div
                          className="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer"
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
                            <h2 className="font-medium text-md truncate w-full text-gray-800/80">
                              {c?.name}
                            </h2>
                            <p className="text-red-500/90 font-medium">
                              ${c?.price.toLocaleString()}
                            </p>
                            <div className="flex justify-between items-center text-sm text-gray-900/80 flex-wrap">
                              <div className="flex items-center justify-center gap-1">
                                <MdOutlineSlowMotionVideo />
                                <p>
                                  {c?.teacher_id?.first_name ||
                                    "Instructor"}{" "}
                                </p>
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
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-base-100 w-full rounded drop-shadow-md transition-all duration-300 p-6">
            <h1 className="font-bold text-lg mb-4 badge badge-soft badge-neutral">
              Enrollment
            </h1>

            {isGettingEnrollment ? (
              <div className="w-full flex justify-center items center p-20">
                <span className="loading loading-spinner loading-lg text-rose-500"></span>
              </div>
            ) : (
              <div>
                <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th></th>
                        <th>Course</th>
                        <th>Instructor</th>
                        <th>Date Paid</th>
                        <th>Price</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allEnrollments.length === 0 ? (
                        <tr>
                          <td colSpan="5" className="text-center py-10 w-full ">
                            <div className="flex flex-col items-center justify-center gap-3 text-gray-500">
                              <IoInformationCircleOutline size={40} />
                              <span className="font-medium text-lg">
                                No enrollment history found
                              </span>
                              <span className="text-sm">
                                When you buy a course, it will appear here.
                              </span>
                            </div>
                          </td>
                        </tr>
                      ) : (
                        currentItems.map((e, i) => (
                          <tr key={e._id} className="hover">
                            <th>{indexOfFirstItem + i + 1}</th>
                            <td className="font-medium">
                              <p
                                className="truncate hover:underline underline-offset-2 cursor-pointer"
                                onClick={() => {
                                  navigate(`/courses/${e?.course_id?._id}`);
                                }}
                              >
                                {e?.course_id?.name || "Unknown Course"}
                              </p>
                            </td>
                            <td>
                              <div className="flex flex-col items-start gap-1">
                                <div className="font-bold">
                                  {e?.course_id?.teacher_id?.first_name ||
                                    "UNKNOWN"}{" "}
                                  {e?.course_id?.teacher_id?.last_name || ""}
                                </div>
                                <div className="text-xs opacity-50">
                                  {e?.course_id?.teacher_id?.email ||
                                    "unknown@email.com"}
                                </div>
                              </div>
                            </td>
                            <td className="font-semibold">
                              {e?.enrollmentDate
                                ? new Date(e.enrollmentDate).toLocaleDateString(
                                    "vi-VN",
                                  )
                                : "N/A"}
                            </td>
                            <td className="text-rose-500 font-bold">
                              ${e?.pricePaid}
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>

                {totalPages > 0 && (
                  <div className="flex justify-center mt-2">
                    <div className="join">
                      {/* Nút Previous */}
                      <button
                        className="join-item btn btn-sm"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <GrCaretPrevious/>
                      </button>

                      {/* Render các số trang */}
                      {Array.from({ length: totalPages }, (_, index) => (
                        <button
                          key={index + 1}
                          className={`join-item btn btn-sm ${currentPage === index + 1 ? "btn-active btn-secondary" : ""}`}
                          onClick={() => handlePageChange(index + 1)}
                        >
                          {index + 1}
                        </button>
                      ))}

                      {/* Nút Next */}
                      <button
                        className="join-item btn btn-sm"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <GrCaretNext/>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Courses;
