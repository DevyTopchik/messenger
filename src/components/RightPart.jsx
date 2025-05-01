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
  const [loading, setLoading] = useState(true);

  const fetchMessagesCompApi = () => {
    if (chat?.chatId) {
      setLoading(true);

      fetchMessages(u_id, chat.chatId, messPage)
        .then((data) => {
          console.log(data);
          if (data.length) {
            if (messPage === 1) {
              const messages = data.reverse();
              setMessages(messages);
            } else {
              const messages = data.reverse();
              setMessages((prevMess) => {
                return [...messages, ...prevMess];
              });
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
          setLoading(false);
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
        loading={loading}
      />

      <SendMessage chatId={chat?.chatId} setIsSent={setIsSent} />
    </div>
  );
};

export default MainPart;
