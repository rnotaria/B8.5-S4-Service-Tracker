import styled, { keyframes } from "styled-components";

const translateUp = (height) => keyframes`
from {
  transform: translateY(0);
}
to {
  transform: translateY(-${height});
}
`;
export const TranslateUp = styled.div`
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

export const TranslateDown = styled.div`
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

export const Rotate = styled.div`
  animation: ${(props) => rotate(props.start, props.end)}
    ${(props) => props.delay}s linear forwards;
`;

// Styled Objects
export const closedButtonPosition = () => ({
  position: "fixed",
  left: "50%",
  bottom: "0px",
  transform: "translate(-50%)",
  zIndex: 5,
});

export const openedButtonPosition = (height) => ({
  position: "fixed",
  left: "50%",
  bottom: height,
  transform: "translate(-50%)",
  zIndex: 5,
});
