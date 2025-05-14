import React, { useEffect, useState } from "react";
import "../assets/styles/RightPart.css";
import Messages from "./Messages";
import SendMessage from "./SendMessage";
import TopBar from "./TopBar";
import { fetchMessages } from "../api/messages";
import { webSocketService } from "../api/wsservice";

const RightPart = ({
  chat,
  isSent,
  setIsSent,
  setMessPage,
  messPage,
  u_id,
}) => {
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedMessagesIds, setSelectedMessagesIds] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loadingMess, setLoadingMess] = useState(true);

  useEffect(() => {
    if (u_id) {
      webSocketService.connect(u_id);

      webSocketService.onPrivateMessage((newMessage) => {
        if (newMessage.chatId === chat?.chatId) {
          setMessages((prev) => [...prev, newMessage]);
          setIsSent(true);
        }
      });

      webSocketService.onMessageEdited((updatedMessage) => {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === updatedMessage.id ? updatedMessage : msg
          )
        );
      });

      webSocketService.onMessageDeleted(({ messageId }) => {
        setMessages((prev) => prev.filter((msg) => msg.id !== messageId));
      });

      return () => {
        webSocketService.disconnect();
      };
    }
  }, [u_id, chat?.chatId]);

  const fetchMessagesCompApi = () => {
    if (chat?.chatId) {
      setLoadingMess(true);
      fetchMessages(u_id, chat.chatId, messPage)
        .then((data) => {
          if (data.length) {
            // console.log(data);
            const formattedMessages = data
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

            setMessages((prev) =>
              messPage === 1
                ? formattedMessages
                : [...formattedMessages, ...prev]
            );
          } else if (messPage === 1) {
            setMessages([]);
          }
        })
        .catch(console.error)
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
        u_id={u_id}
      />

      <SendMessage chatId={chat?.chatId} setIsSent={setIsSent} u_id={u_id} />
    </div>
  );
};

export default RightPart;
