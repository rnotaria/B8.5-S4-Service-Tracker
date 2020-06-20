// This file will render x number of <MilageBox/>  passing it the appropriate props

import React, { useState, useContext, useEffect } from "react";
import MilageBox from "./MilageBox";
import {
  getMilesArray,
  getServiceDataArray,
} from "../utils/getMaintenanceData";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

function RenderXMilageBoxes({ currentMiles }) {
  // console.log("RenderXMilageBoxes");

  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  // Get Data
  const [milesArray, setMilesArray] = useState(getMilesArray(currentMiles));
  const [serviceDataArray, setServiceDataArray] = useState(
    getServiceDataArray(milesArray)
  );

  // State that determines which collapsible Milage Box is open
  const [openBox, setOpenBox] = useState(
    milesArray[milesArray.findIndex((miles) => miles > currentMiles)]
  );

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
  // useEffect(() => {
  //   if (maintenanceTrackerContext.state.status === "deleteInterval") {
  //     if (
  //       !milesArray.includes(maintenanceTrackerContext.state.container.interval)
  //     ) {
  //       const newMilesArray = [...milesArray];
  //       newMilesArray.push(maintenanceTrackerContext.state.container.interval);
  //       newMilesArray.sort((a, b) => a - b);
  //       setMilesArray(newMilesArray);
  //       setServiceDataArray(getServiceDataArray(newMilesArray));
  //     }
  //     setOpenBox(maintenanceTrackerContext.state.container.interval);
  //     maintenanceTrackerContext.dispatch({ type: "closing" });
  //   }
  // }, [maintenanceTrackerContext, milesArray]);

  // // If previous service, set tasks to complete
  // if (milesArray[0] < currentMiles) {
  //   serviceData[0] = {
  //     ...serviceData[0],
  //     columns: {
  //       ...serviceData[0].columns,
  //       column1: {
  //         ...serviceData[0].columns.column1,
  //         taskIds: [],
  //       },
  //       column2: {
  //         ...serviceData[0].columns.column2,
  //         taskIds: serviceData[0].columns.column1.taskIds,
  //       },
  //     },
  //   };
  // }

  const handleSetOpenBox = (miles) => {
    setOpenBox(miles);
  };

  return (
    <div>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1>
      {milesArray.map((miles, index) => (
        <MilageBox
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

export default React.memo(RenderXMilageBoxes);
