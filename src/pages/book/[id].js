import SideBar from "@component/components/SideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useRouter } from "next/router";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

export default function BookDetails() {
  const [posts, setPosts] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  useEffect(() => {
    console.log(id);
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
    bookId();
  }, [id]);

  return (
    <div>
      <SideBar />
      <div className="flex justify-center">
        {/* {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))
        ) : (
          <div>No posts available</div>
        )} */}
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
            
          </div>
        </div>
      </div>
    </div>
  );
}
