import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SideBar from "@component/components/SideBar";
import DisplayTrack from "../../components/DisplayTrack";
import AudioPlayer from "../../components/AudioPlayer";
import Input from "../../components/Input";



const Audio = () => {
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter(); 
  const { id, pathname } = router.query;

  console.log(id);

  async function getAudio() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setAudio(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching audio:", error);
    }
  }

  useEffect(() => {
    getAudio();
  }, [id]);

  return (
    <div>
      <SideBar
        className={`sidebar__wrapper ${
          pathname && pathname.startsWith("/player")
            ? "sidebar__bump-up"
            : ""
        }`}
      />
      {!loading && audio ? (
        <>
          <DisplayTrack audio={audio} />
          <AudioPlayer audio={audio} />
          <div className="input-wrapper">
            <Input />
          </div>
          {/* <div>
            {audio.title}
            {audio.summary}
          </div> */}
          <div className="audio__wrapper">
            <div className="audio__track--wrapper">
              <figure className="audio__track--image-mask">
                <figure className="audio__book--image-wrapper"><img className="book__image" src={audio.imageLink}/></figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div className="audio__track--title">{audio.title}</div>
                <div className="audio__track--author">{audio.author}</div>
              </div>
            </div>
            <div className="audio__controls--wrapper">
              <div className="audio__controls">
                <button className="audio__controls--btn"></button>
                {/* <button className="audio__controls--btn audio__controls--btn-play">
                  <PlayArrowIcon />
                </button> */}
                <button className="audio__controls--btn"></button>
              </div>
            </div>
            {/* <div className="audio__progress--wrapper">
              <div className="audio__time"></div>
              <input
                type="range"
                value="0"
                max="292.872"
                className="audio__progress--bar"
              />
              <div className="audio__time">time</div>
            </div> */}
          </div>
        </>
      ) : (
        <p>Loading audio data...</p>
      )}
    </div>
  );
};

export default Audio;