import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useUserDetails } from "../../hooks/useUserDetails";

import ProfileHeader from "./ProfileHeader";
import UserInfoSection from "./UserInfoSection";
import ProfileTabs from "./ProfileTabs";
import PostGrid from "../PostGrid";
import UserListModal from "./UserListModal";

const UserProfile = () => {
  const { id: userId } = useParams();
  const [isOpen, setIsOpen] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const isCurrentUser = currentUser?.id === parseInt(userId);
  const {
    userInfo,
    isFollow,
    isLoading,
    getFollowers,
    getFollowing,
    error,
    handleFollowUser,
    handleUnfollowUser,
  } = useUserDetails(userId);
  const [modalType, setModalType] = useState("");

  const [activeTab, setActiveTab] = useState("posts");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleFollowers = () => {
    setIsOpen(true);
    setModalType("followers");
    getFollowers();
  };

  const handleFollowing = () => {
    setIsOpen(true);
    setModalType("following");
    getFollowing();
  };

  if (error)
    return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="min-w-full flex-1">
      <ProfileHeader userInfo={userInfo} />
      <UserInfoSection
        userInfo={userInfo}
        userId={userId}
        isCurrentUser={isCurrentUser}
        isFollow={isFollow}
        handleFollowUser={handleFollowUser}
        handleUnfollowUser={handleUnfollowUser}
        handleFollowers={handleFollowers}
        handleFollowing={handleFollowing}
      />
      {isOpen && (
        <UserListModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title={modalType}
          users={userInfo.relations}
          handleFollow={handleFollowUser}
          handleUnfollow={handleUnfollowUser}
          isLoading={isLoading}
          currentUserId={currentUser.id}
        />
      )}
      <ProfileTabs activeTab={activeTab} onTabChange={handleTabChange} />
      <PostGrid activeTab={activeTab} userId={userId} />
    </div>
  );
};

export default UserProfile;
