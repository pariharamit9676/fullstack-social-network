import React, { useState, useEffect, useRef } from "react";
import moment from "moment";
import { FiPhoneCall, FiVideo } from "react-icons/fi";
import { IoCheckmarkDoneOutline, IoCheckmarkOutline } from "react-icons/io5";
import { FaImage, FaPaperPlane, FaTimes } from "react-icons/fa";

const ChatArea = ({
  currentUser,
  setMessage,
  message,
  messages,
  conversations,
  selectedUserId,
  isTyping = false,
  sendMessage,
  goBack,
}) => {
  const selectedUser = conversations.find((u) => u.userId === +selectedUserId);
  const [visibleTimeId, setVisibleTimeId] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef();

  const filePreview =
    file && file.type.startsWith("image/")
      ? URL.createObjectURL(file)
      : file?.name;

  useEffect(() => {
    const chatContainer = document.getElementById("chat-container");
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (file) {
      await sendMessage(file);
      setFile(null);
    } else {
      await sendMessage();
    }
  };

  return (
    <div className="w-full h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between bg-white dark:bg-gray-900 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={goBack} className="md:hidden text-blue-600 text-xl">
            ⬅️
          </button>

          <img
            src={`/uploads/${selectedUser?.profilePic}`}
            alt={selectedUser?.name}
            className="w-10 h-10 rounded-full object-cover border border-gray-300 dark:border-gray-700"
          />

          <div>
            <h3 className="text-base font-semibold text-gray-800 dark:text-white">
              {selectedUser?.name}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              @{selectedUser?.username}
            </p>
          </div>
        </div>

        <div className="flex space-x-3 text-xl text-blue-600">
          <FiPhoneCall className="cursor-pointer hover:text-blue-800 transition duration-150" />
          <FiVideo className="cursor-pointer hover:text-blue-800 transition duration-150" />
        </div>
      </div>

      {/* Messages */}
      <div
        id="chat-container"
        className="flex-1 min-h-0 p-4 overflow-y-auto space-y-3 bg-gray-50 dark:bg-gray-900"
      >
        {(messages || []).map((msg) => (
          <div
            key={msg.id}
            className={`flex flex-col ${
              msg.senderId === currentUser.id ? "items-end" : "items-start"
            }`}
          >
            <div
              onClick={() =>
                setVisibleTimeId(visibleTimeId === msg.id ? null : msg.id)
              }
              className={`cursor-pointer relative max-w-[85%] sm:max-w-[70%] px-4 py-2 rounded-xl shadow text-sm break-words ${
                msg.senderId === currentUser.id
                  ? "bg-blue-600 text-white rounded-br-none"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white rounded-bl-none"
              }`}
            >
              <div className="space-y-2">
                {msg.message && <div>{msg.message}</div>}
                {msg.filePath &&
                  (msg.filePath.match(/\.(jpg|jpeg|png|webp)$/i) ? (
                    <img
                      src={`/uploads/${msg.filePath}`}
                      alt="sent-img"
                      className="max-w-xs rounded"
                    />
                  ) : (
                    <span className="text-xs text-gray-600 italic">
                      File sent
                    </span>
                  ))}
              </div>

              {msg.senderId === currentUser.id && (
                <span className="absolute -bottom-0 right-1 text-xs text-black-400 flex items-center gap-1">
                  {msg.seen ? (
                    <IoCheckmarkDoneOutline />
                  ) : (
                    <IoCheckmarkOutline />
                  )}
                </span>
              )}
            </div>

            {visibleTimeId === msg.id && (
              <div className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                {moment(msg.createdAt).format("hh:mm A")}
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="text-sm italic text-gray-500 dark:text-gray-400 px-2">
            Typing...
          </div>
        )}
      </div>

      {/* Input Area */}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="p-3 border-t bg-white dark:bg-gray-800 flex flex-col gap-2"
      >
        {file && (
          <div className="relative w-fit">
            {file.type.startsWith("image/") ? (
              <img
                src={filePreview}
                alt="preview"
                className="h-20 w-20 object-cover rounded-lg"
              />
            ) : (
              <p className="text-sm text-gray-700 dark:text-gray-300">
                {file.name}
              </p>
            )}
            <button
              type="button"
              onClick={() => setFile(null)}
              className="absolute -top-2 -right-2 bg-white text-red-600 p-1 rounded-full shadow"
            >
              <FaTimes size={12} />
            </button>
          </div>
        )}

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => fileInputRef.current.click()}
            className="text-blue-600 hover:text-blue-800 text-xl"
          >
            <FaImage />
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setFile(e.target.files[0])}
          />

          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Message..."
            className="flex-1 px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white border"
          />

          <button
            type="submit"
            onClick={handleSend}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full"
          >
            <FaPaperPlane />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatArea;
