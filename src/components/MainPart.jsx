import React, { useState } from "react";
import "../assets/styles/MainPart.css";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import TopBar from "./TopBar";

const MainPart = ({ messages, setMessages, chatname, setIsLeftBarHidden }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIdsLen, setSelectedIdsLen] = useState(0);
  

  return (
    <div className="main-part">
      
      <TopBar
        chatname={chatname}
        setIsDeleteMode={setIsDeleteMode}
        setIsEditMode={setIsEditMode}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        selectedIdsLen={selectedIdsLen}
        setIsLeftBarHidden={setIsLeftBarHidden}
      />  

      <Messages
        messages={messages}
        setMessages={setMessages}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setSelectedIdsLen={setSelectedIdsLen}
        setIsDeleteMode={setIsDeleteMode}
        chatname={chatname}
      />

      <SendMessage setMessages={setMessages} messages={messages} />
    </div>
  );
};

export default MainPart;
