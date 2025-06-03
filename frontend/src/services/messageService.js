import API from "../axios";

// services/messageService.js

export const postMessage = async (data, multipart = false) => {
  if (multipart) {
    return await API.post("/inbox/message/", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  } else {
    return await API.post("/inbox/message/", data);
  }
};


  export const createConversation = async (receiverId) => {
   const res = await API.post("/inbox/conversation/", {
      receiverId,
    });
    return res.data;
  };

  export const getMessages = async (conversationId) => {
   const res = await API.get(`/inbox/messages/${conversationId}`);
    return res.data;
  };

  export const fetchAllConversations = async () => {
    const res = await API.get("/inbox/conversations/");
    return res.data;
  };