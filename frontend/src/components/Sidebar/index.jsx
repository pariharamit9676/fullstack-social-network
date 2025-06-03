import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaCompass,
  FaBell,
  FaEnvelope,
  FaBookmark,
  FaPalette,
  FaCog,
  FaGamepad,
} from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useNotifications from "../../hooks/useNotifications";
import NotificationDropdown from "./NotificationDropdown";

const Sidebar = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const {
    notifications,
    unseenCount,
    show,
    toggleShow,
    handleCLickNotif,
  } = useNotifications(currentUser?.id);

  const isActive = (path) =>
    location.pathname === path
      ? "bg-gray-200 dark:bg-gray-700 text-blue-600"
      : "hover:bg-gray-100 dark:hover:bg-gray-800";

  return (
    <div className="w-1/4 h-screen sticky top-24 self-start hidden md:block">
      {/* Profile Header */}
      <div
        className="bg-white dark:bg-gray-800 p-4 border-b border-gray-200 shadow-md hover:bg-gray-100 cursor-pointer"
        onClick={() => navigate(`/profile/${currentUser?.id}`)}
      >
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-300 dark:border-gray-600">
            <img
              src={`/uploads/${currentUser?.profilePic}`}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
              {currentUser?.name}
            </h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {currentUser?.username}
            </p>
          </div>
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="w-full h-screen bg-white dark:bg-gray-900 p-5 shadow-lg fixed md:relative">
        <h2 className="text-xl font-bold text-gray-700 dark:text-white mb-6">
          Dashboard
        </h2>

        <nav className="space-y-2">
          <Link to="/" className={`flex items-center p-3 rounded-lg ${isActive("/")}`}>
            <FaHome className="mr-3" /> <span>Home</span>
          </Link>

          <Link to="/explore" className={`flex items-center p-3 rounded-lg ${isActive("/explore")}`}>
            <FaCompass className="mr-3" /> <span>Explore</span>
          </Link>

          <div className="relative">
            <button
              onClick={toggleShow}
              className={`flex items-center w-full p-3 rounded-lg ${isActive("/notifications")}`}
            >
              <FaBell className="mr-3" />
              <span>Notifications</span>
              {parseInt(unseenCount) > 0 && (
                <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {unseenCount}
                </span>
              )}
            </button>
            {show && (
              <NotificationDropdown
                notifications={notifications}
                onClickNotif={handleCLickNotif}
              />
            )}
          </div>

          <Link to="/inbox" className={`flex items-center p-3 rounded-lg ${isActive("/messages")}`}>
            <FaEnvelope className="mr-3" /> <span>Messages</span>
          </Link>

          <Link to="/games" className={`flex items-center p-3 rounded-lg ${isActive("/games")}`}>
            <FaGamepad className="mr-3" /> <span>Games</span>
          </Link>

          <Link to="/settings" className={`flex items-center p-3 rounded-lg ${isActive("/settings")}`}>
            <FaCog className="mr-3" /> <span>Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
