import React, { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import "../Styles/InfoBox.css";

function Section({ title, children }) {
  const [edit, setEdit] = useState(false);
  console.log(edit);

  const handleEdit = () => {};

  return (
    <div className="section-divider">
      <div className="section-header">
        {title}
        <FaRegEdit
          className="edit-btn"
          onClick={(e) => {
            setEdit(!edit);
          }}
        />
      </div>
      <hr />
      {children}
    </div>
  );
}

function CompletionDetails({ info, edit = false }) {
  if (edit === true) {
    return (
      <Section title="COMPLETION">
        <div className="main">
          <div className="row">
            <div className="column1">Date:</div>
            <div className="column2">{info.date}</div>
          </div>
          <div className="row">
            <div className="column1">Miles:</div>
            <div className="column2">{info.miles}</div>
          </div>
          <div className="row">
            <div className="column1">Notes:</div>
            <div className="notes">{info.notes}</div>
          </div>
        </div>
      </Section>
    );
  }

  return (
    <Section title="COMPLETION">
      <div className="main">
        <div className="row">
          <div className="column1">Date:</div>
          <div className="column2">{info.date}</div>
        </div>
        <div className="row">
          <div className="column1">Miles:</div>
          <div className="column2">{info.miles}</div>
        </div>
        <div className="row">
          <div className="column1">Notes:</div>
          <div className="notes">{info.notes}</div>
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
    <div className="section-divider">
      <div className="section-header">VIDEOS</div>

      <hr />
    </div>
  );
}

function Links() {
  return (
    <div className="section-divider">
      <div className="section-header">LINKS</div>

      <hr />
    </div>
  );
}

function Notes() {
  return (
    <div className="section-divider">
      <div className="section-header">NOTES</div>

      <hr />
    </div>
  );
}

export default function InfoBox({ miles, completionInfo, info, title }) {
  // console.log(miles);
  // console.log(completionInfo);
  // console.log(info.instructions);

  return (
    <div>
      {completionInfo.complete === true ? (
        <CompletionDetails info={completionInfo} />
      ) : null}
      <Intructions instructions={info.instructions} />
      <Videos videos={info.videos} />
      <Links links={info.links} />
      <Notes notes={info.notes} />
    </div>
  );
}
