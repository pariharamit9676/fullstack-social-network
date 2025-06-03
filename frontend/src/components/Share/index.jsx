import React, { useContext, useState } from 'react';
import { FaImage, FaMapMarkerAlt, FaUserTag } from 'react-icons/fa';
import { AuthContext } from '../../context/AuthContext';
import { uploadFile } from '../../utils/uploadFile';
import { useUserPosts } from '../../hooks/useUserPosts';

const Share = () => {
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const {createPost, loading} = useUserPosts(currentUser.id)



  async function sharePost() {
    let imgUrl = "";
    if (file) imgUrl = await uploadFile(file);
    createPost({ desc, img: imgUrl })
    setDesc("");
    setFile(null);
  }

  return (
    <form className="bg-white shadow-md rounded-lg p-6 sm:p-6 w-full max-w-2xl mx-auto">
      {/* Profile + Input */}
      <div className="flex items-start sm:items-center gap-3 sm:gap-4 mb-4">
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden shrink-0">
          <img
            src={`uploads/${currentUser?.profilePic}`}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>
        <textarea
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          placeholder={`What's on your mind, ${currentUser?.name || 'User'}?`}
          rows={2}
          className="flex-1 border border-gray-300 rounded px-3 py-2 text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
      </div>

      {/* Preview Image */}
      {file && (
        <div className="mb-4 relative w-full max-h-[300px]">
          <button
            type="button"
            onClick={() => setFile(null)}
            className="absolute top-2 right-2 bg-black bg-opacity-60 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-opacity-80 z-10"
          >
            ✕
          </button>
          <img
            src={URL.createObjectURL(file)}
            alt="Preview"
            className="w-full max-h-[300px] object-contain rounded"
          />
        </div>
      )}

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-2 gap-3 sm:gap-6">
        <div className="flex gap-3 sm:gap-4 flex-wrap text-gray-600 text-sm sm:text-base">
          <label htmlFor="file" className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-500">
            <FaImage />
            <span>Add Image</span>
          </label>
          <input
            type="file"
            id="file"
            accept=".png,.jpeg,.jpg"
            style={{ display: "none" }}
            onChange={(e) => setFile(e.target.files[0])}
          />
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-500">
            <FaMapMarkerAlt />
            <span>Add Place</span>
          </div>
          <div className="flex items-center gap-1 sm:gap-2 cursor-pointer hover:text-blue-500">
            <FaUserTag />
            <span>Tag Friends</span>
          </div>
        </div>

        {(file || desc) && (
          <button
            type="button"
            onClick={sharePost}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 text-sm sm:text-base rounded font-medium transition"
          >
            {loading ? "Sharing..." : "Share"}
          </button>
        )}
      </div>
    </form>
  );
};

export default Share;
