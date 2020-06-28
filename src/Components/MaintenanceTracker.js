import React, { useContext, useRef, useEffect } from "react";
import IntervalList from "./IntervalList";
import Panel from "./Panel_Components/Panel";
import InfoBar from "./InfoBar";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

export default function MaintenanceTracker() {
  const didMount = useRef(false);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const initialMiles = 150000;

  // initialize
  useEffect(() => {
    if (didMount.current === false) {
      didMount.current = true;
      dataContext.dispatch({
        type: "initialize",
        value: { currentMiles: initialMiles, car: "2016 Audi S4" },
      });
    }
  });

  return (
    <div>
      <InfoBar />
      <IntervalList initialMiles={initialMiles} />
      <Panel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
