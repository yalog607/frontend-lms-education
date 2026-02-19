import React, {useCallback, useRef} from "react";
import ReactPlayer from "react-player";
import MuxPlayer from "@mux/mux-player-react";
import { useMuxToken } from "../../hooks/useLesson.js";
import axios from "axios";

const VideoPlayer = ({ lesson, onEnded, isAutoplay }) => {
    const playerRef = useRef(null);

  const handleDuration = useCallback(
    async (duration) => {
      // Chỉ update nếu trong DB đang là 0
      if (lesson.duration === 0 && duration > 0) {
        try {
          await axios.put(`/lesson/update/${lesson._id}`, {
            duration: duration,
          });
          console.log("Đã cập nhật duration:", duration);
        } catch (error) {
          console.error("Lỗi update duration", error);
        }
      }
    },
    [lesson._id, lesson.duration],
  );
  // 1. Nếu là Youtube
  if (lesson.videoSource === "youtube") {
    return (
      <ReactPlayer
        ref={playerRef}
        src={lesson.video_url}
        width="100%"
        height="100%"
        controls={true}
        playing={isAutoplay}
        onEnded={onEnded}
        onReady={() => {
            const duration = playerRef.current?.getDuration();
            if (duration) {
                handleDuration(duration);
            }
        }}
      />
    );
  }

  // 2. Nếu là Mux Video (Cần Token)
  if (lesson.videoSource === "upload" && lesson.muxPlaybackId) {
    // Gọi Hook lấy token ngay tại đây
    const {
        data: tokenData,
        isLoading,
        isError,
        // eslint-disable-next-line react-hooks/rules-of-hooks
    } = useMuxToken(lesson.muxPlaybackId);

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
        tokens={{ playback: tokenData?.token }} // Truyền Token vào đây
        metadata={{
          video_id: lesson._id,
          video_title: lesson.title,
        }}
        autoPlay={isAutoplay}
        onEnded={onEnded}
        className="w-full h-full"
        onLoadedMetadata={(e) => {
            const duration = e.target.duration;
            handleDuration(duration);
        }}
      />
    );
  }

  return (
    <div className="text-white flex items-center justify-center h-full">
      Định dạng không hỗ trợ
    </div>
  );
};

export default VideoPlayer;
