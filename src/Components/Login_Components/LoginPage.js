import React, { useContext } from "react";
import styles from "../../Styles/Login_styles/LoginPage.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";

export default function LoginPage() {
  const [email, emailInput] = useInput("", "Email");
  const [password, passwordInput] = useInput("", "Password");
  const dataContext = useContext(DataContext);

  const handleLogin = () => {
    alert("Login system is under construction. Please select Guest");
  };

  const handleGuest = () => {
    dataContext.dispatch({
      type: "setLogin",
      value: { user: "guest", isNew: true },
    });
  };

  const handleForgotPassword = () => {
    alert("Login system is under construction. Please select Guest");
  };

  const handleCreateAccount = () => {
    alert("Login system is under construction. Please select Guest");
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>LOGIN</h3>
        </div>
        <div className={styles.login_info}>
          {emailInput}
          {passwordInput}
        </div>
        <div className={styles.options}>
          <button onClick={() => handleLogin()}>Login</button>
          <button onClick={() => handleGuest()}>Guest</button>
          <button onClick={() => handleForgotPassword()}>
            Forgot Password
          </button>
          <button onClick={() => handleCreateAccount()}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
