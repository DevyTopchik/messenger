import React, { useEffect, useState } from "react";
import "../assets/styles/MainPart.css";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import TopBar from "./TopBar";
import { fetchMessages } from "../api/messages";

const MainPart = ({
  messages,
  setMessages,
  chat,
  isSent,
  setIsSent,
  setNumber,
  number,
  setIsLoaded,
  u_id,
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMessagesIds, setSelectedMessagesIds] = useState([]);

  useEffect(() => {
    if (isSent === true) {
      setNumber(1);
      setIsSent(false);
    }
  }, [isSent]);

  useEffect(() => {
    if (!isDeleteMode && !isEditMode) {
      if (chat.chatId) {
        fetchMessages(u_id, chat.chatId, number)
          .then((data) => {
            // console.log(data);
            const messages = data;
            setMessages(messages.reverse());
            setIsLoaded(true);
          })
          .catch((e) => console.log(e));
      }
    }
  }, [isDeleteMode, isEditMode]);

  return (
    <div className="main-part">
      <TopBar
        chatname={chat?.otherUserLogin || ""}
        setIsDeleteMode={setIsDeleteMode}
        setIsEditMode={setIsEditMode}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        selectedMessagesIds={selectedMessagesIds}
      />

      <Messages
        messages={messages}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteMode={setIsDeleteMode}
        selectedMessagesIds={selectedMessagesIds}
        setSelectedMessagesIds={setSelectedMessagesIds}
        chat={chat}
      />

      <SendMessage chatId={chat?.chatId} setIsSent={setIsSent} />
    </div>
  );
};

export default MainPart;
