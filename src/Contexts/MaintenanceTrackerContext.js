import React, { useReducer } from "react";
import AddTask from "../Components/dnd_components/AddTask";

export const MaintenanceTrackerContext = React.createContext();

const maintenanceTrackerInitialState = {
  panelData: {
    height: 50,
    open: false,
    title: "title",
    content: "content",
  },
  newTask: false,
  deleteTask: false,
  taskContainer: null,
};

const maintenanceTrackerReducer = (state, action) => {
  switch (action.type) {
    case "addTask-botPanel":
      // Brings up bottom panel to add new task
      return {
        ...state,
        panelData: {
          ...state.panelData,
          height: 20,
          open: true,
          title: "Add Task",
          content: <AddTask />,
        },
        taskContainer: {
          ...state.taskContainer,
          ...action.value,
        },
      };

    case "addTask-submitTask":
      // Submits task and adds it to list
      return {
        ...state,
        panelData: {
          ...state.panelData,
          closing: true,
        },
        newTask: true,
        taskContainer: {
          ...state.taskContainer,
          newTask: action.value,
        },
      };

    case "deleteTask":
      return {
        ...state,
        deleteTask: true,
        taskContainer: {
          ...state.taskContainer,
          miles: action.value.miles,
          columnId: action.value.columnId,
          taskId: action.value.taskId,
        },
      };

    case "reset":
      // Reset back to initial state
      return maintenanceTrackerInitialState;
    default:
      return maintenanceTrackerInitialState;
  }
};

export const MaintenanceTrackerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    maintenanceTrackerReducer,
    maintenanceTrackerInitialState
  );

  return (
    <MaintenanceTrackerContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </MaintenanceTrackerContext.Provider>
  );
};