export const formatDuration = (totalSeconds) => {
  if (!totalSeconds) return "0 second";
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  let mStr = minutes > 0 ? "minutes" : "minute";
  let sStr = seconds > 0 ? "seconds" : "second";

  if (minutes > 0) {
    return `${minutes} ${mStr} ${seconds} ${sStr}`;
  }
  return `${seconds} ${sStr}`;
};

export const formatDurationShort = (totalSeconds) => {
  if (!totalSeconds || totalSeconds < 0) return "00:00";
  
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = Math.floor(totalSeconds % 60);

  const mm = String(minutes).padStart(2, '0');
  const ss = String(seconds).padStart(2, '0');

  return `${mm}:${ss}`;
};