import React, { useEffect, useState } from "react";
import storageService from "../services/storageService";
import Popupmenu from "./Popupmenu";
import { Share, Heart, MessageSquare } from "lucide-react";
import { useSelector } from "react-redux";

function Post({ data, id }) {
  const uid = useSelector((state) => state.auth.userData.uid);

  const [url, setUrl] = useState(null);

  const [dateString, setDateString] = useState("");

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
  }, []);

  return (
    <div className="flex flex-col gap-4 p-8 w-[720px] bg-white rounded-xl">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            src="../assets/react.svg"
            height={24}
            width={24}
            alt="userImage"
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-bold text-black">{data.username}</h3>
            <span className="text-neutral-400 text-sm">{dateString}</span>
          </div>
        </div>

        <Popupmenu author={uid === data.userId}></Popupmenu>
      </div>

      <p className="text-neutral-500">{data.content}</p>
      {url ? (
        <img
          src={url}
          alt="post-image"
          className="rounded-lg object-cover w-full h-64"
        ></img>
      ) : null}

      <div className="flex justify-between">
        <div className="flex gap-5">
          <span className="flex gap-2 font-medium items-center">
            <Heart
              size={40}
              color="black"
              className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
            ></Heart>
            326
          </span>
          <span className="flex gap-2 font-medium items-center">
            <MessageSquare
              size={40}
              color="black"
              className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
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
    </div>
  );
}

export default Post;
