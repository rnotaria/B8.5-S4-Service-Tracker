import React from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";

const Container = styled.div`
  margin-top: 10px;
  // margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  width: 48%;

  display: flex;
  flex-direction: column;
  background-color: black;
  border: 2px solid lightgrey;
  border-radius: 10px;
  overflow: hidden;
`;
const Title = styled.h3`
  margin-top: 0;
  text-align: center;
  padding: 8px;
  background-color: rgb(50, 50, 50);
  color: rgb(240, 240, 240);
  border-bottom: 2px solid lightgrey;
`;
const TaskList = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

function Column({ column, tasks }) {
  // console.log("rendering column");

  return (
    <Container>
      <Title>{column.title}</Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                column={column.title}
              />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default React.memo(Column)