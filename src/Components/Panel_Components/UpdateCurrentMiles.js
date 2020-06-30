import React, { useState, useContext } from "react";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";
import styles from "../../Styles/Panel_Styles/DefaultPanelContent.module.css";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

export default function UpdateCurrentMiles() {
  const [renderInput, setRenderInput] = useState(false);
  const [miles, milesInput] = useInput("", "Enter current miles");
  const dataContext = useContext(DataContext);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const handleUpdate = () => {
    dataContext.dispatch({
      type: "updateCurrentMiles",
      value: { currentMiles: parseInt(miles) },
    });
    maintenanceTrackerContext.dispatch({ type: "closePanel" });
  };

  if (renderInput === false) {
    return (
      <div className={`${styles.componentContainer}`}>
        <button onClick={() => setRenderInput(true)}>
          Update Current Miles
        </button>
      </div>
    );
  }

  return (
    <div
      className={`${styles.componentContainer} ${styles.addInterval_input} `}
    >
      {milesInput}
      <button onClick={handleUpdate}>Submit</button>
    </div>
  );
}
