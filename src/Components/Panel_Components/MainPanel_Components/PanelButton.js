import React from "react";
import { FaChevronUp } from "react-icons/fa";
import {
  TranslateUp,
  TranslateDown,
  Rotate,
  closedButtonPosition,
  openedButtonPosition,
} from "./_PanelButtonStyles";
import styles from "./_PanelStyles.module.css";

export default function PanelButton({ height, buttonStatus, handleStatus }) {
  const delay = 0.5;
  if (buttonStatus === "closed") {
    return (
      <div
        style={closedButtonPosition()}
        onClick={() => handleStatus("opening")}
      >
        <div className={styles.arrow}>
          <FaChevronUp size={20} />
        </div>
      </div>
    );
  } else if (buttonStatus === "opening") {
    return (
      <div style={closedButtonPosition()}>
        <TranslateUp delay={delay} height={height}>
          <div className={styles.arrow}>
            <Rotate start={0} end={180} delay={delay}>
              <FaChevronUp size={20} />
            </Rotate>
          </div>
        </TranslateUp>
      </div>
    );
  } else if (buttonStatus === "opened") {
    return (
      <div
        style={openedButtonPosition(height)}
        onClick={() => {
          handleStatus("closing");
        }}
      >
        <div className={styles.arrow}>
          <Rotate start={180} end={180} delay={0}>
            <FaChevronUp size={20} />
          </Rotate>
        </div>
      </div>
    );
  } else if (buttonStatus === "closing") {
    return (
      <div style={closedButtonPosition()}>
        <TranslateDown delay={delay} height={height}>
          <div className={styles.arrow}>
            <Rotate start={180} end={360} delay={delay}>
              <FaChevronUp size={20} />
            </Rotate>
          </div>
        </TranslateDown>
      </div>
    );
  }
}
