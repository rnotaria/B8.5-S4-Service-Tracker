import React, { useReducer } from "react";
import "./index.css";
import RenderXMilageBoxes from "./Components/RenderXMilageBoxes";
import BottomPanel from "./Components/BottomPanel";
import AddTask from "./Components/AddTask";

/* * * * * * * * * * * * * *
 * * * * * CONTEXTS  * * * *
 * * * * * * * * * * * * * */
export const TaskManipulatorContext = React.createContext();

const taskManipulatorInitialState = {
  height: 50,
  open: false,
  panelData: {
    title: "title",
    content: "content",
  },
  taskContainer: null,
};

const taskManipulatorReducer = (state, action) => {
  switch (action.type) {
    case "addTask-botPanel":
      // Brings up bottom panel to add new task
      return {
        ...state,
        open: true,
        panelData: {
          title: "Add Task",
          content: <AddTask />,
        },
      };
    case "addTask-submitTask":
      // Submits task and adds it to list
      console.log(action.value);
      return {
        ...state,
        open: false,
      };
    case "reset":
      // Reset back to initial state
      return taskManipulatorInitialState;
    default:
      return taskManipulatorInitialState;
  }
};

/* * * * * * * * * * * * * *
 * * * MAIN  COMPONENT * * *
 * * * * * * * * * * * * * */
function App() {
  // Contexts
  const [taskManipulatorState, taskManipulatorDispatch] = useReducer(
    taskManipulatorReducer,
    taskManipulatorInitialState
  );

  // console.log(taskManipulatorState.taskContainer);

  return (
    <div>
      <TaskManipulatorContext.Provider
        value={{
          taskManipulatorState,
          taskManipulatorDispatch,
        }}
      >
        <RenderXMilageBoxes currentMiles={5001} numFutureServices={10} />
        <BottomPanel {...taskManipulatorState} />
      </TaskManipulatorContext.Provider>
    </div>
  );
}

export default App;
