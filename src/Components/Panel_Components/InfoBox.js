import React, { useState, useContext } from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "../../Styles/InfoBox.module.css";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

function Section({ title, handleEdit, children }) {
  return (
    <div className={styles.section_divider}>
      <div className={styles.section_header}>
        {title}
        <FaRegEdit className={styles.edit_btn} onClick={() => handleEdit()} />
      </div>
      <hr />
      {children}
    </div>
  );
}

function CompletionDetails({ id, info }) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [date, dateInput] = useInput(info.date);
  const [miles, milesInput] = useInput(info.miles);
  const [notes, notesInput] = useTextArea(info.notes);

  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    if (edit === true) {
      maintenanceTrackerContext.dispatch({
        type: "editInfo",
        value: {
          id,
          info: { completionInfo: { complete: true, date, miles, notes } },
        },
      });
    }
    setEdit(!edit);
  };

  if (edit === true) {
    return (
      <Section title="COMPLETION" handleEdit={handleEdit}>
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
            <div className={styles.notes}>{notesInput}</div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="COMPLETION" handleEdit={handleEdit}>
      <div className={styles.main}>
        <div className={styles.row}>
          <div className={styles.column1}>Date:</div>
          <div className={styles.column2}>{date}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.column1}>Miles:</div>
          <div className={styles.column2}>{miles}</div>
        </div>
        <div className={styles.row}>
          <div className={styles.column1}>Notes:</div>
          <div className={styles.notes}>{notes}</div>
        </div>
      </div>
    </Section>
  );
}

function Intructions({ instructions, edit = false }) {
  return <Section title="INSTRUCTIONS">blah</Section>;
}

function Videos() {
  return (
    <div className={styles.section_divider}>
      <div className={styles.section_header}>VIDEOS</div>

      <hr />
    </div>
  );
}

function Links() {
  return (
    <div className={styles.section_divider}>
      <div className={styles.section_header}>LINKS</div>

      <hr />
    </div>
  );
}

function Notes() {
  return (
    <div className={styles.section_divider}>
      <div className={styles.section_header}>NOTES</div>

      <hr />
    </div>
  );
}

export default function InfoBox({ id, miles, title, info }) {
  return (
    <div>
      {info.completionInfo.complete === true ? (
        <CompletionDetails id={{ id, miles }} info={info.completionInfo} />
      ) : null}
      <Intructions instructions={info.instructions} />
      <Videos videos={info.videos} />
      <Links links={info.links} />
      <Notes notes={info.notes} />
    </div>
  );
}
