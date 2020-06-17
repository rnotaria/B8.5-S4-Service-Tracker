// This file contains helper functions that provide or alter maintenanceList data

const emptyService = {
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

const standardService = {
  tasks: {
    task1: {
      id: "task1",
      title:
        "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
      info: "hi",
    },
    task2: {
      id: "task2",
      title: "Engine oil / Oil filter - Change oil and replace filter",
    },
    task3: {
      id: "task3",
      title: "Engine compartment - Check for leaks",
    },
    task4: {
      id: "task4",
      title:
        "Tires and spare wheel - Check for wear and damage. Check tire pressure. Reset Tire Pressure Monitoring System (TPMS)",
    },
  },

  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1", "task2", "task3", "task4"],
    },
    column2: {
      id: "column2",
      title: "Complete",
      taskIds: [],
    },
  },

  columnOrder: ["column1", "column2"],
};

const majorService = {
  tasks: {
    task1: {
      id: "task1",
      title:
        "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary.",
    },
    task2: {
      id: "task2",
      title:
        "Cooling system - Check coolant level and add coolant if necessary",
    },
    task3: {
      id: "task3",
      title: "Dust and pollen filter - Replace filter",
    },
  },

  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1", "task2", "task3"],
    },
    column2: {
      id: "column2",
      title: "Complete",
      taskIds: [],
    },
  },

  columnOrder: ["column1", "column2"],
};

// Returns an array of maintenance mile invervals
export const getMilesArray = (currentMiles) => {
  const milesArray = [5000];
  currentMiles -= 5000;

  // append next 5 intervals
  while (currentMiles + 40000 > 0) {
    milesArray.push(milesArray[milesArray.length - 1] + 10000);
    currentMiles -= 10000;
  }

  return milesArray;
};

// Returns object of maintenance tasks
export const getServiceDataArray = (milesArray) => {
  var serviceDataArray = [];
  milesArray.map((miles) => {
    if (miles - 5000 === 0 || (miles - 5000) % 20000 === 0) {
      return serviceDataArray.push(standardService);
    } else if ((miles - 5000) % 10000 === 0) {
      return serviceDataArray.push(majorService);
    } else {
      return serviceDataArray.push(emptyService);
    }
  });
  return serviceDataArray;
};
