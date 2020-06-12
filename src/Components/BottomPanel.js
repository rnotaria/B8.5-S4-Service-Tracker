import React, { useEffect, useReducer, useContext } from "react";
import SlidingPane from "../utils/react-sliding-pane/react-sliding-pane";
import styled, { keyframes } from "styled-components";
import "../utils/react-sliding-pane/react-sliding-pane.css";
import { FaChevronUp } from "react-icons/fa";
import { TaskManipulatorContext } from "../App";

/* * * * * * * * * * * * * *
 * * * * * STYLES  * * * * *
 * * * * * * * * * * * * * */
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

/* * * * * * * * * * * * * *
 * * * * * REDUCER * * * * *
 * * * * * * * * * * * * * */
const initialState = {
  opened: false,
  closed: true,
  opening: false,
  closing: false,
};

const reducer = (state, action) => {
  switch (action) {
    case "closed":
      return { ...state, closing: false, closed: true };
    case "opening":
      return { ...state, closed: false, opening: true };
    case "opened":
      return { ...state, opening: false, opened: true };
    case "closing":
      return { ...state, opened: false, closing: true };
    default:
      return { ...initialState };
  }
};

/* * * * * * * * * * * * * *
 * * * MAIN FUNCTION * * * *
 * * * * * * * * * * * * * */
export default function BottomPanel({
  height = 50,
  delay = 0.5,
  panelData = { title: "", content: "" },
  open = false,
}) {
  // console.log(open);

  // Contexts
  const taskManipulatorContext = useContext(TaskManipulatorContext);

  // Set State
  const [isOpen, dispatch] = useReducer(reducer, {
    ...initialState,
    opening: open,
    closed: !open,
  });

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
          <TranslateUp delay={delay} height={height + "vh"}>
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
          style={openedButtonPosition(height + "vh")}
          onClick={() => {
            dispatch("closing");
            taskManipulatorContext.taskManipulatorDispatch({ type: "reset" });
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
          <TranslateDown delay={delay} height={height + "vh"}>
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

  // useEffects
  useEffect(() => {
    var id;
    if (isOpen.opening === true) {
      id = window.setTimeout(() => {
        dispatch("opened");
      }, delay * 1000);
    } else if (isOpen.closing === true) {
      id = window.setTimeout(() => {
        dispatch("closed");
      }, delay * 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [isOpen.opening, isOpen.closing, delay]);

  useEffect(() => {
    open === true ? dispatch("opening") : dispatch("closing");
  }, [open]);

  // Render
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
          taskManipulatorContext.taskManipulatorDispatch({ type: "reset" });
        }}
        width="100%"
        height={height + "vh"}
      >
        {panelData.content}
      </SlidingPane>
    </div>
  );
}
