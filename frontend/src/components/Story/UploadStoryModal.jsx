import axios from 'axios';
import React, { useState } from 'react';

const UploadStoryModal = ({addStory, onClose, onUpload, story, setStory }) => {
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setStory(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const handleUpload = async () => {
    if (!story) {
      alert('Please select an image.');
      return;
    }
    addStory();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 px-4">
      <div className="bg-white rounded-xl w-full max-w-md p-6 relative shadow-2xl overflow-y-auto max-h-[90vh]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-5 text-gray-500 text-2xl hover:text-red-500 focus:outline-none"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 mb-5 text-center">Upload Story</h2>

        {/* Image Preview */}
        <div className="mb-5">
          {preview ? (
            <img
              src={preview}
              alt="Story Preview"
              className="w-full h-60 object-cover rounded-lg border shadow"
            />
          ) : (
            <div className="w-full h-60 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 border">
              No image selected
            </div>
          )}
        </div>

        {/* File Input */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4
              file:rounded-lg file:border-0 file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium hover:bg-blue-700 transition duration-200"
        >
          Upload Story
        </button>
      </div>
    </div>
  );
};

export default UploadStoryModal;
