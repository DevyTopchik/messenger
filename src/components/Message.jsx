import React, { useEffect, useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { MdModeEdit } from "react-icons/md";
import "../assets/styles/Message.css";

const Message = ({
  isFrom,
  message,
  messages,
  setMessages,
  time,
  isDeleteMode,
  isEditMode,
  id,
  setEditIndex,
  editIndex,
  setIsEditMode,
  setSelectedMessagesIds,
  selectedMessagesIds,
  chat,
}) => {
  const [newMessage, setNewMessage] = useState(message);
  const [isHover, setIsHover] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  useEffect(() => {
    setIsClicked(false);
  }, [chat]);

  useEffect(() => {
    if (isDeleteMode && selectedMessagesIds.length > 0) {
      setIsClicked(false);
    }
  }, [isDeleteMode]);

  useEffect(() => {
    if (!isEditMode || !selectedMessagesIds || selectedMessagesIds.length !== 1)
      return;

    const [selectedId] = selectedMessagesIds;

    if (id !== selectedId) {
      setEditIndex(selectedId);
    }
  }, [isEditMode]);

  return (
    <div
      className={`wrapper ${!isFrom ? "to-wr" : "from-wr"}`}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      {isFrom && (isHover || isClicked) ? (
        <FaCheckCircle
          style={{
            width: 30,
            height: 30,
          }}
          color={!isClicked ? `white` : "pink"}
          onClick={() => {
            setSelectedMessagesIds((prevIds) => {
              if (isClicked) {
                return prevIds.filter((id_a) => id_a !== id);
              } else {
                return [...prevIds, id];
              }
            });
            setIsClicked(!isClicked);
          }}
        />
      ) : (
        ""
      )}

      <div className={`message-block ${!isFrom ? "to" : "from"}`}>
        {/* {console.log(editIndex)} */}
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
                setIsEditMode(false);
                setMessages(
                  messages.map((message, index) =>
                    index === id ? { ...message, message: newMessage } : message
                  )
                );
              }}
            />
          </div>
        ) : (
          <h3>{message}</h3>
        )}
        <p>{time}</p>
      </div>

      {!isFrom && (isHover || isClicked) ? (
        <FaCheckCircle
          style={{
            width: 30,
            height: 30,
          }}
          color={!isClicked ? `white` : "pink"}
          onClick={() => {
            setSelectedMessagesIds((prevIds) => {
              if (isClicked) {
                return prevIds.filter((id_a) => id_a !== id);
              } else {
                return [...prevIds, id];
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
