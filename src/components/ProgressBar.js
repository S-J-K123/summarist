import React from "react";

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };

  const formatTime = (time) => {
    if (!isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const progressPercentage = (timeProgress / duration) * 100 || 0;

  return (
    <div className="progress">
      <span className="time current">{formatTime(timeProgress)}</span>
      <input
        className="progress-input"
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
        value={timeProgress}
        max={duration || 0}
      />
      <span className="time">{formatTime(duration)}</span>
      <div className="progress-bar">
        <div
          className="progress-bar-filled"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;