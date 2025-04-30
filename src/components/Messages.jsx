import React, { useEffect, useRef, useState } from "react";
import "../assets/styles/Messages.css";
import { deleteMessage } from "../api/delete_message";
import Message from "./Message";

const Messages = ({
  messages,
  isDeleteMode,
  isEditMode,
  setMessages,
  setIsEditMode,
  setSelectedIdsLen,
  setIsDeleteMode,
  chat,
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const [selectedMessagesIds, setSelectedMessagesIds] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSelectedMessagesIds([]);
  }, [chat]);

  useEffect(() => {
    setSelectedIdsLen(selectedMessagesIds.length);
  }, [selectedMessagesIds]);

  useEffect(() => {
    if (!isEditMode) {
      setEditIndex(-1);
    }
  }, [isEditMode]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {

      messages
        .filter((mes, index) => selectedMessagesIds.includes(index))
        .map(
          mes => {
            deleteMessage(mes.id)
              .then(data => {
                console.log(data)
              })
              .then(() => {
                setIsDeleteMode(false);
              })
          });
    }

    setSelectedMessagesIds([]);
  }, [isDeleteMode]);

  return (
    <div className="messages">
      {messages.map((el, index) => (
        <Message
          isDeleteMode={isDeleteMode}
          isEditMode={isEditMode}
          key={index}
          id={index}
          isFrom={el.isFrom}
          message={el.message}
          time={el.time}
          messages={messages}
          setMessages={setMessages}
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
