import React from "react";
import "../assets/styles/Chat.css";
const Chat = ({ chat, id, setChatInd, chatInd }) => {
  return (
    <div
      className={`chat ${chatInd === id ? "clicked" : ""}`}
      onClick={() => setChatInd(id)}
    >
      <img
        src={
          chat.photoUrl ? chat.photoUrl : require("../assets/images/images.png")
        }
        className="user-icon"
      ></img>
      <p>{chat.otherUserLogin}</p>
    </div>
  );
};

export default Chat;
