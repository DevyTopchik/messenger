export const deleteMessage = (messageId) => {
  console.log(messageId);
  return fetch(
    `https://textchat-ast1.onrender.com/api/message/deleteMessage/${messageId}`,
    {
      method: "DELETE",
    }
  )
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
