import React, { useEffect, useRef, useState } from "react";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import "../src/assets/styles/App.css";
import "./assets/styles/App.css";
import "./assets/styles/Transitions.css";
import LoginForm from "./components/LoginForm";
import Main from "./components/Main";
import RegistrationForm from "./components/RegistrationForm";
import ResetPasswordForm from "./components/ResetPasswordForm";
import { hashStringSHA256 } from "./funcs/hash";

function App() {
  const [isLoginned, setIsLoginned] = useState(false);
  const [u_id, setUid] = useState("");
  const [isRegPage, setIsRegPage] = useState(false);
  const [isResetPasswordPage, setIsResetPasswordPage] = useState(false);

  const loginRef = useRef(null);
  const registerRef = useRef(null);
  const resetRef = useRef(null);

  useEffect(() => {
    hashStringSHA256(localStorage.getItem("u_id")).then((data) => {
      if (data === localStorage.getItem("hash")) {
        setIsLoginned(localStorage.getItem("isLoginned") === "true");
        setUid(localStorage.getItem("u_id"));
      } else {
        localStorage.setItem("isLoginned", false);
      }
    });
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "purple";
    document.documentElement.setAttribute("data-theme", savedTheme);
  }, []);

  return (
    <div className="App">
      {isLoginned === false ? (
        <SwitchTransition mode="out-in">
          <CSSTransition
            key={
              isRegPage ? "register" : isResetPasswordPage ? "reset" : "login"
            }
            timeout={300}
            classNames="fade"
            nodeRef={
              isRegPage
                ? registerRef
                : isResetPasswordPage
                ? resetRef
                : loginRef
            }
          >
            <div
              ref={
                isRegPage
                  ? registerRef
                  : isResetPasswordPage
                  ? resetRef
                  : loginRef
              }
            >
              {isRegPage ? (
                <RegistrationForm setIsRegPage={setIsRegPage} />
              ) : isResetPasswordPage ? (
                <ResetPasswordForm
                  setIsResetPasswordPage={setIsResetPasswordPage}
                />
              ) : (
                <LoginForm
                  setIsLoginned={setIsLoginned}
                  setUid={setUid}
                  setIsRegPage={setIsRegPage}
                  setIsResetPasswordPage={setIsResetPasswordPage}
                />
              )}
            </div>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <Main u_id={u_id} setIsLoginned={setIsLoginned} />
      )}
    </div>
  );
}

export default App;
