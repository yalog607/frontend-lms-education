import { useMemo, useState } from 'react';
import useAuthStore from '../../store/useAuthStore.js';
import SidebarTeacher from '../../Components/teacher/SidebarTeacher.jsx';
import { useTeacherCourses } from '../../hooks/useCourse.js';
import { useCreateNotification } from '../../hooks/useNotification.js';

export default function InstructorNotification() {
  const { user } = useAuthStore();
  const { courses, isLoading } = useTeacherCourses(user?._id);
  const { createInstructorNotification, isCreatingNotification } = useCreateNotification();

  const [form, setForm] = useState({
    course_id: '',
    title: '',
    message: '',
    type: 'course',
    link: '',
  });

  const selectedCourse = useMemo(
    () => courses.find((course) => course?._id === form.course_id),
    [courses, form.course_id],
  );

  const onChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const resetForm = () => {
    setForm({
      course_id: '',
      title: '',
      message: '',
      type: 'course',
      link: '',
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (!form.course_id || !form.title.trim() || !form.message.trim()) {
      return;
    }

    createInstructorNotification(
      {
        course_id: form.course_id,
        title: form.title.trim(),
        message: form.message.trim(),
        type: form.type,
        link: form.link.trim(),
      },
      {
        onSuccess: () => {
          resetForm();
        },
      },
    );
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarTeacher />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Instructor Notifications</h1>
          <p className="text-gray-600 mt-1">Send course updates directly to learners who enrolled in your course.</p>
        </div>

        <section className="bg-white border border-rose-100 rounded-2xl p-4 shadow-sm">
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <select
              className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
              value={form.course_id}
              onChange={(event) => onChange('course_id', event.target.value)}
              disabled={isLoading}
            >
              <option value="">Select course to notify</option>
              {courses.map((course) => (
                <option key={course?._id} value={course?._id}>
                  {course?.name || 'Untitled course'}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
              value={form.type}
              onChange={(event) => onChange('type', event.target.value)}
            >
              <option value="course">Course update</option>
              <option value="announcement">Announcement</option>
              <option value="lesson">Lesson update</option>
            </select>

            <input
              type="text"
              className="input input-bordered w-full md:col-span-2 bg-white text-gray-900 border-gray-200"
              placeholder="Notification title"
              value={form.title}
              onChange={(event) => onChange('title', event.target.value)}
            />

            <textarea
              className="textarea textarea-bordered w-full md:col-span-2 bg-white text-gray-900 border-gray-200"
              rows="4"
              placeholder="Write notification message"
              value={form.message}
              onChange={(event) => onChange('message', event.target.value)}
            />

            <input
              type="text"
              className="input input-bordered w-full md:col-span-2 bg-white text-gray-900 border-gray-200"
              placeholder="Optional redirect link (e.g. /course/xxx)"
              value={form.link}
              onChange={(event) => onChange('link', event.target.value)}
            />

            <div className="md:col-span-2 flex gap-2">
              <button
                type="submit"
                className="btn bg-rose-500 hover:bg-rose-600 text-white border-none"
                disabled={isCreatingNotification || !form.course_id || !form.title.trim() || !form.message.trim()}
              >
                {isCreatingNotification ? 'Sending...' : 'Send Notification'}
              </button>
              <button
                type="button"
                className="btn bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                onClick={resetForm}
              >
                Clear
              </button>
            </div>
          </form>

          {selectedCourse && (
            <div className="mt-4 border border-gray-100 rounded-xl p-3 bg-gray-50">
              <p className="text-xs text-gray-500">Selected course</p>
              <p className="font-semibold text-gray-800">{selectedCourse?.name}</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
