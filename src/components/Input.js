import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Link from "next/link";

const Input = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  async function getBooksBySearch(search) {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
      );
      setBooks(data);
      console.log(data);
      console.log(books);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    if (search.trim() !== "") {
      getBooksBySearch(search);
    } else {
      setBooks([]);
    }
  }, [search]);

  function onSearchChange(event) {
    const inputValue = event.target.value;
    setSearch(inputValue);
    getBooksBySearch(search);
  }

  return (
    <div>
      <div className="search__content">
        <div className="search">
          <div className="search__input--wrapper">
            <form>
              <input
                value={search}
                onChange={onSearchChange}
                className="search__input"
                placeholder="Search for books"
                type="text"
              />
            </form>
            <div className="search__icon">
              <SearchIcon className="svg" />
            </div>
          </div>
        </div>
      </div>
      <div className="search__input--details">
     
               {books.map((book) => (
          <div key={book.id}>
             <Link href={`/book/${book.id}`}>
            <div className="book__image--search-input"> <img src={book.imageLink} /> </div>
              <div className="search__book--links">
            <h3 className="book__title--search-input">{book.title}</h3>
            <p className="book__author--search-input">{book.author}</p>
            
          </div>
          </Link>
      
  </div>
        ))}
     
      
      
   
      </div>
    </div>
  );
};

export default Input;