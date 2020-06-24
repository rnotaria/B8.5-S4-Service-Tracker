import React from "react";
import styles from "../../Styles/addDeleteTaskButtons.module.css";

export default function DeleteTaskButton({ toggleDeleteTask, deleteTask }) {
  return (
    <div className={deleteTask === true ? styles.delete_active : styles.delete}>
      <button onClick={toggleDeleteTask}>-</button>
    </div>
  );
}
