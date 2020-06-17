import React, { useState } from "react";

function AddServiceInterval() {
  const [renderInputField, setRenderInputField] = useState(false);

  if (renderInputField === false) {
    return (
      <button onClick={() => setRenderInputField(true)}>
        Add Service Interval
      </button>
    );
  }

  return (
    <div>
      <input />
    </div>
  );
}

export default function DefaultPanelOptions() {
  return <AddServiceInterval />;
}
