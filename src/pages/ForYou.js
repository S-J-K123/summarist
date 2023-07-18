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
        <div className="selected-book-container">
          {selected.map((selected) => {
            return (
              <div key={selected.id}>
                <div className="w-[40%] color-[#032b41]">
                  <p className=" color-[#032b41]; width-[40%]">
                    {selected.subTitle}
                  </p>
                </div>
                <div className="book-details">
                      <img
                    className="w-[165px]"
                    src={selected.imageLink}
                    alt="Book Cover"
                  />
                  <p className="font-bold color-[#032b41] mb-[8px]">
                    {selected.title}
                  </p>
                  <div>
                      <p>{selected.author}</p>
                     </div>
                

              
                  {/* <audio controls>
                    <source src={selected.audioLink} type="audio/mpeg" />
                  </audio> */}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
