import SideBar from "@component/components/SideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MicIcon from "@mui/icons-material/Mic";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import TurnedInNotIcon from "@mui/icons-material/TurnedInNot";
import Input from "../../components/Input";
import Link from "next/link";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase";

// import { title } from "process";

export default function BookDetails() {

  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);
  const [isBookMarked, setIsBookMarked] = useState(false);
  const { booksId } = useParams(id);


 
  async function getBookById() {
    if (user) {
      await setDoc(doc(db, 'users', user.uid, 'library', bookId), {
        bookId: bookId
      });
      setIsBookMarked(true);
    }
  }
  
 

  async function bookId() {
    try {
      const { data } = await axios.get(
        `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
      );
      setPosts(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  useEffect(() => {
    bookId();
  }, [id]);

  return (
    <div>
       <SideBar />
      <div className="input-wrapper">
       
        <Input />
      </div>

      <div className="flex justify-center  w-[50%] ml-[320px] pt-[130px]">
        {/* {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))
        ) : (
          <div>No posts available</div>
        )} */}
        <div className="text-wrapper">
          <div className="inner-wrapper">
            <div className="inner-book">
              <div className="inner-book-title">{posts.title}</div>
              <div className="inner-book-author">{posts.author}</div>
              <div className="inner-book-subtitle">{posts.subTitle}</div>
            </div>
          </div>

          <div className="inner-book-wrapper">
            <div className="inner-book-description-wrapper">
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <StarOutlineIcon className="star" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.averageRating}&nbsp;
                </div>
                <div className="inner-book-total-rating">
                  ({posts.totalRating}&nbsp;ratings)
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <AccessTimeIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.totalDuration}&nbsp;
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <MicIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.type}&nbsp;
                </div>
              </div>
              <div className="inner-book-description">
                <div className="inner-book-icon">
                  <LightbulbIcon className="clock" />
                </div>
                <div className="inner-book-overall-rating">
                  {posts.keyIdeas}&nbsp; Key ideas
                </div>
              </div>
            </div>
          </div>

          <div className="inner-book__read--btn-wrapper">
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <ImportContactsIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${id}`} >
              <div className="inner-book__read--text">Read</div>
              </Link>
            </button>
            <button className="inner-book__read--btn">
              <div className="inner-book__read--icon ">
                <MicIcon className=".inner-book__read--icon svg" />
              </div>
              <Link href={`/player/${id}`} >
                <div className="inner-book__read--text">Listen</div>
              </Link>
            
            </button>
          </div>

          <div className="inner-book__bookmark">
            <div className="inner-book__bookmark--icon">
              <TurnedInNotIcon />
            </div>
            <div className="inner-book__bookmark--text">
              Add title to My Library
            </div>
          </div>
          <div className="inner-book__secondary--title">What's it about?</div>
          <div className="inner-book__tags--wrapper">
            <div className="inner-book__tag">Communication Skills</div>
            <div className="inner-book__tag">Technology & the Future</div>
          </div>
          <div className="inner-book__book--description">
            {posts.bookDescription}
          </div>
          <h2 className="inner-book__secondary--title">About the author</h2>
          <div className="inner-book__author--description">
            {posts.authorDescription}
          </div>
        </div>
        <div className="inner-book--img-wrapper">
          <figure className="book__image--wrapper">
            <img src={posts.imageLink} className="book__image" />
          </figure>
        </div>
      </div>
    </div>
  );
}
