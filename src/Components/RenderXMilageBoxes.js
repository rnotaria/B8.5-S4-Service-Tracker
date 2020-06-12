// This file will render x number of <MilageBox/>  passing it the appropriate props

import React, { useState } from "react";
import MilageBox from "./MilageBox";
import { getMilesArray, getServiceData } from "../utils/getMaintenanceInfo";

function RenderXMilageBoxes({ currentMiles, numFutureServices }) {
  // console.log("RenderXMilageBoxes")

  // Get Data
  const milesArray = getMilesArray(currentMiles, numFutureServices);
  var serviceData = getServiceData(milesArray);

  // State that determines which collapsible Milage Box is open
  const [openBox, setOpenBox] = useState(
    milesArray[0] < currentMiles ? milesArray[1] : milesArray[0]
  );

  // If previous service, set tasks to complete
  if (milesArray[0] < currentMiles) {
    serviceData[0] = {
      ...serviceData[0],
      columns: {
        ...serviceData[0].columns,
        column1: {
          ...serviceData[0].columns.column1,
          taskIds: [],
        },
        column2: {
          ...serviceData[0].columns.column2,
          taskIds: serviceData[0].columns.column1.taskIds,
        },
      },
    };
  }

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
          serviceData={serviceData[index]}
          open={miles === openBox ? true : false}
          handleSetOpenBox={handleSetOpenBox}
        />
      ))}
    </div>
  );
}

export default React.memo(RenderXMilageBoxes);
