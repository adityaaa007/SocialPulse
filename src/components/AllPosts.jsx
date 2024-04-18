import React, { useEffect, useState } from "react";
import databaseService from "../services/databaseService";
import Post from "./Post";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import shimmerAnim from "../assets/shimmer_posts.json";

function AllPosts({ sharedData, searchText }) {
  const [posts, setPosts] = useState([]);
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const getAllPosts = async () => {
      const postDocs = await databaseService.getAllData({
        collectionPath: "posts",
        queryName: 'date',
        queryOrder: 'desc'
      });

      setLoading(false)

      if (postDocs) {
        setPosts(postDocs);
      }
    };

    getAllPosts();
  }, [sharedData]);

  return (
    <div className="flex flex-col gap-5 pb-10 relative">
      {loading ? (
        <Player
        className="absolute top-[-128px]"
          autoplay
          loop
          src={shimmerAnim}
          style={{ height: "720px", width: "720px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      ) : null}
      {searchText
        ? posts.map((post) => {
            return (
              post.data.content.includes(searchText) && (
                <Post {...post} key={post.data.imageUrl}></Post>
              )
            );
          })
        : posts.map((post) => {
            return <Post {...post} key={post.data.imageUrl}></Post>;
          })}
    </div>
  );
}

export default AllPosts;
