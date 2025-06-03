// components/UserInfoSection.jsx
import React from "react";
import { Link } from "react-router-dom";

const UserInfoSection = ({
  userId,
  userInfo,
  isCurrentUser,
  isFollow,
  handleFollowUser,
  handleUnfollowUser,
  handleFollowers,
  handleFollowing,
}) => {

  return (
    <div className="flex flex-col items-center mt-20">
      <h2 className="text-2xl font-semibold">{userInfo.name}</h2>

      {isCurrentUser ? (
        <button className="px-4 py-1 text-sm font-medium bg-gray-200 rounded hover:bg-gray-300 mt-2">
          Edit Profile
        </button>
      ) : (
        <div className="flex space-x-3 mt-2">
          {isFollow ? (
            <button
              onClick={() => handleUnfollowUser(userId)}
              className="px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Unfollow
            </button>
          ) : (
            <button
            onClick={() => handleFollowUser(userId)}
              className="px-4 py-1 text-sm font-medium bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Follow
            </button>
          )}
          <Link to={`/inbox/${userInfo.userId}`} className="px-4 py-1 text-sm font-medium bg-gray-300 rounded hover:bg-gray-400">
            Message
          </Link>
        </div>
      )}

      <div className="flex justify-center space-x-6 mt-2 text-gray-700">
        <span className="">
          <b>{userInfo.post_count || 0}</b> posts
        </span>
        <button className="cursor-pointer" onClick={handleFollowers}>
          <b>{userInfo.follower_count || 0}</b> followers
        </button>
        <button className="cursor-pointer" onClick={handleFollowing}>
          <b>{userInfo.following_count || 0}</b> following
        </button>
      </div>
      <p className="mt-2 text-gray-600 text-center">
        {userInfo.bio || "No bio available."}
      </p>
    </div>
  );
};

export default UserInfoSection;
