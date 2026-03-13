import { useMemo, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore.js';
import SidebarTeacher from '../../Components/teacher/SidebarTeacher.jsx';
import {
  useDeleteCourse,
  useInstructorCreateCourse,
  useInstructorUpdateCourse,
  useTeacherCourses,
} from '../../hooks/useCourse.js';

export default function MyCourses() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [keyword, setKeyword] = useState('');
  const [editingCourseId, setEditingCourseId] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const imageInputRef = useRef(null);
  const [courseForm, setCourseForm] = useState({
    name: '',
    description: '',
    level: 'beginner',
    price: 0,
  });

  const { courses, source, isLoading } = useTeacherCourses(user?._id);
  const { delete: deleteCourse, isDeleting } = useDeleteCourse();
  const { createCourse, isCreatingCourse } = useInstructorCreateCourse();
  const { updateCourse, isUpdatingCourse } = useInstructorUpdateCourse();

  const filteredCourses = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return courses;
    }
    return courses.filter((course) => (course?.name || '').toLowerCase().includes(normalizedKeyword));
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

  const onEditCourse = (course) => {
    setEditingCourseId(course?._id || '');
    setImageFile(null);
    setCourseForm({
      name: course?.name || '',
      description: course?.description || '',
      level: course?.level || 'beginner',
      price: Number(course?.price || 0),
    });
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const resetCourseForm = () => {
    setEditingCourseId('');
    setImageFile(null);
    setCourseForm({
      name: '',
      description: '',
      level: 'beginner',
      price: 0,
    });
    if (imageInputRef.current) {
      imageInputRef.current.value = '';
    }
  };

  const buildCourseFormData = () => {
    const formData = new FormData();
    formData.append('name', courseForm.name.trim());
    formData.append('description', courseForm.description.trim());
    formData.append('level', courseForm.level);
    formData.append('price', String(Number(courseForm.price) || 0));
    if (user?._id) {
      formData.append('teacher_id', user._id);
    }
    if (imageFile) {
      formData.append('image', imageFile);
    }
    return formData;
  };

  const onSubmitCourse = (event) => {
    event.preventDefault();
    if (!courseForm.name.trim() || !courseForm.description.trim()) {
      toast.error('Please provide course name and description.');
      return;
    }

    const payload = buildCourseFormData();

    if (editingCourseId) {
      updateCourse(
        { id: editingCourseId, data: payload },
        {
          onSuccess: () => {
            resetCourseForm();
          },
        },
      );
      return;
    }

    createCourse(payload, {
      onSuccess: () => {
        resetCourseForm();
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarTeacher />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">My Courses</h1>
          <p className="text-gray-500 mt-1">Manage courses that belong to your teacher account.</p>
          <p className="text-gray-500 mt-1">Manage courses that belong to your teacher account.</p>
          <p className="text-xs text-gray-400 mt-1">Data source: {source}</p>
                  <p className="text-xs text-gray-400 mt-1">Data source: {source}</p>
        </div>

        <div className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm">
          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search your courses..."
            className="input input-bordered w-full md:max-w-sm"
          />
        </div>

        <section className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">
            {editingCourseId ? 'Edit Course' : 'Create Course'}
          </h2>

          <form onSubmit={onSubmitCourse} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              className="input input-bordered w-full bg-white text-gray-900 border-gray-200"
              placeholder="Course name"
              value={courseForm.name}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, name: event.target.value }))}
            />

            <select
              className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
              value={courseForm.level}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, level: event.target.value }))}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>

            <textarea
              className="textarea textarea-bordered w-full md:col-span-2 bg-white text-gray-900 border-gray-200"
              rows="3"
              placeholder="Course description"
              value={courseForm.description}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, description: event.target.value }))}
            />

            <input
              type="number"
              min="0"
              className="input input-bordered w-full bg-white text-gray-900 border-gray-200"
              placeholder="Course price"
              value={courseForm.price}
              onChange={(event) => setCourseForm((prev) => ({ ...prev, price: event.target.value }))}
            />

            <input
              type="file"
              accept="image/*"
              className="file-input file-input-secondary w-full"
              ref={imageInputRef}
              onChange={(event) => setImageFile(event.target.files?.[0] || null)}
            />

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="btn btn-secondary"
                disabled={isCreatingCourse || isUpdatingCourse}
              >
                {isCreatingCourse || isUpdatingCourse
                  ? 'Saving...'
                  : editingCourseId
                    ? 'Update Course'
                    : 'Create Course'}
              </button>
              <button
                type="button"
                className="btn btn-outline btn-secondary"
                onClick={resetCourseForm}
              >
                Clear
              </button>
            </div>
          </form>
        </section>

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
                    <th>Price</th>
                    <th>Lessons</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No courses found.
                      </td>
                    </tr>
                  )}

                  {filteredCourses.map((course, index) => (
                    <tr key={course?._id || index} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{course?.name || 'N/A'}</td>
                      <td>{course?.price > 0 ? `$${course.price}` : 'Free'}</td>
                      <td>{course?.lessons_length || 0}</td>
                      <td>
                        <span className={`badge ${course?.isPublished ? 'badge-success' : 'badge-ghost'}`}>
                          {course?.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => navigate(`/course/${course?._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-xs btn-info text-white"
                            onClick={() => onEditCourse(course)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-xs btn-error text-white"
                            onClick={() => handleDelete(course?._id)}
                            disabled={isDeleting}
                          >
                            Delete
                          </button>
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
