import React from "react";

const ConfirmationDialog = ({ responseHandler, question, show }) => {

  return (
    <div
      className={`fixed inset-0 items-center justify-center z-50 self-center ${
        show ? "flex" : "hidden"
      }`}
    >
      <div className="fixed inset-0 bg-black opacity-50 blur"></div>
      <div className="z-50 bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-md mb-4">{question}</h2>
        <div className="flex items-center justify-center gap-5">
          <button
            className="bg-green-500 text-white font-medium px-4 py-2 rounded-lg"
            onClick={() => responseHandler(true)}
          >
            Yes
          </button>
          <button
            className="bg-gray-200 text-black font-medium px-4 py-2 rounded-lg"
            onClick={() => responseHandler(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
