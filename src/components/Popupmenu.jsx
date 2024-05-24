import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";
import databaseService from "../services/databaseService";
import { useDispatch, useSelector } from "react-redux";
import { setUpdatePost } from "../features/database/databaseSlice";
import storageService from "../services/storageService";

function Popupmenu({ author, deleteHandler, postId, imagePath }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();
  const lightTheme = useSelector((state) => state.settings.lightTheme);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleItemClick = (item) => {
    // Handle item click
    console.log("Clicked on:", item);
    // Close the menu after clicking an item
    setIsOpen(false);
  };

  const responseHandler = async (response) => {
    setShowDialog(false);

    if (response) {
      const deleted = await databaseService.deleteDocument({
        collectionName: "posts",
        documentId: postId,
      });
      const imageDeleted = await storageService.deleteImageFromStorage({
        imagePath,
      });

      deleted && imageDeleted && deleteHandler();
    }
  };

  return (
    <div className="relative">
      <ConfirmationDialog
        show={showDialog}
        responseHandler={responseHandler}
        question={"Are you sure to delete this post?"}
      ></ConfirmationDialog>
      <EllipsisVertical
        size={40}
        color="gray"
        className={`${
          lightTheme
            ? "hover:bg-neutral-100 active:bg-neutral-200"
            : "hover:bg-neutral-700 active:bg-neutral-800"
        } p-2 rounded-full`}
        onClick={toggleMenu}
      ></EllipsisVertical>
      {isOpen && (
        <div
          className={`absolute top-full right-0 mt-2 ${
            lightTheme
              ? "bg-white border-gray-200"
              : "bg-tertiary border-neutral-700"
          } border  rounded shadow-md`}
        >
          <ul>
            <li
              className={`px-4 py-2 ${
                lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
              } cursor-pointer ${author ? "block" : "hidden"}`}
              onClick={() => {
                setShowDialog(true);
                setIsOpen(false);
              }}
            >
              <span className={`${lightTheme ? 'text-black' : "text-white"}`}>Delete</span>
            </li>
            <li
              className={`px-4 py-2 ${
                lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
              } cursor-pointer ${author ? "block" : "hidden"}`}
              onClick={() => {
                dispatch(setUpdatePost({ postId }));
                setIsOpen(false);
              }}
            >
              <span className={`${lightTheme ? 'text-black' : "text-white"}`}>Edit</span>
            </li>
            <li
              className={`px-4 py-2 ${
                lightTheme ? "hover:bg-gray-100" : "hover:bg-neutral-700"
              } cursor-pointer`}
              onClick={() => handleItemClick("Option 3")}
            >
              <span className={`${lightTheme ? 'text-black' : "text-white"}`}>Save</span>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Popupmenu;
