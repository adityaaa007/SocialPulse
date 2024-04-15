import React, { useEffect, useState } from "react";
import storageService from "../services/storageService";
import Popupmenu from "./Popupmenu";
import { Share, Heart, MessageSquare, ImageMinus } from "lucide-react";
import { useSelector } from "react-redux";
import databaseService from "../services/databaseService";
import Comment from "./Comment";
import CommentBox from "./CommentBox";

function Post({ data, id }) {
  const uid = useSelector((state) => state.auth.userData.uid);
  const userDbData = useSelector((state) => state.database.userDbData);
  const [likes, setLikes] = useState(data.likes);
  const [likedPosts, setLikedPosts] = useState([]);

  const [url, setUrl] = useState(null);

  const [dateString, setDateString] = useState("");

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(null);

  const [profileImage, setProfileImage] = useState(null);

  const imagePath = useSelector(state => state.database.userDbData.imagePath)

  const commentButtonHandler = async () => {
    setShowComments(!showComments);
  };

  const refreshCommentsHandler = () => setRefreshComments(Date.now());

  useEffect(() => {
    // when user open comment section
    if (showComments) {
      // if array is empty
      if (comments.length === 0) {
        const getAllComments = async () => {
          const commentDocs = await databaseService.getAllData({
            collectionPath: `posts/${id}/comments`,
          });

          console.log("comments fetched...");
          // save the comments
          if (commentDocs) {
            setComments(commentDocs);
          }
        };

        getAllComments();
      }
    }
  }, [showComments]);

  // for when a new comment is posted
  useEffect(() => {
    // when user open comment section
    if (showComments) {
      const getAllComments = async () => {
        const commentDocs = await databaseService.getAllData({
          collectionPath: `posts/${id}/comments`,
        });

        // save the comments
        if (commentDocs) {
          setComments(commentDocs);
        }
      };

      getAllComments();
    }
  }, [refreshComments]);

  const likeHandler = async () => {
    if (userDbData) {
      // whether the current post is liked or not
      if (likedPosts.includes(id)) {
        setLikes((prevLikes) => prevLikes - 1);

        const newLikedPosts = likedPosts.filter((postId) => postId !== id);
        const newLikedPostsData = {
          likedPosts: newLikedPosts,
          imagePath: imagePath
        };
        await databaseService.setDocument({
          collectionId: "users",
          documentId: uid,
          data: newLikedPostsData,
        });

        setLikedPosts(likedPosts.filter((postId) => postId !== id));
        await databaseService.updateDocumentField({
          collectionId: "posts",
          documentId: id,
          field: "likes",
          value: likes - 1,
        });
      } else {
        setLikes((prevLikes) => prevLikes + 1);

        const newLikedPosts = [...likedPosts, id];
        const newLikedPostsData = {
          likedPosts: newLikedPosts,
          imagePath: imagePath
        };
        await databaseService.setDocument({
          collectionId: "users",
          documentId: uid,
          data: newLikedPostsData,
        });

        setLikedPosts((prevPosts) => [...prevPosts, id]);
        await databaseService.updateDocumentField({
          collectionId: "posts",
          documentId: id,
          field: "likes",
          value: likes + 1,
        });
      }
    }
  };

  useEffect(() => {
    if (userDbData) {
      setLikedPosts(userDbData.likedPosts);
    }
  }, [userDbData]);

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  useEffect(() => {
    if (data.imageUrl) {
      const getUrl = async () => {
        const urlString = await storageService.downloadFile({
          url: data.imageUrl,
        });
        setUrl(urlString);
      };

      getUrl();

      setDateString(formatDate(data.date));
    }

    (async () => {
      const userData = await databaseService.getDocument({
        collectionId: "users",
        documentId: data.userId,
      });

      if (userData) {
        const profileImagePath = userData.imagePath;
        if (profileImagePath) {
          const url = await storageService.downloadFile({
            url: profileImagePath,
          });
          url && setProfileImage(url);
        }
      }
    })();
  }, []);

  return (
    <div className="flex flex-col gap-4 p-8 w-[720px] bg-white rounded-xl transition-all duration-300">
      {/* header of post */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src={profileImage || "../assets/react.svg"}
            alt="userImage"
            className="object-cover h-10 w-10"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-black">{data.username}</h3>
            <span className="text-neutral-400 text-sm">{dateString}</span>
          </div>
        </div>

        <Popupmenu author={uid === data.userId}></Popupmenu>
      </div>

      {/* content */}
      <p className="text-neutral-500">{data.content}</p>
      {url ? (
        <img
          src={url}
          alt="post-image"
          className="rounded-lg object-cover w-full h-64"
        ></img>
      ) : null}

      {/* buttons */}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <span className="flex gap-2 font-medium items-center">
            <Heart
              fill={likedPosts.includes(id) ? "#EB345E" : "transparent"}
              size={40}
              color={likedPosts.includes(id) ? "#EB345E" : "black"}
              className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
              onClick={likeHandler}
            ></Heart>
            {likes}
          </span>
          <span className="flex gap-2 font-medium items-center">
            <MessageSquare
              size={40}
              color="black"
              className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
              onClick={commentButtonHandler}
            ></MessageSquare>
            148
          </span>
        </div>
        <span className="flex gap-2 font-medium items-center">
          Share
          <Share
            size={40}
            color="black"
            className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
          ></Share>
        </span>
      </div>

      {/* comment section */}
      {showComments ? (
        <CommentBox
          postId={id}
          username={data.username}
          refreshComments={refreshCommentsHandler}
        ></CommentBox>
      ) : null}
      {showComments ? (
        <div className="">
          {comments.map((comment) => {
            return <Comment {...comment} key={comment.data.date}></Comment>;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Post;
