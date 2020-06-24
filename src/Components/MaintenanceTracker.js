import React, { useContext } from "react";
import IntervalList from "./IntervalList";
import Panel from "./Panel_Components/Panel";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

export default function MaintenanceTracker() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const currentMiles = 60000;

  return (
    <div>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1>
      <IntervalList currentMiles={currentMiles} />
      <Panel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
