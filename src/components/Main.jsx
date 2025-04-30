import React, { useEffect, useState } from "react";
import "../assets/styles/Main.css";
import LeftBar from "./LeftBar";
import MainPart from "./MainPart";
import { fetchChats } from "../api/chats";
import { fetchMessages } from "../api/messages";

const step = 10;

const Main = ({ u_id, setIsLoginned }) => {
  const [chats, setChats] = useState([]);
  const [messages, setMessages] = useState([]);
  const [chatInd, setChatInd] = useState();

  const [page, setPage] = useState(1)
  const [number, setNumber] = useState(1)

  const [isLoaded, setIsLoaded] = useState(false)
  const [isSent, setIsSent] = useState(false)


  useEffect(() => {
    fetchChats(u_id, page)
      .then(data => {
        const { chats: chats_temp } = data
        // console.log(chats_temp)
        setChatInd(0);
        setChats(chats_temp);
      })
      .catch(e => console.log(e))
  }, [u_id]);

  useEffect(() => {
    if (chats[chatInd]?.chatId) {
      fetchMessages(u_id, chats[chatInd].chatId, number)
        .then(data => {
          // console.log(data)
          const messages = data;
          setMessages(messages.reverse());
          setIsLoaded(true)
        })
        .catch(e => console.log(e))
    }
  }, [chatInd, isSent]);

  useEffect(() => {
    if (chats.length > 0 && chatInd >= 0 && chatInd < chats.length) {
      const updatedChats = chats.map((chat, index) =>
        index === chatInd ? { ...chat, messages: messages } : chat
      );
      setChats(updatedChats);
    }
  }, [messages]);

  return (
    <div className="main">
      <LeftBar
        setChatInd={setChatInd}
        chats={chats}
        chatInd={chatInd}
        setIsLoginned={setIsLoginned}
      />
      {isLoaded && <MainPart
        u_id={u_id}
        messages={messages}
        setMessages={setMessages}
        chat={chats[chatInd]}
        isSent={isSent}
        setIsSent={setIsSent}
        number={number}
        setNumber={setNumber}
        setIsLoaded={setIsLoaded}
      />}
    </div>
  );
};

export default Main;
