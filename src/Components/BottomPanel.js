import React, { useEffect, useReducer, useContext } from "react";
import SlidingPane from "../Components/react-sliding-pane/react-sliding-pane";
import "../Components/react-sliding-pane/react-sliding-pane.css";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import getDate from "../utils/getDate";
import PanelButton from "./PanelButton";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * REDUCER * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const initialState = {
  opened: false,
  closed: false,
  opening: false,
  closing: false,
};

const reducer = (state, action) => {
  switch (action) {
    case "closed":
      return { opening: false, opened: false, closing: false, closed: true };
    case "opening":
      return { opening: true, opened: false, closing: false, closed: false };
    case "opened":
      return { opening: false, opened: true, closing: false, closed: false };
    case "closing":
      return { opening: false, opened: false, closing: true, closed: false };
    default:
      return { ...initialState };
  }
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * MAIN COMPONENT  * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
export default function BottomPanel({
  delay = 0.5,
  panelData = {
    height: 10,
    isOpened: "closed",
    title: "",
    subtitle: "",
    content: "",
  },
}) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [isOpen, dispatch] = useReducer(reducer, {
    ...initialState,
    [panelData.isOpen]: true,
  });

  const passDispatch = (action) => {
    dispatch(action);
  };

  // Set state to opened/closed after opening/closing animation is complete
  useEffect(() => {
    var id;
    if (isOpen.opening === true) {
      id = window.setTimeout(() => {
        dispatch("opened");
      }, delay * 1000);
    } else if (isOpen.closing === true) {
      id = window.setTimeout(() => {
        // If Completion Info panel was prematurely closed, autofill values before resetting context
        if (
          maintenanceTrackerContext.state.status === "completionInfo-addInfo"
        ) {
          maintenanceTrackerContext.dispatch({
            type: "completionInfo-submitInfo",
            value: {
              date: getDate(),
              miles: maintenanceTrackerContext.state.container.miles,
              notes: "",
              taskId: maintenanceTrackerContext.state.container.taskId,
            },
          });
        }
        dispatch("closed");
        maintenanceTrackerContext.dispatch({ type: "reset" });
      }, delay * 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isOpen, delay, maintenanceTrackerContext]);

  useEffect(() => {
    dispatch(panelData.isOpen);
  }, [panelData.isOpen]);

  return (
    <div>
      <PanelButton
        isOpen={isOpen}
        dispatch={passDispatch}
        panelData={panelData}
        delay={delay}
      />
      <SlidingPane
        title={panelData.title}
        subtitle={panelData.subtitle}
        from="bottom"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen.opening || isOpen.opened}
        onRequestClose={() => {
          dispatch("closing");
        }}
        height={panelData.height + "vh"}
      >
        {panelData.content}
      </SlidingPane>
    </div>
  );
}
