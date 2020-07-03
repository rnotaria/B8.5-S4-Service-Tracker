import React from "react";
import Popup from "reactjs-popup";
import Pages from "./Pages";
import styles from "../../Styles/HelpStyles.module.css";

const contentStyle = {
  height: "800px",
  width: "600px",
  border: "1px solid black",

  backgroundColor: "rgba(100, 100, 100, 0.8)",
};

const step1 = <div>Step1</div>;
const step2 = <div>Step2</div>;
const step3 = <div>Step3</div>;
const step4 = <div>Step4</div>;
const content = [step1, step2, step3, step4];

export default function Help({ open, handleOnClose }) {
  return (
    <div className={styles.center}>
      <Popup
        modal={true}
        contentStyle={contentStyle}
        open={open}
        onClose={() => handleOnClose()}
      >
        <Pages onClose={handleOnClose} content={content} />
      </Popup>
    </div>
  );
}
