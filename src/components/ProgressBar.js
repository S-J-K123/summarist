import React, { useEffect, useState } from "react";

const ProgressBar = ({ progressBarRef, audioRef, timeProgress, duration }) => {
  const handleProgressChange = () => {
    audioRef.current.currentTime = progressBarRef.current.value;
  };



  const formatTime = (time) => {
    if (time && !isNaN(time)) {
      const minutes = Math.floor(time / 60);
      const formatMinutes =
        minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(time % 60);
      const formatSeconds =
        seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return '00:00';
  };

  return (

    
    <div className="progress">
     <span className="time current">{formatTime(timeProgress)}</span>
      <input className="progress-input"
        type="range"
        ref={progressBarRef}
        defaultValue="0"
        onChange={handleProgressChange}
      />
   <span className="time">{formatTime(duration)}</span>

   {/* <div className="audio__progress--wrapper">
<div className="audio__time">{formatTime(timeProgress)}</div>
<input className="audio__progress--bar"
         type="range"
        ref={progressBarRef}
         defaultValue="0"
     onChange={handleProgressChange}
      />
      <div className="audio__time">{formatTime(duration)}</div>
</div> */}
    </div>
  );
};

export default ProgressBar;