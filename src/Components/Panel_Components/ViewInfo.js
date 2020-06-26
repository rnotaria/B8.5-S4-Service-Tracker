import React from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "../../Styles/ViewInfo.module.css";
import useInput from "../../hooks/useInput";
import useTextArea from "../../hooks/useTextArea";
import useEdit from "../../hooks/useEdit";

import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import "../../Styles/react-quill/quill.snow.css";
import modules from "../../Styles/react-quill/modules";

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
  const [date, dateInput] = useInput(info.date);
  const [miles, milesInput] = useInput(info.miles);
  const [notes, notesInput] = useTextArea(
    info.notes,
    "Enter relevant completion notes such as cost, material used, etc."
  );

  const [edit, handleEdit] = useEdit(id, {
    completionInfo: { complete: true, date, miles, notes },
  });

  if (edit === true) {
    return (
      <Section title="COMPLETION DETAILS" handleEdit={handleEdit}>
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
            <div className={styles.notesEdit}>{notesInput}</div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="COMPLETION DETAILS" handleEdit={handleEdit}>
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

function Intructions({ id, info }) {
  const [instructions, instructionsInput] = useTextArea(
    info,
    "Add instructions..."
  );
  const [edit, handleEdit] = useEdit(id, { instructions });

  if (edit === false) {
    return (
      <Section title="INSTRUCTIONS" handleEdit={handleEdit}>
        <div className={styles.quill}>
          <ReactQuill modules={modules} theme="snow" />
        </div>
      </Section>
    );
  }

  return (
    <Section title="INSTRUCTIONS" handleEdit={handleEdit}>
      <div className={styles.instructions}>{instructions}</div>
    </Section>
  );
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

export default function ViewInfo({ id, miles, title, info }) {
  return (
    <div>
      {info.completionInfo.complete === true ? (
        <CompletionDetails id={{ id, miles }} info={info.completionInfo} />
      ) : null}
      <Intructions id={{ id, miles }} info={info.instructions} />
      <Videos videos={info.videos} />
      <Links links={info.links} />
      <Notes notes={info.notes} />
    </div>
  );
}
