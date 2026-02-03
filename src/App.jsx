import React, {useEffect} from "react";
import { Route, Routes, Link, NavLink } from "react-router-dom";
import LandingPage from "./Pages/LandingPage.jsx";
import AdminPage from "./Pages/AdminPage.jsx";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import { Toaster } from "react-hot-toast";
import useAuthStore from "./store/useAuthStore.js";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "./lib/axiosClient.js";
import Home from "./Pages/Home.jsx"

import { AdminRoute, GuestRoute, ProtectedRoute } from "./Components/ProtectedRoutes.jsx";

function App() {
  const { setUser } = useAuthStore();

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const token = localStorage.getItem("token");
      if (!token) return null;

      try {
        const res = await axiosClient.get("/auth/me"); 
        return res.user;
      // eslint-disable-next-line no-unused-vars
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [user, setUser]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        <span className="loading loading-dots loading-lg"></span>
      </div>
    )
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<LandingPage />} />

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
          path="/admin"
          element={
            <AdminRoute user={user}>
              <AdminPage />
            </AdminRoute>
          }
        />
        
        <Route path="*" element={<div>Trang không tồn tại</div>} />
      </Routes>
      <Toaster position="top-center" reverseOrder={true} />
    </>
  );
}

export default App;
