import React from "react";

function Comment({ data }) {

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = { month: "long", day: "numeric", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };

  return (
    <div className="flex flex-col gap-1 w-full mt-4">
      {/* comment header */}
      <div className="flex justify-between">
        <div className="flex gap-1">
          <img
            src="../assets/react.svg"
            height={24}
            width={24}
            alt="userImage"
          />
          <h4 className="font-medium text-black">{data.username}</h4>
        </div>
        <span className="text-neutral-400 text-sm">{formatDate(data.date)}</span>
      </div>
      <p className="text-n text-sm text-neutral-500">{data.comment}</p>
    </div>
  );
}

export default Comment;
