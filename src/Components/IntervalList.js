import React, { useState, useContext, useEffect } from "react";
import Interval from "./Interval";
import {
  getMilesArray,
  getServiceDataArray,
} from "../utils/getMaintenanceData";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

function IntervalList({ initialMiles }) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const [currentMiles, setCurrentMiles] = useState(initialMiles);

  const [milesArray, setMilesArray] = useState(getMilesArray(currentMiles));
  const [serviceDataArray, setServiceDataArray] = useState(
    getServiceDataArray(milesArray)
  );

  // State that determines which collapsable Interval is open
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

  // Check if CurrentMiles was updated
  useEffect(() => {
    if (dataContext.state.container.currentMiles !== currentMiles) {
      setCurrentMiles(dataContext.state.container.currentMiles);
    }
    if (dataContext.state.container.currentMiles > currentMiles) {
      var tempMilesArray = getMilesArray(
        dataContext.state.container.currentMiles
      );
      const index = tempMilesArray.findIndex((number) => {
        return number > milesArray[milesArray.length - 1];
      });

      if (index > -1) {
        const newArray = [...milesArray].concat(
          tempMilesArray.slice(index, tempMilesArray.length)
        );
        setMilesArray(newArray);
        setServiceDataArray(getServiceDataArray(newArray));
      }
    }
  }, [dataContext.state.container.currentMiles, currentMiles, milesArray]);

  return (
    <div style={{ marginTop: "50px" }}>
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
