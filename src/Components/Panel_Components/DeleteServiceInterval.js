import React, { useContext } from "react";
import styles from "../../Styles/Panel_Styles/DefaultPanelContent.module.css";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

export default function DeleteServiceInterval() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <div className={`${styles.componentContainer}`}>
      <button
        onClick={() =>
          maintenanceTrackerContext.dispatch({ type: "deleteInterval" })
        }
      >
        Delete Open Interval
      </button>
    </div>
  );
}
