const defaultService = {
  tasks: {
    task1: {
      id: "task1",
      content: "",
    },
  },

  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1"],
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
      content:
        "Brake system - Check for damage and leaks, thickness of pads, and brake fluid level",
    },
    task2: {
      id: "task2",
      content: "Engine oil / Oil filter - Change oil and replace filter",
    },
    task3: {
      id: "task3",
      content: "Engine compartment - Check for leaks",
    },
    task4: {
      id: "task4",
      content:
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
      content:
        "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary.",
    },
    task2: {
      id: "task2",
      content:
        "Cooling system - Check coolant level and add coolant if necessary",
    },
    task3: {
      id: "task3",
      content: "Dust and pollen filter - Replace filter",
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

export default function maintenanceList(serviceType) {
  if (serviceType === "standard") {
    return standardService;
  } else if (serviceType === "major") {
    return majorService;
  }

  return defaultService;
}
