import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddPost from "../components/AddPost";
import Searchbar from "../components/Searchbar";
import AllPosts from "../components/AllPosts";
import { useSelector, useDispatch } from "react-redux";
import databaseService from "../services/databaseService";
import { updateData } from "../features/database/databaseSlice";
import PopupDialog from "../components/PopupDialog";
import storageService from "../services/storageService";

function Home() {
  const [sharedData, setSharedData] = useState("");
  const uid = useSelector((state) => state.auth.userData.uid);
  const dispatch = useDispatch();
  const [showPopupDialog, setShowPopupDialog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState(null);

  const saveUserDbDataCallback = (data) => {
    // saving userDbData in redux
    if (data) {
      dispatch(updateData(data));

      setUserData(data);

      if (!data.imagePath) {
        setShowPopupDialog(true);
      }
    }
  };

  const uploadImage = async (imageFile) => {
    const url = await storageService.uploadFile({
      path: "user_image/" + uid,
      file: imageFile,
    });

    if (url && userData) {
      const data = {
        likedPosts: userData.likedPosts,
        imagePath: url,
      };

      const result = await databaseService.setDocument({
        collectionId: "users",
        documentId: uid,
        data: data,
      });
      if (result) {
        dispatch(updateData(data));
        setShowPopupDialog(false);
      }
    }
  };

  useEffect(() => {
    // listening for userData(like, etc)
    let unsubscribe;
    if (uid) {
      unsubscribe = databaseService.listenToDocument({
        documentId: uid,
        collectionId: "users",
        callback: saveUserDbDataCallback,
      });
    }

    // unsubscribe when App dismounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  // Function to update shared data
  const updateSharedData = (newData) => {
    setSharedData(newData);
  };

  const searchHandler = ({ text }) => {
    setSearchText(text);
  };

  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7] items-center">
      <PopupDialog show={showPopupDialog} onUpload={uploadImage}></PopupDialog>
      <Sidebar></Sidebar>
      <div className="flex-1 overflow-y-auto h-screen px-32 pt-16 flex flex-col gap-7">
        <Searchbar searchHandler={searchHandler}></Searchbar>
        <AddPost updateSharedData={updateSharedData}></AddPost>
        <AllPosts sharedData={sharedData} searchText={searchText}></AllPosts>
      </div>
    </div>
  );
}

export default Home;
