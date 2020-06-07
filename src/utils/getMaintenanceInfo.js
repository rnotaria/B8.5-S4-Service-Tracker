// This file contains helper functions that provide or alter maintenanceList data

import maintenanceList from "./maintenanceList";

// Round to the nearest ___5000 Miles
const nearest5000 = (currentMiles) => {
  if (currentMiles <= 5000) {
    return "5000";
  } else if (currentMiles <= 15000) {
    return "15000";
  }
  var nextService = (Math.ceil(currentMiles / 5000) * 5000).toString();
  return nextService.substr(0, nextService.length - 4) + "5000";
};

// Returns an array of the next X maintenance schedules
export const getMilesArray = (currentMiles, numFutureServices) => {
  numFutureServices--;
  const serviceIntervalArray = [nearest5000(currentMiles)];

  for (var i = 0; i < numFutureServices; i++) {
    serviceIntervalArray.push(
      (
        parseInt(serviceIntervalArray[serviceIntervalArray.length - 1]) + 10000
      ).toString()
    );
  }

  if (serviceIntervalArray[0] >= 15000) {
    serviceIntervalArray.unshift((serviceIntervalArray[0] - 10000).toString());
  }

  return serviceIntervalArray;
};

// Returns object of maintenance tasks
export const getServiceData = (milesArray) => {
  var serviceData = []
  milesArray.map(miles => {
    if (parseInt(miles) < 15000 || parseInt(miles[miles.length - 5]) % 2 === 0) {
      return serviceData.push(maintenanceList("standard"));
    } else {
      return serviceData.push(maintenanceList("major"));
    }
  })
  return serviceData
};
