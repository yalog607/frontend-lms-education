import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
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
import ShowCourse from "../Components/ShowCourse";

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

  useEffect(() => {
    document.title = "My Courses";
  }, []);
  return (
    <>
      <Helmet>
        <title>Yalina - My Courses</title>
        <meta name="description" content="Các khóa học bạn đã đăng ký trên Yalina." />
        <meta property="og:title" content="Yalina - My Courses" />
        <meta property="og:description" content="Các khóa học bạn đã đăng ký trên Yalina." />
      </Helmet>
      <div className="flex flex-col md:flex-row min-h-screen bg-white font-sans items-start">
        <Sidebar />
        <div className="container w-full min-h-screen mx-auto flex-1 flex flex-col bg-white p-4 sm:p-6 lg:p-8 gap-4 sm:gap-6 overflow-x-hidden overflow-y-auto">
          <ShowCourse data={Courses} isLoading={isLoading} title={"Enrolled Courses"} none={"You haven't enrolled in any courses yet."} />

          <div className="bg-white w-full rounded drop-shadow-md transition-all duration-300 p-6 border border-gray-500/10">
            <h1 className="font-bold text-xl text-black">Enrollment</h1>

            <div className="w-full divider my-1"></div>

            {isGettingEnrollment ? (
              <div className="w-full flex justify-center items center p-20">
                <span className="loading loading-spinner loading-lg text-rose-500"></span>
              </div>
            ) : (
              <div>
                <div className="overflow-x-auto rounded-box border border-gray-200/50 bg-white">
                  <table className="table text-black">
                    {/* head */}
                    <thead>
                      <tr className="text-black">
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
                            <td className="font-medium text-primary">
                              <p
                                className="truncate hover:underline underline-offset-2 cursor-pointer"
                                onClick={() => {
                                  navigate(`/course/${e?.course_id?._id}`);
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
                            <td className="font-semibold text-warning">
                              {e?.enrollmentDate
                                ? new Date(e.enrollmentDate).toLocaleDateString(
                                    "vi-VN",
                                  )
                                : "N/A"}
                            </td>
                            <td className="text-success font-medium">
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
                        className="join-item btn btn-sm bg-neutral-200 text-gray-500"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        <GrCaretPrevious />
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
                        className="join-item btn btn-sm bg-neutral-200 text-gray-500"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        <GrCaretNext />
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
