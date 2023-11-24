import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import SideBar from "@component/components/SideBar";
import DisplayTrack from "../../components/DisplayTrack";
import AudioPlayer from "../../components/AudioPlayer";
import Input from "../../components/Input";
import { setShowSidebar } from "../../redux/sidebarSlice";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useDispatch, useSelector } from "react-redux";
import ProgressBar from "../../components/ProgressBar";

const Audio = () => {
  const [audio, setAudio] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { id, pathname } = router.query;
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const dispatch = useDispatch();
  const progressBarRef = useRef();
  const audioRef = useRef();
  const [timeProgress, setTimeProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  const toggleSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
  };
  

  console.log(id);

  useEffect(() => {
    const getAudio = async () => {
      try {
        if (id) {
          setLoading(true);
          const { data } = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
          );
          setAudio(data);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching audio:", error);
      }
    };

    getAudio();
  }, [id]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 1200) {
        dispatch(setShowSidebar(false));
      } else {
        dispatch(setShowSidebar(true));
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [dispatch]);

  return (
    <div>
      {showSidebar && <SideBar />}

      {!loading && audio ? (
        <>
          {/* <DisplayTrack audio={audio} />
          <AudioPlayer audio={audio} /> */}
          <div className="input-wrapper">
            <div className="input-container">
              <Input />
              <button className="nav-btn-player" onClick={toggleSidebar}>
                <TableRowsIcon />
              </button>
            </div>
          </div>
          <div className="summary">
            <div className="audio__book--summary">
              <div className="audio__book--summary-title">
                <b>{audio.title}</b>
              </div>
              <div className="audio__book--summary-text">{audio.summary}</div>
            </div>
          </div>
          {/* <div>
            {audio.title}
            {audio.summary}
          </div> */}
          <div className="audio__wrapper">
            <div className="audio__track--wrapper">
              <figure className="audio__track--image-mask">
                <figure className="audio__book--image-wrapper">
                  <img className="book__image" src={audio.imageLink} />
                </figure>
              </figure>
              <div className="audio__track--details-wrapper">
                <div className="audio__track--title">{audio.title}</div>
                <div className="audio__track--author">{audio.author}</div>
              </div>
            </div>
            <div className="audio__controls--wrapper">
            <DisplayTrack audio={audio} />
          <AudioPlayer audio={audio} />

          <ProgressBar {...{ progressBarRef, audioRef, timeProgress, duration }}/>
            </div>
  
          </div>
        </>
      ) : (
        <p>Loading audio data...</p>
      )}
    </div>
  );
};

export default Audio;
