import React, { useState, useEffect } from "react";
import SlidingPane from "../utils/react-sliding-pane/react-sliding-pane";
import styled, { keyframes } from "styled-components";
import "../utils/react-sliding-pane/react-sliding-pane.css";

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

const closedButtonStyle = () => ({
  position: "absolute",
  left: "50%",
  bottom: "0",
  transform: "translate(-50%)",
  zIndex: 1,
});

const openedButtonStyle = (height) => ({
  position: "absolute",
  left: "50%",
  bottom: height,
  transform: "translate(-50%)",
  zIndex: 1,
});

export default function BottomPane({ height, marginTop, delay = 0.5 }) {
  console.log("BottomPane");

  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [closed, setClosed] = useState(true);

  const renderButton = () => {
    var buttonJSX;
    if (open === false && opened === false && closed === true) {
      buttonJSX = (
        <div style={closedButtonStyle()}>
          <button
            onClick={() => {
              setOpen(true);
              setClosed(false);
            }}
          >
            Click1
          </button>
        </div>
      );
    } else if (open === true && opened === false && closed === false) {
      buttonJSX = (
        <div style={closedButtonStyle()}>
          <TranslateUp delay={delay} height={height}>
            <button>Click2</button>
          </TranslateUp>
        </div>
      );
    } else if (open === true && opened === true && closed === false) {
      buttonJSX = (
        <div style={openedButtonStyle(height)}>
          <button
            onClick={() => {
              setOpen(false);
              setOpened(false);
            }}
          >
            Click3
          </button>
        </div>
      );
    } else if (open === false && opened === false && closed === false) {
      console.log("Click4");
      buttonJSX = (
        <div style={closedButtonStyle()}>
          <TranslateDown delay={delay} height={height}>
            <button>Click4</button>
          </TranslateDown>
        </div>
      );
    }

    return buttonJSX;
  };

  useEffect(() => {
    var id;

    if (open === true && opened === false && closed === false) {
      id = window.setTimeout(() => {
        setOpened(true);
      }, delay * 1000);
    } else if (open === false && opened === false && closed === false) {
      id = window.setTimeout(() => {
        setClosed(true);
      }, delay * 1000);
    }
    return () => {
      clearTimeout(id);
    };
  }, [open, opened, closed, delay]);

  return (
    <div>
      {renderButton()}
      <SlidingPane
        from="bottom"
        className="some-custom-class"
        overlayClassName="some-custom-overlay-class"
        isOpen={open}
        onRequestClose={() => {
          setOpen(false);
        }}
        width="100%"
        height={height}
        marginTop={marginTop}
      >
        <div></div>
      </SlidingPane>
    </div>
  );
}
