import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";
import MuxPlayer from "@mux/mux-player-react";
import { useMuxToken } from "../../hooks/useLesson.js";
import { useUpdateProgress } from "../../hooks/useProgress.js";
import axiosClient from "../../lib/axiosClient.js";

const VideoPlayer = ({ lesson, onEnded, isAutoplay, progress }) => {
  const [retryCount, setRetryCount] = useState(0);
  const lastSavedTime = useRef(progress?.last_watched || 0);
  // Lưu volume vào localStorage để giữ lại cho lần xem sau
  const [volume, setVolume] = useState(() => {
    const v = localStorage.getItem("mux-player-volume");
    return v !== null ? Number(v) : 1;
  });
  useEffect(() => {
    localStorage.setItem("mux-player-volume", volume);
  }, [volume]);

  const { mutate: updateProgress } = useUpdateProgress();

  const playbackId =
    lesson.videoSource === "upload" ? lesson.muxPlaybackId : null;
  const {
    data: tokenData,
    isLoading,
    isError,
    refetch,
  } = useMuxToken(playbackId);

  const handleDuration = async (duration) => {
    // Update duration only if DB is 0 or differs significantly
    if (
      (lesson.duration === 0 || Math.abs(lesson.duration - duration) > 1) &&
      duration > 0
    ) {
      try {
        await axiosClient.put(`/lesson/update-lesson/${lesson._id}`, {
          duration: duration,
        });
        console.log("Đã cập nhật duration:", duration);
      } catch (error) {
        console.error("Lỗi update duration", error);
      }
    }
  };
  const saveProgress = (currentTime) => {
    const isNearEnd = lesson.duration > 0 && currentTime >= lesson.duration - 1;
    const isTimeJump = Math.abs(currentTime - lastSavedTime.current) > 35;
    if (isNearEnd || isTimeJump) {
      updateProgress({
        lesson_id: lesson._id,
        last_watched: currentTime,
        duration: lesson.duration || currentTime,
      });
      lastSavedTime.current = currentTime;
    }
  };

  // YouTube - Bắt sự kiện đang chạy
  const handleYoutubeTimeUpdate = (e) => {
    saveProgress(e.currentTarget.currentTime);
  };

  const handleYoutubeStart = (state) => {
    handleDuration(state.target.api.getDuration());
    if (progress?.last_watched > 0 && state.target && progress.isCompleted === false) {
      state.target.api.seekTo(progress.last_watched, "seconds");
    }
  };

  // Mux - Bắt sự kiện đang chạy
  const handleMuxTimeUpdate = (e) => {
    saveProgress(e.target.currentTime);
  };

  if (lesson.videoSource === "upload" && lesson.muxPlaybackId) {
    if (isLoading)
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-500 mb-2"></div>
          <span className="text-gray-700 dark:text-white">Loading secure token...</span>
        </div>
      );
    if (isError)
      return (
        <div className="flex flex-col items-center justify-center h-full w-full">
          <span className="text-red-500 font-semibold mb-2">Error when authorized!</span>
          <button className="btn btn-xs btn-warning" onClick={refetch}>Thử lại</button>
        </div>
      );

    // Tối ưu: truyền cả thumbnail token, poster, responsive, fix bug tua lại khi hết video
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <MuxPlayer
          streamType="on-demand"
          playbackId={lesson.muxPlaybackId}
          tokens={{ playback: tokenData?.token, thumbnail: tokenData?.token }}
          poster={`https://image.mux.com/${lesson.muxPlaybackId}/thumbnail.jpg?token=${tokenData?.token}`}
          metadata={{
            video_id: lesson._id,
            video_title: lesson.title,
          }}
          autoPlay={isAutoplay}
          onEnded={() => {
            // Chỉ gọi onEnded 1 lần duy nhất
            if (lesson.duration > 0) saveProgress(lesson.duration);
            if (typeof onEnded === 'function') {
              setTimeout(() => onEnded(), 100); // delay nhỏ để tránh bug tua lại
            }
          }}
          className="w-full h-full rounded-xl shadow-lg"
          onLoadedMetadata={(e) => {
            const duration = e.target.duration;
            handleDuration(duration);
          }}
          onError={(err) => {
            console.error("Mux Player error:", err);
            if (retryCount < 3) {
              setTimeout(() => {
                setRetryCount(retryCount + 1);
                refetch();
              }, 500);
            }
          }}
          onTimeUpdate={handleMuxTimeUpdate}
          startTime={progress?.last_watched || 0}
          volume={volume}
          onVolumeChange={e => setVolume(e.target.volume)}
        />
      </div>
    );
  }

  if (lesson.videoSource === "youtube") {
    return (
      <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
        <ReactPlayer
          src={lesson.video_url}
          width="100%"
          height="100%"
          controls={true}
          playing={isAutoplay}
          onEnded={() => {
            if (lesson.duration > 0) saveProgress(lesson.duration);
            onEnded();
          }}
          onTimeUpdate={handleYoutubeTimeUpdate}
          onStart={handleYoutubeStart}
          volume={volume}
          onVolumeChange={(e) => {
            setVolume(e.target.volume);
          }}
        />
      </div>
    );
  }

  return (
    <div className="text-white flex items-center justify-center h-full">
      Video source not supported!
    </div>
  );
};

export default VideoPlayer;
