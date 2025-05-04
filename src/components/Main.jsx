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
  const [loadingChats, setLoadingChats] = useState(true);

  const fetchChatsCompApi = (chatName = "") => {
    setLoadingChats(true);

    fetchChats(u_id, page, chatName)
      .then((data) => {
        if (data.chats.length) {
          if (page === 1) {
            const { chats: chats_temp } = data;
            console.log(chats_temp);
            setChats(chats_temp);
          } else {
            const { chats: chats_temp } = data;
            console.log(chats_temp);
            setChats((prev_chats) => [...prev_chats, ...chats_temp]);
          }

          // setChatInd(0);
        }
      })
      .catch((e) => console.log(e))
      .finally(() => setLoadingChats(false));
  };

  useEffect(() => {
    fetchChatsCompApi();
  }, [u_id]);

  return (
    <div className="main">
      <LeftBar
        u_id={u_id}
        setChatInd={setChatInd}
        chats={chats}
        chatInd={chatInd}
        setIsLoginned={setIsLoginned}
        setPage={setPage}
        page={page}
        fetchChatsCompApi={fetchChatsCompApi}
        loadingChats={loadingChats}
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
