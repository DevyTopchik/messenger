export const fetchChats = (userId, page, chatName) => {
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
};
// https://textchat-ast1.onrender.com/api/chat/getChats
