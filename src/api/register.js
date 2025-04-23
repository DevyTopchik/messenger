export const registerFetch = (formData) => {
  return fetch("https://textchat-ast1.onrender.com/api/auth/register", {
    method: "POST",
    body: formData,
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
