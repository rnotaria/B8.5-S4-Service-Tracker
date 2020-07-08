import React from "react";
import styles from "./_AuthStyles.module.css";

export default function ErrorHandler({ error = null }) {
  return <div className={styles.errorContainer}>{error}</div>;
}
