import React, { useState, useEffect } from "react";
import SlidingPane from "../utils/react-sliding-pane/react-sliding-pane";
import styled, { keyframes } from "styled-components";
import "../utils/react-sliding-pane/react-sliding-pane.css";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

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
  position: "absolute",
  left: "50%",
  bottom: "0",
  transform: "translate(-50%)",
  zIndex: 1,
});

const openedButtonPosition = (height) => ({
  position: "absolute",
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
  border: "1px solid lightgrey",
};

export default function BottomPane({ height, delay = 0.5 }) {
  console.log("BottomPane");

  const [open, setOpen] = useState(false);
  const [opened, setOpened] = useState(false);
  const [closed, setClosed] = useState(true);

  const renderButton = () => {
    var buttonJSX;
    // Currently closed
    if (open === false && opened === false && closed === true) {
      buttonJSX = (
        <div
          style={closedButtonPosition()}
          onClick={() => {
            setOpen(true);
            setClosed(false);
          }}
        >
          <div style={arrowStyle}>
            <FaChevronUp size={20} />
          </div>
        </div>
      );
      // Currently opening
    } else if (open === true && opened === false && closed === false) {
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
      // Currently opened
    } else if (open === true && opened === true && closed === false) {
      buttonJSX = (
        <div
          style={openedButtonPosition(height + "vh")}
          onClick={() => {
            setOpen(false);
            setOpened(false);
          }}
        >
          <div style={arrowStyle}>
            <Rotate start={180} end={180} delay={0}>
              <FaChevronUp size={20} />
            </Rotate>
          </div>
        </div>
      );
      // Currently closing
    } else if (open === false && opened === false && closed === false) {
      console.log("Click4");
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
          setOpened(false);
        }}
        width="100%"
        height={height + "vh"}
        marginTop={100 - height + "vh"}
      >
        <div></div>
      </SlidingPane>
    </div>
  );
}
