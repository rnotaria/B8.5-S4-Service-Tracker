import React, { useContext, useRef, useEffect } from "react";
import IntervalList from "./IntervalList";
import Panel from "./Panel_Components/Panel";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

export default function MaintenanceTracker() {
  const didMount = useRef(false);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const initialMiles = 57000;

  // initialize
  useEffect(() => {
    if (didMount.current === false) {
      didMount.current = true;
      dataContext.dispatch({
        type: "updateCurrentMiles",
        value: { currentMiles: initialMiles },
      });
    }
  });

  return (
    <div>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {dataContext.state.container.currentMiles}
      </h1>
      <IntervalList initialMiles={initialMiles} />
      <Panel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
