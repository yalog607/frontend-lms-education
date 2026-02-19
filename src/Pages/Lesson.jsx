import React, { useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCourseById } from '../hooks/useCourse'; // Hook cũ của bạn để lấy list bài học
import useLessonStore from '../store/useLessonStore';
import VideoPlayer from '../Components/Lesson/VideoPlayer';
import LessonSidebar from '../Components/Lesson/SidebarLesson';

const LessonPage = () => {
    const { courseId, lessonId } = useParams();
    const navigate = useNavigate();
    
    // 1. Data Server (TanStack Query)
    const { data: courseData, isLoading } = useCourseById(courseId);
    
    // 2. UI State (Zustand)
    const { isAutoplay, setExpandedSections } = useLessonStore();

    // 3. Logic: Tính toán bài học hiện tại & Auto expand section
    const currentLesson = useMemo(() => {
        if (!courseData?.course?.sections) return null;
        for (const section of courseData.course.sections) {
            const lesson = section.lessons.find(l => l._id === lessonId);
            if (lesson) return lesson;
        }
        return null;
    }, [courseData, lessonId]);

    // Tự động mở Section chứa bài học hiện tại khi vào trang
    useEffect(() => {
        if (courseData?.course?.sections && lessonId) {
            const section = courseData.course.sections.find(s => s.lessons.some(l => l._id === lessonId));
            if (section) {
                setExpandedSections([section._id]);
            }
        }
    }, [courseData, lessonId, setExpandedSections]);

    // Logic chuyển bài tiếp theo
    const handleNextLesson = () => {
        if (!courseData || !isAutoplay) return;
        
        // Làm phẳng mảng lesson để tìm index
        const allLessons = courseData.course.sections.flatMap(s => s.lessons);
        const currentIndex = allLessons.findIndex(l => l._id === lessonId);
        
        if (currentIndex !== -1 && currentIndex < allLessons.length - 1) {
            const nextLesson = allLessons[currentIndex + 1];
            navigate(`/course/${courseId}/learn/${nextLesson._id}`);
        }
    };

    if (isLoading || !currentLesson) return <div className="h-screen grid place-items-center"><span className="loading loading-spinner"></span></div>;

    return (
        <div className="flex h-screen overflow-hidden flex-col md:flex-row">
            {/* --- LEFT: VIDEO & CONTENT --- */}
            <div className="flex-1 flex flex-col h-full overflow-y-auto">
                {/* Video Container */}
                <div className="w-full bg-black aspect-video shrink-0">
                    <VideoPlayer 
                        key={currentLesson._id}
                        lesson={currentLesson} 
                        isAutoplay={isAutoplay}
                        onEnded={handleNextLesson}
                    />
                </div>

                {/* Content Container */}
                <div className="p-6">
                    <h1 className="text-2xl font-bold mb-4">{currentLesson.title}</h1>
                    <div 
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{ __html: currentLesson.content }} 
                    />
                </div>
            </div>

            {/* --- RIGHT: SIDEBAR --- */}
            <LessonSidebar course={courseData.course} />
        </div>
    );
};

export default LessonPage;