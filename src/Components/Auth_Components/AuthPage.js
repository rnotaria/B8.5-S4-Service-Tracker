import React, { useState, useContext } from "react";
import { auth, db } from "../../Firebase/firebase";
import styles from "./styles.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";

function CreateAccount() {
  const dataContext = useContext(DataContext);
  const [email, emailInput] = useInput("", "Email");
  const [password, passwordInput] = useInput("", "Password", "password");
  const [confirmPassword, confirmPasswordInput] = useInput(
    "",
    "Confirm Password",
    "password"
  );

  const handleCreateAccount = () => {
    if (password.localeCompare(confirmPassword) === 0) {
      auth.createUserWithEmailAndPassword(email, password).then((cred) => {
        // Create user doc
        db.collection("users")
          .doc(cred.user.uid)
          .set({
            user: cred.user.uid,
          })
          .then(() => {
            dataContext.dispatch({
              type: "setCreateAccount",
              value: cred.user.uid,
            });
          });
        console.log(cred.user.uid);
      });
    }
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>CREATE ACCOUNT</h3>
        </div>
        <div className={styles.login_info}>
          {emailInput}
          {passwordInput}
          {confirmPasswordInput}
        </div>
        <div className={`${styles.options} ${styles.createAccount}`}>
          <button onClick={() => handleCreateAccount()}>Create Account</button>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  const dataContext = useContext(DataContext);
  const [display, setDisplay] = useState("login");
  const [email, emailInput] = useInput("", "Email");
  const [password, passwordInput] = useInput("", "Password", "password");

  const handleLogin = () => {
    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      dataContext.dispatch({
        type: "setUser",
        value: cred.user.uid,
      });
      db.collection("users")
        .doc(cred.user.uid)
        .get()
        .then((doc) => {
          console.log(doc.data());
        });
    });
  };

  const handleGuest = () => {
    dataContext.dispatch({
      type: "setGuest",
    });
  };

  const handleForgotPassword = () => {
    alert("Login system is under construction. Please select Guest");
  };

  if (display === "create") {
    return <CreateAccount />;
  }

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
          <button onClick={() => setDisplay("create")}>Create Account</button>
        </div>
      </div>
    </div>
  );
}
