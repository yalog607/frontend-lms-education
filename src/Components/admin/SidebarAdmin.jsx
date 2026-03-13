
import { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaChartLine, FaBook, FaUsers, FaSignOutAlt, FaChevronLeft } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore.js';

const menuItems = [
  {
    to: '/admin/dashboard',
    label: 'Admin Dashboard',
    icon: FaChartLine,
  },
  {
    to: '/admin/users',
    label: 'User Management',
    icon: FaUsers,
  },
  {
    to: '/admin/courses',
    label: 'Course Management',
    icon: FaBook,
  },
];

export default function SidebarAdmin() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  if (!user) return null;

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  // Responsive: Mobile Navbar
  // Desktop Sidebar
  return (
    <>
      {/* Mobile Navbar */}
      <div className="md:hidden sticky top-0 z-100 w-full">
        <div className="p-4 flex items-center justify-between shadow bg-primary relative z-50">
          <div className="flex items-center gap-3">
            <div
              onClick={() => navigate('/home')}
              className="w-full rounded-full drop-shadow bg-linear-to-r from-rose-600 to-rose-400 text-transparent bg-clip-text flex items-center justify-center font-bold text-3xl">
              Yalina
            </div>
          </div>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-primary/20 text-primary rounded-lg transition-colors cursor-pointer"
          >
            <FaChevronLeft size={20} className={isOpen ? '' : 'rotate-180'} />
          </button>
        </div>
        {isOpen && (
          <div className="md:hidden overflow-y-auto bg-primary/5 shadow">
            <nav className="flex flex-col p-4 space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.label}
                    to={item.to}
                    onClick={() => setIsOpen(false)}
                    className={({ isActive }) =>
                      `w-full cursor-pointer flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group 
                        ${isActive ? 'bg-primary/20 text-primary' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`
                    }
                  >
                    <Icon className="text-lg" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-4 border-t border-gray-500">
              <div className="flex items-center">
                <div>
                  <Link
                    className="text-sm font-semibold text-primary truncate hover:underline"
                    to="/profile"
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                  <Link to="/admin/dashboard" className="text-xs text-primary truncate block">
                    {user.role}
                  </Link>
                </div>
                <button
                  onClick={logout}
                  className="ml-auto p-2 hover:bg-primary/20 rounded-lg transition-colors cursor-pointer"
                  title="Log out"
                >
                  <FaSignOutAlt className="text-primary" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Desktop Sidebar */}
      <div
        className={`hidden md:flex h-screen text-primary transition-all duration-300 flex-col bg-primary/5 border-r border-primary/20
          sticky top-0 overflow-hidden
          ${isOpen ? 'w-64' : 'w-20'}`}
      >
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
          <button
            onClick={toggleSidebar}
            className="mx-auto p-1 hover:bg-rose-50 rounded-lg transition-all duration-300 ml-auto cursor-pointer"
            title={isOpen ? 'Thu nhỏ' : 'Mở rộng'}
          >
            <FaChevronLeft
              size={18}
              className={`text-rose-500 transition-transform duration-300 ${!isOpen ? 'rotate-180' : 'rotate-0'}`}
            />
          </button>
        </div>
        <nav className="flex-1 px-3 py-6 space-y-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={({ isActive }) =>
                  `w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors group cursor-pointer
                  ${isActive ? 'bg-primary/20 text-primary' : 'text-gray-600 hover:bg-primary/10 hover:text-primary'}`
                }
              >
                <Icon className="text-lg shrink-0 transition-colors" />
                {isOpen && (
                  <span className="text-sm font-medium transition-colors">
                    {item.label}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>
        <div className="p-4">
          <div className="flex items-center justify-between">
            {isOpen && (
              <div className="flex items-center gap-3 flex-1 min-w-0">
                <div className="min-w-0">
                  <Link
                    to="/profile"
                    className="text-sm font-semibold text-primary truncate hover:underline"
                  >
                    {user.first_name} {user.last_name}
                  </Link>
                  <Link
                    to="/admin/dashboard"
                    className="text-xs text-primary truncate block"
                  >
                    {user.role}
                  </Link>
                </div>
              </div>
            )}
            <button
              onClick={logout}
              className="flex-1 md:flex-0 p-2 mx-auto hover:bg-primary/20 rounded-lg transition-colors shrink-0 cursor-pointer"
              title="Log out"
            >
              <FaSignOutAlt className="text-primary" />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
