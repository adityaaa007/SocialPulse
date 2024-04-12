import React, { useEffect, useState } from "react";
import databaseService from "../services/databaseService";
import Post from "./Post";

function AllPosts({ sharedData }) {
  const [posts, setPosts] = useState([]);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const getAllPosts = async () => {
      const postDocs = await databaseService.getAllData({
        collectionPath: "posts",
      });

      if (postDocs) {
        setPosts(postDocs);
      }
    };

    getAllPosts();

    console.log("allposts component rendered...");
  }, [sharedData]);

  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => {
        return <Post {...post} key={post.data.imageUrl}></Post>;
      })}
    </div>
  );
}

export default AllPosts;
