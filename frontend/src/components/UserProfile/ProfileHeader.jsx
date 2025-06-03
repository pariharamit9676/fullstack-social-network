import React, { useState } from "react";

const ProfileHeader = ({ userInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="relative w-full h-60 md:h-72 bg-gray-300 rounded-lg">
      <img
        src={`/uploads/${userInfo.coverPic}`}
        alt="Cover"
        className="min-w-[100%] h-full object-cover border-4 border-white rounded-lg"
      />
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
        <img
          src={`/uploads/${userInfo.profilePic}`}
          alt="Profile"
          onClick={() => setIsModalOpen(true)}
          className="w-28 h-28 md:w-36 md:h-36 rounded-full border-4 border-white shadow-lg object-cover cursor-pointer"
        />
      </div>

      {/* Modal to show full image */}
      {isModalOpen && (
  <div
    className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center"
    onClick={() => setIsModalOpen(false)}
  >
    <div
      className="relative max-w-[90%] max-h-[90%] bg-transparent"
      onClick={(e) => e.stopPropagation()} // Prevent background close
    >
      {/* Close icon (top right corner) */}
      <button
        onClick={() => setIsModalOpen(false)}
        className="absolute top-2 right-2 text-white text-2xl font-light hover:text-gray-300 transition"
        aria-label="Close"
      >
        &times;
      </button>

      {/* Full image view */}
      <img
        src={`/uploads/${userInfo.profilePic}`}
        alt="Profile Full View"
        className="max-w-full max-h-screen object-contain rounded-md"
      />
    </div>
  </div>
)}


    </div>
  );
};

export default ProfileHeader;
