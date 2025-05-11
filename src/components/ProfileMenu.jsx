import React, { useEffect, useState } from "react";
import "../assets/styles/ProfileMenu.css";
import ThemeSwitcher from "./ThemeSwitcher";
import { changeUserName } from "../api/change_user_name";
import { getUserData } from "../api/get_user_data";

const ProfileMenu = ({ u_id, setIsLoginned }) => {
  const [isHover, setIsHover] = useState();
  const [userName, setUserName] = useState("Иван Иванов");
  const [iconUrl, setIconUrl] = useState(null);

  useEffect(() => {
    getUserData(u_id).then((data) => {
      console.log(data);
      setUserName(data.login);
      setIconUrl(data.iconUrl);
    });
  }, [u_id]);

  const handleNameChange = () => {
    const newName = prompt("Введите новое имя:", userName);
    if (newName !== null && newName.trim() !== "" && newName.length <= 21) {
      // console.log(u_id, newName);
      changeUserName(u_id, newName).then((data) => {
        console.log(data);
        setUserName(newName);
      });
    } else {
      alert("Вводенное имя некорректно");
    }
  };

  return (
    <div className="profile-menu" onClick={(e) => e.stopPropagation()}>
      <div className="top">
        <img
          src={iconUrl || require("../assets/images/images.png")}
          style={{
            opacity: !isHover ? 1 : 0.5,
            transition: "all 0.5s",
          }}
          className="current-user-icon-menu"
          onClick={() => document.getElementById("avatar-input").click()}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
        ></img>
        <input
          id="avatar-input"
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          onChange={(e) => {
            if (e.target.files[0]) {
              const reader = new FileReader();
              reader.onload = (event) => {
                console.log("Новое фото:", event.target.result);
              };
              reader.readAsDataURL(e.target.files[0]);
            }
          }}
        />
        <h4 className="user-name">{userName}</h4>
      </div>
      <div className="bottom">
        <button onClick={handleNameChange}>Сменить имя</button>
        <ThemeSwitcher />
        <button
          className="log-out"
          onClick={() => {
            setIsLoginned(false);
            localStorage.setItem("isLoginned", false);
            localStorage.removeItem("u_id");
          }}
        >
          Выйти
        </button>
      </div>
    </div>
  );
};

export default ProfileMenu;
