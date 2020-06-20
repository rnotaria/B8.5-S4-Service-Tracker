import React from "react";
import AddServiceInterval from "./AddServiceInterval";
import DeleteServiceInterval from "./DeleteServiceInterval";

export default function DefaultPanelOptions() {
  return (
    <div>
      <AddServiceInterval />
      <DeleteServiceInterval />
    </div>
  );
}
