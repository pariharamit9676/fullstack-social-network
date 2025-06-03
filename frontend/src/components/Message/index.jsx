import React, { useContext } from "react";
import useMessage from "../../hooks/useMessage";
import ChatArea from "./ChatArea";
import RightBar from "./RightBar";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Message = () => {
  const { currentUser } = useContext(AuthContext);
  const { id: selectedUserId } = useParams();

  const { message, setMessage, messages, sendMessage, conversations } = useMessage({ receiverId: selectedUserId });

  return (
    <div className="w-full h-full flex bg-white dark:bg-gray-900 overflow-hidden">
      {/* Sidebar */}
      <div className="hidden md:flex w-1/3 flex-col border-r bg-gray-100 dark:bg-gray-800">
        <div className="p-4 border-b dark:border-gray-700 font-semibold">Messages</div>
        <div className="flex-1 overflow-y-auto p-2 space-y-2">
          {conversations.map((conversation) => (
            <RightBar
              key={conversation.conversationId}
              conversation={conversation}
              isSelected={+conversation.userId === +selectedUserId}
            />
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="w-full h-full md:w-2/3 flex flex-col">
        {selectedUserId ? (
          <ChatArea
            currentUser={currentUser}
            setMessage={setMessage}
            message={message}
            conversations={conversations}
            messages={messages}
            selectedUserId={selectedUserId}
            sendMessage={sendMessage}
          />
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-500 dark:text-gray-400">
            Select a conversation
          </div>
        )}
      </div>
    </div>
  );
};

export default Message;
