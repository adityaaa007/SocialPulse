import React, { useEffect, useState } from "react";
import { UserPlus, UserCheck } from "lucide-react";
import icon from "../assets/boy.png";
import storageService from "../services/storageService";
import { useDispatch, useSelector } from "react-redux";
import databaseService from "../services/databaseService";
import { updateData } from "../features/database/databaseSlice";

function FollowerCard({ data, id }) {
  const [imageUrl, setImageUrl] = useState(null);
  const uid = useSelector((state) => state.auth.userData.uid);
  const userDbData = useSelector((state) => state.database.userDbData);
  const dispatch = useDispatch();
  const followerHandler = async () => {
    const updatedFollowing = userDbData.following.includes(id)
      ? userDbData.following.filter((followerId) => followerId !== id)
      : [...userDbData.following, id];

    const updatedUserData = {
      ...userDbData,
      following: updatedFollowing,
    };
    const added = await databaseService.updateDocumentField({
      collectionId: "users",
      documentId: uid,
      field: "following",
      value: updatedFollowing,
    });
    added && dispatch(updateData(updatedUserData));
  };

  useEffect(() => {
    (async () => {
      if (data.imagePath) {
        const profileImagePath = data.imagePath;

        const url = await storageService.downloadFile({
          url: profileImagePath,
        });
        url && setImageUrl(url);
      }
    })();
  }, []);

  return (
    <div className={`justify-between gap-5 ${uid === id ? "hidden" : "flex"}`}>
      <div className="flex gap-5 items-center">
        <img
          src={imageUrl ? imageUrl : icon}
          alt="follower-image"
          className="object-cover h-12 w-12 rounded-xl"
        />
        <div className="flex flex-col gap-[5px]">
          <h3 className="text-white font-medium text-base">
            {data.name}
            {userDbData.following.includes(id) && (
              <span className="py-1 px-2 ms-2 font-base text-green-500 border text-xs rounded-md border-green-400">
                Following
              </span>
            )}
          </h3>
          <h4 className="text-neutral-400 text-md">{data.address}</h4>
        </div>
      </div>

      <button
        className={`rounded-xl duration-200 ${
          userDbData.following.includes(id)
            ? "border-2 border-green-500 bg-transparent hover:bg-green-500/20 py-4 px-4"
            : "bg-primary hover:bg-indigo-600 py-4 px-4 border-2 border-primary"
        }`}
        onClick={followerHandler}
      >
        {userDbData.following.includes(id) ? (
          <UserCheck size={20} color="#22C55E"></UserCheck>
        ) : (
          <UserPlus size={20} color="white"></UserPlus>
        )}
      </button>
    </div>
  );
}

export default FollowerCard;
