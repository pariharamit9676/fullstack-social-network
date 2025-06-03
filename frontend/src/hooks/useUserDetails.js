// hooks/useUserDetails.js
import { useContext, useEffect, useState } from "react";
import { followUser, getAllFollowers, getAllFollowing, getUserDetails, unfollowUser } from "../services/userService";
import { AuthContext } from "../context/AuthContext";
import { useParams } from "react-router-dom";

export const useUserDetails = (userId) => {
  const [userInfo, setUserInfo] = useState({});
  const [isFollow, setIsFollow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const {id: currentProfileId} = useParams()
  const { currentUser } = useContext(AuthContext);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUser(){
      try {
        const data = await getUserDetails(userId);
        setUserInfo(data);
        setIsFollow(data.isFollowing);
      } catch (err) {
        console.error(err);
        setError("Failed to load profile.");
      }
    }
    fetchUser();
  }, [userId]);


  const getFollowers = async () => {
    if (!userInfo.follower_count) return 0;
    setIsLoading(true);
    try {
      const followers = await getAllFollowers(userId);
        setUserInfo((prev) => ({ ...prev, relations: followers }));

    } catch (err) {
      setError("Failed to load followers.");
    } finally {
       setIsLoading(false);
    }
  }
  const getFollowing = async() => {
    setIsLoading(true);
    try {
      const following = await getAllFollowing(userId);

      setUserInfo((prev) => ({ ...prev, relations: following }));
    } catch (err) {
      console.error("Error fetching following:", err);
      setError("Failed to load following.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleFollowUser = async (id) => {
    try {
      await followUser(id);
      if (id === userId) {
        // When following the current profile owner
        setIsFollow(true);
        setUserInfo((prev) => ({
          ...prev,
          follower_count: prev.follower_count + 1,
        }));
      } else {
        if (currentUser.id === Number(currentProfileId)) {
          
           setUserInfo((prev) => {
             return {
               ...prev,
               following_count: prev.following_count + 1,
             };
           })
        }
        // When following someone from relations modal
        setUserInfo((prev) => ({
          ...prev,
          relations: prev.relations?.map((user) =>
            user.id === id ? { ...user, isFollowing: true } : user
          ),
        }));
      }
    } catch (err) {
      console.error("Error following user:", err);
    }
  };

  const handleUnfollowUser = async (id) => {
    try {
      await unfollowUser(id);
      if (id === userId) {
        setIsFollow(false);

        setUserInfo((prev) => ({
          ...prev,
          follower_count: prev.follower_count - 1,
        }));
      } else {
        if (currentUser.id === Number(currentProfileId)) {
          
          setUserInfo((prev) => {
            return {
              ...prev,
              following_count: prev.following_count - 1,
            };
          })
       }

      setUserInfo((prev) => ({
          ...prev,
          relations: prev.relations?.map((user) =>
            user.id === id ? { ...user, isFollowing: false } : user
          ),
        }));
      }
    } catch (err) {
      console.error("Error unfollowing user:", err);
    }
  };

  return { userInfo, isFollow, getFollowers, getFollowing, isLoading, setIsFollow, error, handleFollowUser, handleUnfollowUser };
};
