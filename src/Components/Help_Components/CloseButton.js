import React from "react";
import styles from "../../Styles/HelpStyles.module.css";
import { AiFillCloseCircle } from "react-icons/ai";

export default function CloseButton({ onClose }) {
  return (
    <div className={styles.closeContainer}>
      <div className={styles.closeIconBg} />
      <AiFillCloseCircle
        className={styles.closeIcon}
        onClick={() => onClose()}
      />
    </div>
  );
}
