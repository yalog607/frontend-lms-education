import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import useLessonStore from "../../store/useLessonStore";
import {
  FaPlayCircle,
  FaCheckCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import { formatDurationShort } from "../../lib/formatDuration";

const LessonSidebar = ({ course, progressData }) => {
  const navigate = useNavigate();
  const { courseId, lessonId } = useParams();

  // Lấy state từ Zustand
  const { expandedSections, toggleSection } = useLessonStore();

  return (
    <div className="bg-base-10 border-t md:border-none border-gray-500/50 h-full overflow-y-auto">
      <div className="p-4 font-bold border-y border-gray-500/10">
        Course content
      </div>

      {course.sections.map((section) => (
        <div key={section._id}>
          {/* Header Section */}
          <div
            className="bg-gray-100 p-3 flex justify-between items-center cursor-pointer hover:bg-gray-200"
            onClick={() => toggleSection(section._id)}
          >
            <h4 className="font-semibold text-sm">{section.title}</h4>
            {expandedSections.includes(section._id) ? (
              <FaChevronUp size={12} />
            ) : (
              <FaChevronDown size={12} />
            )}
          </div>

          {/* List Lessons */}
          {expandedSections.includes(section._id) && (
            <div>
              {section.lessons.map((lesson) => {
                const isActive = lesson._id === lessonId;
                const isCompleted = progressData.some(
                  (p) => p.lesson_id === lesson._id && p.isCompleted,
                );
                return (
                  <div
                    key={lesson._id}
                    onClick={() =>
                      navigate(`/learn/${courseId}/play/${lesson._id}`)
                    }
                    className={`p-3 flex gap-2 cursor-pointer transition-colors ${isActive ? "bg-rose-100 text-rose-600" : "hover:bg-gray-50"}`}
                  >
                    <div className="my-auto">
                      {isActive ? (
                        <FaPlayCircle className="text-rose-500" />
                      ) : isCompleted ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : (
                        <FaCheckCircle className="text-gray-300" />
                      )}
                    </div>
                    <div className="text-sm">
                      <p
                        className={`line-clamp-2 ${isActive ? "font-bold" : "font-medium"}`}
                      >
                        {lesson.title}
                      </p>
                      <span className="text-xs text-gray-600">
                        {new Date(lesson.updatedAt).toLocaleDateString()}
                        {" | "}
                      </span>
                      <span className="text-xs text-gray-500">
                        {formatDurationShort(lesson.duration)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default LessonSidebar;
