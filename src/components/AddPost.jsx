import React, { useEffect, useRef, useState } from "react";
import image from "../assets/boy.png";
import { Camera, Plus, ChevronRight, Trash2, Smile } from "lucide-react";
import storageService from "../services/storageService";
import { useSelector, useDispatch } from "react-redux";
import databaseService from "../services/databaseService";
import EmojiPicker from "emoji-picker-react";
import toast, { Toaster } from "react-hot-toast";
import { TailSpin } from "react-loader-spinner";
import { setUpdatePost } from "../features/database/databaseSlice";

function AddPost({ updateSharedData }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");
  const [emoji, setEmoji] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const updatePost = useSelector((state) => state.database.updatePost);
  const scrollRef = useRef(null);
  const [post, setPost] = useState(null);
  const dispatch = useDispatch();

  const uid = useSelector((state) => state.auth.userData.uid);
  const name = useSelector((state) => state.auth.userData.name);
  const imagePath = useSelector((state) => state.database.userDbData.imagePath);

  useEffect(() => {
    if (imagePath) {
      (async () => {
        const urlString = await storageService.downloadFile({
          url: imagePath,
        });
        setImageUrl(urlString);
      })();
    }
  }, [imagePath]);

  useEffect(() => {
    if (updatePost && scrollRef.current) {
      (async () => {
        const post = await databaseService.getDocument({
          collectionId: "posts",
          documentId: updatePost.postId,
        });

        if (post) {
          scrollRef.current.scrollIntoView({ behavior: "smooth" });
          setPost(post);
        }
      })();
    }
  }, [updatePost]);

  useEffect(() => {
    post &&
      (async () => {
        setContent(post.content);

        const url = await storageService.downloadFile({ url: post.imageUrl });
        url && setSelectedImage(url);
      })();
  }, [post]);

  const handleImageChange = (e) => {
    const imageFile = e.target.files[0];
    setSelectedImage(imageFile);
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleEmojiClick = (emoji) => {
    setContent(content.concat(emoji.emoji));
  };

  const handleShare = async () => {
    setSaving(true);
    if (selectedImage && content) {
      const url =
        typeof selectedImage === "string"
          ? post.imageUrl
          : await storageService.uploadFile({
              path: "post_images/" + Date.now(),
              file: selectedImage,
            });

      const data = post
        ? {
            content: content,
            commentsCount: post.commentsCount,
            imageUrl: url,
            userId: uid,
            username: name,
            date: post.date,
            likes: post.likes,
          }
        : {
            content: content,
            commentsCount: 0,
            imageUrl: url,
            userId: uid,
            username: name,
            date: Date.now(),
            likes: 0,
          };

      const docRef = post
        ? await databaseService.setDocument({
            collectionId: "posts",
            documentId: updatePost.postId,
            data,
          })
        : await databaseService.uploadData({
            collectionPath: "posts",
            data,
          });
      if (docRef) {
        dispatch(setUpdatePost(null));
        toast.success("Post shared successfully !");
        setContent("");
        setSelectedImage(null);
        setEmoji(false);
        updateSharedData(url); // for triggering rerender of AllPosts and passing a unique data(url) to make the state change whenever there is new post posted
      }
      
    } else toast.error("Write some text and add image !");
    setSaving(false);
  };

  return (
    <div
      ref={scrollRef}
      id="addPostContainer"
      className="p-8 w-full bg-white rounded-xl flex flex-col gap-5 duration-300 border-2 border-transparent"
    >
      <Toaster position="top-center" reverseOrder={false} />
      <div className="flex gap-5 items-start relative">
        <img src={imageUrl || image} className="h-10 w-10 rounded-xl" alt="image" />
        <textarea
          className="outline-none flex-1 h-24 resize-none"
          rows="4"
          placeholder="What are you thinking?"
          value={content}
          onChange={handleContentChange}
        ></textarea>
        <Smile
          color={"gray"}
          size={40}
          className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
          onClick={() => setEmoji(!emoji)}
        />
        <EmojiPicker
          open={emoji}
          lazyLoadEmojis={true}
          reactionsDefaultOpen={true}
          style={{ position: "absolute", right: "48px" }}
          onEmojiClick={handleEmojiClick}
        />
      </div>

      {/*TODO: Add Image here if added by user */}
      {selectedImage ? (
        <div className="relative w-64">
          <img
            src={
              typeof selectedImage === "object"
                ? URL.createObjectURL(selectedImage)
                : selectedImage
            }
            alt="Selected"
            className="w-full h-auto rounded-lg"
          />
          <button
            className="p-2 bg-red-400 w-10 rounded-md hover:bg-red-600 absolute top-2 right-2"
            onClick={handleDeleteImage}
          >
            <Trash2 color={"white"} size={24} />
          </button>
        </div>
      ) : null}

      <div className="flex justify-between">
        <div className="flex gap-3">
          <button
            className="p-3 bg-neutral-100 w-12 rounded-full hover:bg-neutral-200"
            onClick={() => document.getElementById("postImageInput").click()}
          >
            <Camera color={"gray"} size={24} />
            <input
              id="postImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </button>
          <button className="p-3 bg-neutral-100 w-12 rounded-full hover:bg-neutral-200">
            <Plus color={"gray"} size={24} />
          </button>
        </div>

        <div className="flex gap-5 items-center">
          <TailSpin
            visible={saving}
            height="32"
            width="32"
            color="#666BED"
            ariaLabel="tail-spin-loading"
            radius="1"
            strokeWidth={4}
          />
          <button
            className="py-3 px-4 rounded-md bg-primary text-white w-fit items-center flex gap-3 font-medium"
            onClick={handleShare}
          >
            Share
            <ChevronRight color={"white"} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default AddPost;
