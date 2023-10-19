import { BsMusicNoteBeamed } from 'react-icons/bs';
import React, { useState, useEffect, useRef } from "react";

const DisplayTrack = ({ currentTrack, audioRef, audio, setDuration, progressBarRef }) => {
  const onLoadedMetadata = () => {
    if (audioRef && audioRef.current) {
      const seconds = audioRef.current.duration;
      setDuration(seconds);
      if (progressBarRef.current) {
        progressBarRef.current.max = seconds;
      }
    }
  };

  return (
    <div>
      {audioRef && <audio src={audio?.audioLink} ref={audioRef} onLoadedMetadata={onLoadedMetadata} />}
      <div className="audio-info">
        <div className="audio-image">
          {currentTrack && currentTrack.thumbnail ? (
            <img src={currentTrack.thumbnail} alt="audio avatar" />
          ) : (
            <div className="icon-wrapper">
              {/* <span className="audio-icon">
                <BsMusicNoteBeamed />
              </span> */}
            </div>
          )}
        </div>
        {/* <div className="text">
          <p className="title">{audio && audio.title}</p>
          <p>{audio && audio.author}</p>
        </div> */}
      </div>
    </div>
  );
};

export default DisplayTrack;