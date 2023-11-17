import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import axios from "axios";
import Input from "../../components/Input";
import Link from "next/link";
import Skeleton from "../../components/Skeleton";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import SideBar from "@component/components/SideBar";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import { auth, db } from "../../../firebase";
import LoginModal from "../../components/modals/LoginModal";
import SignUpModal from "../../components/modals/SignUpModal";
import ResetModal from "../../components/modals/ResetModal";
import { initializeAuth } from "../../redux/userSlice";

import {
  closeSignUpModal,
  openSignUpModal,
  toggleLoginModal,
  toggleSignUpModal,
} from "@component/redux/ModalSlice";
import { useDispatch, useSelector } from "react-redux";

export default function BookDetails() {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [isSignUpOpen, setIsSignUpOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const audioRefs = useRef({});
  const [audioDurations, setAudioDurations] = useState({});

  const user = auth.currentUser;

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
    if (user) {
      setIsUserLoggedIn(true);
    } else {
      setIsUserLoggedIn(false);
    }
  }, [user]);

  async function getBookById() {
    const user = auth.currentUser;
    const bookId = router.query.id;

    if (user) {
      await setDoc(doc(db, "users", user.uid, "library", bookId), {
        bookId: bookId,
      });
      setIsBookMarked(true);
      console.log("Bookmarked");
    } else {
      console.log(
        "User not logged in. Open modal or handle non-logged-in user case."
      );
    }
  }

  const handleOpenSignUpModal = () => {
    setIsSignUpOpen(true);
    dispatch(toggleLoginModal()); // Close the loginModal
  };

  const handleSaveToLibrary = async () => {
    try {
      const user = getAuth().currentUser;
      const bookId = router.query.id; // Use router.query.id here

      if (user) {
        await setDoc(doc(db, "users", user.uid, "library", bookId), {
          bookId: bookId,
        });
        setIsBookMarked(true);
      }
    } catch (error) {
      console.error("Error saving book to library:", error);
    }
  };

  const handleRemoveFromLibrary = async () => {
    try {
      const user = getAuth().currentUser;
      const bookId = router.query.id;

      if (user) {
        const docRef = doc(db, "users", user.uid, "library", bookId);
        await deleteDoc(docRef);
        setIsBookMarked(false);
      }
    } catch (error) {
      console.error("Error removing book from library:", error);
    }
  };

  const checkIfBookIsBookmarked = async () => {
    try {
      const user = getAuth().currentUser;
      const bookId = router.query.id; // Use router.query.id here

      if (user) {
        const docRef = doc(db, "users", user.uid, "library", bookId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setIsBookMarked(true);
        } else {
          setIsBookMarked(false);
        }
      }
    } catch (error) {
      console.error("Error checking if book is bookmarked:", error);
    }
  };

  async function bookId() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${router.query.id}`
      );
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const fetchAudioDuration = async () => {
      try {
        const audio = new Audio(posts.audioLink);

        audio.addEventListener("loadedmetadata", () => {
          const seconds = audio.duration || 0;
          setAudioDurations((prevDurations) => ({
            ...prevDurations,
            [posts.id]: seconds,
          }));
        });

        audio.load();
      } catch (error) {
        console.error("Error fetching audio duration:", error);
      }
    };

    if (posts.audioLink) {
      fetchAudioDuration();
    }
  }, [posts.audioLink, posts.id]);

  useEffect(() => {
    if (router.query.id) {
      checkIfBookIsBookmarked();
      bookId();
    }
  }, [router.query.id]);

  useEffect(() => {
    dispatch(initializeAuth()).then(() => {});
  }, [dispatch]);

  return (
    <div>
      <SideBar />
      <div className="hidden">
        <LoginModal />
        <SignUpModal />
        <ResetModal />
      </div>
      <div className="input-wrapper">
        <Input />
      </div>

      <div className="flex justify-center w-[50%] ml-[320px]">
        <div className="text-wrapper">
          <div className="inner-wrapper">
            <div className="inner-book">
              {loading ? (
                <Skeleton width={400} height={50} />
              ) : (
                <>
                  <div className="inner-book-title">{posts.title}</div>

                  <div className="inner-book-author">{posts.author}</div>
                  <div className="inner-book-subtitle">{posts.subTitle}</div>
                </>
              )}
            </div>
          </div>
          {loading ? (
            <Skeleton width={400} height={20} />
          ) : (
            <div className="inner-book-wrapper">
              <div className="inner-book-description-wrapper">
                <div className="inner-book-description">
                  <div className="inner-book-icon">
                    <StarOutlineIcon className="star" />
                  </div>
                  <div className="inner-book-overall-rating">
                    {posts.averageRating}&nbsp;
                  </div>
                  <div className="inner-book-total-rating">
                    ({posts.totalRating}&nbsp;ratings)
                  </div>
                </div>

                <div className="inner-book-description">
                  <div className="inner-book-icon">
                    <AccessTimeIcon className="clock" />
                  </div>
                  {audioRefs && (
                    <audio
                      className="display-none"
                      src={posts?.audioLink}
                      ref={(audioRef) =>
                        (audioRefs.current[posts.id] = audioRef)
                      }
                      onLoadedMetadata={() => onLoadedMetadata(posts.id)}
                    />
                  )}
                  <div className="selected__book--duration">
                    {formatTime(audioDurations[posts.id] || 0)}
                  </div>
                  <div className="inner-book-overall-rating">
                    {posts.totalDuration}&nbsp;
                  </div>
                </div>
                <div className="inner-book-description">
                  <div className="inner-book-icon">
                    <MicIcon className="clock" />
                  </div>
                  <div className="inner-book-overall-rating">
                    {posts.type}&nbsp;
                  </div>
                </div>
                <div className="inner-book-description">
                  <div className="inner-book-icon">
                    <LightbulbIcon className="clock" />
                  </div>
                  <div className="inner-book-overall-rating">
                    {posts.keyIdeas}&nbsp; Key ideas
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="inner-book__read--btn-wrapper">
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <ImportContactsIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${router.query.id}`}>
                <div className="inner-book__read--text">Read</div>
              </Link>
            </button>
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <MicIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${router.query.id}`}>
                <div className="inner-book__read--text">Listen</div>
              </Link>
            </button>
          </div>

          {isUserLoggedIn ? (
            <div
              className="inner-book__bookmark"
              onClick={
                isBookMarked ? handleRemoveFromLibrary : handleSaveToLibrary
              }
            >
              <div className="inner-book__bookmark--icon">
                {isBookMarked ? <IoBookmark /> : <IoBookmarkOutline />}
              </div>
              <div className="inner-book__bookmark--text">
                {isBookMarked ? "Book saved!" : "Add title to My Library"}
              </div>
            </div>
          ) : (
            <div
              className="inner-book__bookmark"
              onClick={handleOpenSignUpModal}
            >
              <div className="inner-book__bookmark--icon">
                {isBookMarked ? <IoBookmark /> : <IoBookmarkOutline />}
              </div>
              <div className="inner-book__bookmark--text">
                {isBookMarked ? "Book saved!" : "Add title to My Library"}
              </div>
            </div>
          )}

          {loading ? (
            <Skeleton width={200} height={20} />
          ) : (
            <div className="inner-book__secondary--title">What's it about?</div>
          )}
          {loading ? (
            <Skeleton width={0} height={5} />
          ) : (
            <div className="inner-book__tags--wrapper">
              <div className="inner-book__tag">Communication Skills</div>
              <div className="inner-book__tag">Technology & the Future</div>
            </div>
          )}
          {loading ? (
            <Skeleton width={500} height={300} />
          ) : (
            <div className="inner-book__book--description">
              {posts.bookDescription}
            </div>
          )}

          <h2 className="inner-book__secondary--title">About the author</h2>
          {loading ? (
            <Skeleton width={500} height={300} />
          ) : (
            <div className="inner-book__author--description">
              {posts.authorDescription}
            </div>
          )}
        </div>
        <div className="inner-book--img-wrapper">
          {loading ? (
            <Skeleton width={300} height={300} />
          ) : (
            <figure className="book__image--wrapper">
              <img src={posts.imageLink} className="book__image" />
            </figure>
          )}
        </div>
      </div>
    </div>
  );
}
