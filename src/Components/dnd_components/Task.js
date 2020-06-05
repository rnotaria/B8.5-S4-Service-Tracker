import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 100px;
  overflow: hidden;
  // transition: background-color 1s ease;
  background-color: ${(props) => (props.isDragging ? "lightgreen" : "#A9A9A9")};

  padding: 8px;
  margin-bottom: 8px;

  font-weight: bold;
  text-align: center;

  white-space: nowrap;
  text-overflow: ellipsis;
  user-select: none;
`;

export default function Task({ task, index }) {
  const isDragDisabled = false;

  return (
    <Draggable
      draggableId={task.id}
      index={index}
      isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <TaskContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
          isDragDisabled={isDragDisabled}
        >
          {task.content}
        </TaskContainer>
      )}
    </Draggable>
  );
}
