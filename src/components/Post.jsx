import React, { useEffect, useState } from "react";
import storageService from "../services/storageService";
import Popupmenu from "./Popupmenu";
import { Share, Heart, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";
import databaseService from "../services/databaseService";
import Comment from "./Comment";
import backupImage from "../assets/boy.png";
import CommentBox from "./CommentBox";

function Post({ data, id }) {
  const uid = useSelector((state) => state.auth.userData.uid);
  const userDbData = useSelector((state) => state.database.userDbData);
  const [likes, setLikes] = useState(data.likes);
  const [likedPosts, setLikedPosts] = useState([]);
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const [url, setUrl] = useState(null);

  const [dateString, setDateString] = useState("");

  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [refreshComments, setRefreshComments] = useState(null);
  const [commentsCount, setCommentCount] = useState(data.commentsCount);

  const [profileImage, setProfileImage] = useState(null);

  const imagePath = useSelector((state) => state.database.userDbData.imagePath);

  const commentButtonHandler = async () => {
    setShowComments(!showComments);
  };

  const refreshCommentsHandler = ({ updatedCount }) => {
    setCommentCount(updatedCount);
    setRefreshComments(Date.now());
  };

  useEffect(() => {
    // when user open comment section
    if (showComments) {
      // if array is empty
      if (comments.length === 0) {
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
          imagePath: imagePath,
          following: userDbData.following,
          address: userDbData.address,
          name: userDbData.name,
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
          imagePath: imagePath,
          following: userDbData.following,
          address: userDbData.address,
          name: userDbData.name,
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

  const [deleted, setDeleted] = useState(false);

  const deleteHandler = () => setDeleted(true);

  return (
    <div
      className={`flex-col gap-4 p-8 w-full ${
        lightTheme ? "bg-white" : "bg-tertiary"
      } rounded-xl transition-all duration-300 ${deleted ? "hidden" : "flex"}`}
    >
      {/* header of post */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src={profileImage || backupImage}
            alt="userImage"
            className="object-cover h-8 w-8 rounded-xl"
          />
          <div className="flex flex-col gap-1">
            <h3
              className={`font-bold text-black ${
                lightTheme ? "text-black" : "text-white"
              }`}
            >
              {data.username}
            </h3>
            <span className="text-neutral-400 text-sm">{dateString}</span>
          </div>
        </div>

        <Popupmenu
          author={uid === data.userId}
          deleteHandler={deleteHandler}
          postId={id}
          imagePath={data.imageUrl}
        ></Popupmenu>
      </div>

      {/* content */}
      <p className={` ${lightTheme ? "text-neutral-500" : "text-neutral-200"}`}>
        {data.content}
      </p>
      {url ? (
        <img
          src={url}
          alt="post-image"
          className="rounded-lg object-cover w-full h-80"
        ></img>
      ) : null}

      {/* buttons */}
      <div className="flex justify-between">
        <div className="flex gap-5">
          <span className="flex gap-2 font-medium items-center">
            <Heart
              fill={likedPosts.includes(id) ? "#EB345E" : "transparent"}
              size={40}
              color={
                likedPosts.includes(id)
                  ? "#EB345E"
                  : `${lightTheme ? "black" : "gray"}`
              }
              className={`p-2 rounded-full ${
                lightTheme
                  ? "hover:bg-neutral-100 active:bg-neutral-200"
                  : "hover:bg-neutral-700 active:bg-neutral-800"
              }`}
              onClick={likeHandler}
            ></Heart>
            <span className={`${lightTheme ? "text-black" : "text-white"}`}>
              {likes}
            </span>
          </span>
          <span className="flex gap-2 font-medium items-center">
            <MessageSquare
              size={40}
              color={`${lightTheme ? "black" : "gray"}`}
              className={`p-2 rounded-full ${
                lightTheme
                  ? "hover:bg-neutral-100 active:bg-neutral-200"
                  : "hover:bg-neutral-700 active:bg-neutral-800"
              }`}
              onClick={commentButtonHandler}
            ></MessageSquare>
            <span className={`${lightTheme ? "text-black" : "text-white"}`}>
              {commentsCount}
            </span>
          </span>
        </div>
        <span className="flex gap-2 font-medium items-center">
          <span className={`${lightTheme ? "text-black" : "text-neutral-400"}`}>
            Share
          </span>
          <Share
            size={40}
            color={`${lightTheme ? "black" : "gray"}`}
            className={`${
              lightTheme
                ? "hover:bg-neutral-100 active:bg-neutral-200"
                : "hover:bg-neutral-700 active:bg-neutral-800"
            } p-2 rounded-full`}
          ></Share>
        </span>
      </div>

      {/* comment section */}
      {showComments ? (
        <CommentBox
          postId={id}
          refreshComments={refreshCommentsHandler}
          commentsCount={commentsCount}
        ></CommentBox>
      ) : null}
      {showComments ? (
        <div className="max-h-48 overflow-y-auto">
          {comments.map((comment) => {
            return <Comment {...comment} key={comment.data.date}></Comment>;
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Post;
