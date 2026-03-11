import { NavLink } from 'react-router-dom';
import { FaChalkboardTeacher, FaBookOpen, FaListOl, FaSignOutAlt, FaBell } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore.js';

const navItems = [
  {
    to: '/teacher/dashboard',
    label: 'Teacher Dashboard',
    icon: FaChalkboardTeacher,
  },
  {
    to: '/teacher/my-courses',
    label: 'My Courses',
    icon: FaBookOpen,
  },
  {
    to: '/teacher/lessons',
    label: 'Lesson Manager',
    icon: FaListOl,
  },
  {
    to: '/teacher/notifications',
    label: 'Notifications',
    icon: FaBell,
  },
];

const linkClassName = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
    isActive ? 'bg-rose-500 text-white' : 'text-gray-700 hover:bg-rose-50'
  }`;

export default function SidebarTeacher() {
  const { user, logout } = useAuthStore();

  return (
    <aside className="w-full md:w-72 bg-white border-r border-gray-200 md:min-h-screen p-4">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Teacher Panel</h2>
        <p className="text-sm text-gray-500 mt-1">
          {user?.first_name || 'Teacher'} {user?.last_name || ''}
        </p>
      </div>

      <nav className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink key={item.to} to={item.to} className={linkClassName}>
              <Icon />
              <span className="font-medium">{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      <button
        className="btn mt-8 w-full bg-gray-900 text-white hover:bg-black"
        onClick={logout}
      >
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}
