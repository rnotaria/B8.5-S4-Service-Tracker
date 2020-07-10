import React, { useState, useContext } from "react";
import { auth, db } from "../../Firebase/firebase";
import styles from "./_AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";
import PageContainer from "./PageContainer";

export default function CreateAccount() {
  const dataContext = useContext(DataContext);
  const [email, emailInput] = useInput("", "Email", undefined, undefined, true);
  const [password, passwordInput] = useInput("", "Password", "password");
  const [confirmPassword, confirmPasswordInput] = useInput(
    "",
    "Confirm Password",
    "password"
  );
  const [error, setError] = useState(null);

  const handleCreateAccount = (e) => {
    e.preventDefault();

    if (password.localeCompare(confirmPassword) !== 0) {
      setError("Passwords do not match.");
    } else {
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
          setError(error.message);
        });
    }
  };

  return (
    <PageContainer title={"CREATE ACCOUNT"} error={error}>
      <form onSubmit={(e) => handleCreateAccount(e)}>
        <div className={styles.login_info}>
          {emailInput}
          {passwordInput}
          {confirmPasswordInput}
        </div>
        <div className={`${styles.options} ${styles.createAccount}`}>
          <button onSubmit={(e) => handleCreateAccount(e)}>
            Create Account
          </button>
        </div>
      </form>
    </PageContainer>
  );
}
