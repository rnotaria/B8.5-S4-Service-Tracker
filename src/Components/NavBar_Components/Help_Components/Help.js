import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import Pages from "./Pages";
import styles from "./_HelpStyles.module.css";
import { helpContent } from "./helpContent";

const contentStyle = {
  height: "620px",
  width: "500px",
  border: "1px solid black",

  backgroundColor: "rgba(100, 100, 100, 0.8)",
  zIndex: 50,
};

export default function Help({ open, handleOnClose }) {
  const [firstRender, setFirstRender] = useState(false);

  // Slight delay to render so new accounts are not immediately
  // bombarded with help box.
  useEffect(() => {
    const timer = setTimeout(() => {
      setFirstRender(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`${styles.center} ${styles.popup}`}>
      <Popup
        modal={true}
        contentStyle={contentStyle}
        open={firstRender && open}
        onClose={() => handleOnClose()}
      >
        <Pages onClose={handleOnClose} content={helpContent} />
      </Popup>
    </div>
  );
}
