import React, { useState, useCallback, useContext } from "react";
import { MaintenanceTrackerContext } from "../../../Contexts/MaintenanceTrackerContext";
import styles from "./_DefaultPanelContentStyles.module.css";

export default function AddServiceInterval() {
  const [renderInputField, setRenderInputField] = useState(false);
  const [interval, setInterval] = useState(0);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const handleSubmit = useCallback(() => {
    if (!Number.isInteger(parseInt(interval)) || parseInt(interval) < 0) {
      alert("Please enter a positive number.");
    } else {
      maintenanceTrackerContext.dispatch({
        type: "addInterval",
        value: {
          interval: parseInt(interval),
        },
      });
    }
  }, [maintenanceTrackerContext, interval]);

  // useEffect(() => {
  //   const listener = (event) => {
  //     if (event.code === "Enter" || event.code === "NumpadEnter") {
  //       handleSubmit();
  //     }
  //   };
  //   document.addEventListener("keydown", listener);
  //   return () => {
  //     document.removeEventListener("keydown", listener);
  //   };
  // }, [handleSubmit]);

  if (renderInputField === false) {
    return (
      <div
        className={`${styles.componentContainer} ${styles.addInterval_input} `}
      >
        <button onClick={() => setRenderInputField(true)}>
          Add Service Interval
        </button>{" "}
      </div>
    );
  }

  return (
    <div className={`${styles.componentContainer} `}>
      <input
        autoFocus={true}
        type="text"
        onChange={(e) => {
          setInterval(e.target.value);
        }}
        placeholder="Enter Miles"
      />
      <button onClick={handleSubmit}>Add</button>
    </div>
  );
}
