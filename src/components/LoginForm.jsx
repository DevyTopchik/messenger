import React from "react";
import "../assets/styles/LoginForm.css";
import { logInFetch } from "../api/log_in";
import { hashStringSHA256 } from "../funcs/hash";

const LoginForm = ({
  setIsLoginned,
  setUid,
  setIsRegPage,
  setIsResetPasswordPage,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    console.log(Object.fromEntries(formData.entries()));

    logInFetch(formData)
      .then((id) => {
        console.log(id);
        setIsLoginned(true);
        localStorage.setItem("isLoginned", true);
        localStorage.setItem("u_id", id);
        hashStringSHA256(id).then((data) => localStorage.setItem("hash", data));
        setUid(id);
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
