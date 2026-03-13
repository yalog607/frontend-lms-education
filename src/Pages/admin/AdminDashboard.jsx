import { Link } from 'react-router-dom';
import { FaUsers, FaBook, FaChartLine } from 'react-icons/fa';
import SidebarAdmin from '../../Components/admin/SidebarAdmin.jsx';
import { useGetCourse } from '../../hooks/useCourse.js';
import { useAdminUsers } from '../../hooks/useAdmin.js';

export default function AdminDashboard() {
  const { data: coursesPayload, isLoading: coursesLoading } = useGetCourse();
  const { users, isLoading: usersLoading } = useAdminUsers();

  const courses = coursesPayload?.courses || coursesPayload?.data || [];

  const stats = [
    {
      label: 'Total Users',
      value: users.length,
      icon: FaUsers,
        color: 'bg-primary',
    },
    {
      label: 'Total Courses',
      value: courses.length,
      icon: FaBook,
        color: 'bg-primary',
    },
    {
      label: 'Published Courses',
      value: courses.filter((course) => course?.isPublished).length,
      icon: FaChartLine,
        color: 'bg-primary',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="flex items-center justify-between gap-4 mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link to="/admin/courses" className="btn bg-rose-500 hover:bg-rose-600 text-white border-none">
            Manage Courses
          </Link>
        </div>

        {coursesLoading || usersLoading ? (
          <div className="w-full flex items-center justify-center h-56">
            <span className="loading loading-spinner loading-lg text-rose-500"></span>
          </div>
        ) : (
          <>
            <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <article key={stat.label} className="bg-white border border-rose-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-500">{stat.label}</p>
                        <h2 className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</h2>
                      </div>
                      <div className={`w-12 h-12 rounded-lg ${stat.color} text-white flex items-center justify-center`}>
                        <Icon />
                      </div>
                    </div>
                  </article>
                );
              })}
            </section>

            <section className="mt-8 bg-white border border-rose-100 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Quick Navigation</h3>
                <h3 className="font-semibold text-gray-900">Quick Navigation</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Link to="/admin/users" className="btn justify-start bg-white border-rose-200 text-gray-800 hover:bg-rose-50">
                  User Management
                </Link>
                <Link to="/admin/courses" className="btn justify-start bg-white border-rose-200 text-gray-800 hover:bg-rose-50">
                  Course Management
                </Link>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
