export const logInFetch = (formData) => {
  const credentials = Object.fromEntries(formData.entries());
  console.log(JSON.stringify(credentials));
  return fetch("https://textchat-ast1.onrender.com/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
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
