import React from "react";
import { useEffect, useRef, useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";
import { useSearchCourse } from "../hooks/useCourse";
import { Link, useNavigate } from "react-router-dom";

const SearchBar = () => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [inputValue, setInputValue] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const { data: searchResults, isLoading } = useSearchCourse(debouncedTerm);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    
    document.addEventListener("mousedown", handleClickOutside);
    
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedTerm(inputValue);
    }, 300);

    return () => clearTimeout(timer);
  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInputValue(value);

    if (value.trim().length > 0) {
      setShowDropdown(true);
    } else {
      setShowDropdown(false);
    }
  };

  const handleClear = () => {
    setInputValue("");
    setDebouncedTerm("");
    inputRef.current?.focus();
    setShowDropdown(false);
  };

  const handleResultClick = (courseId) => {
    setShowDropdown(false);
    setInputValue("");
    navigate(`/course/${courseId}`);
  };

  return (
    <div ref={containerRef} className="relative z-50 flex flex-col rounded-xl items-center justify-center gap-1 w-full">
      <label className="input rounded-full flex items-center gap-2 bg-base-100 w-full outline-none shadow-sm hover:shadow-md transition-all border-gray-500/20">
        <FiSearch />
        <input
          ref={inputRef}
          type="text"
          className="grow"
          placeholder="Search the course"
          value={inputValue}
          onChange={handleInputChange}
          onFocus={() => inputValue && setShowDropdown(true)}
        />
        {inputValue && (
          <button
            onClick={handleClear}
            className="text-gray-400 hover:text-gray-600"
          >
            <FiX size={18} />
          </button>
        )}
        {!inputValue && (
          <div className="hidden sm:flex gap-1">
            <kbd className="kbd kbd-sm">Ctrl</kbd>
            <kbd className="kbd kbd-sm">K</kbd>
          </div>
        )}
      </label>

      {showDropdown && (
        <div className="absolute top-full bg-base-100 w-full rounded-md drop-shadow-xl mt-2 transition-transform">
          {isLoading && (
            <div className="p-4 text-center text-gray-500 text-sm">
              <span className="loading loading-spinner loading-sm mr-2"></span>
              Searching...
            </div>
          )}

          {!isLoading && searchResults?.length === 0 && (
            <div className="p-4 text-center text-gray-500 text-sm">
              No courses found for "{debouncedTerm}"
            </div>
          )}

          {/* Results List */}
          {!isLoading && searchResults?.length > 0 && (
            <ul className="py-2">
              {searchResults.map((course) => (
                <li key={course._id || course.id} className="px-2">
                  <div className="flex justify-between items-center px-4 py-3 hover:bg-gray-200 cursor-pointer transition-colors rounded-xl" onClick={() => handleResultClick(course._id)}>
                    <div
                      className="flex items-center gap-3"
                    >
                      {/* Ảnh thumbnail nhỏ (nếu có) */}
                      <div className="w-10 h-10 rounded bg-gray-200 overflow-hidden shrink-0">
                        {course.thumbnail ? (
                          <img
                            src={course.thumbnail}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            IMG
                          </div>
                        )}
                      </div>

                      {/* Thông tin text */}
                      <div className="flex-1 min-w-0 overflow-hidden">
                        <h4 className="text-sm font-semibold text-slate-800 truncate">
                          {course?.name}
                        </h4>
                        <p className="text-xs font-semibold text-amber-500 truncate">
                          {course.teacher?.name || "Instructor"}
                        </p>
                      </div>
                    </div>

                    <p className="hidden sm:block font-medium text-sm text-emerald-600">${course.price.toLocaleString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
