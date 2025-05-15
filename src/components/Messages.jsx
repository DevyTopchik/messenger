import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/Messages.css";
import Message from "./Message";
import { webSocketService } from "../api/wsservice";

const Messages = ({
  messages,
  setMessages,
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
  loadingMess,
  isSent,
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const messagesEndRef = useRef(null);
  const messContainerRef = useRef(null);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const deleteMessFunction = () => {
    selectedMessagesIds.forEach((selectedMsg) => {
      console.log(selectedMsg.id);
      webSocketService
        .deleteMessage(selectedMsg.id)
        .then(() => {
          setIsDeleteMode(false);
        })
        .catch(console.error);
    });

    setMessages(
      messages.filter(
        (mes, index) => !selectedMessagesIds.some((el) => el.id === mes.id)
      )
    );

    setSelectedMessagesIds([]);
  };

  useEffect(() => {
    const container = messContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      if (container.scrollTop === 0 && !loadingMess && !isInitialLoad) {
        setMessPage((prev) => prev + 1);
        container.scrollTop =
          container.scrollHeight - container.clientHeight * messPage;
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadingMess, isInitialLoad]);

  useEffect(() => {
    if (isInitialLoad && messages.length > 0) {
      messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
      setIsInitialLoad(false);
    } else if (!isInitialLoad && isSent) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isSent]);

  useEffect(() => {
    setSelectedMessagesIds([]);
    setIsInitialLoad(true);
  }, [chat]);

  useEffect(() => {
    if (!isEditMode) {
      setEditIndex(-1);
      setSelectedMessagesIds([]);
    }
  }, [isEditMode]);

  useEffect(() => {
    fetchMessagesCompApi();
  }, [messPage]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {
      deleteMessFunction();
    }
  }, [isDeleteMode]);

  return (
    <div className="messages" ref={messContainerRef}>
      {messages.map((el, index) => (
        <Message
          isDeleteMode={isDeleteMode}
          isEditMode={isEditMode}
          key={index}
          id={el.id}
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
