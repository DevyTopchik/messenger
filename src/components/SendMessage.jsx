import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import "../assets/styles/SendMessage.css";
import { webSocketService } from "../api/wsservice";

const SendMessage = ({ setIsSent, chatId, u_id }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendCurrentMessage = () => {
    if (currentMessage.trim() !== "") {
      const obj = {
        userId: u_id,
        chatId: chatId,
        message: currentMessage,
        time: new Date(),
        isFrom: true,
      };

      webSocketService
        .sendMessage(obj)
        .then(() => {
          setIsSent(true);
          setCurrentMessage("");
        })
        .catch(console.error);
    }
  };

  return (
    <div className="send-message">
      <input
        type="text"
        value={currentMessage}
        onChange={(e) => setCurrentMessage(e.target.value)}
        placeholder="Введите сообщение"
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendCurrentMessage();
          }
        }}
      />
      <IoSend
        className="send"
        style={{ width: 30, height: 30 }}
        onClick={sendCurrentMessage}
      />
    </div>
  );
};

export default SendMessage;
