import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Input from "../components/Input";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import axios from "axios";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

const Library = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;

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

    if (user) {
      fetchSavedBooks();
    }
  }, []);

  return (
    <div>
      <SideBar />
      <Input />
      <div className="library-container">
        <div className="for-you__title">Saved Books</div>

        {savedBooks.map((book) => (
          <div key={book.id}>
            <div className="library__saved-books">
              <div className="library__books-link ">
                <div className="library__book_image--wrapper ">
                  <img className="library__book-img" src={book.imageLink} />
                  </div>

                  <div className="saved__book--title">{book.title}</div>
                  <div className="saved__book--author">{book.author}</div>
                  <div className="saved__book--sub-title">{book.subTitle}</div>
                  <div className="library__details--wrapper">
                    <div className="library__book--details ">
                      <div className="library__book--details-icon">
                        <AccessTimeIcon />
                      </div>
                      <div className="library__book--details-text"></div>
                    </div>
                    <div className="library__book--details ">
                      <div className="library__book--details-icon">
                        <StarBorderIcon />
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
