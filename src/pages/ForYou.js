import SideBar from "@component/components/SideBar";
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ForYou() {
  const [selected, setSelected] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([])




  useEffect(() => {
    async function getSelectedBooks() {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
      );
      setSelected(data);
    }
    getSelectedBooks();
  }, []);




  useEffect(() => {
    async function getRecommendedBooks() {
      const { data } = await axios.get(
        "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
      );
      setRecommended(data);
    }
    getRecommendedBooks();
  }, []);




  useEffect(() => {
  async function getSuggestedBooks() {
  const { data } = await axios.get(
    "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
  )
  setSuggested(data)
}
getSuggestedBooks()
  }, [])




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
          {selected.map((selected) => (
            <>
              <div className="w-[40%] color-[#032b41]">
                <p>{selected.subTitle}</p>
              </div>
              <div className="book-details flex flex-row">
                <img
                  className="w-[165px]"
                  src={selected.imageLink}
                  alt="Book Cover"
                />
                <div className="book-obj-wrapper">
                     <div>
                    <p className="font-bold color-[#032b41] mb-[8px]">
                  {selected.title}
                </p>
                </div>
              
                <div>
                  <p>{selected.author}</p>
                </div>
                </div>
             

                {/* <audio controls>
                    <source src={selected.audioLink} type="audio/mpeg" />
                  </audio> */}
              </div>
            </>
          ))}
        </div>

        <div>
          <h1 className="for-you-title">Recommended For You</h1>
          <p>We think you'll like this</p>
        </div>
        <div className="books-container flex">
          {recommended.map((recommended) => {
            return (
              <div className="">
                <div className="user-list">
                  <div className="user">
                    <div className="user-card hoverAnimation">
                      <div className="user-card__container flex justify-center flex-col items-center">
                        <img
                          className="w-[100%] mb-2 mt-6"
                          src={recommended.imageLink}
                          alt="Book Cover"
                        />
                        <div className="book-details-container">
                          <div>
                            {" "}
                            <p className="book-title">{recommended.title}</p>
                          </div>
                          <div>
                            {" "}
                            <p className="book-author">{recommended.author}</p>
                          </div>
                          <div>
                            {" "}
                            <p className="book-subtitle">
                              {recommended.subTitle}
                            </p>
                          </div>
                          <div>
                            {" "}
                            <p>{recommended.averageRating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>



        <div>
          <h1 className="for-you-title">Recommended For You</h1>
          <p>Browse those books</p>
        </div>
        <div className="books-container flex">
          {suggested.map((suggested) => {
            return (
              <div className="">
                <div className="user-list">
                  <div className="user">
                    <div className="user-card hoverAnimation">
                      <div className="user-card__container flex justify-center flex-col items-center">
                        <img
                          className="w-[100%] mb-2 mt-6"
                          src={suggested.imageLink}
                          alt="Book Cover"
                        />
                        <div className="book-details-container">
                          <div>
                            {" "}
                            <p className="book-title">{suggested.title}</p>
                          </div>
                          <div>
                            {" "}
                            <p className="book-author">{suggested.author}</p>
                          </div>
                          <div>
                            {" "}
                            <p className="book-subtitle">
                              {suggested.subTitle}
                            </p>
                          </div>
                          <div>
                            {" "}
                            <p>{suggested.averageRating}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>


      </div>
    </div>
  );
}
