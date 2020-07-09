import React, { useContext } from "react";
import { MaintenanceTrackerContext } from "../../../Contexts/MaintenanceTrackerContext";
import styles from "./AddTaskStyles.module.css";
import useInput from "../../../hooks/useInput";

export default function AddTask() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [task, taskInput] = useInput(
    "",
    "Enter new task",
    undefined,
    undefined,
    true
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    maintenanceTrackerContext.dispatch({
      type: "addTask.2",
      value: task,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.main}>
        {taskInput}
        <button onSubmit={handleSubmit}>Add Task</button>
      </div>
    </form>
  );
}
