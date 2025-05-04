import { hashStringSHA256 } from "../funcs/hash";

export const changeUserName = (id, newUserName) => {
  return hashStringSHA256(id).then((data) => {
    if (data === localStorage.getItem("hash")) {
      return fetch("https://textchat-ast1.onrender.com/api/user/renameLogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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
    }
    localStorage.setItem("isLoginned", false);
  });
};
