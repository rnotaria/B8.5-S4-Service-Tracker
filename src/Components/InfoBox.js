import React from "react";
import styled from "styled-components";

const SectionHeader = styled.div`
  display: flex;
  justify-content: center;

  font-weight: bold;
`;

const SectionDivider = styled.div`
  margin-bottom: 50px;
`;

function Intructions() {
  return (
    <SectionDivider>
      <SectionHeader>INSTRUCTIONS</SectionHeader>

      <hr />
    </SectionDivider>
  );
}

function Videos() {
  return (
    <SectionDivider>
      <SectionHeader>VIDEOS</SectionHeader>

      <hr />
    </SectionDivider>
  );
}

function Links() {
  return (
    <SectionDivider>
      <SectionHeader>LINKS</SectionHeader>

      <hr />
    </SectionDivider>
  );
}

function Notes() {
  return (
    <SectionDivider>
      <SectionHeader>NOTES</SectionHeader>

      <hr />
    </SectionDivider>
  );
}

export default function InfoBox({ miles, completionInfo, info, title }) {
  // console.log(miles);
  // console.log(completionInfo);
  // console.log(info.instructions);

  return (
    <div>
      {completionInfo.complete === true ? (
        <div>
          {"Completed on " +
            completionInfo.date +
            " at " +
            completionInfo.miles +
            "miles"}
        </div>
      ) : null}
      <Intructions instructions={info.instructions} />
      <Videos videos={info.videos} />
      <Links links={info.links} />
      <Notes notes={info.notes} />
    </div>
  );
}
