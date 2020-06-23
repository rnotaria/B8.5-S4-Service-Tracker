import React, { useState, useContext, useEffect } from "react";
import Interval from "./Interval";
import {
  getMilesArray,
  getServiceDataArray,
} from "../utils/getMaintenanceData";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

function IntervalList({ currentMiles }) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);

  const [milesArray, setMilesArray] = useState(getMilesArray(currentMiles));
  const [serviceDataArray, setServiceDataArray] = useState(
    getServiceDataArray(milesArray)
  );

  // State that determines which collapsible Milage Box is open
  const [openBox, setOpenBox] = useState(
    milesArray[milesArray.findIndex((miles) => miles > currentMiles)]
  );
  const handleSetOpenBox = (miles) => {
    setOpenBox(miles);
  };

  // Add service mile interval
  useEffect(() => {
    if (maintenanceTrackerContext.state.status === "addInterval") {
      if (
        !milesArray.includes(maintenanceTrackerContext.state.container.interval)
      ) {
        const newMilesArray = [...milesArray];
        newMilesArray.push(maintenanceTrackerContext.state.container.interval);
        newMilesArray.sort((a, b) => a - b);
        setMilesArray(newMilesArray);
        setServiceDataArray(getServiceDataArray(newMilesArray));
      }
      setOpenBox(maintenanceTrackerContext.state.container.interval);
      maintenanceTrackerContext.dispatch({ type: "closing" });
    }
  }, [maintenanceTrackerContext, milesArray]);

  // Delete service mile interval
  useEffect(() => {
    if (maintenanceTrackerContext.state.status === "deleteInterval") {
      if (openBox != null) {
        const index = milesArray.indexOf(openBox);
        const milesArrayClone = [...milesArray];
        const serviceDataArrayClone = [...serviceDataArray];
        milesArrayClone.splice(index, 1);
        serviceDataArrayClone.splice(index, 1);
        setMilesArray(milesArrayClone);
        setServiceDataArray(serviceDataArrayClone);
        maintenanceTrackerContext.dispatch({ type: "setStatus" });
        dataContext.dispatch({ type: "deleteInterval", value: openBox });

        setOpenBox(null);
      } else {
        alert("Please select a service interval you want to delete.");
      }
    }
  }, [
    maintenanceTrackerContext,
    dataContext,
    milesArray,
    serviceDataArray,
    openBox,
  ]);

  return (
    <div>
      {milesArray.map((miles, index) => (
        <Interval
          key={miles}
          miles={miles}
          serviceData={serviceDataArray[index]}
          open={miles === openBox ? true : false}
          handleSetOpenBox={handleSetOpenBox}
        />
      ))}
    </div>
  );
}

export default React.memo(IntervalList);