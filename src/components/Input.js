import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Link from "next/link";
// import { clearSearchResults, setSearchResults } from "@component/redux/searchSlice";
import { clearSearchResults, setSearchResults } from "../redux/searchSlice";

const Input = ( {clearSearchResults, setSearchResults}) => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");

  // const isClearSearchResults = useSelector((state) => state.search.clearSearchResults);
  // const dispatch = useDispatch()

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
      clearSearchResults(); 
    }
  }, [search, clearSearchResults]);

  function onSearchChange(event) {
    const inputValue = event.target.value;
    setSearch(inputValue);
    getBooksBySearch(search);
  }

  function handleBookClick() {
    clearSearchResults(); 
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
      {books.length > 0 && (
        <div className="search__input--details">
          {books.map((book) => (
            <div key={book.id}>
              <Link className="flexing" href={`/book/${book.id}`}
              onClick={handleBookClick}>
                <div className="book__image--search-input">
                  {" "}
                  <img src={book.imageLink} />{" "}
                </div>
                <div className="search__book--links">
                  <h3 className="book__title--search-input">{book.title}</h3>
                  <p className="book__author--search-input">{book.author}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Input;
