import SideBar from "@component/components/SideBar";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { BsFillPlayCircleFill } from "react-icons/bs";
import { PiMagnifyingGlass } from "react-icons/pi";
import Link from "next/link";
import Input from "@component/components/Input";
import Skeleton from "../components/Skeleton";
import TableRowsIcon from '@mui/icons-material/TableRows';

const ForYou = () => {
  const [selected, setSelected] = useState([]);
  const [recommended, setRecommended] = useState([]);
  const [suggested, setSuggested] = useState([]);
  const [loading, setLoading] = useState(true);
  const navRef = useRef(null)
const [showSidebar, setShowSidebar] = useState(true);


  const toggleSidebar = () => {
      setShowSidebar(!showSidebar);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSidebar(true);
      } else {
        setShowSidebar(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    async function getSelectedBooks() {
      try {
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=selected"
        );
        setSelected(data);
      } catch (error) {
        console.error("Error fetching selected books:", error);
      }
    }

    async function getRecommendedBooks() {
      try {
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=recommended"
        );
        setRecommended(data);
      } catch (error) {
        console.error("Error fetching recommended books:", error);
      }
    }

    async function getSuggestedBooks() {
      try {
        setLoading(true);
        const { data } = await axios.get(
          "https://us-central1-summaristt.cloudfunctions.net/getBooks?status=suggested"
        );
        setSuggested(data);
      } catch (error) {
        console.error("Error fetching suggested books:", error);
      } finally {
        // Set loading to false after all data has been processed
        setTimeout(() => {
          setLoading(false);
        }, 1500);
      }
    }

    getSelectedBooks();
    getRecommendedBooks();
    getSuggestedBooks();
  }, []);

  return (
    <div>
      <SideBar/>
      <div className="input-wrapper">
        <Input />
        <button className="nav-btn" onClick={toggleSidebar}><TableRowsIcon/></button>
      </div>
      <div className="row">
        <div className="whole-container ml-[90px]">
          <div>
            <h1 className="for-you-title">Selected just for you</h1>
          </div>
          {loading ? (
            <Skeleton width={"550px"} height={"200px"} background="blue" />
          ) : (
            <div className="selected-book-container">
              {selected.map((selected) => (
                <>
                  <div className="w-[37%] color-[#032b41]" key={selected.id}>
                    <p className="selected__subtitle">{selected.subTitle}</p>
                  </div>

                  <div className="selected-book-line"></div>

                  <div className="book-details flex flex-row">
                    <Link href={`/book/${selected.id}`}>
                      <img
                        className="w-[140px] mr-[20px] "
                        src={selected.imageLink}
                        alt="Book Cover"
                      />
                    </Link>
                    <Link href={`/book/${selected.id}`}>
                      <div className="book-obj-wrapper">
                        <div>
                          <p className="selected__book--title font-bold color-[#032b41] mb-[8px]">
                            {selected.title}
                          </p>
                        </div>

                        <div className="selected__book--author">
                          <p>{selected.author}</p>
                        </div>
                        <div className="selected__book--duration-wrapper p-4 ml-[-33px] flex items-center">
                          <BsFillPlayCircleFill className="selected__book--icon w-[100%] h-[33px]" />
                          <p className=" text-sm">3 mins 23 secs</p>
                          {/* <audio controls>
                    <source src={selected.audioLink} type="audio/mpeg" />
                  </audio>  */}
                        </div>
                      </div>
                    </Link>
                  </div>
                </>
              ))}
            </div>
          )}

          <div>
            <h1 className="for-you-title">Recommended For You</h1>
            <p>We think you'll like this</p>
          </div>

          <div className="books-container flex overflow-x-auto gap-[32px] mb-[32px]">
            {recommended.map((recommended) => {
              return (
                <div
                  className="for-you__recommended--books-link hover-books"
                  key={recommended.id}
                >
                  <Link href={`/book/${recommended.id}`}>
                    {loading ? (
                      <Skeleton width={"170px"} height={"200px"} />
                    ) : (
                      <div className="user-card">
                        <div className="user-card__container flex justify-center flex-col ">
                          <img
                            className="w-[100%] mb-2 mt-6"
                            src={recommended.imageLink}
                            alt="Book Cover"
                          />
                          <div>
                            <p className="book-title">{recommended.title}</p>
                          </div>
                          <div>
                            <p className="book-author">{recommended.author}</p>
                          </div>
                          <div>
                            <p className="book-subtitle">
                              {recommended.subTitle}
                            </p>
                          </div>
                          <div>
                            <p>{recommended.averageRating}</p>
                          </div>
                          {/* Conditionally render the book pill */}
                          {recommended.subscriptionRequired && (
                            <div className="book-pill">Premium</div>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="suggested-container mb-[70px]">
            <div>
              <h1 className="for-you-title">Suggested Books</h1>
              <p className="mb-[10px]">Browse those books</p>
            </div>

            <div className="books-container flex overflow-x-auto gap-[32px] mb-[32px]">
              {suggested.map((suggested) => {
                return (
                  <div
                    className="for-you__recommended--books-link hover-books"
                    key={suggested.id}
                  >
                    <Link href={`/book/${suggested.id}`}>
                      {loading ? (
                        <Skeleton width={"170px"} height={"200px"} />
                      ) : (
                        <div className="user-card">
                          <div className="user-card__container flex justify-center flex-col items-center">
                            <img
                              className="w-[100%] mb-2 mt-6"
                              src={suggested.imageLink}
                              alt="Book Cover"
                            />
                            <div className="book-details-container">
                              <div>
                                <p className="book-title">{suggested.title}</p>
                              </div>
                              <div>
                                <p className="book-author">
                                  {suggested.author}
                                </p>
                              </div>
                              <div>
                                <p className="book-subtitle">
                                  {suggested.subTitle}
                                </p>
                              </div>
                              <div>
                                <p>{suggested.averageRating}</p>
                              </div>
                              {/* Conditionally render the book pill */}
                              {suggested.subscriptionRequired && (
                                <div className="book-pill">Premium</div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForYou;
