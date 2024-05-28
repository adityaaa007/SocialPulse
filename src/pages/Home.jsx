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
import LargeSidebar from "../components/LargeSidebar";
import Navbar from "../components/Navbar";

function Home() {
  const [sharedData, setSharedData] = useState("");
  const uid = useSelector((state) => state.auth.userData.uid);
  const dispatch = useDispatch();
  const [showPopupDialog, setShowPopupDialog] = useState(false);
  const [userData, setUserData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState("all");
  const lightTheme = useSelector((state) => state.settings.lightTheme);

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
        name: userData.name,
        address: userData.address,
        following: userData.following,
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

  const searchHandler = ({ text, filter }) => {
    setSearchText(text);
    setFilter(filter);
  };

  return (
    <div className={`flex w-full h-screen relative ${lightTheme ? 'bg-bgLight' : "bg-bgDark"} items-center flex-col md:flex-row`}>
      <PopupDialog show={showPopupDialog} onUpload={uploadImage}></PopupDialog>
      <Sidebar initialPage={"home"}></Sidebar>
      <Navbar initialPage={"home"}></Navbar>
      <div className="flex-1 h-screen flex overflow-y-auto w-full md:w-full">
        <div className="flex flex-1 h-screen flex-col md:px-12 lg:px-32 lg:me-[512px] md:me-[380px] px-4 gap-7 pt-10">
          <Searchbar searchHandler={searchHandler}></Searchbar>
          <AddPost updateSharedData={updateSharedData}></AddPost>
          <AllPosts
            sharedData={sharedData}
            searchText={searchText}
            filter={filter}
          ></AllPosts>
        </div>
        <LargeSidebar hidden={false}></LargeSidebar>
      </div>
    </div>
  );
}

export default Home;
