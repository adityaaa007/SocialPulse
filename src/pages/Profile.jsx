import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import { saveUserPosts } from "../features/database/databaseSlice";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../services/databaseService";
import { Controls, Player } from "@lottiefiles/react-lottie-player";
import shimmerAnim from "../assets/shimmer_posts.json";
import Post from "../components/Post";

function Profile() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const uid = useSelector((state) => state.auth.userData.uid);
  const savedPosts = useSelector((state) => state.database.userPosts[uid]);

  useEffect(() => {
    const getUserPosts = async () => {
      console.log("fetching userPosts from db...");
      const postDocs = await databaseService.getUserPosts({ userId: uid });

      setLoading(false);

      if (postDocs) {
        setPosts(postDocs);
        dispatch(saveUserPosts({ posts: postDocs, userId: uid }));
        console.log("userPosts: " + postDocs);
      }
    };

    console.log(savedPosts + " " + uid);
    if (!savedPosts || savedPosts?.length === 0) getUserPosts();
    else {
      setLoading(false);
      setPosts(savedPosts);
    }
  }, []);

  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7] items-center flex-col md:flex-row">
      <Sidebar initialPage={"profile"}></Sidebar>
      <div className="flex-1 h-screen flex overflow-y-auto w-full md:w-full">
        <div className="flex flex-1 h-screen flex-col md:px-12 lg:px-32 lg:me-[512px] md:me-[380px] px-4 gap-7 pt-10">
          <h2 className="font-semibold text-2xl">Your posts</h2>
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
          {posts.length !== 0 ? (
            posts.map((post) => {
              return <Post {...post} key={post.data.imageUrl}></Post>;
            })
          ) : !loading && (
            <p className="text-neutral-500 self-center">
              {"No posts found :("}
            </p>
          )}
        </div>
        <ProfileSidebar></ProfileSidebar>
      </div>
    </div>
  );
}

export default Profile;
