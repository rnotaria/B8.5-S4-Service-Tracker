import React, { useContext } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

export default function DeleteServiceInterval() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <button
      onClick={() =>
        maintenanceTrackerContext.dispatch({ type: "deleteInterval" })
      }
    >
      Delete Open Interval
    </button>
  );
}
