import React from "react";
import Popup from "reactjs-popup";
import Pages from "./Pages";
import styles from "./_HelpStyles.module.css";
import { helpContent } from "./helpContent";

const contentStyle = {
  height: "800px",
  width: "700px",
  border: "1px solid black",

  backgroundColor: "rgba(100, 100, 100, 0.8)",
  zIndex: 50,
};

export default function Help({ open, handleOnClose }) {
  return (
    <div className={`${styles.center} ${styles.popup}`}>
      <Popup
        modal={true}
        contentStyle={contentStyle}
        open={open}
        onClose={() => handleOnClose()}
      >
        <Pages onClose={handleOnClose} content={helpContent} />
      </Popup>
    </div>
  );
}
