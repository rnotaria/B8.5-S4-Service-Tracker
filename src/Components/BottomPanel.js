import React, { useEffect, useReducer, useContext } from "react";
import SlidingPane from "../Components/react-sliding-pane/react-sliding-pane";
import styled, { keyframes } from "styled-components";
import "../Components/react-sliding-pane/react-sliding-pane.css";
import { FaChevronUp } from "react-icons/fa";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * STYLES  * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
// Translate Up Styled Component
const translateUp = (height) => keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(-${height});
}
`;
const TranslateUp = styled.div`
  // display: inline-block;
  animation: ${(props) => translateUp(props.height)} ${(props) => props.delay}s
    ease forwards;
`;

// Translate Down Styled Component
const translateDown = (height) => keyframes`
from {
  transform: translateY(-${height});
}
to {
  transform: translateY(0);
}
`;

const TranslateDown = styled.div`
  // display: inline-block;
  animation: ${(props) => translateDown(props.height)}
    ${(props) => props.delay}s;
`;

// Rotate Styled Component
const rotate = (start, end) => keyframes`
  from {
    transform: rotate(${start}deg);
  }
  to {
    transform: rotate(${end}deg);
  }
`;

const Rotate = styled.div`
  animation: ${(props) => rotate(props.start, props.end)}
    ${(props) => props.delay}s linear forwards;
`;

// Styled Objects
const closedButtonPosition = () => ({
  position: "fixed",
  left: "50%",
  bottom: "0px",
  transform: "translate(-50%)",
  zIndex: 1,
});

const openedButtonPosition = (height) => ({
  position: "fixed",
  left: "50%",
  bottom: height,
  transform: "translate(-50%)",
  zIndex: 1,
});

const arrowStyle = {
  paddingLeft: "15px",
  paddingRight: "15px",
  paddingTop: "0px",
  paddingBottom: "0px",

  background: "rgba(230,230,230,1)",
  color: "rgb(255,0,0)",
  borderLeft: "2px solid grey",
  borderRight: "2px solid grey",
  borderTop: "2px solid grey",

  cursor: "pointer",
};

/* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * REDUCER * * * * * * * * * * * * * *
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
const initialState = {
  opened: false,
  closed: true,
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
  panelData = { height: 10, open: false, title: "", content: "" },
}) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [isOpen, dispatch] = useReducer(reducer, initialState);

  // Condition render button to follow pane on open/close
  const renderButton = () => {
    var buttonJSX;
    if (isOpen.closed === true) {
      buttonJSX = (
        <div style={closedButtonPosition()} onClick={() => dispatch("opening")}>
          <div style={arrowStyle}>
            <FaChevronUp size={20} />
          </div>
        </div>
      );
    } else if (isOpen.opening === true) {
      buttonJSX = (
        <div style={closedButtonPosition()}>
          <TranslateUp delay={delay} height={panelData.height + "vh"}>
            <div style={arrowStyle}>
              <Rotate start={0} end={180} delay={delay}>
                <FaChevronUp size={20} />
              </Rotate>
            </div>
          </TranslateUp>
        </div>
      );
    } else if (isOpen.opened === true) {
      buttonJSX = (
        <div
          style={openedButtonPosition(panelData.height + "vh")}
          onClick={() => {
            dispatch("closing");
          }}
        >
          <div style={arrowStyle}>
            <Rotate start={180} end={180} delay={0}>
              <FaChevronUp size={20} />
            </Rotate>
          </div>
        </div>
      );
    } else if (isOpen.closing === true) {
      buttonJSX = (
        <div style={closedButtonPosition()}>
          <TranslateDown delay={delay} height={panelData.height + "vh"}>
            <div style={arrowStyle}>
              <Rotate start={180} end={360} delay={delay}>
                <FaChevronUp size={20} />
              </Rotate>
            </div>
          </TranslateDown>
        </div>
      );
    }

    return buttonJSX;
  };

  /* * * * * * * * * * * * * * * * * * * *
   * * * * * * * useEffects  * * * * * * *
   * * * * * * * * * * * * * * * * * * * */
  // used to set state to opened/closed after opening/closing animation is complete
  useEffect(() => {
    var id;
    if (isOpen.opening === true) {
      id = window.setTimeout(() => {
        dispatch("opened");
      }, delay * 1000);
    } else if (isOpen.closing === true) {
      id = window.setTimeout(() => {
        dispatch("closed");
        maintenanceTrackerContext.dispatch({ type: "reset" });
      }, delay * 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isOpen, delay, maintenanceTrackerContext]);

  useEffect(() => {
    if (panelData.open === true) {
      dispatch("opening");
    }
    if (panelData.closing === true) {
      dispatch("closing");
    }
  }, [panelData.open, panelData.closing]);

  /* * * * * * * * * * * * * * * * * * * *
   * * * * * * * * RENDER  * * * * * * * *
   * * * * * * * * * * * * * * * * * * * */
  return (
    <div>
      {renderButton()}
      <SlidingPane
        title={panelData.title}
        from="bottom"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={isOpen.opening || isOpen.opened}
        onRequestClose={() => {
          dispatch("closing");
        }}
        width="100%"
        height={panelData.height + "vh"}
      >
        {panelData.content}
      </SlidingPane>
    </div>
  );
}
