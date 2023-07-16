import SideBar from "@component/components/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ForYou() {
  const [selected, setSelected] = useState([]);

  useEffect(() => {
    async function getSelectedBooks() {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setSelected(data);
    }
    getSelectedBooks();
  }, []);


  
  return (
    <div>
      <SideBar />
      <div className="row">
        <div className="search__wrapper">
          <input
            className="search__input"
            type="text"
            placeholder="Search for books"
          />
        </div>
        <hr className="mt-5 mb-9"></hr>
        <div>
          <h1 className="for-you-title">Selected just for you</h1>
        </div>
        {selected.map((selected) => {
          return <p>{selected?.author}</p>;
        })}
      </div>
    </div>
  );
}
