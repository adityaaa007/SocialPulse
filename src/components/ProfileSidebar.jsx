import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import storageService from "../services/storageService";
import initialImage from "../assets/boy.png";
import Button from "./Button";
import databaseService from "../services/databaseService";

function ProfileSidebar() {
  const imagePath = useSelector((state) => state.database.userDbData.imagePath);
  const name = useSelector((state) => state.database.userDbData.name);
  const uid = useSelector((state) => state.auth.userData.uid);
  const postCount = useSelector((state) =>
    state.database.userPosts[uid] ? state.database.userPosts[uid].length : 0
  );
  const followingCount = useSelector(
    (state) => state.database.userDbData.following.length
  );
  const followings = useSelector(
    (state) => state.database.userDbData.following
  );
  const [imageUrl, setImageUrl] = useState("");
  const [dataList, setDataList] = useState([]);
  const loadImage = async (path) => {
    const url = await storageService.downloadFile({ url: path });
    if (url) {
      return url;
    }
  };

  useEffect(() => {
    (async () => {
      let list = [];
      await Promise.all(
        followings.map(async (userId) => {
          // fetching user data
          const user = await databaseService.getDocument({
            collectionId: "users",
            documentId: userId,
          });

          user.id = userId;

          user && list.push(user);
        })
      );

      if (list.length) {
        list.map(async (user) => {
          if (uid !== user.id) {
            const url = await loadImage(user.imagePath);
            setDataList((prevList) => [...prevList, { url, name: user.name }]);
          }
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (imagePath) {
      (async () => {
        const url = await storageService.downloadFile({ url: imagePath });
        url && setImageUrl(url);
      })();
    }
  }, [imagePath]);

  return (
    <div className="bg-[#1E1F21] rounded-tl-3xl rounded-bl-3xl lg:w-[512px] md:w-[380px] h-screen fixed right-0 py-10 px-10 gap-5 hidden md:flex flex-col duration-200 transition-all items-center">
      <img
        src={imageUrl ? imageUrl : initialImage}
        alt="profile-image"
        className="h-24 w-24 bg-neutral-700 rounded-3xl object-cover"
      />
      <h2 className="font-bold text-white text-2xl mb-5">{name}</h2>
      <div className="flex gap-5 justify-center">
        <h4 className="font-medium text-white text-base mb-5">
          {postCount}
          <span className="font-medium text-neutral-500 text-base ms-2">
            Posts
          </span>
        </h4>
        <h4 className="font-medium text-white text-base mb-5">
          {followingCount}
          <span className="font-medium text-neutral-500 text-base ms-2">
            Followings
          </span>
        </h4>
      </div>
      <Button
        type="submit"
        style={"lg:w-64 w-fit hover:bg-green-600 bg-green-500"}
      >
        Edit profile
      </Button>
      <div className="w-full flex flex-col">
        <h4 className="font-medium text-white text-base mb-5 mt-2">
          Followings
        </h4>
        <div className="flex flex-wrap gap-4 w-full justify-start">
          {followingCount === 0 ? (
            <p className="text-neutral-400">{"No one found :("}</p>
          ) : (
            dataList.map((data) => {
              return (
                <div key={data.url} className="relative inline-block group">
                  <img
                    src={data.url}
                    alt="following-image"
                    className="w-16 h-16 rounded-lg object-cover block"
                  ></img>
                  <div className="absolute left-1/2 bottom-full transform -translate-x-1/2 mb-2 w-max px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {data.name}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfileSidebar;
