import { refreshToken } from "./refresh";

export const fetchChats = (userId, page, chatName) => {
  return fetch("https://textchat-lo2u.onrender.com/api/chat/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },

    body: JSON.stringify({
      page: page,
      chatName: chatName,
    }),
  })
    .then((response) => {
      if (response.status === 403) {
        return refreshToken()
          .then((newToken) => {
            console.log(newToken);
            localStorage.setItem("u_id", newToken);

            return fetch("https://textchat-lo2u.onrender.com/api/chat/search", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify({
                page: page,
                chatName: chatName,
              }),
            });
          })
          .then((refreshedResponse) => {
            if (!refreshedResponse.ok) {
              return refreshedResponse
                .json()
                .then((err) => Promise.reject(err));
            }
            return refreshedResponse.json();
          });
      }
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .catch((e) => {
      console.error(e);
      return Promise.reject(e);
    });
};
// https://textchat-ast1.onrender.com/api/chat/getChats
