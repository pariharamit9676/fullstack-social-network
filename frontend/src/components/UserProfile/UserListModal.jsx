// components/UserListModal.jsx
import React from "react";

const UserListModal = ({
  isOpen,
  onClose,
  title = "Users",
  users = [],
  currentUserId,
  handleFollow,
  handleUnfollow,
  isLoading = false,
}) => {

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white w-[350px] max-h-[500px] rounded-xl shadow-xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            &times;
          </button>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto p-4 flex-1">
          {isLoading ? (
            // Skeleton loading placeholders
            [...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex justify-between items-center mb-3 animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-gray-300"></div>
                  <div className="h-4 w-24 bg-gray-300 rounded"></div>
                </div>
                <div className="h-6 w-16 bg-gray-300 rounded"></div>
              </div>
            ))
          ) : users.length === 0 ? (
            <p className="text-center text-gray-500">
              No {title.toLowerCase()} yet.
            </p>
          ) : (
            users.map((user) => (
              <div
                key={user.id}
                className="flex justify-between items-center mb-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={`/uploads/${user.profilePic}`}
                    alt={user.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-medium">{user.name}</div>
                    <div className="text-sm text-gray-500">
                      @{user.username}
                    </div>
                  </div>
                </div>
                {user.id !== currentUserId &&
                  (user.isFollowing ? (
                    <button
                      onClick={() => handleUnfollow(user.id)}
                      className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      onClick={() => handleFollow(user.id)}
                      className="text-sm px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                      Follow
                    </button>
                  ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserListModal;
