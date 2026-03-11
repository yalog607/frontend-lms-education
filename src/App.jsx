import { useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore.js";

import React, { Suspense } from "react";
const LandingPage = React.lazy(() => import("./Pages/LandingPage.jsx"));
const Home = React.lazy(() => import("./Pages/Home.jsx"));
const Courses = React.lazy(() => import("./Pages/Courses.jsx"));
const NotFound = React.lazy(() => import("./Pages/NotFound.jsx"));
const CourseDetail = React.lazy(() => import("./Pages/CourseDetail.jsx"));
const AllCourses = React.lazy(() => import("./Pages/AllCourses.jsx"));
const Login = React.lazy(() => import("./Pages/Login.jsx"));
const Register = React.lazy(() => import("./Pages/Register.jsx"));
const Profile = React.lazy(() => import("./Pages/Profile.jsx"));
const LessonPage = React.lazy(() => import("./Pages/Lesson.jsx"));
const Notification = React.lazy(() => import("./Pages/Notification.jsx"));
const AdminDashboard = React.lazy(() => import("./Pages/admin/AdminDashboard.jsx"));
const UserManagement = React.lazy(() => import("./Pages/admin/UserManagement.jsx"));
const CourseManagement = React.lazy(() => import("./Pages/admin/CourseManagement.jsx"));
const TeacherDashboard = React.lazy(() => import("./Pages/teacher/TeacherDashboard.jsx"));
const MyCourses = React.lazy(() => import("./Pages/teacher/MyCourses.jsx"));
const LessonManager = React.lazy(() => import("./Pages/teacher/LessonManager.jsx"));
const InstructorNotification = React.lazy(() => import("./Pages/teacher/InstructorNotification.jsx"));
import {
  AdminRoute,
  CourseAccessRoute,
  GuestRoute,
  ProtectedRoute,
  TeacherRoute,
} from "./Components/ProtectedRoutes.jsx";

function App() {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-neutral-200">
        <span className="loading loading-dots loading-lg text-black"></span>
      </div>
    );
  }

  return (
    <>
      <Suspense fallback={<div className="h-screen w-screen flex justify-center items-center bg-neutral-200"><span className="loading loading-dots loading-lg text-black"></span></div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/course/:id" element={<CourseDetail />} />
          <Route path="/login" element={<GuestRoute user={user}><Login /></GuestRoute>} />
          <Route path="/register" element={<GuestRoute user={user}><Register /></GuestRoute>} />
          <Route path="/home" element={<ProtectedRoute user={user}><Home /></ProtectedRoute>} />
          <Route path="/all-courses" element={<GuestRoute user={user}><AllCourses /></GuestRoute>} />
          <Route path="/courses" element={<ProtectedRoute user={user}><Courses /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute user={user}><Profile /></ProtectedRoute>} />
          <Route path="/notification" element={<ProtectedRoute user={user}><Notification /></ProtectedRoute>} />
          <Route path="/learn/:courseId/play/:lessonId" element={<ProtectedRoute user={user}><CourseAccessRoute user={user}><LessonPage /></CourseAccessRoute></ProtectedRoute>} />
          <Route path="/admin" element={<AdminRoute user={user}><Navigate to="/admin/dashboard" replace /></AdminRoute>} />
          <Route path="/admin/dashboard" element={<AdminRoute user={user}><AdminDashboard /></AdminRoute>} />
          <Route path="/admin/users" element={<AdminRoute user={user}><UserManagement /></AdminRoute>} />
          <Route path="/admin/courses" element={<AdminRoute user={user}><CourseManagement /></AdminRoute>} />
          <Route path="/teacher" element={<TeacherRoute user={user}><Navigate to="/teacher/dashboard" replace /></TeacherRoute>} />
          <Route path="/teacher/dashboard" element={<TeacherRoute user={user}><TeacherDashboard /></TeacherRoute>} />
          <Route path="/teacher/my-courses" element={<TeacherRoute user={user}><MyCourses /></TeacherRoute>} />
          <Route path="/teacher/lessons" element={<TeacherRoute user={user}><LessonManager /></TeacherRoute>} />
          <Route path="/teacher/notifications" element={<TeacherRoute user={user}><InstructorNotification /></TeacherRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
