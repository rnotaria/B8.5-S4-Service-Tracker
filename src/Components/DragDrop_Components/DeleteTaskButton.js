import React from "react";
import styles from "../../Styles/DragDropStyles.module.css";
import { IoMdRemoveCircle } from "react-icons/io";

export default function DeleteTaskButton({
  toggleActivateDelete,
  activateDelete,
}) {
  return (
    <div className={styles.deleteContainer}>
      <div className={styles.deleteIconBg} />
      <IoMdRemoveCircle
        className={
          activateDelete === false
            ? styles.deleteIcon
            : styles.deleteIcon_active
        }
        onClick={toggleActivateDelete}
      />
    </div>
  );
}
