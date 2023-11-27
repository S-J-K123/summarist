import SideBar from "@component/components/SideBar";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import Link from "next/link";
import Input from "@component/components/Input";
import Skeleton from "../components/Skeleton";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { useDispatch, useSelector } from "react-redux";
import { setShowSidebar } from "../redux/sidebarSlice";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import StarBorderIcon from "@mui/icons-material/StarBorder";

const ForYou = () => {
  const [selected, setSelected] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null);
  const dispatch = useDispatch();
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const audioRefs = useRef({});
  const [audioDurations, setAudioDurations] = useState({});

  const toggleSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 883) {
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




  const formatTime = (duration) => {
    if (duration && !isNaN(duration)) {
      const minutes = Math.floor(duration / 60);
      const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
      const seconds = Math.floor(duration % 60);
      const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
      return `${formatMinutes}:${formatSeconds}`;
    }
    return "00:00";
  };

  const onLoadedMetadata = (id) => {
    const seconds = audioRefs.current[id]?.duration || 0;
    setAudioDurations((prevDurations) => ({ ...prevDurations, [id]: seconds }));
  };


  useEffect(() => {
    const fetchAudioDuration = async () => {
      try {
        const audio = new Audio(selected.audioLink);

        audio.addEventListener("loadedmetadata", () => {
          setAudioDurations(audio.duration);
        });

        audio.load();
      } catch (error) {
        console.error("Error fetching audio duration:", error);
      }
    };

    if (selected.audioLink) {
      fetchAudioDuration();
    }
  }, [selected.audioLink]);


  useEffect(() => {
    async function getSelectedBooks() {
      try {
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        setSelected(data);
      } catch (error) {
        console.error("Error fetching selected books:", error);
      }
    }

    async function getRecommendedBooks() {
      try {
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    }

    async function getSuggestedBooks() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );
        setSuggested(data);
      } catch (error) {
        console.error("Error fetching suggested books:", error);
      } finally {
        // Set loading to false after all data has been processed
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }

    getSelectedBooks();
    getRecommendedBooks();
    getSuggestedBooks();
  }, []);

  return (
    <div>
      {showSidebar && <SideBar />}
      <div className="input-wrapper">
        <div className="input-container">
                  <Input />
        <button className="nav-btn" onClick={toggleSidebar}>
          <TableRowsIcon />
        </button>
        </div>

      </div>
      <div className="row">
        <div className="whole-container ml-[90px]">
          <div>
            <h1 className="for-you-title">Selected just for you</h1>
          </div>
          {loading ? (
            <Skeleton width={"550px"} height={"200px"} background="blue" />
          ) : (
            <div className="selected__whole--container">
            <div className="selected-book-container">
              {selected.map((selected) => (
                <>
                  <div className="w-[37%] color-[#032b41]" key={selected.id}>
                    <p className="selected__subtitle">{selected.subTitle}</p>
                  </div>

                  <div className="selected-book-line"></div>

                  <div className="book-details flex flex-row">
                    <Link href={`/book/${selected.id}`}>
                      <img
                        className="w-[140px] mr-[20px] "
                        src={selected.imageLink}
                        alt="Book Cover"
                      />
                    </Link>
                    <Link href={`/book/${selected.id}`}>
                      <div className="book-obj-wrapper">
                        <div>
                          <p className="selected__book--title font-bold color-[#032b41] mb-[8px]">
                            {selected.title}
                          </p>
                        </div>

                        <div className="selected__book--author">
                          <p>{selected.author}</p>
                        </div>
                        <div className="selected__book--duration-wrapper p-4 ml-[-33px] flex items-center">
                          <BsFillPlayCircleFill className="selected__book--icon w-[100%] h-[33px]" />
                          {audioRefs && (
                    <audio
                      className="display-none"
                      src={selected?.audioLink}
                      ref={(audioRef) =>
                        (audioRefs.current[selected.id] = audioRef)
                      }
                      onLoadedMetadata={() => onLoadedMetadata(selected.id)}
                    />
                  )}
                  <div className="selected__book--duration">
                    {formatTime(audioDurations[selected.id] || 0)}
                  </div>
                          {/* <audio controls>
                    <source src={selected.audioLink} type="audio/mpeg" />
                  </audio>  */}
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </div>
          </div>
          )}

          <div>
            <h1 className="for-you-title">Recommended For You</h1>
            <p>We think you'll like this</p>
          </div>

          <div className="books-container flex overflow-x-auto gap-[32px] mb-[32px]">
            {recommended.map((recommended) => {
              return (
                <div
                  className="for-you__recommended--books-link hover-books"
                  key={recommended.id}
                >
                  <Link href={`/book/${recommended.id}`}>
                    {loading ? (
                      <Skeleton width={"170px"} height={"200px"} />
                    ) : (
                      <div className="user-card">
                        <div className="user-card__container flex justify-center flex-col ">
                          <img
                            className="w-[100%] mb-2 mt-6"
                            src={recommended.imageLink}
                            alt="Book Cover"
                          />
                          <div>
                            <p className="book-title">{recommended.title}</p>
                          </div>
                          <div>
                            <p className="book-author">{recommended.author}</p>
                          </div>
                          <div>
                            <p className="book-subtitle">
                              {recommended.subTitle}
                            </p>
                          </div>
                          <div className="library__details--wrapper">
                <div className="library__book--details">
                        <div className="library__book--details-icon">
                          <AccessTimeIcon
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div className="library__book--details-text"></div>
                        {audioRefs && (
                          <audio
                            className="display-none"
                            src={recommended?.audioLink}
                            ref={(audioRef) =>
                              (audioRefs.current[recommended.id] = audioRef)
                            }
                            onLoadedMetadata={() => onLoadedMetadata(recommended.id)}
                          />
                        )}
                        <div className="selected__book--duration">
                          {formatTime(audioDurations[recommended.id] || 0)}
                        </div>
                      </div>
                      <div className="library__book--details">
                        <div className="library__book--details-icon">
                          <StarBorderIcon
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div className="library__book--details-text">
                          {recommended.averageRating}
                        </div>
                      </div>
                      </div>
                          {/* Conditionally render the book pill */}
                          {recommended.subscriptionRequired && (
                            <div className="book-pill">Premium</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="suggested-container mb-[70px]">
            <div>
              <h1 className="for-you-title">Suggested Books</h1>
              <p className="mb-[10px]">Browse those books</p>
            </div>

            <div className="books-container flex overflow-x-auto gap-[32px] mb-[32px]">
              {suggested.map((suggested) => {
                return (
                  <div
                    className="for-you__recommended--books-link hover-books"
                    key={suggested.id}
                  >
                    <Link href={`/book/${suggested.id}`}>
                      {loading ? (
                        <Skeleton width={"170px"} height={"200px"} />
                      ) : (
                        <div className="user-card">
                          <div className="user-card__container flex justify-center flex-col items-center">
                            <img
                              className="w-[100%] mb-2 mt-6"
                              src={suggested.imageLink}
                              alt="Book Cover"
                            />
                            <div className="book-details-container">
                              <div>
                                <p className="book-title">{suggested.title}</p>
                              </div>
                              <div>
                                <p className="book-author">
                                  {suggested.author}
                                </p>
                              </div>
                              <div>
                                <p className="book-subtitle">
                                  {suggested.subTitle}
                                </p>
                              </div>
                              <div className="library__details--wrapper">
                              <div className="library__book--details">
                        <div className="library__book--details-icon">
                          <AccessTimeIcon
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div className="library__book--details-text"></div>
                        {audioRefs && (
                          <audio
                            className="display-none"
                            src={suggested?.audioLink}
                            ref={(audioRef) =>
                              (audioRefs.current[suggested.id] = audioRef)
                            }
                            onLoadedMetadata={() => onLoadedMetadata(suggested.id)}
                          />
                        )}
                        <div className="selected__book--duration">
                          {formatTime(audioDurations[suggested.id] || 0)}
                        </div>
                      </div>
                      <div className="library__book--details">
                        <div className="library__book--details-icon">
                          <StarBorderIcon
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div className="library__book--details-text">
                          {suggested.averageRating}
                        </div>
                      </div>
                      </div>
                      </div>
                              {/* Conditionally render the book pill */}
                              {suggested.subscriptionRequired && (
                                <div className="book-pill">Premium</div>
                              )}
                            </div>
                          </div>
                      
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
