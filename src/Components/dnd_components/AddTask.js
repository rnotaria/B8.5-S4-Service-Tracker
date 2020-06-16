import React, { useState, useContext, useEffect } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

export default function AddTask() {
  const [task, setTask] = useState("");

  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        maintenanceTrackerContext.dispatch({
          type: "addTask-submitTask",
          value: task,
        });
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [task, maintenanceTrackerContext]);

  return (
    <div>
      <input
        autoFocus={true}
        type="text"
        id="addText"
        placeholder="Enter new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        type="submit"
        onClick={() => {
          maintenanceTrackerContext.dispatch({
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
