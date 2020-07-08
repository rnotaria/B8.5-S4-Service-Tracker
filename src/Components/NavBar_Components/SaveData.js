import React, { useState, useContext } from "react";
import { db } from "../../Firebase/firebase";
import styles from "./_NavBarStyles.module.css";
import { FaRegSave } from "react-icons/fa";
import { DataContext } from "../../Contexts/DataContext";

export default function SaveData() {
  const dataContext = useContext(DataContext);
  const [status, setStatus] = useState(null);

  const handleSave = () => {
    const user = dataContext.state.container.user;
    if (user !== "guest") {
      setStatus("saving");
      db.collection("users")
        .doc(user)
        .update({
          data: dataContext.state.data,
        })
        .then(() => {
          setStatus("saved");
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };

  return (
    <FaRegSave
      className={
        status === "saving"
          ? styles.saving
          : status === "saved"
          ? styles.saved
          : styles.saveIcon
      }
      onClick={() => {
        handleSave();
      }}
    />
  );
}
