import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import styles from "./_ViewInfoStyles.module.css";
import useInput from "../../../hooks/useInput";
import useEdit from "../../../hooks/useEdit";

import ReactQuill from "react-quill";
import "../../../Styles/react-quill/quill.snow.css";
import "../../../Styles/react-quill/quill.bubble.css";
import modules from "../../../Styles/react-quill/modules";

function QuillContainer({ children }) {
  return (
    <div className={styles.quill_parent}>
      <div className={styles.quill_container}>{children}</div>
    </div>
  );
}

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
  const [notes, setNotes] = useState(info.notes);

  const [edit, handleEdit] = useEdit(id, {
    completionInfo: { complete: true, date, miles, notes },
  });

  if (edit === false) {
    return (
      <Section title="COMPLETION DETAILS" handleEdit={handleEdit}>
        <div className={styles.wrapper}>
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
              <div className={styles.notes}>
                <QuillContainer>
                  <ReactQuill
                    modules={modules}
                    theme="bubble"
                    value={notes}
                    onChange={setNotes}
                    readOnly={true}
                  />
                </QuillContainer>
              </div>
            </div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="COMPLETION DETAILS" handleEdit={handleEdit}>
      <div className={styles.wrapper}>
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
              <QuillContainer>
                <ReactQuill
                  modules={modules}
                  theme="snow"
                  value={notes}
                  onChange={setNotes}
                />
              </QuillContainer>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}

function Intructions({ id, info }) {
  const [instructions, setInstructions] = useState(info);
  const [edit, handleEdit] = useEdit(id, { instructions });

  if (edit === false) {
    return (
      <Section title="INSTRUCTIONS" handleEdit={handleEdit}>
        <QuillContainer>
          <ReactQuill
            modules={modules}
            theme="bubble"
            value={instructions}
            onChange={setInstructions}
            readOnly={true}
          />
        </QuillContainer>
      </Section>
    );
  }

  return (
    <Section title="INSTRUCTIONS" handleEdit={handleEdit}>
      <QuillContainer>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={instructions}
          onChange={setInstructions}
        />
      </QuillContainer>
    </Section>
  );
}

function Notes({ id, info }) {
  const [notes, setNotes] = useState(info);
  const [edit, handleEdit] = useEdit(id, { notes });

  if (edit === false) {
    return (
      <Section title="NOTES" handleEdit={handleEdit}>
        <QuillContainer>
          <ReactQuill
            modules={modules}
            theme="bubble"
            value={notes}
            onChange={setNotes}
            readOnly={true}
          />
        </QuillContainer>
      </Section>
    );
  }

  return (
    <Section title="NOTES" handleEdit={handleEdit}>
      <QuillContainer>
        <ReactQuill
          modules={modules}
          theme="snow"
          value={notes}
          onChange={setNotes}
        />
      </QuillContainer>
    </Section>
  );
}

export default function ViewInfo({ id, miles, title, info }) {
  return (
    <div className={styles.main_main}>
      {info.completionInfo.complete === true ? (
        <CompletionDetails id={{ id, miles }} info={info.completionInfo} />
      ) : null}
      <Intructions id={{ id, miles }} info={info.instructions} />
      <Notes id={{ id, miles }} info={info.notes} />
    </div>
  );
}
