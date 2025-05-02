import React, { useState } from "react";
import { IoSend } from "react-icons/io5";
import "../assets/styles/SendMessage.css";
import { sendMessage } from "../api/send_message";

const SendMessage = ({ setIsSent, chatId }) => {
  const [currentMessage, setCurrentMessage] = useState("");

  const sendCurrentMessage = () => {
    if (currentMessage !== "") {
      const obj = {
        userId: localStorage.getItem("u_id"),
        chatId: chatId,
        message: currentMessage,
        time: new Date(),
        isFrom: true,
      };

      // console.log(obj);

      sendMessage(obj)
        .then((data) => {
          console.log(data);
          setIsSent(true);
        })
        .catch((e) => console.log(e));
    }
    setCurrentMessage("");
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
        onClick={() => {
          sendCurrentMessage();
        }}
      />
    </div>
  );
};

export default SendMessage;
