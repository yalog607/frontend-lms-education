import {} from "react";
import { useNotifications } from '../hooks/useNotification';
import { NavLink, Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaBook,
  FaComments,
  FaSignOutAlt,
  FaChevronLeft,
} from "react-icons/fa";
import { RiProfileLine } from "react-icons/ri";
import { MdRateReview, MdNotificationsActive } from "react-icons/md";
import useAuthStore from "../store/useAuthStore";
import { useAuth } from "../hooks/useAuth";
import { useLocalStorage } from "../hooks/useLocalStorage";

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useLocalStorage("sidebar-open", false);
  const { logout } = useAuth();
  const { user } = useAuthStore();
  if (!user) return null;

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const handleLogoutClick = () => {
    logout();
  };

  const managementPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : user?.role === "instructor" || user?.role === "teacher"
        ? "/teacher/dashboard"
        : null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { unreadCount } = useNotifications();
  const menuItems = [
    { name: "Dashboard", icon: FaHome, path: "/home" },
    { name: "My Courses", icon: FaBook, path: "/courses" },
    { name: "Profile", icon: RiProfileLine, path: "/profile" },
    {
      name: "Notifications",
      icon: MdNotificationsActive,
      path: "/notification",
      badge: unreadCount > 0 ? unreadCount : null,
    },
  ];

  if (managementPath) {
    menuItems.push({
      name: "Management",
      icon: MdRateReview,
      path: managementPath,
    });
  }

  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden sticky top-0 z-100 w-full">
        <div className="p-4 flex items-center justify-between shadow bg-white relative z-50">
          <div className="flex items-center gap-3">
            <div
            onClick={() => navigate('/home')}
            className="w-full rounded-full drop-shadow bg-linear-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text flex items-center justify-center font-bold text-3xl">
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
          <div className="md:hidden overflow-y-auto bg-white shadow">
            <nav className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <NavLink
                    key={item.name}
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group 
                        ${isActive ? 'bg-rose-50 text-rose-500' : 'text-gray-600 hover:bg-rose-50 hover:text-rose-500'}
                    `
                    }
                  >
                    <IconComponent className={`${item.color} text-lg`} />
                    <span className="text-sm font-medium">{item.name}</span>
                    {item.name === "Notifications" && item.badge > 0 && (
                      <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-500">
              <div className="flex items-center">
                <div>
                  <Link
                    className="text-sm font-semibold text-neutral-900 truncate hover:underline"
                    to={"/setting"}
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                  {user.role === "admin" ? (
                    <Link to={"/admin/dashboard"} className="text-xs text-primary truncate block te">
                      {user.role}
                    </Link>
                  ) : user.role === "instructor" || user.role === "teacher" ? (
                    <Link to={"/teacher/dashboard"} className="text-xs text-primary truncate block">
                      {user.role}
                    </Link>
                  ) : (
                    <p className="text-xs text-neutral-900 truncate">{user.role}</p>
                  )}
                </div>
                <button
                  onClick={handleLogoutClick}
                  className="ml-auto p-2 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                  title="Log out"
                >
                  <FaSignOutAlt className="text-red-500" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen text-gray-800 transition-all duration-300 flex-col bg-white border-r border-gray-500/10
          sticky top-0 overflow-hidden
          ${isOpen ? "w-64" : "w-20"}`}
      >
        {/* Header - Avatar và tên Yalina */}
        <div className="p-4 flex items-center justify-between">
          {isOpen && (
            <div className="flex items-center gap-3 flex-1">
              <div
              onClick={() => navigate('/home')}
              className="w-full bg-linear-to-r drop-shadow from-rose-600 to-rose-400 bg-clip-text text-transparent flex items-center justify-center font-bold text-3xl cursor-pointer select-none">
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
                <IconComponent className="text-lg shrink-0 transition-colors" />
                {isOpen && (
                  <span className="text-sm font-medium transition-colors">
                    {item.name}
                  </span>
                )}
                {item.name === "Notifications" && item.badge && isOpen > 0 && (
                  <span className="ml-2 bg-red-500 text-white rounded-full px-2 text-xs">
                    {item.badge}
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
                  <Link
                    to="/profile"
                    className="text-sm font-semibold text-neutral-900 truncate hover:underline"
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                  {managementPath ? (
                    <Link
                      to={managementPath}
                      className="text-xs text-primary truncate block"
                    >
                      {user.role}
                    </Link>
                  ) : (
                    <p className="text-xs text-neutral-900 truncate">
                      {user.role}
                    </p>
                  )}
                </div>
              </div>
            )}

            <button
              onClick={handleLogoutClick}
              className="flex-1 md:flex-0 p-2 mx-auto hover:bg-rose-50 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Log out"
            >
              <FaSignOutAlt className="text-rose-500" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
