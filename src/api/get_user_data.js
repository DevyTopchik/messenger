import { refreshToken } from "./refresh";

export const getUserData = (id) => {
  return fetch("https://textchat-lo2u.onrender.com/api/user/getUser", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${id}`,
    },
  })
    .then((response) => {
      if (response.status === 403) {
        return refreshToken()
          .then((newToken) => {
            console.log(newToken);
            localStorage.setItem("u_id", newToken);

            return fetch("https://textchat-lo2u.onrender.com/api/user/getUser", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              }
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
      console.log(e);
      return Promise.reject(e);
    });
};
