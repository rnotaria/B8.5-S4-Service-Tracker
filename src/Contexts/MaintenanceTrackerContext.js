import React, { useReducer } from "react";
import AddTask from "../Components/Panel_Components/AddTask";
import DefaultPanelContent from "../Components/Panel_Components/DefaultPanelContent";
import InfoBox from "../Components/Panel_Components/InfoBox";
import CompletionInfo from "../Components/Panel_Components/CompletionInfo";

export const MaintenanceTrackerContext = React.createContext();

const maintenanceTrackerInitialState = {
  panelData: {
    height: 15,
    status: "closed",
    title: "OPTIONS",
    content: <DefaultPanelContent />,
  },
  status: null,
  container: null,
};

const maintenanceTrackerReducer = (state, action) => {
  switch (action.type) {
    case "addTask.1":
      // Brings up bottom panel to add new task
      return {
        ...state,
        panelData: {
          ...state.panelData,
          status: "opening",
          height: 20,
          title: "Add Task",
          content: <AddTask />,
        },
        container: {
          ...state.container,
          ...action.value,
        },
      };

    case "addTask.2":
      // Submits task and adds it to list
      return {
        ...state,
        status: "addTask",
        panelData: {
          ...state.panelData,
          status: "closing",
        },
        container: {
          ...state.container,
          newTask: action.value,
        },
      };

    case "deleteTask":
      return {
        ...state,
        status: "deleteTask",
        container: {
          ...state.container,
          miles: action.value.miles,
          columnId: action.value.columnId,
          taskId: action.value.taskId,
        },
      };

    case "addInterval":
      return {
        ...state,
        status: "addInterval",
        panelData: {
          ...state.panelData,
          status: "closing",
        },
        container: { interval: action.value.interval },
      };

    case "deleteInterval":
      return {
        ...state,
        status: "deleteInterval",
        panelData: {
          ...state.panelData,
          status: "closing",
        },
      };

    case "viewInfo":
      return {
        ...state,
        status: "viewInfo",
        panelData: {
          ...state.panelData,
          title: <b>{action.value.title}</b>,
          height: 50,
          status: "opening",
          content: <InfoBox {...action.value} />,
        },
      };

    case "addCompletionInfo.1":
      // Brings up panel to add info
      return {
        ...state,
        status: "addCompletionInfo.1",
        panelData: {
          ...state.panelData,
          height: 40,
          title: "Completion Details",
          status: "opening",
          content: <CompletionInfo />,
        },
        container: { taskId: action.value.taskId, miles: action.value.miles },
      };

    case "addCompletionInfo.2":
      // Submits info
      return {
        ...state,
        status: "addCompletionInfo.2",
        panelData: {
          ...state.panelData,
          status: "closing",
        },
        container: {
          complete: true,
          taskId: action.value.taskId,
          date: action.value.date,
          miles: action.value.miles,
          notes: action.value.notes,
        },
      };

    case "editInfo":
      return {
        ...state,
        status: "editInfo",
        container: { ...action.value },
      };

    case "setStatus":
      return {
        ...state,
        status: null,
      };

    case "reset":
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
