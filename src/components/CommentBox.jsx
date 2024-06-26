import React, { useState } from "react";
import { SendHorizonal, Smile } from "lucide-react";
import EmojiPicker from "emoji-picker-react";
import toast, { Toaster } from "react-hot-toast";
import databaseService from "../services/databaseService";
import { useSelector } from "react-redux";

function CommentBox({ postId, refreshComments, commentsCount }) {
  const [emoji, setEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const username = useSelector((state) => state.auth.userData.name);
  const uid = useSelector((state) => state.auth.userData.uid);
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const handleEmojiClick = (emoji) => {
    setComment(comment.concat(emoji.emoji));
  };

  const handleComment = async () => {
    if (comment) {
      const data = {
        comment: comment,
        date: Date.now(),
        username: username,
        userId: uid,
      };

      const docRef = await databaseService.uploadData({
        collectionPath: `posts/${postId}/comments`,
        data,
      });

      const countUpdated = await databaseService.updateDocumentField({
        collectionId: `posts`,
        documentId: postId,
        field: "commentsCount",
        value: commentsCount + 1,
      });

      if (docRef && countUpdated)
        refreshComments({ updatedCount: commentsCount + 1 }); // this will trigger refetch of updated comments
      setComment("");
      setEmoji(false);
    } else toast.error("Comment cant be empty !");
  };

  return (
    <div className="w-full relative">
      <Toaster position="top-center" reverseOrder={false} />
      <input
        className={`px-5 py-4 border-2 ${
          lightTheme
            ? "border-neutral-200 bg-white text-black"
            : "border-neutral-800 bg-neutral-800 text-white"
        } rounded-lg focus:border-primary focus:outline-none w-full`}
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
      ></input>
      <SendHorizonal
        fill="#666BED"
        size={40}
        color="#666BED"
        className={`${
          lightTheme
            ? "hover:bg-neutral-100 active:bg-neutral-200"
            : "hover:bg-neutral-700 active:bg-neutral-800"
        } p-2 rounded-full absolute top-[9px] right-4`}
        onClick={handleComment}
      ></SendHorizonal>
      <Smile
        size={40}
        color="gray"
        className={`${
          lightTheme
            ? "hover:bg-neutral-100 active:bg-neutral-200"
            : "hover:bg-neutral-700 active:bg-neutral-800"
        } p-2 rounded-full absolute top-[9px] right-16`}
        onClick={() => setEmoji(!emoji)}
      ></Smile>
      <EmojiPicker
        open={emoji}
        lazyLoadEmojis={true}
        reactionsDefaultOpen={true}
        style={{ position: "absolute", right: "120px", top: "5px" }}
        onEmojiClick={handleEmojiClick}
      />
    </div>
  );
}

export default CommentBox;
