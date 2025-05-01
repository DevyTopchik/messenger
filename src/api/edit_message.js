export const editMessage = (messageId, message) => {
  return fetch("https://textchat-ast1.onrender.com/api/message/editMessage", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messageId: messageId,
      message: message,
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
