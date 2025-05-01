import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/Messages.css";
import { deleteMessage } from "../api/delete_message";
import Message from "./Message";

const Messages = ({
  messages,
  isDeleteMode,
  isEditMode,
  setIsEditMode,
  selectedMessagesIds,
  setSelectedMessagesIds,
  setIsDeleteMode,
  chat,
  messPage,
  setMessPage,
  fetchMessagesCompApi,
  loading,
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const messagesEndRef = useRef(null);
  const messContainerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  useEffect(() => {
    const container = messContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0 && !loading && !isInitialLoad) {
        setMessPage((prev) => prev + 1);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loading, isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setIsInitialLoad(false);
    } else if (!isInitialLoad) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    setSelectedMessagesIds([]);
  }, [chat]);

  useEffect(() => {
    if (!isEditMode) {
      setEditIndex(-1);
      setSelectedMessagesIds([]);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isDeleteMode && !isEditMode) {
      fetchMessagesCompApi();
    }
  }, [isDeleteMode, isEditMode, messPage]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {
      messages
        .filter((mes, index) =>
          selectedMessagesIds.some((el) => el.id === index)
        )
        .forEach((mes) => {
          deleteMessage(mes.id).then(() => {
            setIsDeleteMode(false);
          });
        });

      setSelectedMessagesIds([]);
    }
  }, [isDeleteMode]);

  return (
    <div className="messages" ref={messContainerRef}>
      {messages.map((el, index) => (
        <Message
          isDeleteMode={isDeleteMode}
          isEditMode={isEditMode}
          key={index}
          id={index}
          message={el}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
          setIsEditMode={setIsEditMode}
          setSelectedMessagesIds={setSelectedMessagesIds}
          selectedMessagesIds={selectedMessagesIds}
          chat={chat}
        />
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default Messages;
