// Audio.js

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
  const { id } = router.query;

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

  // Condition for adjusting sidebar height
  const isAudioPlayerPresent = !!audio; // Adjust this based on your actual condition
  const sidebarHeight = isAudioPlayerPresent ? "200px" : "300px";

  return (
    <div>
      <SideBar style={{ height: sidebarHeight }} />
      {!loading && audio && (
        <>
          <DisplayTrack audio={audio} />
          <AudioPlayer audio={audio} />
          <div className="input-wrapper">
            <Input />
          </div>
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
                <button className="audio__controls--btn"></button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Audio;
