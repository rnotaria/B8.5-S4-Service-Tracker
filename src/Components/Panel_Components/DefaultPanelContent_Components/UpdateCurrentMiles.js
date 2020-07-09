import React, { useState, useContext } from "react";
import useInput from "../../../hooks/useInput";
import { DataContext } from "../../../Contexts/DataContext";
import styles from "./_DefaultPanelContentStyles.module.css";
import { MaintenanceTrackerContext } from "../../../Contexts/MaintenanceTrackerContext";

export default function UpdateCurrentMiles() {
  const [renderInput, setRenderInput] = useState(false);
  const [miles, milesInput] = useInput(
    "",
    "Enter current miles",
    undefined,
    undefined,
    true
  );
  const dataContext = useContext(DataContext);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const handleUpdate = (e) => {
    e.preventDefault();

    var realMiles = parseInt(miles);
    if (!Number.isInteger(realMiles) || realMiles < 0) {
      realMiles = 0;
    }
    dataContext.dispatch({
      type: "updateCurrentMiles",
      value: realMiles,
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
    <form onSubmit={handleUpdate}>
      <div
        className={`${styles.componentContainer} ${styles.addInterval_input} `}
      >
        {milesInput}
        <button onSubmit={handleUpdate}>Submit</button>
      </div>
    </form>
  );
}
