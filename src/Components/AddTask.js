import React, { useState, useContext } from "react";
import { TaskManipulatorContext } from "../App";

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
        onClick={() =>
          taskManipulatorContext.taskManipulatorDispatch({
            type: "addTask-submitTask",
            value: { task },
          })
        }
      >
        Submit
      </button>
    </div>
  );
}
