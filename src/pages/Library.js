import React, { useEffect, useState, useRef } from "react";
import SideBar from "../components/SideBar";
import Input from "../components/Input";
import { collection, getDocs, doc,  deleteDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from "react-redux";
import { initializeAuth, setUser } from "../redux/userSlice";
import { useSelector } from "react-redux";
import Link from "next/link";
import Skeleton from "../components/Skeleton";
import TableRowsIcon from "@mui/icons-material/TableRows";
import { setShowSidebar } from "../redux/sidebarSlice"

const Library = () => {
  const user = auth.currentUser;
  const dispatch = useDispatch();
  const [savedBooks, setSavedBooks] = useState([]);
  const isUserAuth = useSelector((state) => state.user.isUserAuth);
  const [loading, setLoading] = useState(true);
  const showSidebar = useSelector((state) => state.sidebar.showSidebar);
  const toggleSidebar = () => {
    dispatch(setShowSidebar(!showSidebar));
  };

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  const audioRefs = useRef({});
  const [audioDurations, setAudioDurations] = useState({});

  useEffect(() => {
    const fetchAudioDuration = async () => {
      try {
        // Iterate over each saved book
        savedBooks.forEach((book) => {
          const audio = new Audio(book.audioLink);

          audio.addEventListener("loadedmetadata", () => {
            // Update audio duration in state
            setAudioDurations((prevDurations) => ({
              ...prevDurations,
              [book.id]: audio.duration,
            }));
          });

          audio.load();
        });
      } catch (error) {
        console.error("Error fetching audio duration:", error);
      }
    };

    fetchAudioDuration();
  }, [savedBooks]);

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
    const fetchSavedBooks = async () => {
      try {
        setLoading(true);

        const librarySnapshot = await getDocs(
          collection(db, "users", user.uid, "library")
        );
        const books = librarySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Extract book IDs
        const bookIds = books.map((book) => book.bookId);

        // Use the book IDs to make API calls for each book
        const apiCalls = bookIds.map(async (bookId) => {
          const { data } = await axios.get(
            `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${bookId}`
          );
          return data;
        });

        // Wait for all API calls to complete
        const bookDetails = await Promise.all(apiCalls);

        setSavedBooks(bookDetails);
      } catch (error) {
        console.error("Error fetching saved books:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isUserAuth) {
      fetchSavedBooks();
    } else {
      setSavedBooks([]);
    }
  }, [user, isUserAuth]);

  // if (!isUserAuth) {
  //   return <div>Loading...</div>;
  // }


   const deleteBook = async (userId, bookId) => {
    const bookRef = doc(db, "users", userId, "library", bookId);
  
    try {
      await deleteDoc(bookRef);
      console.log("Book deleted successfully");
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };
  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(user.uid, bookId);
      // Optionally, update the state or perform any other actions
    } catch (error) {
      console.error("Error deleting book:", error);
    }
  };



  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 840) {
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
      <div className="input-wrapper">
        <div className="input-container">
          <Input />
          <button className="nav-btn-library" onClick={toggleSidebar}>
            <TableRowsIcon />
          </button>
        </div>
      </div>
      <div className="Saved__books--title">Saved Books</div>

      <div className="library-container ">
        {savedBooks.map((book) => (
          <div key={book.id}>
            <div className="library__saved-books ">
              {loading ? (
                <Skeleton width={"200px"} height={"300px"} />
              ) : (
                <div className="library__books-link hover-books">
                  <Link href={`/book/${book.id}`}>
                    <div className="library__book_image--wrapper ">
                      <img
                        className="library__book-img"
                        src={book.imageLink}
                        alt={book.title}
                      />
                    </div>
                    <div className="saved__book--title">{book.title}</div>
                    <div className="saved__book--author">{book.author}</div>
                    <div className="saved__book--sub-title">
                      {book.subTitle}
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
                            src={book?.audioLink}
                            ref={(audioRef) =>
                              (audioRefs.current[book.id] = audioRef)
                            }
                            onLoadedMetadata={() => onLoadedMetadata(book.id)}
                          />
                        )}
                        <div className="selected__book--duration">
                          {formatTime(audioDurations[book.id] || 0)}
                        </div>
                      </div>
                      <div className="library__book--details">
                        <div className="library__book--details-icon">
                          <StarBorderIcon
                            style={{ height: "100%", width: "100%" }}
                          />
                        </div>
                        <div className="library__book--details-text">
                          {book.averageRating}
                        </div>
                      </div>
                      
                    </div>
                  </Link>

                  <button onClick={() => handleDeleteBook(book.id)}>
                    Delete Book
                  </button>

                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
