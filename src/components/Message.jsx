import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import "../assets/styles/Message.css";
import { editMessage } from "../api/edit_message";

const Message = ({
  chat,
  message,
  id,
  isDeleteMode,
  isEditMode,
  editIndex,
  setEditIndex,
  setIsEditMode,
  selectedMessagesIds,
  setSelectedMessagesIds,
}) => {
  const [newMessage, setNewMessage] = useState(message.message);
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [chat]);

  useEffect(() => {
    setNewMessage(message.message);
  }, [message]);

  useEffect(() => {
    if (!isClicked) {
      setIsEditMode(false);
    }
  }, [isClicked]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {
      setIsClicked(false);
    }
  }, [isDeleteMode]);

  useEffect(() => {
    if (!isEditMode) {
      setIsClicked(false);
    }
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !selectedMessagesIds || selectedMessagesIds.length !== 1)
      return;

    const selectedId = selectedMessagesIds[0].id;

    if (id !== selectedId) {
      setEditIndex(selectedId);
    }
  }, [isEditMode]);

  return (
    <div
      className={`wrapper ${!message.isFrom ? "to-wr" : "from-wr"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {message.isFrom && (isHover || isClicked) ? (
        <FaCheckCircle
          style={{
            width: 30,
            height: 30,
          }}
          color={!isClicked ? `white` : "pink"}
          onClick={() => {
            setSelectedMessagesIds((prevIds) => {
              if (isClicked) {
                return prevIds.filter((id_a) => id_a.id !== id);
              } else {
                return [...prevIds, { id: id, isFrom: message.isFrom }];
              }
            });
            setIsClicked(!isClicked);
          }}
        />
      ) : (
        ""
      )}

      <div className={`message-block ${!message.isFrom ? "to" : "from"}`}>
        {isEditMode && editIndex === id ? (
          <div className="input-block">
            <input
              className="edit-input"
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <MdModeEdit
              onClick={() => {
                editMessage(message.id, newMessage).then((data) => {
                  message.message = newMessage;
                  setIsEditMode(false);
                });
              }}
            />
          </div>
        ) : (
          <h3>{message.message}</h3>
        )}
        <p>{message.time}</p>
      </div>

      {!message.isFrom && (isHover || isClicked) ? (
        <FaCheckCircle
          style={{
            width: 30,
            height: 30,
          }}
          color={!isClicked ? `white` : "pink"}
          onClick={() => {
            setSelectedMessagesIds((prevIds) => {
              if (isClicked) {
                return prevIds.filter((id_a) => id_a.id !== id);
              } else {
                return [...prevIds, { id: id, isFrom: message.isFrom }];
              }
            });
            setIsClicked(!isClicked);
          }}
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default Message;
