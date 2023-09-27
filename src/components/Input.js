import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";
import Link from "next/link";
import { setSearchResults, clearSearchResults } from "../redux/searchSlice";

const Input = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.searchResults);

  async function getBooksBySearch(search) {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
      );
      setBooks(data);
      dispatch(setSearchResults(data));
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

  const onSearchChange = (event) => {
    const inputValue = event.target.value;
    setSearch(inputValue);
    getBooksBySearch(inputValue);
  };

  const handleBookClick = () => {
    dispatch(clearSearchResults());
    setSearch("");
  };

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
      {searchResults.length > 0 && search !== "" && (
        <div className="search__input--details">
          {searchResults.map((book) => (
            <div key={book.id} onClick={handleBookClick}>
              <Link href={`/book/${book.id}`}>
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