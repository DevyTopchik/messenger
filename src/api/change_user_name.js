export const changeUserName = (id, newUserName) => {
  return fetch("https://textchat-ast1.onrender.com/api/user/renameLogin", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${id}`,
    },
    body: JSON.stringify({
      newUserName: newUserName,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((err) => Promise.reject(err));
      }
      return response.json();
    })
    .catch((e) => {
      console.log(e);
      return Promise.reject(e);
    });
};
