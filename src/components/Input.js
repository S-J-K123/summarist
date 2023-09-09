import React from "react";
import SearchIcon from "@mui/icons-material/Search";

const Input = () => {
  return (
    <div>
      <div className="search__content">
        <div className="search">
          <div className="search__input--wrapper">
            <input
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
