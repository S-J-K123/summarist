import SideBar from "@component/components/SideBar";
import { useRouter } from "next/router";

export async function getServerSideProps(context) {
  const { id } = context.query;

  const res = await fetch(
    `https://us-central1-summaristt.cloudfunctions.net/getBook?id=${id}`
  );
  const data = await res.json();

  return {
    props: {
      posts: data,
    },
  };
}

export default function bookDetails({ posts }) {
  return (
    <div>
      <SideBar />
      <div className="flex justify-center">
        {posts?.map((post) => {
          return <div key={post.id}>{post.title}</div>;
        })}
      </div>
    </div>
  );
}
