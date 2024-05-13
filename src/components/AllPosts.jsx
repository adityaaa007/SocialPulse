import React, { useEffect, useState } from "react";
import databaseService from "../services/databaseService";
import Post from "./Post";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import shimmerAnim from "../assets/shimmer_posts.json";
import { useDispatch, useSelector } from "react-redux";
import { savePosts } from "../features/database/databaseSlice";

function AllPosts({ sharedData, searchText, filter }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const following = useSelector((state) => state.database.userDbData.following);
  const dispatch = useDispatch();
  const savedPosts = useSelector((state) => state.database.posts);

  useEffect(() => {
    const getAllPosts = async () => {
      console.log("fetching from db...");
      const postDocs = await databaseService.getAllData({
        collectionPath: "posts",
        queryName: "date",
        queryOrder: "desc",
      });

      setLoading(false);

      if (postDocs) {
        setPosts(postDocs);
        dispatch(savePosts(postDocs));
      }
    };

    // fetching from db only if savedPosts are empty
    if (sharedData === "") {
      if (savedPosts.length === 0) getAllPosts();
      else {
        setLoading(false);
        setPosts(savedPosts);
      }
    }
    // fetching from db because dbData has been changed
    else getAllPosts();
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
      {filter
        ? posts.map((post) => {
            return (
              post.data.content.includes(searchText) &&
              (filter === "following"
                ? following.includes(post.data.userId)
                : true) && <Post {...post} key={post.data.imageUrl}></Post>
            );
          })
        : posts.map((post) => {
            return <Post {...post} key={post.data.imageUrl}></Post>;
          })}
    </div>
  );
}

export default AllPosts;
