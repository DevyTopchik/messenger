export const resetFetch = (formData) => {
  return fetch("https://textchat-lo2u.onrender.com/api/auth/update-password", {
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
