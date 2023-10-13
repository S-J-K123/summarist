import { useEffect, useState } from "react";
import DisplayTrack from "./DisplayTrack";
import axios from "axios";
import { useParams } from "react-router-dom";
// import Controls from './Controls';
// import ProgressBar from './ProgressBar';

const AudioPlayer = () => {
  const [audio, seAudio] = useState([]);
  const id = useParams();
  console.log(id);

  async function fetchAudio() {
    const { data } = await axios.get(
      `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
    );
    seAudio(data);
    console.log(data);
  }

  useEffect(() => {
    fetchAudio();
  }, []);

  return (
    <div className="audio-player">
      <div className="inner">
      {audio.title}
        <DisplayTrack />
        {/* <Controls />
        <ProgressBar /> */}
      </div>
    </div>
  );
};
export default AudioPlayer;
