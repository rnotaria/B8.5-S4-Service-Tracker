import React, { useState, useEffect, useCallback, useContext } from "react";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

function AddServiceInterval() {
  const [renderInputField, setRenderInputField] = useState(false);
  const [interval, setInterval] = useState(0);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const handleSubmit = useCallback(() => {
    maintenanceTrackerContext.dispatch({
      type: "addInterval",
      value: {
        interval: parseInt(interval),
      },
    });
  }, [maintenanceTrackerContext, interval]);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        handleSubmit();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handleSubmit]);

  if (renderInputField === false) {
    return (
      <button onClick={() => setRenderInputField(true)}>
        Add Service Interval
      </button>
    );
  }

  return (
    <div>
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

export default function DefaultPanelOptions() {
  return <AddServiceInterval />;
}
