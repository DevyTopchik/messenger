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
}) => {
  const [editIndex, setEditIndex] = useState(-1);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setSelectedMessagesIds([]);
  }, [chat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (!isEditMode) {
      setEditIndex(-1);
      setSelectedMessagesIds([]);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {
      messages
        .filter((mes, index) =>
          selectedMessagesIds.some((el) => el.id === index)
        )
        .forEach((mes) => {
          deleteMessage(mes.id)
            .then((data) => {
              console.log(data);
            })
            .then(() => {
              setIsDeleteMode(false);
            });
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
