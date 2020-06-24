import React from "react";
import AddServiceInterval from "./AddServiceInterval";
import DeleteServiceInterval from "./DeleteServiceInterval";

export default function DefaultPanelContent() {
  return (
    <div>
      <AddServiceInterval />
      <DeleteServiceInterval />
    </div>
  );
}
