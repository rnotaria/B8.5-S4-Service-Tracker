import React, { useContext } from "react";
import RenderXMilageBoxes from "./RenderXMilageBoxes";
import BottomPanel from "./BottomPanel";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

export default function MaintenancePage() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <div>
      <RenderXMilageBoxes currentMiles={60000} />
      <BottomPanel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
