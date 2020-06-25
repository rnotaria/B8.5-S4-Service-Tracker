import React, { useContext, useEffect, useRef } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import styles from "../../Styles/AddCompletionInfo.module.css";
import getDate from "../../utils/getDate";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";

export default function CompletionInfo({ taskId, intervalMiles }) {
  const didMount = useRef(false);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [date, dateInput] = useInput(getDate());
  const [miles, milesInput] = useInput(intervalMiles);
  const [notes, notesInput] = useTextArea();

  const handleSubmit = () => {
    maintenanceTrackerContext.dispatch({
      type: "addCompletionInfo.2",
      value: { taskId, intervalMiles, date, miles, notes },
    });
  };

  // If panel is prematurely closed, update task to default values
  useEffect(() => {
    if (didMount.current === false) {
      didMount.current = true;
      maintenanceTrackerContext.dispatch({
        type: "editInfo",
        value: {
          id: { id: taskId, miles: intervalMiles },
          info: {
            completionInfo: {
              complete: true,
              date: getDate(),
              miles: intervalMiles,
              notes: "",
            },
          },
        },
      });
    }
  }, [didMount, maintenanceTrackerContext, taskId, intervalMiles]);

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.column1}>Date:</div>
        <div className={styles.column2}>{dateInput}</div>
      </div>
      <div className={styles.row}>
        <div className={styles.column1}>Miles:</div>
        <div className={styles.column2}>{milesInput}</div>
      </div>
      <div className={`${styles.row} ${styles.notes}`}>
        <div className={styles.column1}>Notes:</div>
        <div className={styles.column2}>{notesInput}</div>
      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
