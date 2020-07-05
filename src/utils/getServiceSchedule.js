import { maintenanceList } from "./defaultData/maintenanceList";

const skeleton = {
  tasks: {},

  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: [],
    },
    column2: {
      id: "column2",
      title: "Complete",
      taskIds: [],
    },
  },

  columnOrder: ["column1", "column2"],
};

const buildService = (key, n) => {
  var service = {
    tasks: {},

    columns: {
      column1: {
        id: "column1",
        title: "To Do",
        taskIds: [],
      },
      column2: {
        id: "column2",
        title: "Complete",
        taskIds: [],
      },
    },

    columnOrder: ["column1", "column2"],
  };

  for (var i = 0; i < n; i++) {
    service = {
      ...service,
      tasks: {
        ...service.tasks,
        ["task" + (i + 1)]: {
          id: "task" + (i + 1),
          title: maintenanceList[key[i]].title,
          info: maintenanceList[key[i]].info,
        },
      },

      columns: {
        ...service.columns,
        column1: {
          ...service.columns.column1,
          taskIds: [...service.columns.column1.taskIds, "task" + (i + 1)],
        },
      },
    };
  }

  return service;
};

const buildServiceArray = (keysArray) => {
  var serviceArray = [];

  keysArray.forEach((key) => {
    if (!Array.isArray(key)) {
      serviceArray.push(buildService([key], 1));
    } else {
      serviceArray.push(buildService(key, key.length));
    }
  });

  return serviceArray;
};

export const buildSchedule = (miles) => {
  // We want to build data from 0 to user's current miles plus 50k
  const endMiles = parseInt(miles) + 50000;
  var data = {};

  for (var key in maintenanceList) {
    const start = maintenanceList[key].start;
    const repeat = maintenanceList[key].repeat;
    if (start < endMiles) {
      data[start]
        ? (data[start] = [...data[start], key])
        : (data[start] = [key]);

      // If service does not repeat, break
      if (!repeat) {
        break;
      }

      var currentMiles = start + repeat;
      while (currentMiles < endMiles) {
        data[currentMiles]
          ? (data[currentMiles] = [...data[currentMiles], key])
          : (data[currentMiles] = [key]);
        currentMiles += repeat;
      }
    }
  }

  var milesArray = [];
  for (var i of Object.keys(data)) {
    milesArray.push(parseInt(i));
  }

  const serviceArray = buildServiceArray(Object.values(data));

  return [milesArray, serviceArray];
};

export const getSchedule = (miles, isNew) => {
  if (isNew === true) {
    return buildSchedule(miles);
  } else {
    // get user data from firebase
  }
  return;
};

export const addInterval = (milesArray, serviceArray, newInterval) => {
  milesArray.push(newInterval);
  milesArray.sort((a, b) => a - b);
  const index = milesArray.indexOf(newInterval);

  // See if service already exists for new interval
  const [tempMilesArray, tempServiceArray] = buildSchedule(newInterval);
  const tempIndex = tempMilesArray.indexOf(newInterval);
  if (tempIndex !== -1) {
    serviceArray.splice(index, 0, tempServiceArray[tempIndex]);
  } else {
    serviceArray.splice(index, 0, skeleton);
  }

  return [milesArray, serviceArray];
};

export const updateCurrentMiles = (milesArray, serviceArray, newMiles) => {
  var [tempMilesArray, tempServiceArray] = buildSchedule(newMiles);
  const index = tempMilesArray.findIndex(
    (number) => number > milesArray[milesArray.length - 1]
  );

  if (index === -1) {
    return [milesArray, serviceArray];
  }

  tempMilesArray = tempMilesArray.slice(index);
  tempServiceArray = tempServiceArray.slice(index);
  const newMilesArray = milesArray.concat(tempMilesArray);
  const newServiceArray = serviceArray.concat(tempServiceArray);
  return [newMilesArray, newServiceArray];
};
