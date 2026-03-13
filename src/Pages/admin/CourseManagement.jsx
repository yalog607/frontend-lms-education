import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import SidebarAdmin from '../../Components/admin/SidebarAdmin.jsx';
import { useDeleteCourse, useGetCourse } from '../../hooks/useCourse.js';

export default function CourseManagement() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const { data: coursePayload, isLoading } = useGetCourse();
  const { delete: deleteCourse, isDeleting } = useDeleteCourse();

  const courses = useMemo(
    () => coursePayload?.courses || coursePayload?.data || [],
    [coursePayload],
  );

  const filteredCourses = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return courses;
    }

    return courses.filter((course) => {
      const name = (course?.name || '').toLowerCase();
      const teacherName = `${course?.teacher_id?.first_name || ''} ${course?.teacher_id?.last_name || ''}`.toLowerCase();
      return name.includes(normalizedKeyword) || teacherName.includes(normalizedKeyword);
    });
  }, [courses, keyword]);

  const handleDelete = (courseId) => {
    if (!window.confirm('Are you sure you want to delete this course?')) {
      return;
    }

    deleteCourse(courseId, {
      onError: (error) => {
        toast.error(error?.response?.data?.message || 'Delete course failed!');
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Course Management</h1>
          <p className="text-gray-500 mt-1">Review, search, open details, and remove courses.</p>
                  <p className="text-gray-500 mt-1">Review, search, open details, and remove courses.</p>
        </div>

        <div className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by course name or teacher..."
            className="input input-bordered w-full md:max-w-sm"
          />
        </div>

        <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
          {isLoading ? (
            <div className="w-full h-56 flex items-center justify-center">
              <span className="loading loading-spinner loading-lg text-rose-500"></span>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="table text-gray-800">
                <thead className="bg-rose-50 text-gray-700">
                  <tr>
                    <th>#</th>
                    <th>Course</th>
                    <th>Teacher</th>
                    <th>Price</th>
                    <th>Lessons</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan="7" className="text-center py-8 text-gray-500">
                        No courses found.
                      </td>
                    </tr>
                  )}

                  {filteredCourses.map((course, index) => (
                    <tr key={course?._id || index} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{course?.name || 'N/A'}</td>
                      <td>{course?.teacher_id?.first_name || 'N/A'} {course?.teacher_id?.last_name || ''}</td>
                      <td>{course?.price > 0 ? `$${course.price}` : 'Free'}</td>
                      <td>{course?.lessons_length || 0}</td>
                      <td>
                        <span className={`badge ${course?.isPublished ? 'badge-success' : 'badge-ghost'}`}> {course?.isPublished ? 'Published' : 'Draft'} </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-xs btn-outline" onClick={() => navigate(`/course/${course?._id}`)}>View</button>
                          <button className="btn btn-xs btn-error text-white" onClick={() => handleDelete(course?._id)} disabled={isDeleting}>Delete</button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
