// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Input from "../components/Input";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import { useDispatch, useSelector } from "react-redux";
import { initializeAuth, setUser } from "../redux/userSlice";

const Library = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user); // Assuming you have a user slice in your Redux store
  const [savedBooks, setSavedBooks] = useState([]);
  const [isUserAuth, setIsUserAuth] = useState(false);

  useEffect(() => {
    dispatch(initializeAuth());
  }, []);

  useEffect(() => {
    const fetchSavedBooks = async () => {
      try {
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
      }
    };

    if (isUserAuth) {
      fetchSavedBooks();
    }
  }, [user, isUserAuth]);

  // if (!isUserAuth) {
  //   return <div>Loading...</div>;
  // }

  return (
    <div>
      <SideBar />
      <Input />
      <div className="Saved__books--title">Saved Books</div>
      <div className="library-container">
        {savedBooks.map((book) => (
          <div key={book.id}>
            <div className="library__saved-books">
              <div className="library__books-link">
                <div className="library__book_image--wrapper">
                  <img
                    className="library__book-img"
                    src={book.imageLink}
                    alt={book.title}
                  />
                </div>
                <div className="saved__book--title">{book.title}</div>
                <div className="saved__book--author">{book.author}</div>
                <div className="saved__book--sub-title">{book.subTitle}</div>
                <div className="library__details--wrapper">
                  <div className="library__book--details">
                    <div className="library__book--details-icon">
                      <AccessTimeIcon
                        style={{ height: "100%", width: "100%" }}
                      />
                    </div>
                    <div className="library__book--details-text"></div>
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
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
