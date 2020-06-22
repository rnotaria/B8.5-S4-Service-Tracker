import React, { useState, useContext } from "react";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import "../Styles/CompletionInfo.css";
import getDate from "../utils/getDate";

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
      type: "completionInfo-submitInfo",
      value: { date, miles, notes, taskId },
    });
  };

  return (
    <div className="main">
      <div className="row">
        <div className="column1">Date:</div>
        <div className="column2">
          <input
            value={date}
            onChange={(e) => {
              setDate(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="row">
        <div className="column1">Miles:</div>
        <div className="column2">
          <input
            value={miles}
            onChange={(e) => {
              setMiles(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="row notes">
        <div className="column1">Notes:</div>
        <div className="column2">
          <textarea
            value={notes}
            onChange={(e) => {
              setNotes(e.target.value);
            }}
            placeholder="Enter relevant completion notes such as cost, material used, etc."
          />
        </div>
      </div>
      <div className="btn-container">
        <button className="btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
