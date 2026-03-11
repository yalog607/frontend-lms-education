import { Link } from 'react-router-dom';
import { FaBookOpen, FaListOl, FaClock } from 'react-icons/fa';
import useAuthStore from '../../store/useAuthStore.js';
import SidebarTeacher from '../../Components/teacher/SidebarTeacher.jsx';
import { useTeacherCourses } from '../../hooks/useCourse.js';

export default function TeacherDashboard() {
  const { user } = useAuthStore();
  const { courses, source, isLoading } = useTeacherCourses(user?._id);
  const totalLessons = courses.reduce((sum, course) => sum + (course?.lessons_length || 0), 0);
  const publishedCourses = courses.filter((course) => course?.isPublished).length;

  const cards = [
    {
      title: 'My Courses',
      value: courses.length,
      icon: FaBookOpen,
      color: 'bg-blue-500',
    },
    {
      title: 'Total Lessons',
      value: totalLessons,
      icon: FaListOl,
      color: 'bg-emerald-500',
    },
    {
      title: 'Published',
      value: publishedCourses,
      icon: FaClock,
      color: 'bg-orange-500',
    },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarTeacher />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 flex flex-wrap justify-between items-center gap-3 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Teacher Dashboard</h1>
            <p className="text-gray-500 mt-1">Welcome back, {user?.first_name || 'Teacher'}.</p>
            <p className="text-xs text-gray-400 mt-1">Data source: {source}</p>
          </div>
          <Link to="/teacher/my-courses" className="btn bg-rose-500 hover:bg-rose-600 text-white border-none">
            Go to My Courses
          </Link>
        </div>

        {isLoading ? (
          <div className="w-full h-56 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-rose-500"></span>
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {cards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="bg-white border border-rose-100 rounded-2xl p-5 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-500">{card.title}</p>
                      <h2 className="text-2xl font-bold text-gray-900 mt-1">{card.value}</h2>
                    </div>
                    <div className={`w-12 h-12 rounded-lg ${card.color} text-white flex items-center justify-center`}>
                      <Icon />
                    </div>
                  </div>
                </article>
              );
            })}
          </section>
        )}
      </main>
    </div>
  );
}
