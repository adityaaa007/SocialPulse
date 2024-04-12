import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import AddPost from "../components/AddPost";
import Searchbar from "../components/Searchbar";
import AllPosts from "../components/AllPosts";

function Home() {
  const [sharedData, setSharedData] = useState("");

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
