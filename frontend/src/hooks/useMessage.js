// hooks/useMessage.js

import React, { useEffect, useState } from 'react';
import { postMessage, getMessages, createConversation, fetchAllConversations } from '../services/messageService';
import socket from '../socket';

const useMessage = ({ receiverId }) => {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [conversations, setConversations] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  

  const getAllConversations = async () => {
    try {
      const response = await fetchAllConversations();
      setConversations(response);
    } catch (error) {
      console.error('Error fetching conversations:', error);
    }
  }
  const fetchMessages = async () => {
    if (!conversationId) return;
    try {
      const response = await getMessages(conversationId);
      setMessages(response);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };



  const sendMessage = async (file = null) => {
    if (!message.trim() && !file) return;
  
    try {
      let response;
  
      if (file) {
        const formData = new FormData();
        formData.append("receiverId", receiverId);
        formData.append("conversationId", conversationId);
        formData.append("message", message);
        formData.append("file", file);
  
        response = await postMessage(formData, true);
      } else {
        response = await postMessage({ conversationId, message, receiverId });
      }
  
      setMessages((prev) => [...prev, response.data]);
      setMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };
  
  

  useEffect(() => {
    const handleNewMessage = (newMessage) => {
      console.log('New message received:', newMessage);
      setMessages((prev) => [...prev, newMessage]);
    };
    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, []);
  useEffect(() => {
    const initializeConversation = async () => {
      try {
        const conversation = await createConversation(receiverId);
        setConversationId(conversation.conversationId);
        getAllConversations();

        // Optionally fetch existing messages
      } catch (error) {
        console.log('Error initializing conversation:', error);
      }
    };

    if (receiverId) {
      initializeConversation();
    } else {
      getAllConversations();
    }
  }, [receiverId]);

  useEffect(() => {
    setMessage('');
    setMessages([]);

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  return { message, setMessage, messages, conversations, setMessages, sendMessage };
};

export default useMessage;
