import React, { useState, useEffect, useContext } from "react";
import SlidingPane from "./react-sliding-pane/react-sliding-pane";
import "./react-sliding-pane/react-sliding-pane.css";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import PanelButton from "./PanelButton";

export default function Panel({
  panelData = {
    height: 10,
    status: "closed",
    title: "",
    subtitle: "",
    content: "",
  },
}) {
  const delay = 0.5;
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const [panelStatus, setPanelStatus] = useState(panelData.status);

  const handleStatus = (action) => {
    setPanelStatus(action);
  };

  // Set state to opened/closed after opening/closing animation is complete
  useEffect(() => {
    var id;
    if (panelStatus === "opening") {
      id = window.setTimeout(() => {
        setPanelStatus("opened");
      }, delay * 1000);
    } else if (panelStatus === "closing") {
      id = window.setTimeout(() => {
        setPanelStatus("closed");
        maintenanceTrackerContext.dispatch({ type: "reset" });
      }, delay * 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [panelStatus, delay, maintenanceTrackerContext]);

  // If prop open status changes, set state to new status and trigger rerender
  useEffect(() => {
    setPanelStatus(panelData.status);
  }, [panelData.status]);

  return (
    <div>
      <PanelButton
        buttonStatus={panelStatus}
        handleStatus={handleStatus}
        panelData={panelData}
      />
      <SlidingPane
        title={panelData.title}
        subtitle={panelData.subtitle}
        from="bottom"
        isOpen={
          panelStatus === "opening" || panelStatus === "opened" ? true : false
        }
        onRequestClose={() => {
          setPanelStatus("closing");
        }}
        height={panelData.height + "vh"}
      >
        {panelData.content}
      </SlidingPane>
    </div>
  );
}
