import { hashStringSHA256 } from "../funcs/hash";

export const fetchChats = (userId, page, chatName) => {
  return hashStringSHA256(userId).then((data) => {
    if (data === localStorage.getItem("hash")) {
      return fetch("https://textchat-ast1.onrender.com/api/chat/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: userId,
          page: page,
          chatName: chatName,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => Promise.reject(err));
          }
          return response.json();
        })
        .catch((e) => {
          console.error(e);
          return Promise.reject(e);
        });
    }

    localStorage.setItem("isLoginned", false);
  });
};
// https://textchat-ast1.onrender.com/api/chat/getChats
