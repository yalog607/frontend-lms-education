import React, { useState, useRef } from "react";
import ReactPlayer from "react-player";
import MuxPlayer from "@mux/mux-player-react";
import { useMuxToken } from "../../hooks/useLesson.js";
import { useUpdateProgress } from "../../hooks/useProgress.js";
import axiosClient from "../../lib/axiosClient.js";

const VideoPlayer = ({ lesson, onEnded, isAutoplay, progress }) => {
  const [retryCount, setRetryCount] = useState(0);
  const lastSavedTime = useRef(progress?.last_watched || 0);
  const [volume, setVolume] = useState(1); // Mặc định volume là 100%

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
  const handleYoutubeProgress = (state) => {
    // state.playedSeconds is the current time
    saveProgress(state.target.api.getCurrentTime());
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
        <div className="text-white flex items-center justify-center h-full">
          Đang tải token bảo mật...
        </div>
      );
    if (isError)
      return (
        <div className="text-red-500 flex items-center justify-center h-full">
          Lỗi xác thực video!
        </div>
      );

    return (
      <MuxPlayer
        streamType="on-demand"
        playbackId={lesson.muxPlaybackId}
        tokens={{ playback: tokenData?.token }}
        metadata={{
          video_id: lesson._id,
          video_title: lesson.title,
        }}
        autoPlay={isAutoplay}
        onEnded={() => {
          if (lesson.duration > 0) saveProgress(lesson.duration);
          onEnded();
        }}
        className="w-full h-full"
        onLoadedMetadata={(e) => {
          const duration = e.target.duration;
          console.log(duration);
          handleDuration(duration);
        }}
        onError={(err) => {
          console.error("Mux Player error:", err);
          if (retryCount < 3) {
            console.log(`Retrying to fetch token... Attempt ${retryCount + 1}`);
            setRetryCount(retryCount + 1);
            refetch();
          }
        }}
        onTimeUpdate={handleMuxTimeUpdate}
        startTime={progress?.last_watched || 0}
      />
    );
  }

  if (lesson.videoSource === "youtube") {
    return (
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
        onProgress={handleYoutubeProgress}
        onStart={handleYoutubeStart}
        volume={volume}
        onVolumeChange={(e) => {
          setVolume(e.target.volume);
        }}
      />
    );
  }

  return (
    <div className="text-white flex items-center justify-center h-full">
      Video source not supported!
    </div>
  );
};

export default VideoPlayer;
