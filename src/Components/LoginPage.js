import React from "react";
import styles from "../Styles/LoginPage.module.css";
import useInput from "../hooks/useInput";

export default function LoginPage() {
  const [email, emailInput] = useInput("", "Email");
  const [password, passwordInput] = useInput("", "Password");

  const handleLogin = () => {};

  const handleForgotPassword = () => {};

  const handleCreateAccount = () => {};

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
          <button>Login</button>
          <button>Forgot Password</button>
          <button>Create Account</button>
        </div>
      </div>
    </div>
  );
}
