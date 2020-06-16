import React from "react";
import styled from "styled-components";
import "../index.css";
import Collapsible from "react-collapsible";
import Board from "./dnd_components/Board";

const MilageBoxContainer = styled.div`
  // background-color: black;
  // border: 1px solid lightgrey;
  // border-radius: 10px;
  padding: 10px;

  // margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  // margin-bot: 10px;
`;

const MilageBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  line-height: 0;

  background-color: grey;
  border: 2px solid lightgrey;
  border-radius: 10px;

  overflow: hidden;
  user-select: none;
`;

function MilageBox({ miles, serviceData, open, handleSetOpenBox }) {
  // console.log("Rendering milagebox");

  return (
    <MilageBoxContainer>
      <Collapsible
        trigger={
          <MilageBarContainer>
            <h2 className="MilageBarText">{miles + " Miles"}</h2>
          </MilageBarContainer>
        }
        transitionTime={250}
        onOpening={() => handleSetOpenBox(miles)}
        open={open}
        triggerDisabled={open}
        triggerStyle={!open ? { cursor: "pointer" } : null}
      >
        <Board prop_data={serviceData} miles={miles} />
      </Collapsible>
    </MilageBoxContainer>
  );
}

export default React.memo(MilageBox);
