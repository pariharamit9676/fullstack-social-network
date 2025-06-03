import React from 'react'
import { useUserDetails } from '../../hooks/useUserDetails';

const UserAction = ({userId , isFollowing}) => {
    const {handleFollowUser, handleUnfollow} = useUserDetails(userId)
    function handleClick() {
        if(user.isFollowing) {
            handleFollowUser(userId)
        }
        else
       {
             handleUnfollow(userId)
       }
    }
   
  return (
       <button
          onClick={handleClick}
            className="text-sm px-3 py-1 bg-blue-100 text-blue-600 rounded hover:bg-blue-200"
                >
            {isFollowing ? "Unfollow" : "Follow"}
        </button>
  )
}

export default UserAction;
