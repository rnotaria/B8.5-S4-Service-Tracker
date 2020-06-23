import React, { useContext } from "react";
import IntervalList from "./IntervalList";
import BottomPanel from "./BottomPanel";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

export default function MaintenanceTracker() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <div>
      <IntervalList currentMiles={60000} />
      <BottomPanel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
