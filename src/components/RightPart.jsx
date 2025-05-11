import React, { useEffect, useState } from "react";
import "../assets/styles/RightPart.css";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import TopBar from "./TopBar";
import { fetchMessages } from "../api/messages";

const MainPart = ({ chat, isSent, setIsSent, setMessPage, messPage, u_id }) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMessagesIds, setSelectedMessagesIds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMess, setLoadingMess] = useState(true);

  const fetchMessagesCompApi = () => {
    if (chat?.chatId) {
      setLoadingMess(true);

      fetchMessages(u_id, chat.chatId, messPage)
        .then((data) => {
          console.log(data);
          if (data.length) {
            const messages = data
              .map((obj) => {
                const date = new Date(obj.time);
                const day = String(date.getDate()).padStart(2, "0");
                const month = String(date.getMonth() + 1).padStart(2, "0");
                const hours = String(date.getHours()).padStart(2, "0");
                const minutes = String(date.getMinutes()).padStart(2, "0");

                return {
                  ...obj,
                  time: `${day}.${month} ${hours}:${minutes}`,
                };
              })
              .reverse();

            if (messPage === 1) {
              setMessages(messages);
            } else {
              setMessages((prevMess) => [...messages, ...prevMess]);
            }
          } else {
            if (messPage === 1) {
              setMessages(data);
            }
          }
        })
        .catch((e) => console.log(e))
        .finally(() => {
          setSelectedMessagesIds([]);
          setLoadingMess(false);
        });
    }
  };

  useEffect(() => {
    if (isSent) {
      setMessPage(1);
      setIsSent(false);
    }
  }, [isSent]);

  useEffect(() => {
    fetchMessagesCompApi();
    setMessPage(1);
  }, [chat, isSent]);

  return (
    <div className="main-part">
      <TopBar
        chatname={chat?.otherUserLogin}
        setIsDeleteMode={setIsDeleteMode}
        setIsEditMode={setIsEditMode}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        selectedMessagesIds={selectedMessagesIds}
      />

      <Messages
        isSent={isSent}
        messages={messages}
        setMessages={setMessages}
        isDeleteMode={isDeleteMode}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        setIsDeleteMode={setIsDeleteMode}
        selectedMessagesIds={selectedMessagesIds}
        setSelectedMessagesIds={setSelectedMessagesIds}
        chat={chat}
        setMessPage={setMessPage}
        messPage={messPage}
        fetchMessagesCompApi={fetchMessagesCompApi}
        loadingMess={loadingMess}
      />

      <SendMessage chatId={chat?.chatId} setIsSent={setIsSent} />
    </div>
  );
};

export default MainPart;
