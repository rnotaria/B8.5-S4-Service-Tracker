import React from "react";
import { FaChevronUp } from "react-icons/fa";
import {
  TranslateUp,
  TranslateDown,
  Rotate,
  closedButtonPosition,
  openedButtonPosition,
} from "../../Styles/PanelButtonStyles";
import styles from "../../Styles/PanelButton.module.css";

export default function PanelButton({ buttonStatus, handleStatus, panelData }) {
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
        <TranslateUp delay={delay} height={panelData.height + "vh"}>
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
        style={openedButtonPosition(panelData.height + "vh")}
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
        <TranslateDown delay={delay} height={panelData.height + "vh"}>
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