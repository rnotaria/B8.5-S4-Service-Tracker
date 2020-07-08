import React, { useState, useContext, useEffect } from "react";
import Interval from "./Interval";
import {
  getSchedule,
  addInterval,
  updateCurrentMiles,
} from "../../utils/getServiceSchedule";
import styles from "./_IntervalStyles.module.css";
import loadingStyles from "../../Styles/loading.module.css";
import ReactLoading from "react-loading";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../../Contexts/DataContext";

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
  const [nextInterval, setNextInterval] = useState(null);

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
    // Reason: Want to call useEffect only once after first render
    // eslint-disable-next-line
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
      const tempNextInterval =
        milesArray[milesArray.findIndex((miles) => miles > currentMiles)];
      setOpenBox(tempNextInterval);
      setNextInterval(tempNextInterval);
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
        setNextInterval(
          newMilesArray[
            newMilesArray.findIndex((miles) => miles > currentMiles)
          ]
        );
      }
      setOpenBox(maintenanceTrackerContext.state.container.interval);
    }
  }, [maintenanceTrackerContext, milesArray, serviceArray, currentMiles]);

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
    const newCurrentMiles = dataContext.state.container.miles;
    if (newCurrentMiles !== currentMiles) {
      setCurrentMiles(newCurrentMiles);
      if (newCurrentMiles > currentMiles) {
        const [newMilesArray, newServiceArray] = updateCurrentMiles(
          milesArray,
          serviceArray,
          newCurrentMiles
        );
        setMilesArray(newMilesArray);
        setServiceArray(newServiceArray);
        setNextInterval(
          newMilesArray[
            newMilesArray.findIndex((miles) => miles > newCurrentMiles)
          ]
        );
      } else {
        setNextInterval(
          milesArray[milesArray.findIndex((miles) => miles > newCurrentMiles)]
        );
      }
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

  //
  if (!milesArray || !serviceArray) {
    return (
      <div className={loadingStyles.loading}>
        <ReactLoading type={"spinningBubbles"} />
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
          nextInterval={nextInterval}
          handleSetOpenBox={handleSetOpenBox}
        />
      ))}
    </div>
  );
}

export default React.memo(IntervalList);
