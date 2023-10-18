import React, { useEffect, useState, useRef } from "react";
import DisplayTrack from "./DisplayTrack";
import axios from "axios";
import { useParams } from "react-router-dom";
import Controls from "./Controls";
import ProgressBar from "./ProgressBar";

const AudioPlayer = ({ audio }) => {
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [trackIndex, setTrackIndex] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(tracks[trackIndex]);
  console.log(audio);
  // reference
  const audioRef = useRef();

  console.log(audioRef);

  const progressBarRef = useRef();

  return (
    <div className="audio-player">
      <div className="inner">
        {/*I was getting double audio players due to DisplayTrack*/}

        <DisplayTrack {...{ audio, audioRef, setDuration, progressBarRef }} />
        <Controls
          {...{
            audioRef,
            progressBarRef,
            duration,
            setTimeProgress,
            tracks,
            trackIndex,
            setTrackIndex,
            setCurrentTrack,
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
