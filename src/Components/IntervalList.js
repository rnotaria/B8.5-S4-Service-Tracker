import React, { useState, useContext, useEffect, useRef } from "react";
import Interval from "./Interval";
import {
  getSchedule,
  addInterval,
  updateCurrentMiles,
} from "../utils/getServiceSchedule";
import styles from "../Styles/Interval.module.css";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

function IntervalList() {
  const didMount = useRef(false);

  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);

  const [currentMiles, setCurrentMiles] = useState(
    parseInt(dataContext.state.container.miles)
  );

  // Get service schedule
  var [milesArrayInit, serviceArrayInit] = [null, null];
  if (didMount.current === false) {
    didMount.current = true;
    [milesArrayInit, serviceArrayInit] = getSchedule(
      currentMiles,
      dataContext.state.container.isNew
    );
  }
  const [milesArray, setMilesArray] = useState(milesArrayInit);
  const [serviceArray, setServiceArray] = useState(serviceArrayInit);

  // State that determines which collapsable Interval is open
  const [openBox, setOpenBox] = useState(
    milesArray[milesArray.findIndex((miles) => miles > currentMiles)]
  );
  const handleSetOpenBox = (miles) => {
    setOpenBox(miles);
  };

  // If component did mount, service schedule has been built so user is not new
  useEffect(() => {
    dataContext.dispatch({ type: "isNotNew" });
  }, []);

  // Add service mile interval
  useEffect(() => {
    if (maintenanceTrackerContext.state.status === "addInterval") {
      if (
        !milesArray.includes(maintenanceTrackerContext.state.container.interval)
      ) {
        const newInterval = maintenanceTrackerContext.state.container.interval;
        const [newMilesArray, newServiceArray] = addInterval(
          milesArray,
          serviceArray,
          newInterval
        );
        setMilesArray(newMilesArray);
        setServiceArray(newServiceArray);
      }
      setOpenBox(maintenanceTrackerContext.state.container.interval);
    }
  }, [maintenanceTrackerContext, milesArray, serviceArray]);

  // Delete service mile interval
  useEffect(() => {
    if (maintenanceTrackerContext.state.status === "deleteInterval") {
      if (openBox != null) {
        const index = milesArray.indexOf(openBox);
        const milesArrayClone = [...milesArray];
        const serviceArrayClone = [...serviceArray];
        milesArrayClone.splice(index, 1);
        serviceArrayClone.splice(index, 1);
        setMilesArray(milesArrayClone);
        setServiceArray(serviceArrayClone);
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
    serviceArray,
    openBox,
  ]);

  // Check if CurrentMiles was updated
  useEffect(() => {
    if (dataContext.state.container.miles !== currentMiles) {
      setCurrentMiles(dataContext.state.container.miles);
    }
    if (dataContext.state.container.miles > currentMiles) {
      const [newMilesArray, newServiceArray] = updateCurrentMiles(
        milesArray,
        serviceArray,
        dataContext.state.container.miles
      );
      setMilesArray(newMilesArray);
      setServiceArray(newServiceArray);
    }
  }, [
    dataContext.state.container.miles,
    currentMiles,
    milesArray,
    serviceArray,
  ]);

  return (
    <div className={styles.IntervalList_main}>
      {milesArray.map((miles, index) => (
        <Interval
          key={miles}
          miles={miles}
          serviceData={serviceArray[index]}
          open={miles === openBox ? true : false}
          handleSetOpenBox={handleSetOpenBox}
        />
      ))}
    </div>
  );
}

export default React.memo(IntervalList);
