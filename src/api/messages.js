import { refreshToken } from "./refresh";

export const fetchMessages = (userId, chatId, number) => {
  return fetch("https://textchat-lo2u.onrender.com/api/message/getMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${userId}`,
    },
    body: JSON.stringify({
      chatId: chatId,
      number: number,
    }),
  })
    .then((response) => {

      if (response.status === 403) {
        return refreshToken()
          .then((newToken) => {
            console.log(newToken);
            localStorage.setItem("u_id", newToken);

            return fetch("https://textchat-lo2u.onrender.com/api/message/getMessage", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
              body: JSON.stringify({
                chatId: chatId,
                number: number,
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
