import API from "../axios";

export const getUserDetails = async (userId) => {
    const res = await API.get(`/users/${userId}`);
    return res.data;
}
export const followUser = async (userId) => {
    await API.post(`/users/${userId}`);
}

export const unfollowUser = async (userId) => {
    await API.delete(`/users/${userId}`);
}

export const getAllFollowers = async (userId) => {
    const res = await API.get(`/users/followers/${userId}`);
    return res.data;
}
export const getAllFollowing = async (userId) => {
    const res = await API.get(`/users/following/${userId}`);
    return res.data;
}