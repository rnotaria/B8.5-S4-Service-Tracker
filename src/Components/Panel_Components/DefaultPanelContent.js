import React from "react";
import AddServiceInterval from "./AddServiceInterval";
import DeleteServiceInterval from "./DeleteServiceInterval";
import UpdateCurrentMiles from "./UpdateCurrentMiles";

export default function DefaultPanelContent() {
  return (
    <div>
      <AddServiceInterval />
      <DeleteServiceInterval />
      <UpdateCurrentMiles />
    </div>
  );
}
