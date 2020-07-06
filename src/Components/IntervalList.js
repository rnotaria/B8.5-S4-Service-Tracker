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
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const [currentMiles, setCurrentMiles] = useState(
    parseInt(dataContext.state.container.miles)
  );

  // The following states get set after fetching data
  const [milesArray, setMilesArray] = useState(null);
  const [serviceArray, setServiceArray] = useState(null);
  const [openBox, setOpenBox] = useState(null);

  // Fetch data from db. If none, build using defaults
  const fetchData = async () => {
    var [milesArrayInit, serviceArrayInit] = await getSchedule(
      currentMiles,
      dataContext.state.container.user
    );
    setMilesArray(milesArrayInit);
    setServiceArray(serviceArrayInit);
  };

  useEffect(() => {
    fetchData();
  }, []);

  // setOpenBox after component correctly renders
  useEffect(() => {
    /* Note: we are using the following conditional because in fetchData(),
     * we are calling setState for serviceArray AFTER milesArray. Therefore,
     * the component will rerender with milesArray != null and serviceArray = null
     * and then setState for serviceArray right after. Since we only want to call
     * this useEffect once, we can use this window to our advantage
     */
    if (milesArray && !serviceArray) {
      setOpenBox(
        milesArray[milesArray.findIndex((miles) => miles > currentMiles)]
      );
    }
  }, [milesArray, serviceArray, currentMiles]);

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

  // This function gets passed as a prop to Interval.js
  const handleSetOpenBox = (miles) => {
    setOpenBox(miles);
  };

  if (!milesArray || !serviceArray) {
    return (
      <div style={{ height: "50px", width: "50px", backgroundColor: "white" }}>
        jkhdashjska
      </div>
    );
  }

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
