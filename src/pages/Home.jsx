import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import AddPost from "../components/AddPost";
import Searchbar from "../components/Searchbar";
import AllPosts from "../components/AllPosts";
import { useSelector, useDispatch } from "react-redux";
import databaseService from "../services/databaseService";
import { updateData } from "../features/database/databaseSlice";

function Home() {
  const [sharedData, setSharedData] = useState("");
  const uid = useSelector((state) => state.auth.userData.uid);
  const dispatch = useDispatch();

  const saveUserDbDataCallback = (data) => {
    // saving userDbData in redux
    if (data) dispatch(updateData(data));
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

  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7]">
      <Sidebar></Sidebar>
      <div className="flex-1 overflow-y-auto h-screen px-32 pt-16 flex flex-col gap-7">
        <Searchbar></Searchbar>
        <AddPost updateSharedData={updateSharedData}></AddPost>
        <AllPosts sharedData={sharedData}></AllPosts>
      </div>
    </div>
  );
}

export default Home;
