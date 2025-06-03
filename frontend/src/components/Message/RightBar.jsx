import React from "react";
import { useNavigate } from "react-router-dom";

const RightBar = ({ conversation,  isSelected }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {navigate(`/inbox/${conversation.userId}`)}}
      role="button"
      aria-selected={isSelected}
      tabIndex={0}
      className={`flex items-center gap-3 p-2 rounded-lg cursor-pointer transition hover:bg-blue-100 dark:hover:bg-gray-700 focus-within:ring-2 ring-blue-300 ${
        isSelected ? "bg-blue-200 dark:bg-gray-700" : ""
      }`}
    >
      <img
        src={`/uploads/${conversation.profilePic}`}
        alt={conversation.name}
        className="w-10 h-10 rounded-full object-cover"
      />
      <div className="overflow-hidden">
        <h4 className="text-sm font-semibold text-gray-800 dark:text-white truncate max-w-[160px] sm:max-w-[200px]">
          {conversation.name}
        </h4>
        <p className="text-xs text-gray-500 truncate max-w-[160px] sm:max-w-[200px]">
          @{conversation.username}
        </p>
      </div>
    </div>
  );
};

export default RightBar;