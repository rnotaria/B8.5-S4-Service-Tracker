import React from "react";
import styles from "./_AuthStyles.module.css";
import ErrorHandler from "./ErrorHandler";

export default function PageContainer({ title, children, error }) {
  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>{title}</h3>
        </div>
        {children}
      </div>
      <ErrorHandler error={error} />
    </div>
  );
}
