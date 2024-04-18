import React, { useState } from "react";
import { EllipsisVertical } from "lucide-react";
import ConfirmationDialog from "./ConfirmationDialog";
import databaseService from "../services/databaseService";
import { useDispatch } from "react-redux";
import { setUpdatePost } from "../features/database/databaseSlice";
import storageService from "../services/storageService";

function Popupmenu({ author, deleteHandler, postId, imagePath }) {
  const [isOpen, setIsOpen] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const dispatch = useDispatch();

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
        className="hover:bg-neutral-100 active:bg-neutral-200 p-2 rounded-full"
        onClick={toggleMenu}
      ></EllipsisVertical>
      {isOpen && (
        <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded shadow-md">
          <ul>
            <li
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                author ? "block" : "hidden"
              }`}
              onClick={() => {
                setShowDialog(true);
                setIsOpen(false);
              }}
            >
              Delete
            </li>
            <li
              className={`px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                author ? "block" : "hidden"
              }`}
              onClick={() => {
                dispatch(setUpdatePost({ postId }));
                setIsOpen(false);
              }}
            >
              Edit
            </li>
            <li
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
              onClick={() => handleItemClick("Option 3")}
            >
              Save
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default Popupmenu;
