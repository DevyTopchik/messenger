import React from "react";
import "../assets/styles/Chat.css";
const Chat = ({ chat, id, setChatId, chatId, onClick }) => {
  return (
    <div
      className={`chat ${chatId === id ? "clicked" : ""}`}
      onClick={() => {
        setChatId(id);     
        onClick?.();       
      }}
    >
      <img
        src={
          chat.iconUrl ? chat.iconUrl : require("../assets/images/images.png")
        }
        className="user-icon"
      ></img>
      <p>{chat.chatname}</p>
    </div>
  );
};

export default Chat;
