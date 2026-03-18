import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import SidebarAdmin from "../../Components/admin/SidebarAdmin.jsx";
import {
  useDeleteCourse,
  useGetCourse,
  useCreateCourse,
  useUpdateCourse,
} from "../../hooks/useCourse.js";
import { useGetAllTeachers } from "../../hooks/useTeacher.js";

export default function CourseManagement() {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState("");
  const [newCourse, setNewCourse] = useState({
    name: "",
    description: "",
    price: "",
    thumbnail: null,
    level: "beginner",
    teacher_id: "",
    benefit: [],
    benefitInput: "",
  });
  const [isAdding, setIsAdding] = useState(false);

  const { data: teacherPayload, isLoading: isTeacherLoading } =
    useGetAllTeachers();
  const teachers = teacherPayload?.teachers || [];

  const { data: coursePayload, isLoading } = useGetCourse();
  const { delete: deleteCourse, isDeleting } = useDeleteCourse();
  const { create: addCourse } = useCreateCourse(); // Giả sử useCourse có addCourse

  const [editCourse, setEditCourse] = useState(null);
  const { update: updateCourse, isUpdating } = useUpdateCourse();

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
      const name = (course?.name || "").toLowerCase();
      const teacherName =
        `${course?.teacher_id?.first_name || ""} ${course?.teacher_id?.last_name || ""}`.toLowerCase();
      return (
        name.includes(normalizedKeyword) ||
        teacherName.includes(normalizedKeyword)
      );
    });
  }, [courses, keyword]);

  const handleDelete = (courseId) => {
    if (!window.confirm("Are you sure you want to delete this course?")) {
      return;
    }

    deleteCourse(courseId, {
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Delete course failed!");
      },
    });
  };

  // Khi nhấn nút Edit
  const handleOpenEdit = (course) => {
    setEditCourse({
      ...course,
      price: course.price?.toString() || "",
      thumbnail: null, // chỉ upload mới nếu muốn thay đổi
      teacher_id: course.teacher_id?._id || course.teacher_id || "",
      benefit: course.benefit || [],
      benefitInput: ""
    });
    document.getElementById("edit-course-modal").showModal();
  };

  // Khi nhấn Save trong modal update
  const handleEditCourse = () => {
    if (!editCourse.name.trim()) {
      toast.error("Course name is required!");
      return;
    }
    if (!editCourse.description.trim()) {
      toast.error("Description is required!");
      return;
    }
    if (!editCourse.price || isNaN(Number(editCourse.price))) {
      toast.error("Price must be a number!");
      return;
    }
    const formData = new FormData();
    formData.append("name", editCourse.name);
    formData.append("description", editCourse.description);
    formData.append("price", editCourse.price);
    if (editCourse.thumbnail) formData.append("image", editCourse.thumbnail);
    formData.append("level", editCourse.level);
    if (editCourse.teacher_id) formData.append("teacher_id", editCourse.teacher_id);
    editCourse.benefit.forEach(b => formData.append("benefit[]", b));
    updateCourse({ id: editCourse._id, data: formData }, {
      onSuccess: () => {
        toast.success("Course updated successfully!");
        setEditCourse(null);
        document.getElementById("edit-course-modal").close();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Update course failed!");
      }
    });
  };

  const handleAddCourse = () => {
    if (!newCourse.name.trim()) {
      toast.error("Course name is required!");
      return;
    }
    if (!newCourse.description.trim()) {
      toast.error("Description is required!");
      return;
    }
    if (!newCourse.price || isNaN(Number(newCourse.price))) {
      toast.error("Price must be a number!");
      return;
    }
    if (!newCourse.thumbnail) {
      toast.error("Thumbnail is required!");
      return;
    }
    setIsAdding(true);
    // Chuẩn bị formData để upload ảnh
    const formData = new FormData();
    formData.append("name", newCourse.name);
    formData.append("description", newCourse.description);
    formData.append("price", newCourse.price);
    formData.append("image", newCourse.thumbnail);
    formData.append("level", newCourse.level);
    if (newCourse.teacher_id)
      formData.append("teacher_id", newCourse.teacher_id);
    newCourse.benefit.forEach((b) => formData.append("benefit[]", b));
    addCourse(formData, {
      onSuccess: () => {
        toast.success("Course added successfully!");
        setNewCourse({
          name: "",
          description: "",
          price: "",
          thumbnail: null,
          level: "beginner",
          teacher_id: "",
          benefit: [],
          benefitInput: "",
        });
        document.getElementById("add-course-modal").close();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Add course failed!");
      },
      onSettled: () => {
        setIsAdding(false);
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-white">
      <SidebarAdmin />
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="mb-6 bg-linear-to-r from-rose-50 to-pink-50 border border-rose-100 rounded-2xl p-5">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            Course Management
          </h1>
          <p className="text-gray-500 mt-1">
            Review, search, open details, and remove courses.
          </p>
        </div>

        <div className="bg-white border border-rose-100 rounded-2xl p-4 mb-4 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Search by course name or teacher..."
            className="input input-bordered w-full md:max-w-sm"
          />
          <div className="text-sm">
            <button
              className="btn btn-secondary"
              onClick={() =>
                document.getElementById("add-course-modal").showModal()
              }
            >
              Create Course
            </button>
          </div>
        </div>

        <dialog
          id="add-course-modal"
          className="modal modal-bottom sm:modal-middle"
        >
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add Course</h3>
            <div className="flex gap-2 flex-col mt-4">
              {/* Name */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  id="course-name"
                  placeholder="Enter course name"
                  className="input input-bordered w-full"
                  value={newCourse.name}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, name: e.target.value })
                  }
                />
              </div>
              {/* Description */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-description" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  id="course-description"
                  placeholder="Enter course description"
                  className="input input-bordered w-full"
                  value={newCourse.description}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, description: e.target.value })
                  }
                />
              </div>
              {/* Price */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-price" className="form-label">
                  Price
                </label>
                <input
                  type="number"
                  id="course-price"
                  placeholder="Enter course price"
                  className="input input-bordered w-full"
                  value={newCourse.price}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, price: e.target.value })
                  }
                />
              </div>
              {/* Thumbnail */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-thumbnail" className="form-label">
                  Thumbnail
                </label>
                <input
                  type="file"
                  id="course-thumbnail"
                  accept="image/*"
                  className="file-input w-full"
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, thumbnail: e.target.files[0] })
                  }
                />
              </div>
              {/* Level */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-level" className="form-label">
                  Level
                </label>
                <select
                  id="course-level"
                  className="input input-bordered w-full"
                  value={newCourse.level}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, level: e.target.value })
                  }
                >
                  <option value="beginner">Beginner</option>
                  <option value="intermediate">Intermediate</option>
                  <option value="advanced">Advanced</option>
                </select>
              </div>
              {/* Teacher */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label htmlFor="course-teacher" className="form-label">
                  Teacher (optional)
                </label>
                <select
                  id="course-teacher"
                  className="input input-bordered w-full"
                  value={newCourse.teacher_id}
                  onChange={(e) =>
                    setNewCourse({ ...newCourse, teacher_id: e.target.value })
                  }
                  disabled={isTeacherLoading}
                >
                  <option value="">-- Select teacher --</option>
                  {teachers.map((teacher) => (
                    <option key={teacher._id} value={teacher._id}>
                      {teacher.first_name} {teacher.last_name} ({teacher.email})
                    </option>
                  ))}
                </select>
              </div>
              {/* Benefit */}
              <div className="flex flex-col gap-1 justify-center items-start w-full">
                <label className="form-label">Benefits</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter a benefit and press Enter"
                    className="input input-bordered w-full"
                    value={newCourse.benefitInput}
                    onChange={(e) =>
                      setNewCourse({
                        ...newCourse,
                        benefitInput: e.target.value,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && newCourse.benefitInput.trim()) {
                        setNewCourse({
                          ...newCourse,
                          benefit: [
                            ...newCourse.benefit,
                            newCourse.benefitInput.trim(),
                          ],
                          benefitInput: "",
                        });
                        e.preventDefault();
                      }
                    }}
                  />
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {newCourse.benefit.map((b, idx) => (
                    <span
                      key={idx}
                      className="badge badge-soft badge-primary p-2"
                    >
                      {b}
                      <button
                        type="button"
                        className="ml-2 text-xs text-white bg-red-500 rounded-full px-1"
                        onClick={() =>
                          setNewCourse({
                            ...newCourse,
                            benefit: newCourse.benefit.filter(
                              (_, i) => i !== idx,
                            ),
                          })
                        }
                      >
                        x
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
              <button
                className="btn btn-secondary"
                onClick={handleAddCourse}
                disabled={isAdding}
              >
                {isAdding ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </dialog>

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
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCourses.length === 0 && (
                    <tr>
                      <td
                        colSpan="7"
                        className="text-center py-8 text-gray-500"
                      >
                        No courses found.
                      </td>
                    </tr>
                  )}

                  {filteredCourses.map((course, index) => (
                    <tr key={course?._id || index} className="hover">
                      <td>{index + 1}</td>
                      <td className="font-medium">{course?.name || "N/A"}</td>
                      <td>
                        {course?.teacher_id?.first_name || "N/A"}{" "}
                        {course?.teacher_id?.last_name || ""}
                      </td>
                      <td>{course?.price > 0 ? `$${course.price}` : "Free"}</td>
                      <td>{course?.lessons_length || 0}</td>
                      <td>
                        <div className="flex gap-2">
                          <button
                            className="btn btn-xs btn-outline"
                            onClick={() => navigate(`/course/${course?._id}`)}
                          >
                            View
                          </button>
                          <button
                            className="btn btn-xs btn-warning text-white"
                            onClick={() => handleOpenEdit(course)}
                          >
                            Edit
                          </button>
                                  {/* Modal Edit Course */}
                                  <dialog
                                    id="edit-course-modal"
                                    className="modal modal-bottom sm:modal-middle"
                                  >
                                    <div className="modal-box">
                                      <h3 className="font-bold text-lg">Update Course</h3>
                                      {editCourse && (
                                        <div className="flex gap-2 flex-col mt-4">
                                          {/* Name */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-name" className="form-label">Name</label>
                                            <input
                                              type="text"
                                              id="edit-course-name"
                                              className="input input-bordered w-full"
                                              value={editCourse.name}
                                              onChange={e => setEditCourse({ ...editCourse, name: e.target.value })}
                                            />
                                          </div>
                                          {/* Description */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-description" className="form-label">Description</label>
                                            <input
                                              type="text"
                                              id="edit-course-description"
                                              className="input input-bordered w-full"
                                              value={editCourse.description}
                                              onChange={e => setEditCourse({ ...editCourse, description: e.target.value })}
                                            />
                                          </div>
                                          {/* Price */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-price" className="form-label">Price</label>
                                            <input
                                              type="number"
                                              id="edit-course-price"
                                              className="input input-bordered w-full"
                                              value={editCourse.price}
                                              onChange={e => setEditCourse({ ...editCourse, price: e.target.value })}
                                            />
                                          </div>
                                          {/* Thumbnail */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-thumbnail" className="form-label">Thumbnail (upload mới nếu muốn thay đổi)</label>
                                            <input
                                              type="file"
                                              id="edit-course-thumbnail"
                                              accept="image/*"
                                              className="file-input w-full"
                                              onChange={e => setEditCourse({ ...editCourse, thumbnail: e.target.files[0] })}
                                            />
                                          </div>
                                          {/* Level */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-level" className="form-label">Level</label>
                                            <select
                                              id="edit-course-level"
                                              className="input input-bordered w-full"
                                              value={editCourse.level}
                                              onChange={e => setEditCourse({ ...editCourse, level: e.target.value })}
                                            >
                                              <option value="beginner">Beginner</option>
                                              <option value="intermediate">Intermediate</option>
                                              <option value="advanced">Advanced</option>
                                            </select>
                                          </div>
                                          {/* Teacher */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label htmlFor="edit-course-teacher" className="form-label">Teacher (optional)</label>
                                            <select
                                              id="edit-course-teacher"
                                              className="input input-bordered w-full"
                                              value={editCourse.teacher_id}
                                              onChange={e => setEditCourse({ ...editCourse, teacher_id: e.target.value })}
                                              disabled={isTeacherLoading}
                                            >
                                              <option value="">-- Select teacher --</option>
                                              {teachers.map(teacher => (
                                                <option key={teacher._id} value={teacher._id}>
                                                  {teacher.first_name} {teacher.last_name} ({teacher.email})
                                                </option>
                                              ))}
                                            </select>
                                          </div>
                                          {/* Benefit */}
                                          <div className="flex flex-col gap-1 justify-center items-start w-full">
                                            <label className="form-label">Benefits</label>
                                            <div className="flex gap-2">
                                              <input
                                                type="text"
                                                placeholder="Enter a benefit and press Enter"
                                                className="input input-bordered w-full"
                                                value={editCourse.benefitInput}
                                                onChange={e => setEditCourse({ ...editCourse, benefitInput: e.target.value })}
                                                onKeyDown={e => {
                                                  if (e.key === "Enter" && editCourse.benefitInput.trim()) {
                                                    setEditCourse({
                                                      ...editCourse,
                                                      benefit: [...editCourse.benefit, editCourse.benefitInput.trim()],
                                                      benefitInput: ""
                                                    });
                                                    e.preventDefault();
                                                  }
                                                }}
                                              />
                                            </div>
                                            <div className="flex flex-wrap gap-2 mt-2">
                                              {editCourse.benefit.map((b, idx) => (
                                                <span key={idx} className="badge badge-primary">
                                                  {b}
                                                  <button
                                                    type="button"
                                                    className="ml-2 text-xs text-white bg-red-500 rounded-full px-1"
                                                    onClick={() => setEditCourse({
                                                      ...editCourse,
                                                      benefit: editCourse.benefit.filter((_, i) => i !== idx)
                                                    })}
                                                  >x</button>
                                                </span>
                                              ))}
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                      <div className="modal-action">
                                        <form method="dialog">
                                          <button className="btn" onClick={() => setEditCourse(null)}>Close</button>
                                        </form>
                                        <button
                                          className="btn btn-secondary"
                                          onClick={handleEditCourse}
                                          disabled={isUpdating || !editCourse}
                                        >
                                          {isUpdating ? "Saving..." : "Save"}
                                        </button>
                                      </div>
                                    </div>
                                  </dialog>
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
