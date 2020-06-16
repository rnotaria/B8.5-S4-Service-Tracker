import React, { useState, useContext } from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { TaskManipulatorContext } from "../../Contexts/TaskManipulatorContext";

const ContainerStyle = styled.div`
  margin-top: 10px;
  // margin-bottom: 10px;
  margin-left: 5px;
  margin-right: 5px;
  width: 48%;
  display: flex;
  flex-direction: column;
  background-color: grey;
  border: 2px solid lightgrey;
  border-radius: 10px;

  overflow: hidden;
  user-select: none;
`;
const TitleStyle = styled.h3`
  margin-top: 0;
  margin-bottom: 0px;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
  background-color: rgb(50, 50, 50);
  color: rgb(240, 240, 240);
  border-bottom: 2px solid lightgrey;
`;
const TaskListStyle = styled.div`
  padding: 8px;
  flex-grow: 1;
  min-height: 100px;
`;

const ButtonStyle = {
  width: "30px",
  cursor: "pointer",
};

function Column({ column, tasks, miles }) {
  // console.log("Rendering Column...");

  const taskManipulatorContext = useContext(TaskManipulatorContext);
  const [deleteTask, setDeleteTask] = useState(false);

  const toggleDeleteTask = () => {
    setDeleteTask(!deleteTask);
  };

  return (
    <ContainerStyle>
      <TitleStyle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            style={ButtonStyle}
            onClick={() =>
              taskManipulatorContext.dispatch({
                type: "addTask-botPanel",
                value: {
                  miles,
                  tasks,
                  column,
                },
              })
            }
          >
            +
          </button>
          <div>{column.title}</div>
          <button
            style={{
              ...ButtonStyle,
              backgroundColor: `${
                deleteTask === true ? "rgb(150,150,150" : "rgb(230,230,230"
              }`,
            }}
            onClick={toggleDeleteTask}
          >
            -
          </button>
        </div>
      </TitleStyle>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskListStyle
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
                columnId={column.id}
                miles={miles}
                deleteTask={deleteTask}
              />
            ))}
            {provided.placeholder}
          </TaskListStyle>
        )}
      </Droppable>
    </ContainerStyle>
  );
}

export default React.memo(Column);
