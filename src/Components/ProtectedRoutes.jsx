import { Navigate, Outlet, useParams } from "react-router-dom";
import { useCheckOwnCourse, useCourseById } from "../hooks/useCourse";

export const ProtectedRoute = ({ user, redirectPath = "/login", children }) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const AdminRoute = ({ user, redirectPath = "/home", children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "admin") {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const TeacherRoute = ({ user, redirectPath = "/home", children }) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  if (user.role !== "instructor") {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const GuestRoute = ({ user, redirectPath = "/home", children }) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

export const CourseAccessRoute = ({ user, children }) => {
  const { courseId, lessonId } = useParams();
  const isPrivilegedRole =
    user?.role === "admin" ||
    user?.role === "instructor";
  const { data: ownCourseData, isLoading } = useCheckOwnCourse(courseId);
  const { data: courseData, isLoading: isCourseLoading } = useCourseById(courseId);

  const targetLesson = courseData?.course?.sections
    ?.flatMap((section) => section.lessons || [])
    ?.find((lesson) => lesson._id === lessonId);

  const canAccessByFreePreview = !!targetLesson?.isFree;

  if (isPrivilegedRole) {
    return children ? children : <Outlet />;
  }

  if (isLoading || isCourseLoading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center bg-white">
        <span className="loading loading-spinner loading-lg text-rose-500"></span>
      </div>
    );
  }

  if (ownCourseData?.isEnrolled || canAccessByFreePreview) {
    return children ? children : <Outlet />;
  }

  if (!targetLesson) {
    return <Navigate to={`/course/${courseId}`} replace />;
  }

  if (!ownCourseData?.isEnrolled && !canAccessByFreePreview) {
    return <Navigate to={`/course/${courseId}`} replace />;
  }

  return children ? children : <Outlet />;
};