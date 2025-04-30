import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import "../assets/styles/RegistrationAndResetForms.css";
import { resetFetch } from "../api/reset_password";

const ResetPasswordForm = ({ setIsResetPasswordPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    resetFetch(formData)
      .then(data => {
        if (data) {
          console.log(data)
          alert("Успех!");
          setIsResetPasswordPage(false);
          e.target.reset();
        }
      })
      .catch(e => alert(e.message))
  };

  return (
    <div className="reset-form">
      <h2>Смена пароля</h2>
      <FaArrowCircleLeft
        style={{
          position: "absolute",
          top: 1,
          left: 1,
          color: "#ffff",
          width: 35,
          height: "auto",
        }}
        onClick={() => {
          setIsResetPasswordPage(false);
        }}
      />
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Введите логин" name="login" required />
        <input
          type="password"
          placeholder="Введите пароль"
          name="password"
          required
        />
        <input
          type="password"
          placeholder="Повторите пароль"
          name="confirmPassword"
          required
        />

        <button type="submit">Сменить пароль</button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
