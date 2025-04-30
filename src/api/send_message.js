export const sendMessage = (obj) => {
  return fetch("https://textchat-ast1.onrender.com/api/message/addNewMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      ...obj,
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
