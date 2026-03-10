import React, { useState } from "react";
import { FaComments } from "react-icons/fa6";
import { useCommentsByLessonId, useCreateComment } from "../hooks/useComment";

const Comment = ({ lessonId }) => {
  const [newComment, setNewComment] = useState("");
  const { data: comments, isLoading } = useCommentsByLessonId(lessonId);
  const [visibleCount, setVisibleCount] = useState(5);
  const { mutate: createComment, isLoading: isCreatingComment } =
    useCreateComment();

  const handlePostComment = () => {
    if (!newComment.trim()) {
      return;
    }
    createComment({ lesson_id: lessonId, content: newComment });
    setNewComment("");
  };

  return (
    <div className="mt-4 border-t pt-4 border-neutral-300">
      <div className="w-full flex mt-1">
        <input
          className="w-full flex-1 outline-none px-2 py-2 border border-neutral-300 text-sm transition-all focus:drop-shadow-md rounded-l-2xl"
          type="text"
          placeholder="Write a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          className="btn btn-secondary w-30 rounded-r-2xl"
          onClick={handlePostComment}
          disabled={isCreatingComment}
        >
          {isCreatingComment ? "Posting..." : "Post"}
        </button>
      </div>
      <h2 className="text-base font-medium text-neutral-800 md:text-lg mt-4">
        <FaComments className="inline-block mr-2 text-info" />
        Comments ({comments?.data?.length || 0})
      </h2>
      <div className="mt-2">
        {isLoading ? (
          <div className="h-10 grid place-items-center">
            <span className="loading loading-spinner text-neutral-500"></span>
          </div>
        ) : comments?.data?.length > 0 ? (
          <div className="w-full">
            {comments.data.slice(0, visibleCount).map((comment) => (
              <div
                key={comment._id}
                className="p-3 bg-neutral-100 rounded-lg mb-2"
              >
                <div className="text-sm font-medium text-neutral-800 flex gap-2 items-center">
                  <div className="avatar">
                    <div className="w-7 rounded-full">
                      <img
                        src={
                          comment.user_id.avatar ||
                          "https://img.daisyui.com/images/profile/demo/batperson@192.webp"
                        }
                        alt={`${comment.user_id.first_name} ${comment.user_id.last_name}`}
                      />
                    </div>
                  </div>
                  <p>
                    {comment.user_id.first_name} {comment.user_id.last_name}
                  </p>
                </div>
                <p className="text-sm text-neutral-600 mt-1">
                  {comment.content}
                </p>
                <p className="text-xs text-neutral-500 mt-2">
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
            ))}
            {visibleCount < comments.data.length && (
              <button
                className="btn btn-link btn-secondary btn-sm mt-2"
                onClick={() => setVisibleCount((prev) => prev + 5)}
              >
                Show more
              </button>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-500">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default Comment;
