import { BsMusicNoteBeamed } from 'react-icons/bs';
import React, { useEffect, useState, useRef } from "react";


const DisplayTrack = ({ currentTrack, audioRef, audio }) => {
  const onLoadedMetadata = () => {
    const seconds = audioRef.current.duration;
    setDuration(seconds);
    progressBarRef.current.max = seconds;
  };
  return (
    <div>
      <audio src={audio?.audioLink} ref={audioRef}  onLoadedMetadata={onLoadedMetadata} />
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
