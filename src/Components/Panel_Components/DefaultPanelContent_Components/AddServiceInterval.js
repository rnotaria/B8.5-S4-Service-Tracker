import React, { useState, useCallback, useContext } from "react";
import { MaintenanceTrackerContext } from "../../../Contexts/MaintenanceTrackerContext";
import styles from "./_DefaultPanelContentStyles.module.css";
import useInput from "../../../hooks/useInput";

export default function AddServiceInterval() {
  const [renderInputField, setRenderInputField] = useState(false);
  const [interval, intervalInput] = useInput(
    undefined,
    "Enter Miles",
    undefined,
    undefined,
    true
  );
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();

      var realInterval = parseInt(interval);
      if (!Number.isInteger(realInterval) || realInterval < 0) {
        realInterval = 0;
      }
      maintenanceTrackerContext.dispatch({
        type: "addInterval",
        value: {
          interval: realInterval,
        },
      });
    },
    [maintenanceTrackerContext, interval]
  );

  if (renderInputField === false) {
    return (
      <div className={`${styles.componentContainer} `}>
        <button onClick={() => setRenderInputField(true)}>
          Add Service Interval
        </button>{" "}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={`${styles.componentContainer} `}>
        {intervalInput}
        <button onSubmit={handleSubmit}>Add</button>
      </div>
    </form>
  );
}
