import { maintenanceList } from "./maintenanceList";

// export const emptyService = {
//   tasks: {},

//   columns: {
//     column1: {
//       id: "column1",
//       title: "To Do",
//       taskIds: [],
//     },
//     column2: {
//       id: "column2",
//       title: "Complete",
//       taskIds: [],
//     },
//   },

//   columnOrder: ["column1", "column2"],
// };

// const standardService = {
//   tasks: {
//     task1: {
//       id: "task1",
//       title:
//         "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
//       info: {
//         subtitle: "subtitle",
//         instructions: "in<b>stru</b>ctions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//     task2: {
//       id: "task2",
//       title: "Engine oil / Oil filter - Change oil and replace filter",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//     task3: {
//       id: "task3",
//       title: "Engine compartment - Check for leaks",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//     task4: {
//       id: "task4",
//       title:
//         "Tires and spare wheel - Check for wear and damage. Check tire pressure. Reset Tire Pressure Monitoring System (TPMS)",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//   },

//   columns: {
//     column1: {
//       id: "column1",
//       title: "To Do",
//       taskIds: ["task1", "task2", "task3", "task4"],
//     },
//     column2: {
//       id: "column2",
//       title: "Complete",
//       taskIds: [],
//     },
//   },

//   columnOrder: ["column1", "column2"],
// };

// const majorService = {
//   tasks: {
//     task1: {
//       id: "task1",
//       title:
//         "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary.",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//     task2: {
//       id: "task2",
//       title:
//         "Cooling system - Check coolant level and add coolant if necessary",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//     task3: {
//       id: "task3",
//       title: "Dust and pollen filter - Replace filter",
//       info: {
//         subtitle: "subtitle",
//         instructions: "instructions",
//         links: "links",
//         videos: "videos",
//         notes: "notes",
//         completionInfo: {
//           complete: false,
//           date: "",
//           miles: "",
//           notes: "",
//         },
//       },
//     },
//   },

//   columns: {
//     column1: {
//       id: "column1",
//       title: "To Do",
//       taskIds: ["task1", "task2", "task3"],
//     },
//     column2: {
//       id: "column2",
//       title: "Complete",
//       taskIds: [],
//     },
//   },

//   columnOrder: ["column1", "column2"],
// };

// // Returns an array of maintenance mile invervals
// export const getMilesArray = (miles) => {
//   const milesArray = [5000];
//   miles -= 5000;

//   // append next 5 intervals
//   while (miles + 40000 > 0) {
//     milesArray.push(milesArray[milesArray.length - 1] + 10000);
//     miles -= 10000;
//   }

//   return milesArray;
// };

// // Returns object of maintenance tasks
// export const getServiceDataArray = (milesArray) => {
//   var serviceDataArray = [];
//   milesArray.map((miles) => {
//     if (miles - 5000 === 0 || (miles - 5000) % 20000 === 0) {
//       return serviceDataArray.push(standardService);
//     } else if ((miles - 5000) % 10000 === 0) {
//       return serviceDataArray.push(majorService);
//     } else {
//       return serviceDataArray.push(emptyService);
//     }
//   });
//   return serviceDataArray;
// };

/////////////////////////////////////////////////////

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
    // console.log(key);
    // console.log(maintenanceList[key[i]]);
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

export const getInitData = (miles) => {
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

  console.log(data);

  const serviceArray = buildServiceArray(Object.values(data));

  return [milesArray, serviceArray];
};

export const addInterval = (milesArray, serviceArray, newInterval) => {
  milesArray.push(newInterval);
  milesArray.sort((a, b) => a - b);
  const index = milesArray.indexOf(newInterval);

  // See if service already exists for new interval
  const [tempMilesArray, tempServiceArray] = getInitData(newInterval);
  const tempIndex = tempMilesArray.indexOf(newInterval);
  if (tempIndex !== -1) {
    serviceArray.splice(index, 0, tempServiceArray[tempIndex]);
  } else {
    serviceArray.splice(index, 0, skeleton);
  }

  return [milesArray, serviceArray];
};

export const updateCurrentMiles = (milesArray, serviceArray, newMiles) => {
  var [tempMilesArray, tempServiceArray] = getInitData(newMiles);
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
