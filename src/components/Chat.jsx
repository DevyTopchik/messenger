import React from "react";
import "../assets/styles/Chat.css";
const Chat = ({ chat, id, setChatInd, chatInd }) => {
  return (
    <div
      className={`chat ${chatInd === id ? "clicked" : ""}`}
      onClick={() => {
        setChatInd(id);

        const left_bar = document.querySelector(".left-block");
        const right_part = document.querySelector(".main-part");

        left_bar.classList.toggle("not-active");
        right_part.classList.toggle("active");
      }}
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
