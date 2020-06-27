import styled from "styled-components";

export const TaskContainer = styled.div`
  border: ${(props) =>
    props.isDragging ? "1px solid lightgreen" : "1px solid lightgrey"};
  border-radius: 100px;
  overflow: hidden;

  background-color: ${(props) => props.bgColor};
  transition: background-color 1s ease-in-out;
  padding-top: 8px;
  padding-bottom: 8px;
  margin: 5px;

  font-weight: bold;
  font-size: 16px;
  text-align: center;

  user-select: none;
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TrashStyle = {
  color: "rgb(225,0,0)",
  cursor: "pointer",
  padding: "4px",
};

export const iconStyle = {
  paddingLeft: "12px",
  paddingRight: "12px",
};

export const infoStyle = {
  paddingLeft: "12px",
  paddingRight: "12px",
  cursor: "pointer",
};
