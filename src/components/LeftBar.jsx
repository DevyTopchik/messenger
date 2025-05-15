import React, { useEffect, useState, useRef } from "react";
import "../assets/styles/LeftBar.css";
import Chat from "./Chat";
import Overlay from "./Overlay";
import { getUserData } from "../api/get_user_data";

const LeftBar = ({
  u_id,
  setChatInd,
  chats,
  chatInd,
  setIsLoginned,
  page,
  setPage,
  loadingChats,
  fetchChatsCompApi,
  setUid,
}) => {
  const [inputChatname, setInputChatname] = useState("");
  const [isOverlayOnn, setIsOverlayOnn] = useState(false);
  const chatsContainerRef = useRef(null);
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    fetchChatsCompApi(inputChatname);
    setPage(1);
  }, [inputChatname]);

  useEffect(() => {
    const container = chatsContainerRef.current;
    if (!container) return;

    let isLocked = false;

    const handleScroll = () => {
      const isBottom =
        container.scrollHeight - container.scrollTop <=
        container.clientHeight + 1;

      if (isBottom && !loadingChats && !isLocked) {
        isLocked = true;

        const prevScrollHeight = container.scrollHeight;
        console.log(page);
        setPage((prev) => prev + 1);
        container.scrollTop = prevScrollHeight;

        setTimeout(() => {
          isLocked = false;
        }, 100);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [loadingChats]);

  useEffect(() => {
    fetchChatsCompApi();
  }, [page]);

  useEffect(() => {
    getUserData(u_id).then((data) => {
      setUid(localStorage.getItem("u_id"));
      setIconUrl(data.iconUrl);
    });
  }, [u_id]);

  return (
    <div className="left-block">
      <Overlay
        u_id={u_id}
        isOverlayOnn={isOverlayOnn}
        setIsOverlayOnn={setIsOverlayOnn}
        setIsLoginned={setIsLoginned}
      />

      <div className="top-block">
        <img
          src={iconUrl || require("../assets/images/images.png")}
          className="current-user-icon"
          onClick={() => {
            setIsOverlayOnn((prevState) => !prevState);
          }}
        ></img>

        <input
          value={inputChatname}
          className="input-chat"
          placeholder="Название чата"
          onChange={(e) => {
            setInputChatname(e.target.value);
          }}
        ></input>
      </div>

      <div className="chats" ref={chatsContainerRef}>
        {chats
          .filter((el) =>
            el.otherUserLogin
              .toLowerCase()
              .includes(inputChatname.toLowerCase())
          )
          .map((el, index) => (
            <Chat
              chatInd={chatInd}
              setChatInd={setChatInd}
              key={index}
              id={index}
              chat={el}
            />
          ))}
      </div>
    </div>
  );
};

export default LeftBar;
