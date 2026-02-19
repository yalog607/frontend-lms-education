import React, { useEffect } from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore.js";

import LandingPage from "./Pages/LandingPage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import Home from "./Pages/Home.jsx";
import Courses from "./Pages/Courses.jsx";
import NotFound from "./Pages/NotFound.jsx";
import CourseDetail from "./Pages/CourseDetail.jsx";

import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";

import {
  AdminRoute,
  GuestRoute,
  ProtectedRoute,
} from "./Components/ProtectedRoutes.jsx";
import Profile from "./Pages/Profile.jsx";
import LessonPage from "./Pages/Lesson.jsx";

function App() {
  const { checkAuth, user, isCheckingAuth } = useAuthStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/course/:id"
          element={<CourseDetail />}
        />

        <Route
          path="/login"
          element={
            <GuestRoute user={user}>
              <Login />
            </GuestRoute>
          }
        />

        <Route
          path="/register"
          element={
            <GuestRoute user={user}>
              <Register />
            </GuestRoute>
          }
        />

        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home />
            </ProtectedRoute>
          }
        />

        <Route
          path="/courses"
          element={
            <ProtectedRoute user={user}>
              <Courses />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute user={user}>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learn/:courseId/play/:lessonId"
          element={
            <ProtectedRoute user={user}>
              <LessonPage/>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPage />
            </AdminRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" reverseOrder={true} />
    </>
  );
}

export default App;
