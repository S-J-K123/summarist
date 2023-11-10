import React, { useEffect, useState } from "react";
import SideBar from "../components/SideBar";
import Input from "../components/Input";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase"; 

const Library = () => {
  const [savedBooks, setSavedBooks] = useState([]);

  useEffect(() => {
    const user = auth.currentUser;
    const fetchSavedBooks = async () => {
   
      const librarySnapshot = await getDocs(collection(db, "users", user.uid, "library"));
      const books = librarySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setSavedBooks(books);
    };

    fetchSavedBooks();
  }, []); 

  return (
    <div>
      <SideBar />
      <Input />
      <div className="library-container">
        <div className="for-you__title">Saved Books</div>
       
        {savedBooks.map((book) => (
          <div key={book.id}>
     
            <div>{book.bookId}</div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Library;
