import React, { useState, useEffect, useReducer, useContext } from "react";
import SlidingPane from "./react-sliding-pane/react-sliding-pane";
import "./react-sliding-pane/react-sliding-pane.css";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
// import getDate from "../utils/getDate";
import PanelButton from "./PanelButton";

export default function BottomPanel({
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
        // If Completion Info panel was prematurely closed, autofill values before resetting context
        // FIND A WAY TO BETTER IMPLEMENT THIS!!!!!
        // if (
        //   maintenanceTrackerContext.state.status === "addCompletionInfo.1"
        // ) {
        //   maintenanceTrackerContext.dispatch({
        //     type: "addCompletionInfo.2",
        //     value: {
        //       date: getDate(),
        //       miles: maintenanceTrackerContext.state.container.miles,
        //       notes: "",
        //       taskId: maintenanceTrackerContext.state.container.taskId,
        //     },
        //   });
        // }
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
