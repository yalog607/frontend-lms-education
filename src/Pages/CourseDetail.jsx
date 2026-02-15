// pages/CourseDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // 1. Import useParams
import axiosClient from "../lib/axiosClient";
import { toast } from "react-hot-toast";

const CourseDetail = () => {
  // 2. Lấy ID từ URL
  // Tên biến 'id' phải khớp với tên bạn đặt trong App.jsx (path="/course/:id")
  const { id } = useParams(); 

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseDetail = async () => {
      try {
        setLoading(true);
        // 3. Gọi API với ID lấy được
        const res = await axiosClient.get(`/course/get-course/${id}`); 
        
        if (res.success) {
            setCourse(res.course);
        }
      } catch (error) {
        console.error("Lỗi lấy chi tiết khóa học:", error);
        toast.error("Không tìm thấy khóa học!");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
        fetchCourseDetail();
    }
  }, [id]); // Chạy lại khi ID thay đổi

  if (loading) return <div>Loading...</div>;
  if (!course) return <div>Khóa học không tồn tại</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">{course.name}</h1>
      <p>ID khóa học này là: {id}</p>
      {/* Hiển thị các thông tin khác của course */}
      <img src={course.thumbnail} alt={course.name} />
      <p>{course.description}</p>
    </div>
  );
};

export default CourseDetail;