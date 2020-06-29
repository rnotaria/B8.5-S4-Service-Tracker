import React from "react";
import styles from "../../Styles/addDeleteTaskButtons.module.css";

export default function DeleteTaskButton({
  toggleActivateDelete,
  activateDelete,
}) {
  return (
    <div
      className={activateDelete === true ? styles.delete_active : styles.delete}
    >
      <button onClick={toggleActivateDelete}>-</button>
    </div>
  );
}
