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

// Returns an array of the next 5 maintenance schedules
export const getMilesArray = (currentMiles) => {
  const serviceIntervalArray = [nearest5000(currentMiles)];

  for (var i = 0; i < 4; i++) {
    serviceIntervalArray.push(
      (
        parseInt(serviceIntervalArray[serviceIntervalArray.length - 1]) + 10000
      ).toString()
    );
  }

  if (serviceIntervalArray[0] >= 15000) {
    serviceIntervalArray.unshift(serviceIntervalArray[0] - 10000);
  }

  return serviceIntervalArray;
};

// Returns object of maintenance tasks
export const getServiceList = (miles) => {
  if (parseInt(miles) < 15000 || parseInt(miles[miles.length - 5]) % 2 === 0) {
    return maintenanceList("standard");
  } else {
    return maintenanceList("major");
  }
};
