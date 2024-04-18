import React, { useEffect, useState } from "react";
import FollowerCard from "./FollowerCard";
import databaseService from "../services/databaseService";
import { Player, Controls } from "@lottiefiles/react-lottie-player";
import shimmerAnim from "../assets/shimmer_posts.json";

function LargeSidebar() {
  const [peopleList, setPeopleList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const list = await databaseService.getAllData({
        collectionPath: "users",
      });

      setLoading(false);
      list && setPeopleList(list);
    })();
  }, []);

  return (
    <div className="bg-[#1E1F21] rounded-tl-3xl rounded-bl-3xl lg:w-[512px] md:w-[380px] h-screen fixed right-0 py-10 px-10 gap-5 hidden md:flex flex-col duration-200 transition-all">
      <h2 className="font-semibold text-white text-xl mb-5">Who to follow</h2>

      {loading ? (
        <Player
          className="mt-0 self-center"
          autoplay
          loop
          src={shimmerAnim}
          style={{ height: "256px", width: "256px" }}
        >
          <Controls
            visible={false}
            buttons={["play", "repeat", "frame", "debug"]}
          />
        </Player>
      ) : null}

      {peopleList.map((people) => {
        return <FollowerCard {...people} key={people.id}></FollowerCard>;
      })}

      <div
        className={`flex-1 justify-center items-center ${
          peopleList.length === 1 ? "flex" : "hidden"
        }`}
      >
        <p className="text-neutral-400">{"No one found :("}</p>
      </div>
    </div>
  );
}

export default LargeSidebar;
