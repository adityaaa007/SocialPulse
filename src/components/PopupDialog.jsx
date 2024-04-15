import React from "react";
import { useState } from "react";
import { Camera } from "lucide-react";

const PopupDialog = ({ onUpload, show }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = () => {
    if (selectedFile) {
      // Call the onUpload function with the selected file
      onUpload(selectedFile);
    }
  };

  return (
    <div
      className={`fixed inset-0 items-center justify-center z-50 self-center ${
        show ? "flex" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 blur"></div>
      <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Select a profile image</h2>
        <div className="flex flex-col items-center">
          {previewUrl && (
            <img
              src={previewUrl}
              alt="Preview"
              className="mb-4 w-36 object-cover h-36 rounded-lg mx-4"
            />
          )}
          <button
            className="p-3 bg-neutral-100 w-12 rounded-full hover:bg-neutral-200 mb-4"
            onClick={() => document.getElementById("profileImageInput").click()}
          >
            <Camera color={"gray"} size={24} />
            <input
              id="profileImageInput"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </button>
          <button
            className="bg-primary text-white font-medium px-4 py-2 rounded-lg"
            onClick={handleUpload}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDialog;
