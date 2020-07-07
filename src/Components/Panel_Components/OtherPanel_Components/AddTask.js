import React, { useState, useContext, useEffect } from "react";
import { MaintenanceTrackerContext } from "../../../Contexts/MaintenanceTrackerContext";
import commonStyles from "../../../Styles/commonStyles.module.css";

export default function AddTask() {
  const [task, setTask] = useState("");

  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        maintenanceTrackerContext.dispatch({
          type: "addTask.2",
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
        className={commonStyles.input}
        style={{ marginRight: "8px" }}
        autoFocus={true}
        type="text"
        id="addText"
        placeholder="Enter new task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button
        className={commonStyles.button}
        type="submit"
        onClick={() => {
          maintenanceTrackerContext.dispatch({
            type: "addTask.2",
            value: task,
          });
        }}
      >
        Add Task
      </button>
    </div>
  );
}
