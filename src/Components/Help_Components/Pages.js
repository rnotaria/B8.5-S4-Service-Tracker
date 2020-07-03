import React, { useState } from "react";
import PageNav from "./PageNav";
import CloseButton from "./CloseButton";
import styles from "../../Styles/HelpStyles.module.css";

export default function Pages({ onClose, content = <React.Fragment /> }) {
  const numberOfPages = content.length;

  const [currentPage, setCurrentPage] = useState(content[0]);

  return (
    <div className={styles.Pages_container}>
      <CloseButton onClose={onClose} />

      {currentPage}
      <PageNav
        numberOfPages={numberOfPages}
        handleCurrentPage={(page) => {
          setCurrentPage(content[page]);
        }}
      />
    </div>
  );
}
