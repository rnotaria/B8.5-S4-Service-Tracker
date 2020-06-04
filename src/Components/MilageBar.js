import React from "react";
import styled from "styled-components";
import "../index.css";
import Board from "./Board";

const Container = styled.div`
  background-color: red;
`;

const MilageBarContainer = styled.div`
  display: flex;
  justify-content: center;
  alignitems: "center";
  margin: auto;
  max-width: 1000px;
  line-height: 0;
  background-color: lightgrey;
  border: 2px solid red;
`;

export default function MilageBar() {
  return (
    <Container>
      <MilageBarContainer>
        <h2 className="MilageBarText">55,000 Miles</h2>
      </MilageBarContainer>
      <Board />
    </Container>
  );
}
