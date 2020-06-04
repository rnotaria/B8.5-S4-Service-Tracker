const maintenanceList = {
  tasks: {
    task1: {
      id: "task1",
      content: "Oil Change",
    },
    task2: {
      id: "task2",
      content: "Replace Brake Fluid",
    },
    task3: {
      id: "task3",
      content: "Replace Spark Plugs",
    },
    task4: {
      id: "task4",
      content: "Replace Ribbed V-Belt",
    },
    task5: {
      id: "task5",
      content:
        "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890ABCDEFGH",
    },
  },
  columns: {
    column1: {
      id: "column1",
      title: "To Do",
      taskIds: ["task1", "task2", "task3", "task4", "task5"],
    },
    column2: {
      id: "column2",
      title: "Complete",
      taskIds: [],
    },
  },
  // Facilitate reordering of columns
  columnOrder: ["column1", "column2"],
};

export default maintenanceList;
