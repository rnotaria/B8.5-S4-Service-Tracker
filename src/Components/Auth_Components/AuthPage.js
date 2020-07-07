import React, { useState, useContext } from "react";
import { auth, db } from "../../Firebase/firebase";
import styles from "./_AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";

function AuthPageLayout({ title, children }) {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
    </div>
  );
}

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
      dataContext.dispatch({ type: "setStatus", value: "creatingUser" });
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((cred) => {
          // Create user doc
          console.log("Creating User");
          db.collection("users")
            .doc(cred.user.uid)
            .set({
              user: cred.user.uid,
            })
            .then(() => {
              console.log("User Created");
              dataContext.dispatch({ type: "setStatus", value: null });
              dataContext.dispatch({
                type: "setCreateAccount",
                value: cred.user.uid,
              });
            });
        })
        .catch((error) => {
          console.log("Error: ", error.message);
        });
    }
  };

  return (
    <AuthPageLayout title={"CREATE ACCOUNT"}>
      <div className={styles.login_info}>
        {emailInput}
        {passwordInput}
        {confirmPasswordInput}
      </div>
      <div className={`${styles.options} ${styles.createAccount}`}>
        <button onClick={() => handleCreateAccount()}>Create Account</button>
      </div>
    </AuthPageLayout>
  );
}

export default function AuthPage() {
  const dataContext = useContext(DataContext);
  const [display, setDisplay] = useState("login");
  const [email, emailInput] = useInput("", "Email");
  const [password, passwordInput] = useInput("", "Password", "password");

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
      });
  };

  const handleGuest = () => {
    dataContext.dispatch({
      type: "setGuest",
    });
  };

  const handleForgotPassword = () => {
    alert("This option is not currently available.");
  };

  if (display === "create") {
    return <CreateAccount />;
  }

  return (
    <AuthPageLayout title={"LOGIN"}>
      <form onSubmit={(e) => handleLogin(e)}>
        <div className={styles.login_info}>
          {emailInput}
          {passwordInput}
        </div>
        <div className={styles.options}>
          <button type="submit">Login</button>
          <button onClick={() => handleGuest()}>Guest</button>
          <button onClick={() => handleForgotPassword()}>
            Forgot Password
          </button>
          <button onClick={() => setDisplay("create")}>Create Account</button>
        </div>
      </form>
    </AuthPageLayout>
  );
}
