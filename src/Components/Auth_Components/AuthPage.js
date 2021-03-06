import React, { useState, useContext } from "react";
import { auth, db } from "../../Firebase/firebase";
import styles from "./_AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";
import PageContainer from "./PageContainer";
import CreateAccount from "./CreateAccount";

export default function AuthPage() {
  const dataContext = useContext(DataContext);
  const [display, setDisplay] = useState("login");
  const [email, emailInput] = useInput("", "Email", undefined, undefined, true);
  const [password, passwordInput] = useInput("", "Password", "password");
  const [error, setError] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then((cred) => {
        dataContext.dispatch({
          type: "setUser",
          value: cred.user.uid,
        });
        db.collection("users")
          .doc(cred.user.uid)
          .get()
          .then((doc) => {});
      })
      .catch((error) => {
        console.log(error);
        setError(error.message);
      });
  };

  const handleGuest = () => {
    dataContext.dispatch({
      type: "setGuest",
    });
  };

  const handleForgotPassword = () => {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setError(
          "An email was sent with instructions on resetting your password."
        );
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  if (display === "create") {
    return <CreateAccount />;
  }

  return (
    <PageContainer title={"LOGIN"} error={error}>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className={styles.login_info}>
          {emailInput}
          {passwordInput}
        </div>
        <div className={styles.options}>
          <button onSubmit={(e) => handleLogin(e)}>Login</button>
          <button type="button" onClick={() => handleGuest()}>
            Guest
          </button>
          <button type="button" onClick={() => handleForgotPassword()}>
            Forgot Password
          </button>
          <button type="button" onClick={() => setDisplay("create")}>
            Create Account
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
