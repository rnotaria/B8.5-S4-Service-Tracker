import React, { useContext } from "react";
import RenderXMilageBoxes from "./RenderXMilageBoxes";
import BottomPanel from "./BottomPanel";
import { TaskManipulatorContext } from "../Contexts/TaskManipulatorContext";

export default function MaintenancePage() {
  const taskManipulatorContext = useContext(TaskManipulatorContext);

  return (
    <div>
      <RenderXMilageBoxes currentMiles={5001} numFutureServices={5} />
      <BottomPanel panelData={taskManipulatorContext.state.panelData} />
    </div>
  );
}
