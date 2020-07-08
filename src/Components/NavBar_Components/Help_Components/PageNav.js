import React, { useState } from "react";
import styles from "./_HelpStyles.module.css";

export default function PageNav({ numberOfPages = 0, handleCurrentPage }) {
  const [selectedBubble, setSelectedBubble] = useState(0);

  return (
    <div className={styles.PageNav_container}>
      {[...Array(numberOfPages)].map((e, i) => {
        return (
          <div key={i} className={styles.PageNav_bubbleContainer}>
            <div
              className={`${styles.PageNav_bubble} ${
                selectedBubble === i ? styles.PageNav_bubbleSelected : null
              }`}
              onClick={() => {
                handleCurrentPage(i);
                setSelectedBubble(i);
              }}
            />
          </div>
        );
      })}
    </div>
  );
}
