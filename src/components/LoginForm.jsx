import React, { useState } from "react";
import "../assets/styles/LoginForm.css";

const LoginForm = ({
  setIsLoginned,
  setId,
  setIsRegPage,
  setIsResetPasswordPage,
}) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(login, password);
    e.target.reset();

    if (login === "devytopchik" && password === '1') {
      console.log(login);
      console.log(password);

      setIsLoginned(true);
      localStorage.setItem("isLoginned", true);

      setId(0);
    }

    setLogin("");
    setPassword("");
  };

  return (
    <div className="beginner-form">
      <h2>Вход</h2>
      <form onSubmit={handleSubmit}>
        <input
          value={login}
          type="text"
          placeholder="Логин"
          onChange={(e) => setLogin(e.target.value)}
          required
          autoComplete="onn"
        ></input>
        <input
          value={password}
          type="password"
          placeholder="Пароль"
          onChange={(e) => setPassword(e.target.value)}
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
