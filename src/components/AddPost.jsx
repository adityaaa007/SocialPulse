import React, { useState } from "react";
import image from "../assets/react.svg";
import { Camera, Plus, ChevronRight, Trash2 } from "lucide-react";
import storageService from "../services/storageService";
import { useSelector } from "react-redux";
import databaseService from "../services/databaseService";

function AddPost() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [content, setContent] = useState("");

  const uid = useSelector((state) => state.auth.userData.uid);

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

  const handleShare = async () => {
    if (selectedImage && content) {
      const url = await storageService.uploadFile({
        path: "post_images/" + Date.now(),
        file: selectedImage,
      });

      const data = {
        content: content,
        imageUrl: url,
        userId: uid,
      };

      const docRef = await databaseService.uploadData({
        collectionPath: "posts",
        data,
      });
      if (docRef) alert("Post saved successfully");

      // for downloading the image url
      // if (url) {
      //   const downloadUrl = await storageService.downloadFile({ url });
      //   if (downloadUrl) console.log("downloadUrl: " + downloadUrl);
      // }
    }
  };

  return (
    <div className="p-8 w-[720px] bg-white rounded-xl flex flex-col gap-5 duration-300">
      <div className="flex gap-5 items-start">
        <img src={image} height={32} width={32} alt="image" />
        <textarea
          className="outline-none flex-1 h-24 resize-none"
          rows="4"
          placeholder="What are you thinking?"
          value={content}
          onChange={handleContentChange}
        ></textarea>
      </div>

      {/*TODO: Add Image here if added by user */}
      {selectedImage ? (
        <div className="relative w-64">
          <img
            src={URL.createObjectURL(selectedImage)}
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

        <button
          className="py-3 px-4 rounded-md bg-primary text-white w-fit items-center flex gap-3 font-medium"
          onClick={handleShare}
        >
          Share
          <ChevronRight color={"white"} size={20} />
        </button>
      </div>
    </div>
  );
}

export default AddPost;
