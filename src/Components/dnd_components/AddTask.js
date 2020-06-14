import React, { useState, useContext, useEffect } from "react";
import { TaskManipulatorContext } from "../../Contexts/TaskManipulatorContext";

export default function AddTask() {
  const [task, setTask] = useState("");

  const taskManipulatorContext = useContext(TaskManipulatorContext);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        taskManipulatorContext.dispatch({
          type: "addTask-submitTask",
          value: task,
        });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [task, taskManipulatorContext]);

  return (
    <div>
      <input
        type="text"
        placeholder="Enter new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => {
          taskManipulatorContext.dispatch({
            type: "addTask-submitTask",
            value: task,
          });
        }}
      >
        Add Task
      </button>
    </div>
  );
}
