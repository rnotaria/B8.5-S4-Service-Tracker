import React, { useReducer } from "react";
import AddTask from "../Components/AddTask";
import DefaultPanelOptions from "../Components/DefaultPanelOptions";
import InfoBox from "../Components/InfoBox";

export const MaintenanceTrackerContext = React.createContext();

const maintenanceTrackerInitialState = {
  panelData: {
    height: 15,
    isOpen: "closed",
    open: false,
    title: "OPTIONS",
    content: DefaultPanelOptions(),
  },
  status: null,
  container: null,
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
          isOpen: "opening",
          title: "Add Task",
          content: <AddTask />,
        },
        container: {
          ...state.container,
          ...action.value,
        },
      };

    case "addTask-submitTask":
      // Submits task and adds it to list
      return {
        ...state,
        status: "addTask",
        panelData: {
          ...state.panelData,
          isOpen: "closing",
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
          isOpen: "open",
        },
        container: { interval: action.value.interval },
      };

    case "info":
      const PanelSubtitle = () => {
        return (
          <div>
            {action.value.info.subtitle}
            <button style={{ position: "absolute", right: "30px" }}>
              Edit
            </button>
          </div>
        );
      };

      return {
        ...state,
        status: "info",
        panelData: {
          ...state.panelData,
          title: <b>{action.value.title}</b>,
          subtitle: <PanelSubtitle />,
          height: 50,
          isOpen: "opening",
          content: (
            <InfoBox
              title={action.value.title}
              miles={action.value.title}
              {...action.value.info}
            />
          ),
        },
      };

    case "closing":
      return {
        ...maintenanceTrackerInitialState,
        panelData: {
          ...state.panelData,
          isOpen: "closing",
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
