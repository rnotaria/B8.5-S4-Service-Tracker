import React from "react";
import styles from "../../Styles/Panel_Styles/DefaultPanelContent.module.css";
import AddServiceInterval from "./AddServiceInterval";
import DeleteServiceInterval from "./DeleteServiceInterval";
import UpdateCurrentMiles from "./UpdateCurrentMiles";

export default function DefaultPanelContent() {
  return (
    <div className={styles.main}>
      <AddServiceInterval />
      <DeleteServiceInterval />
      <UpdateCurrentMiles />
    </div>
  );
}
