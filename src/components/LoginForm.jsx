import React from "react";
import "../assets/styles/LoginForm.css";
import { logInFetch } from "../api/log_in";

const LoginForm = ({
  setIsLoginned,
  setUid,
  setIsRegPage,
  setIsResetPasswordPage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    logInFetch(formData)
      .then((data) => {
        setIsLoginned(true);

        console.log(data);
        localStorage.setItem("isLoginned", true);
        localStorage.setItem("u_id", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);
        setUid(data.accessToken);
      })
      .catch((e) => alert(e.message));

    e.target.reset();
  };

  return (
    <div className="beginner-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Логин"
          name="login"
          required
          autoComplete="onn"
        ></input>
        <input
          type="password"
          placeholder="Пароль"
          name="password"
          required
          autoComplete="onn"
        ></input>

        <button type="submit">Войти</button>
      </form>

      <div className="underForm">
        <h5 onClick={() => setIsRegPage(true)}>Регистрация</h5>
        <h5 onClick={() => setIsResetPasswordPage(true)}>Забыли пароль?</h5>
      </div>
    </div>
  );
};

export default LoginForm;
