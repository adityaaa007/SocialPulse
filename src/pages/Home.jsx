import React from "react";
import Sidebar from "../components/Sidebar";
import AddPost from "../components/AddPost";

function Home() {
  return (
    <div className="flex w-full h-screen relative bg-[#F7F7F7]">
      {/* <button onClick={() => dispatch(logout())} className="p-2 bg-primary text-white">Logout</button> */}
      <Sidebar></Sidebar>
      <div className="flex-1 overflow-y-auto h-screen">
        <AddPost></AddPost>
      </div>
    </div>
  );
}

export default Home;
