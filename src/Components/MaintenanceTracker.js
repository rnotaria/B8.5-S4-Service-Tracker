import React, { useContext } from "react";
import IntervalList from "./IntervalList";
import BottomPanel from "./BottomPanel";
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
      <BottomPanel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
