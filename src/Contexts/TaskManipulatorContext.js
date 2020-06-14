import React, { useReducer } from "react";
import AddTask from "../Components/dnd_components/AddTask";

export const TaskManipulatorContext = React.createContext();

const taskManipulatorInitialState = {
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

const taskManipulatorReducer = (state, action) => {
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

    case "reset":
      // Reset back to initial state
      return taskManipulatorInitialState;
    default:
      return taskManipulatorInitialState;
  }
};

export const TaskManipulatorContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    taskManipulatorReducer,
    taskManipulatorInitialState
  );

  return (
    <TaskManipulatorContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </TaskManipulatorContext.Provider>
  );
};
