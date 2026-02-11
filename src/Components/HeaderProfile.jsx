import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { FaCog } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import useAuthStore from "../store/useAuthStore";
import { useAuth } from "../hooks/useAuth";
import default_avatar from "../assets/images/default_avatar.png"

const HeaderProfile = () => {
  const { user } = useAuthStore();
  const { logout } = useAuth();

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    logout();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="avatar cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <div
          className={`w-10 h-10 rounded-full ring-2 ring-offset-2 transition-all duration-200 ${isOpen ? "ring-rose-500 ring-offset-rose-100" : "ring-gray-200 ring-offset-base-100 hover:ring-rose-300"}`}
        >
          <img
            src={user.avatar || default_avatar}
            alt="User Avatar"
            className="object-cover"
          />
        </div>
      </div>

      {isOpen && (
        <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50 animate-fadeIn">
          {/* Header của Dropdown: Hiển thị tên & email */}
          <div className="px-5 py-4 border-b border-gray-100 bg-gray-50/50">
            <p className="text-sm font-bold text-gray-800 truncate">
              {user.first_name} {user.last_name}
            </p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>

          {/* Danh sách Menu */}
          <div className="p-2 flex flex-col gap-1">
            <Link
              to="/profile"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
            >
              <FaUser className="text-lg" />
              Hồ sơ cá nhân
            </Link>

            <Link
              to="/my-courses"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
            >
              <FaBook className="text-lg" />
              Khóa học của tôi
            </Link>

            <Link
              to="/setting"
              onClick={() => setIsOpen(false)}
              className="flex items-center gap-3 px-3 py-2 text-sm font-medium text-gray-700 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-colors"
            >
              <FaCog className="text-lg" />
              Cài đặt
            </Link>
          </div>

          {/* Nút Đăng xuất */}
          <div className="p-2 border-t border-gray-100">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium text-rose-500 rounded-lg hover:bg-red-50 transition-colors cursor-pointer"
            >
              <FaSignOutAlt className="text-lg" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeaderProfile;
