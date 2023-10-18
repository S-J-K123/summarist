import { BsMusicNoteBeamed } from 'react-icons/bs';
import React, { useState, useEffect, useRef } from "react";

const DisplayTrack = ({ currentTrack, audioRef, audio }) => {
  const [duration, setDuration] = useState(0);
  const progressBarRef = useRef(null); // Assuming progressBarRef is used in your code

  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    if (progressBarRef.current) {
      progressBarRef.current.max = seconds;
    }
  };

  

  return (
    <div>
      <audio src={audio?.audioLink} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack && currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span>
            </div>
          )}
        </div>
        <div className="text">
          <p className="title">{audio.title}</p>
          <p>{audio.author}</p>
        </div>
      </div>
    </div>
  );
};

export default DisplayTrack;
