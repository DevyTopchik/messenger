import React, { useEffect, useState } from "react";
import "../assets/styles/Main.css";
import LeftBar from "./LeftBar";
import RightPart from "./RightPart";
import { fetchChats } from "../api/chats";

const Main = ({ u_id, setIsLoginned }) => {
  const [chats, setChats] = useState([]);
  const [chatInd, setChatInd] = useState();

  const [page, setPage] = useState(1);
  const [messPage, setMessPage] = useState(1);

  const [isSent, setIsSent] = useState(false);

  const fetchChatsCompApi = (chatName = "") => {
    fetchChats(u_id, page, chatName)
      .then((data) => {
        const { chats: chats_temp } = data;
        // console.log(chats_temp)
        setChatInd(0);
        setChats(chats_temp);
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    fetchChatsCompApi();
  }, [u_id]);

  return (
    <div className="main">
      <LeftBar
        setChatInd={setChatInd}
        chats={chats}
        chatInd={chatInd}
        setIsLoginned={setIsLoginned}
        setPage={setPage}
        page={page}
        fetchChatsCompApi={fetchChatsCompApi}
      />

      <RightPart
        u_id={u_id}
        chat={chats[chatInd]}
        isSent={isSent}
        setIsSent={setIsSent}
        messPage={messPage}
        setMessPage={setMessPage}
      />
    </div>
  );
};

export default Main;
