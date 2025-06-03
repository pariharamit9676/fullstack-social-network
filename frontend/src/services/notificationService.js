import API from "../axios";

export const getNotifications = async () => {
    const {data} = await API.get(`/notifications`);
    return data;
  }

export const markAsRead = async () => {
    await API.put(`/notifications`);
}