import React, { useState, useContext } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import styles from "../../Styles/CompletionInfo.module.css";
import getDate from "../../utils/getDate";

export default function CompletionInfo() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const taskId = maintenanceTrackerContext.state.container.taskId;
  const [date, setDate] = useState(getDate());
  const [miles, setMiles] = useState(
    maintenanceTrackerContext.state.container.miles
  );
  const [notes, setNotes] = useState("");

  const handleSubmit = () => {
    maintenanceTrackerContext.dispatch({
      type: "addCompletionInfo.2",
      value: { date, miles, notes, taskId },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.row}>
        <div className={styles.column1}>Date:</div>
        <div className={styles.column2}>
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column1}>Miles:</div>
        <div className={styles.column2}>
          <input
            value={miles}
            onChange={(e) => {
              setMiles(e.target.value);
            }}
          />
        </div>
      </div>

      <div className={`${styles.row} ${styles.notes}`}>
        <div className={styles.column1}>Notes:</div>
        <div className={styles.column2}>
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            placeholder="Enter relevant completion notes such as cost, material used, etc."
          />
        </div>
      </div>
      <div className={styles.btn_container}>
        <button className={styles.btn} onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
