import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash } from "react-icons/fa";

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const TaskContainer = styled.div`
  border: ${(props) =>
    props.isDragging ? "1px solid lightgreen" : "1px solid lightgrey"};
  border-radius: 100px;
  overflow: hidden;

  background-color: ${(props) => props.bgColor};
  transition: background-color 1s ease-in-out;
  padding: 8px;
  margin: 5px;

  font-weight: bold;
  text-align: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;

  flex: 1;
`;

const TrashStyle = {
  color: "rgb(225,0,0)",
  cursor: "pointer",
  padding: "4px",
};

function Task({ task, index, column, deleteTask }) {
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
    <Container>
      {deleteTask === true ? <FaTrash style={TrashStyle} /> : null}
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={deleteTask}
      >
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
    </Container>
  );
}

export default React.memo(Task);
