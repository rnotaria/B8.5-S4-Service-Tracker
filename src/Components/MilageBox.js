import React, { useState } from "react";
import styled from "styled-components";
import "../index.css";
import { getMilesArray } from "../utils/getMaintenanceInfo";
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
`;

function MilageBox({ currentMiles }) {
  console.log("Rendering milagebox")
  const milesArray = getMilesArray(currentMiles);
  const open = milesArray[0] < currentMiles ? milesArray[1] : milesArray[0];
  const [openMilage, setOpenMilage] = useState(open);

  console.log("rendering milage")
  
  return milesArray.map((milage, index) => (
    <MilageBoxContainer key={index} milage={milage}>      
      <Collapsible
        trigger={
          <MilageBarContainer>
            <h2 className="MilageBarText">{milage + " Miles"}</h2>
          </MilageBarContainer>
        }
        transitionTime={250}
        onOpening={() => setOpenMilage(milage)}
        open={milage === openMilage ? true : false}
        triggerDisabled={milage === openMilage ? true : false}
        triggerStyle={milage !== openMilage ? { cursor: "pointer" } : null}
      >
        milage === openMilage ? <Board milage={milage} currentMiles={currentMiles} /> : null
      </Collapsible>
    </MilageBoxContainer>
  ));
}

export default React.memo(MilageBox)