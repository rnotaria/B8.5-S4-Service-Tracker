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

export default function InfoBox({ instructions, videos, links, notes }) {
  return (
    <div>
      <Intructions instructions={instructions} />
      <Videos videos={videos} />
      <Links links={links} />
      <Notes notes={notes} />
    </div>
  );
}
