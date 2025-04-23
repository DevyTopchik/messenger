import React from "react";
import { FaArrowCircleLeft } from "react-icons/fa";
import "../assets/styles/RegistrationAndResetForms.css";
import { registerFetch } from "../api/register";

const RegistrationForm = ({ setIsRegPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    // const data = Object.fromEntries(formData.entries());
    // console.log("Данные формы:", data);
    registerFetch(formData)
      .then(data => {
        if (data) {
          console.log(data)
          alert("Успех!");
          setIsRegPage(false);
          e.target.reset();

        }
      })
  };

  return (
    <div className="reg-form">
      <h2>Регистрация</h2>
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
          setIsRegPage(false);
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

        <label htmlFor="imageInput" className="label-for-image">
          Выберите аватар
        </label>
        <input type="file" id="imageInput" name="image" accept="image/*" />

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
