import React, { useState, useContext } from "react";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

const getDate = () => {
  const today = new Date();
  const dd = today.getDate();
  const mm = today.getMonth();
  const yyyy = today.getFullYear();
  const date = mm + "/" + dd + "/" + yyyy;
  return date;
};

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
    <div>
      <div>
        {"Date: "}
        <input
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
          }}
        />
      </div>
      <div>
        {"Miles: "}
        <input
          value={miles}
          onChange={(e) => {
            setMiles(e.target.value);
          }}
        />
      </div>
      <div>
        {"Notes: "}
        <textarea
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
          }}
          placeholder="Enter relevant completion notes such as cost, material used, etc."
        />
      </div>
      <div>
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}
