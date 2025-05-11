import { hashStringSHA256 } from "../funcs/hash";

export const getUserData = (id) => {
  return hashStringSHA256(id).then((data) => {
    if (data === localStorage.getItem("hash")) {
      return fetch("https://textchat-ast1.onrender.com/api/user/getUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id,
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
