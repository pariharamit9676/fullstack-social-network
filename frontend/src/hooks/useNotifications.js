import { useState, useEffect } from "react";
import socket from "../socket";
import { getNotifications, markAsRead } from "../services/notificationService";
import { useNavigate } from "react-router-dom";

const useNotifications = (userId) => {
  const [notifications, setNotifications] = useState([]);
  const [unseenCount, setUnseenCount] = useState(0);
  const navigate = useNavigate();

  const [show, setShow] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const data = await getNotifications();
        if (data.length) {
          setUnseenCount(data.filter((n) => !n.isRead).length);
          setNotifications(data);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };

    if (userId) {
      fetchNotifications();
    }
  }, [userId]);

  useEffect(() => {
    if (!userId) return;
    const handleNewNotification = (data) => {
      setNotifications((prev) => [data, ...prev]);
      console.log(unseenCount);
      setUnseenCount((prev) => prev + 1);
    };
    socket.on("newNotification", handleNewNotification);

    return () => {
        socket.off("newNotification", handleNewNotification);
      };
  }, [userId]);

  const toggleShow = () => {
    setShow(!show);
    if (unseenCount > 0) {
      setUnseenCount(0);
      markAsRead(userId).catch((err) =>
        console.error("Error marking as read:", err)
      );
    }
  };


  const handleCLickNotif = (userId) => {
    navigate(`/profile/${userId}`);
    setShow(false);
  };

  return {
    notifications,
    show,
    toggleShow,
    unseenCount,
    handleCLickNotif,
  };
};

export default useNotifications;
