import React, { useContext } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import styles from "../../Styles/DragDrop_Styles/addDeleteTaskButtons.module.css";

export default function AddTaskButton({ miles, tasks, column }) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <div className={styles.add}>
      <button
        onClick={() =>
          maintenanceTrackerContext.dispatch({
            type: "addTask.1",
            value: {
              miles,
              tasks,
              column,
            },
          })
        }
      >
        +
      </button>
    </div>
  );
}
