import React, { useEffect, useState, useRef } from "react";
import DisplayTrack from "./DisplayTrack";
import axios from "axios";
import { useParams } from "react-router-dom";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ audio }) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef();
  const progressBarRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        <DisplayTrack {...{ audio, audioRef, setDuration, progressBarRef }} />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
          }}
        />
        <ProgressBar
          {...{ progressBarRef, audioRef, timeProgress, duration }}
        />
      </div>
    </div>
  );
};

export default AudioPlayer;