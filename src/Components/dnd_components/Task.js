import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskContainer = styled.div`
  border: ${(props) =>
    props.isDragging ? "1px solid lightgreen" : "1px solid lightgrey"};
  border-radius: 100px;
  overflow: hidden;

  background-color: ${(props) => props.bgColor};
  transition: background-color 1s ease-in-out;
  padding: 8px;
  margin-bottom: 8px;

  font-weight: bold;
  text-align: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
`;

function Task({ task, index, column }) {
  console.log("rendering Task");
  const [bgColor, setBgColor] = useState("#A9A9A9");

  useEffect(
    (bgColor) => {
      if (column === "Complete") {
        setBgColor("green");
      }
    },
    [column, bgColor]
  );

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          column={column}
          bgColor={bgColor}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
}

export default React.memo(Task);