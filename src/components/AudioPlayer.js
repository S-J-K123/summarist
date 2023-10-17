import { useEffect, useState } from "react";
import DisplayTrack from "./DisplayTrack";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Controls from './Controls';
// import ProgressBar from './ProgressBar';

const AudioPlayer = ({audio}) => {
console.log(audio)

  return (
    <div className="audio-player">
      <div className="inner">

        <DisplayTrack audio={audio} />
        {/* <Controls />
        <ProgressBar /> */}
      </div>
    </div>
  );
};
export default AudioPlayer;
