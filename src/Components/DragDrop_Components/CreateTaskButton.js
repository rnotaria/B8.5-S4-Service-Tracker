import React, { useContext } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import styles from "./_DragDropStyles.module.css";
import { IoMdAddCircle } from "react-icons/io";

export default function CreateTaskButton({ miles, tasks, column }) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  return (
    <div className={styles.addContainer}>
      <div className={styles.addIconBg} />
      <IoMdAddCircle
        className={styles.addIcon}
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
      />
    </div>
  );
}
