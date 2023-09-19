import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import axios from "axios";

const Input = () => {
  // const [book, setBook] = useState({});
  // const [search, setSearch] = useState(""); // Add a state for search input

  // async function getBooksById(search) {
  //   const { data } = await axios.get(
  //     `https://us-central1-summaristt.cloudfunctions.net/getBooksByAuthorOrTitle?search=${search}`
  //   );
  //   setBook(data.search);
  //   console.log(data);
  // }

  // useEffect(() => {
   
  //   getBooksById(search);
  // }, [search]); S

  // function onSearchChange(event) {
  //   const inputValue = event.target.value;
  //   setSearch(inputValue);
  // }

  return (
    <div>
      <div className="search__content">
        <div className="search">
          <div className="search__input--wrapper">
            <input
              // value={search} 
              // onChange={onSearchChange}
              className="search__input"
              placeholder="Search for books"
              type="text"
            />
            <div className="search__icon">
              <SearchIcon className="svg" />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Input;
