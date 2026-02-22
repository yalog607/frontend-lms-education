import React, { useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCourseById } from "../hooks/useCourse";
import { useCourseProgress } from "../hooks/useProgress";
import useLessonStore from "../store/useLessonStore";
import VideoPlayer from "../Components/Lesson/VideoPlayer";
import LessonSidebar from "../Components/Lesson/SidebarLesson";
import { IoMdArrowRoundBack } from "react-icons/io";

const LessonPage = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  // 1. Data Server (TanStack Query)
  const { data: courseData, isLoading } = useCourseById(courseId);

  const allLessonIds = useMemo(() => {
    if (!courseData?.course?.sections) return [];
    return courseData.course.sections.flatMap((s) =>
      s.lessons.map((l) => l._id),
    );
  }, [courseData]);

  const { data: progressData } = useCourseProgress(allLessonIds);

  const totalLessons = allLessonIds.length;
  const completedLessons = useMemo(() => {
    if (!progressData) return 0;
    return progressData.filter((p) => p.isCompleted).length;
  }, [progressData]);

  // 2. UI State (Zustand)
  const isAutoplay = useLessonStore((state) => state.isAutoplay);
  const setExpandedSections = useLessonStore(
    (state) => state.setExpandedSections,
  );
  const setAutoplay = useLessonStore((state) => state.setAutoplay);

  // 3. Logic: Tính toán bài học hiện tại & Auto expand section
  const currentLesson = useMemo(() => {
    if (!courseData?.course?.sections) return null;
    for (const section of courseData.course.sections) {
      const lesson = section.lessons.find((l) => l._id === lessonId);
      if (lesson) return lesson;
    }
    return null;
  }, [courseData, lessonId]);

  // Tự động mở Section chứa bài học hiện tại khi vào trang
  useEffect(() => {
    if (courseData?.course?.sections && lessonId) {
      const section = courseData.course.sections.find((s) =>
        s.lessons.some((l) => l._id === lessonId),
      );
      if (section) {
        setExpandedSections([section._id]);
      }
    }
  }, [courseData, lessonId, setExpandedSections]);

  // Logic chuyển bài tiếp theo
  const handleNextLesson = () => {
    if (!courseData) return;

  const allLessons = courseData.course.sections.flatMap((s) => s.lessons);
  const currentIndex = allLessons.findIndex((l) => l._id === lessonId);

  if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
    const nextLesson = allLessons[currentIndex + 1];
    if (!isAutoplay) {
      setAutoplay(true);
    }
    navigate(`/learn/${courseId}/play/${nextLesson._id}`);
  } else if (currentIndex === allLessons.length - 1) {
    setAutoplay(false);
  }
  };

  if (isLoading || !currentLesson) {
    return (
      <div className="h-screen grid place-items-center">
        <span className="loading loading-spinner"></span>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      {/* Header with back button and progress */}
      <div className="flex items-center justify-between px-4 py-3 bg-base-300 border-b border-gray-500/10">
        <div
          className="flex items-center gap-2 text-sm font-medium justify-start cursor-pointer transition-all hover:text-rose-500 hover:-translate-x-1"
          onClick={() => navigate(`/course/${courseId}`)}
        >
          <IoMdArrowRoundBack />
          Back
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-700">
            Completed:{" "}
            <span className="text-rose-500">
              {completedLessons}/{totalLessons}
            </span>{" "}
            lessons
          </span>
        </div>
      </div>

      <div className="flex flex-col md:flex-row h-full w-full">
        {/* --- LEFT: VIDEO & CONTENT --- */}
        <div className="flex-1 flex flex-col h-full overflow-y-auto">
          {/* Video Container */}
          <div className="w-full bg-black aspect-video shrink-0">
            <VideoPlayer
              key={currentLesson._id}
              lesson={currentLesson}
              isAutoplay={isAutoplay}
              onEnded={handleNextLesson}
              progress={progressData?.find(
                (p) => p.lesson_id === currentLesson._id,
              )}
            />
          </div>

          {/* Content Container */}
          <div className="p-4 md:p-6">
            <h1 className="text-xl md:text-2xl font-semibold">
              {currentLesson.title}
            </h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: currentLesson.content }}
            />
          </div>
        </div>

        {/* --- RIGHT: SIDEBAR --- */}
        <div className="w-full md:w-96 xl:w-120 h-full">
          <LessonSidebar
            course={courseData.course}
            progressData={progressData || []}
          />
        </div>
      </div>
    </div>
  );
};

export default LessonPage;
