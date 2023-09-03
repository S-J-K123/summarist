import SideBar from "@component/components/SideBar";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function BookDetails() {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
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
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id}>{post.title}</div>
          ))
        ) : (
          <div>No posts available</div>
        )}
      </div>
    </div>
  );
}
