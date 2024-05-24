import React, { useEffect, useState } from "react";
import storageService from "../services/storageService";
import backupImage from "../assets/boy.png";
import { useSelector } from "react-redux";

function Comment({ data }) {
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  const [imageUrl, setImageUrl] = useState(null);
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  useEffect(() => {
    (async () => {
      const url = await storageService.downloadFile({
        url: `user_image/${data.userId}`,
      });
      url && setImageUrl(url);
    })();
  }, []);

  return (
    <div className="flex flex-col gap-1 w-full mt-4 pe-4">
      {/* comment header */}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <img
            className="rounded-lg"
            src={imageUrl || backupImage}
            height={24}
            width={24}
            alt="userImage"
          />
          <h4
            className={`font-medium ${
              lightTheme ? "text-black" : "text-white"
            }`}
          >
            {data.username}
          </h4>
        </div>
        <span className="text-neutral-400 text-sm">
          {formatDate(data.date)}
        </span>
      </div>
      <p
        className={`text-n text-sm ${
          lightTheme ? "text-neutral-500" : "text-neutral-300"
        }`}
      >
        {data.comment}
      </p>
    </div>
  );
}

export default Comment;
