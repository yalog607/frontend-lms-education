import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useLessonStore from '../../store/useLessonStore';
import { FaPlayCircle, FaCheckCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const LessonSidebar = ({ course }) => {
    const navigate = useNavigate();
    const { courseId, lessonId } = useParams();
    
    // Lấy state từ Zustand
    const { expandedSections, toggleSection } = useLessonStore();

    return (
        <div className="w-full lg:w-80 bg-base-100 border-l border-gray-500/50 h-full overflow-y-auto">
            <div className="p-4 font-bold border-b border-gray-500/50">Course content</div>
            
            {course.sections.map((section) => (
                <div key={section._id}>
                    {/* Header Section */}
                    <div 
                        className="bg-gray-100 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200"
                        onClick={() => toggleSection(section._id)}
                    >
                        <h4 className="font-semibold text-sm">{section.title}</h4>
                        {expandedSections.includes(section._id) ? <FaChevronUp size={12}/> : <FaChevronDown size={12}/>}
                    </div>

                    {/* List Lessons */}
                    {expandedSections.includes(section._id) && (
                        <div>
                            {section.lessons.map((lesson) => {
                                const isActive = lesson._id === lessonId;
                                return (
                                    <div
                                        key={lesson._id}
                                        onClick={() => navigate(`/learn/${courseId}/play/${lesson._id}`)}
                                        className={`p-3 flex gap-2 cursor-pointer transition-colors ${isActive ? 'bg-rose-100 text-rose-600' : 'hover:bg-gray-50'}`}
                                    >
                                        <div className="mt-1">
                                            {isActive ? <FaPlayCircle /> : <FaCheckCircle className="text-gray-300"/>}
                                        </div>
                                        <div className="text-sm">
                                            <p className={`line-clamp-2 ${isActive ? 'font-bold' : ''}`}>{lesson.title}</p>
                                            <span className="text-xs text-gray-500">{Math.floor(lesson.duration / 60)}:{String(lesson.duration % 60).padStart(2, '0')}</span>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default LessonSidebar;