import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import useAuthStore from '../../store/useAuthStore.js';
import SidebarTeacher from '../../Components/teacher/SidebarTeacher.jsx';
import { useCourseById, useTeacherCourses } from '../../hooks/useCourse.js';
import { useCreateLesson, useDeleteLesson, useUpdateLesson } from '../../hooks/useLesson.js';
import { useCreateSection, useDeleteSection, useUpdateSection } from '../../hooks/useSection.js';
import { formatDurationShort } from '../../lib/formatDuration.js';

const flattenLessons = (course) => {
  const sections = course?.sections || [];
  return sections.flatMap((section) =>
    (section?.lessons || []).map((lesson) => ({
      ...lesson,
      sectionTitle: section?.title || 'Untitled section',
      sectionId: section?._id,
    })),
  );
};

export default function LessonManager() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  const [selectedCourseId, setSelectedCourseId] = useState('');
  const [keyword, setKeyword] = useState('');
  const [sectionKeyword, setSectionKeyword] = useState('');
  const [editingLessonId, setEditingLessonId] = useState('');
  const [editingSectionId, setEditingSectionId] = useState('');
  const [lessonForm, setLessonForm] = useState({
    title: '',
    section_id: '',
    type: 'video',
    videoSource: 'youtube',
    video_url: '',
    content: '',
    isFree: false,
    isPublished: true,
  });
  const [sectionForm, setSectionForm] = useState({
    title: '',
    isPublished: true,
  });

  const { courses, isLoading: loadingCourses } = useTeacherCourses(user?._id);
  const { data: courseDetailPayload, isLoading: loadingDetail, refetch } = useCourseById(selectedCourseId);
  const { createLesson, isCreatingLesson } = useCreateLesson();
  const { updateLesson, isUpdatingLesson } = useUpdateLesson();
  const { deleteLesson, isDeletingLesson } = useDeleteLesson();
  const { createSection, isCreatingSection } = useCreateSection();
  const { updateSection, isUpdatingSection } = useUpdateSection();
  const { deleteSection, isDeletingSection } = useDeleteSection();

  const courseDetail = courseDetailPayload?.course || null;
  const sections = useMemo(() => courseDetail?.sections || [], [courseDetail]);
  const allLessons = useMemo(() => flattenLessons(courseDetail), [courseDetail]);
  const filteredSections = useMemo(() => {
    const normalizedKeyword = sectionKeyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return sections;
    }
    return sections.filter((section) => (section?.title || '').toLowerCase().includes(normalizedKeyword));
  }, [sections, sectionKeyword]);

  const filteredLessons = useMemo(() => {
    const normalizedKeyword = keyword.trim().toLowerCase();
    if (!normalizedKeyword) {
      return allLessons;
    }
    return allLessons.filter((lesson) => (lesson?.title || '').toLowerCase().includes(normalizedKeyword));
  }, [allLessons, keyword]);

  const resetForm = () => {
    setEditingLessonId('');
    setLessonForm({
      title: '',
      section_id: sections?.[0]?._id || '',
      type: 'video',
      videoSource: 'youtube',
      video_url: '',
      content: '',
      isFree: false,
      isPublished: true,
    });
  };

  const handleCourseChange = (courseId) => {
    setSelectedCourseId(courseId);
    setEditingLessonId('');
    setEditingSectionId('');
    setKeyword('');
    setSectionKeyword('');
    setSectionForm({ title: '', isPublished: true });
  };

  const handleEdit = (lesson) => {
    setEditingLessonId(lesson?._id || '');
    setLessonForm({
      title: lesson?.title || '',
      section_id: lesson?.sectionId || '',
      type: lesson?.type || 'video',
      videoSource: lesson?.videoSource || 'youtube',
      video_url: lesson?.video_url || '',
      content: lesson?.content || '',
      isFree: !!lesson?.isFree,
      isPublished: !!lesson?.isPublished,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!lessonForm.title || !lessonForm.section_id) {
      toast.error('Title and section are required.');
      return;
    }

    const payload = {
      ...lessonForm,
      uploadId: '',
    };

    if (payload.videoSource !== 'youtube') {
      payload.video_url = '';
    }

    if (editingLessonId) {
      updateLesson(
        { lessonId: editingLessonId, data: payload },
        {
          onSuccess: async () => {
            await refetch();
            resetForm();
          },
        },
      );
      return;
    }

    createLesson(payload, {
      onSuccess: async () => {
        await refetch();
        resetForm();
      },
    });
  };

  const onDelete = (lessonId) => {
    if (!window.confirm('Delete this lesson?')) {
      return;
    }

    deleteLesson(lessonId, {
      onSuccess: async () => {
        await refetch();
      },
      onError: () => {
        toast.error('Delete endpoint currently fails on backend. Please check BE lesson controller.');
      },
    });
  };

  const handleEditSection = (section) => {
    setEditingSectionId(section?._id || '');
    setSectionForm({
      title: section?.title || '',
      isPublished: !!section?.isPublished,
    });
  };

  const resetSectionForm = () => {
    setEditingSectionId('');
    setSectionForm({ title: '', isPublished: true });
  };

  const onSectionSubmit = (event) => {
    event.preventDefault();

    if (!selectedCourseId || !sectionForm.title.trim()) {
      toast.error('Please select a course and enter section title.');
      return;
    }

    if (editingSectionId) {
      updateSection(
        {
          sectionId: editingSectionId,
          data: {
            title: sectionForm.title.trim(),
            isPublished: sectionForm.isPublished,
          },
        },
        {
          onSuccess: async () => {
            await refetch();
            resetSectionForm();
          },
        },
      );
      return;
    }

    createSection(
      {
        title: sectionForm.title.trim(),
        course_id: selectedCourseId,
        isPublished: sectionForm.isPublished,
      },
      {
        onSuccess: async () => {
          await refetch();
          resetSectionForm();
        },
      },
    );
  };

  const onDeleteSection = (sectionId) => {
    if (!window.confirm('Delete this section and all its lessons?')) {
      return;
    }

    deleteSection(sectionId, {
      onSuccess: async () => {
        await refetch();
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarTeacher />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Lesson Manager</h1>
          <p className="text-gray-600 mt-1">Manage both sections and lessons in one place.</p>
        </div>

        <div className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 shadow-sm">
          <select
            className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
            value={selectedCourseId}
            onChange={(event) => handleCourseChange(event.target.value)}
          >
            <option value="">Select a course</option>
            {courses.map((course) => (
              <option key={course?._id} value={course?._id}>
                {course?.name || 'Untitled'}
              </option>
            ))}
          </select>

          <input
            type="text"
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search lesson by title..."
            className="input input-bordered w-full bg-white text-gray-900 border-gray-200"
          />
        </div>

        {selectedCourseId && (
          <section className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-3">
              <h2 className="text-lg font-semibold text-gray-800">Section Manager</h2>
              <input
                type="text"
                value={sectionKeyword}
                onChange={(event) => setSectionKeyword(event.target.value)}
                placeholder="Search section..."
                className="input input-bordered w-full max-w-xs bg-white text-gray-900 border-gray-200"
              />
            </div>

            <form onSubmit={onSectionSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
              <input
                type="text"
                className="input input-bordered w-full md:col-span-2 bg-white text-gray-900 border-gray-200"
                placeholder="Section title"
                value={sectionForm.title}
                onChange={(event) => setSectionForm((prev) => ({ ...prev, title: event.target.value }))}
              />

              <div className="flex items-center gap-3">
                <label className="label cursor-pointer justify-start gap-2">
                  <input
                    type="checkbox"
                    className="checkbox checkbox-sm border-gray-300 bg-white"
                    checked={sectionForm.isPublished}
                    onChange={(event) => setSectionForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
                  />
                  <span className="label-text text-gray-700">Published</span>
                </label>
              </div>

              <div className="md:col-span-3 flex gap-2">
                <button
                  type="submit"
                  className="btn bg-rose-500 hover:bg-rose-600 text-white border-none"
                  disabled={isCreatingSection || isUpdatingSection}
                >
                  {editingSectionId ? 'Update Section' : 'Create Section'}
                </button>
                <button
                  type="button"
                  className="btn bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                  onClick={resetSectionForm}
                >
                  Clear
                </button>
              </div>
            </form>

            <div className="overflow-x-auto rounded-xl border border-gray-100">
              <table className="table text-gray-800">
                <thead className="bg-rose-50 text-gray-700">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Lessons</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredSections.length === 0 && (
                    <tr>
                      <td colSpan="5" className="text-center py-6 text-gray-500">
                        No sections found.
                      </td>
                    </tr>
                  )}
                  {filteredSections.map((section, index) => (
                    <tr key={section?._id || index} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{section?.title || 'Untitled section'}</td>
                      <td>{section?.lessons?.length || 0}</td>
                      <td>
                        <span className={`badge ${section?.isPublished ? 'badge-success' : 'badge-ghost'}`}>
                          {section?.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button className="btn btn-xs btn-info text-white" onClick={() => handleEditSection(section)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-xs btn-error text-white"
                            onClick={() => onDeleteSection(section?._id)}
                            disabled={isDeletingSection}
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
          </section>
        )}

        {selectedCourseId && (
          <form onSubmit={onSubmit} className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-3 shadow-sm">
            <h2 className="md:col-span-2 text-lg font-semibold text-gray-800">Lesson Editor</h2>
            <input
              type="text"
              className="input input-bordered w-full bg-white text-gray-900 border-gray-200"
              placeholder="Lesson title"
              value={lessonForm.title}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, title: event.target.value }))}
            />

            <select
              className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
              value={lessonForm.section_id}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, section_id: event.target.value }))}
            >
              <option value="">Select section</option>
              {sections.map((section) => (
                <option key={section?._id} value={section?._id}>
                  {section?.title || 'Untitled section'}
                </option>
              ))}
            </select>

            <select
              className="select select-bordered w-full bg-white text-gray-900 border-gray-200"
              value={lessonForm.videoSource}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, videoSource: event.target.value }))}
            >
              <option value="youtube">YouTube</option>
              <option value="upload">Upload (requires uploadId flow)</option>
            </select>

            <input
              type="text"
              className="input input-bordered w-full bg-white text-gray-900 border-gray-200"
              placeholder="Video URL (for YouTube source)"
              value={lessonForm.video_url}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, video_url: event.target.value }))}
            />

            <textarea
              className="textarea textarea-bordered md:col-span-2 bg-white text-gray-900 border-gray-200"
              rows="3"
              placeholder="Lesson content"
              value={lessonForm.content}
              onChange={(event) => setLessonForm((prev) => ({ ...prev, content: event.target.value }))}
            />

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-gray-300 bg-white"
                checked={lessonForm.isFree}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, isFree: event.target.checked }))}
              />
              <span className="label-text text-gray-700">Free lesson</span>
            </label>

            <label className="label cursor-pointer justify-start gap-3">
              <input
                type="checkbox"
                className="checkbox checkbox-sm border-gray-300 bg-white"
                checked={lessonForm.isPublished}
                onChange={(event) => setLessonForm((prev) => ({ ...prev, isPublished: event.target.checked }))}
              />
              <span className="label-text text-gray-700">Published</span>
            </label>

            <div className="md:col-span-2 flex gap-2">
              <button className="btn bg-rose-500 hover:bg-rose-600 text-white border-none" type="submit" disabled={isCreatingLesson || isUpdatingLesson}>
                {editingLessonId ? 'Update Lesson' : 'Create Lesson'}
              </button>
              <button
                className="btn bg-white text-rose-600 border border-rose-200 hover:bg-rose-50 hover:border-rose-300"
                type="button"
                onClick={resetForm}
              >
                Clear
              </button>
            </div>
          </form>
        )}

        {(loadingCourses || loadingDetail) && (
          <div className="w-full h-40 flex items-center justify-center">
            <span className="loading loading-spinner loading-lg text-rose-500"></span>
          </div>
        )}

        {!loadingCourses && selectedCourseId && !loadingDetail && (
          <div className="bg-white border border-rose-100 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="table text-gray-800">
                <thead className="bg-rose-50 text-gray-700">
                  <tr>
                    <th>#</th>
                    <th>Lesson</th>
                    <th>Section</th>
                    <th>Duration</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLessons.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-8 text-gray-500">
                        No lessons found.
                      </td>
                    </tr>
                  )}

                  {filteredLessons.map((lesson, index) => (
                    <tr key={lesson?._id || index} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{lesson?.title || 'Untitled lesson'}</td>
                      <td>{lesson?.sectionTitle || 'N/A'}</td>
                      <td>{formatDurationShort(lesson?.duration || 0)}</td>
                      <td>
                        <span className={`badge ${lesson?.isPublished ? 'badge-success' : 'badge-ghost'}`}>
                          {lesson?.isPublished ? 'Published' : 'Draft'}
                        </span>
                      </td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => navigate(`/learn/${selectedCourseId}/play/${lesson?._id}`)}
                          >
                            Open
                          </button>
                          <button className="btn btn-xs btn-info text-white" onClick={() => handleEdit(lesson)}>
                            Edit
                          </button>
                          <button
                            className="btn btn-xs btn-error text-white"
                            onClick={() => onDelete(lesson?._id)}
                            disabled={isDeletingLesson}
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
          </div>
        )}
      </main>
    </div>
  );
}
