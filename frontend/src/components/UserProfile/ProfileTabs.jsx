import React from "react";
import { FiGrid, FiBookmark } from "react-icons/fi";

const tabs = [
  { tab: "posts", label: "Posts", icon: <FiGrid className="mr-1" size={18} /> },
  { tab: "saved", label: "Saved", icon: <FiBookmark className="mr-1" size={18} /> },
];

const ProfileTabs = ({ activeTab, onTabChange }) => {
  return (
    <div className="flex justify-center mt-6 border-t border-gray-300">
      {tabs.map(({ tab, label, icon }) => (
        <button
          key={tab}
          onClick={() => onTabChange(tab)}
          className={`flex items-center p-3 font-medium transition-all ${
            activeTab === tab
              ? "text-black border-b-2 border-black"
              : "text-gray-600 hover:text-black"
          }`}
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
};

export default ProfileTabs;
