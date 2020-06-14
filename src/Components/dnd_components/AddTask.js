import React, { useState, useContext } from "react";
import { TaskManipulatorContext } from "../../Contexts/TaskManipulatorContext";

export default function AddTask() {
  const [task, setTask] = useState("");

  const taskManipulatorContext = useContext(TaskManipulatorContext);

  return (
    <div>
      <input
        type="text"
        placeholder="Add Task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        onClick={() => {
          taskManipulatorContext.dispatch({
            type: "addTask-submitTask",
            value: task,
          });
        }}
      >
        Submit
      </button>
    </div>
  );
}
