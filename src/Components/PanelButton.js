import React from "react";
import { FaChevronUp } from "react-icons/fa";
import {
  TranslateUp,
  TranslateDown,
  Rotate,
  closedButtonPosition,
  openedButtonPosition,
} from "../Styles/PanelButtonStyles";
import styles from "../Styles/PanelButton.module.css";

export default function PanelButton({ isOpen, dispatch, panelData, delay }) {
  if (isOpen.closed === true) {
    return (
      <div style={closedButtonPosition()} onClick={() => dispatch("opening")}>
        <div className={styles.arrow}>
          <FaChevronUp size={20} />
        </div>
      </div>
    );
  } else if (isOpen.opening === true) {
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
  } else if (isOpen.opened === true) {
    return (
      <div
        style={openedButtonPosition(panelData.height + "vh")}
        onClick={() => {
          dispatch("closing");
        }}
      >
        <div className={styles.arrow}>
          <Rotate start={180} end={180} delay={0}>
            <FaChevronUp size={20} />
          </Rotate>
        </div>
      </div>
    );
  } else if (isOpen.closing === true) {
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
