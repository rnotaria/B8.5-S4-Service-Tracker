import React, { useState, useContext, useEffect, useRef } from "react";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import styles from "../../Styles/Panel_Styles/AddCompletionInfo.module.css";
import getDate from "../../utils/getDate";
import useInput from "../../hooks/useInput";

import ReactQuill from "react-quill";
import "../../Styles/react-quill/quill.snow.css";
import "../../Styles/react-quill/quill.bubble.css";
import modules from "../../Styles/react-quill/modules";

export default function CompletionInfo({ taskId, intervalMiles }) {
  const didMount = useRef(false);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [date, dateInput] = useInput(getDate());
  const [miles, milesInput] = useInput(intervalMiles);
  const [notes, setNotes] = useState("");

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
      <div className={styles.row}>
        <div className={styles.column1}>Notes:</div>
        <div className={styles.notes_edit}>
          <ReactQuill
            modules={modules}
            theme="snow"
            value={notes}
            onChange={setNotes}
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
