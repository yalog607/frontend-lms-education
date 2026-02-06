import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaChartLine,
  FaBook,
  FaComments,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";
import useAuthStore from "../store/useAuthStore";
import { useAuth } from "../hooks/useAuth";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(true);
  const { logout } = useAuth();
  const {user} = useAuthStore();
  if (!user) return null;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  
  const handleLogoutClick = () => {
    logout();
  }

  const menuItems = [
    { name: "Dashboard", icon: FaChartLine, path: "/home" },
    { name: "Course", icon: FaBook, path: "/home/courses" },
    { name: "Communication", icon: FaComments, path: "/home/communication" },
    { name: "Revenue", icon: FaMoneyBillWave, path: "/Revenue" },
    { name: "Setting", icon: FaCog, path: "/setting" },
  ];

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden p-4 flex items-center justify-between sticky top-0 z-50 shadow">
        <div className="flex items-center gap-3">
          <div className="w-full rounded-full bg-gradient-to-r from-rose-500 bg-clip-text text-transparent to-rose-400 flex items-center justify-center font-bold text-3xl">
            Yalina
          </div>
        </div>
        <button
          onClick={toggleSidebar}
          className="p-2 hover:bg-rose-50 text-rose-500 rounded-lg transition-colors cursor-pointer"
        >
          {isOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden max-h-96 overflow-y-auto">
          <nav className="flex flex-col p-4 space-y-2">
            {menuItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.name}
                  className="w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-rose-50 hover:text-rose-500 transition-colors group text-gray-600"
                >
                  <IconComponent className={`${item.color} text-lg`} />
                  <span className="text-sm font-medium">{item.name}</span>
                </button>
              );
            })}
          </nav>
          <div className="p-4 border-t border-gray-500">
            <div className="flex items-center">
              <div>
                <Link className="text-sm font-semibold truncate hover:underline" to={"/setting"}>{user.first_name} {user.last_name}</Link>
                {user.role === 'admin' ? <Link to={'/admin'} className="text-xs truncate block">{user.role}</Link> : <p className="text-xs truncate">{user.role}</p>}
              </div>
              <button onClick={handleLogoutClick} className="ml-auto p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer">
                <FaSignOutAlt className="text-red-500" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen text-gray-800 transition-all duration-300 flex-col ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* Header - Avatar và tên Yalina */}
        <div className="p-4 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3 flex-1">
              <div className="w-full bg-linear-to-r from-rose-500 to-rose-400 bg-clip-text text-transparent flex items-center justify-center font-bold text-3xl cursor-pointer select-none">
                Yalina
              </div>
            </div>
          )}

          {/* Nút toggle */}
          <button
            onClick={toggleSidebar}
            className="mx-auto p-1 hover:bg-rose-50 rounded-lg transition-all duration-300 ml-auto cursor-pointer"
            title={isOpen ? "Thu nhỏ" : "Mở rộng"}
          >
            <FaChevronLeft
              size={18}
              className={`text-rose-500 transition-transform duration-300 ${!isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-3 py-6 space-y-4 overflow-y-auto">
          {menuItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <NavLink
                key={item.name}
                to={item.path} 
                end={item.path === "/"}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group cursor-pointer
        ${
          isActive
            ? "bg-rose-50 text-rose-500" // Khi đang Active: Nền hồng nhạt, Chữ đỏ
            : "text-gray-600 hover:bg-rose-50 hover:text-rose-500" // Khi bình thường: Chữ xám, Hover mới đỏ
        }`
                }
              >
                <IconComponent className="text-lg flex-shrink-0 transition-colors" />

                {isOpen && (
                  <span className="text-sm font-medium transition-colors">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Footer - Avatar Manager và nút đăng xuất */}
        <div className="p-4">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <Link to='/setting' className="text-sm font-semibold truncate hover:underline">{user.first_name} {user.last_name}</Link>
                  {user.role ? <Link to={"/admin"} className="text-xs text-gray-400 truncate block">{user.role}</Link> : <p className="text-xs text-gray-400 truncate">{user.role}</p>}
                </div>
              </div>
            )}

            <button
                onClick={handleLogoutClick}
              className="flex-1 md:flex-0 p-2 mx-auto hover:bg-rose-50 rounded-lg transition-colors flex-shrink-0 cursor-pointer"
              title="Đăng xuất"
            >
              <FaSignOutAlt className="text-rose-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
