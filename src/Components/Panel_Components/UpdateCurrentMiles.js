import React, { useState, useContext } from "react";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

export default function UpdateCurrentMiles() {
  const [renderInput, setRenderInput] = useState(false);
  const [miles, milesInput] = useInput();
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
      <button onClick={() => setRenderInput(true)}>Update Current Miles</button>
    );
  }

  return (
    <div>
      {milesInput}
      <button onClick={handleUpdate}>Submit</button>
    </div>
  );
}
