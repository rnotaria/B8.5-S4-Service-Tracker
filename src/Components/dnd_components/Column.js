import React, { useContext } from "react";
import Task from "./Task";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { TaskManipulatorContext } from "../../App";

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
`;
const TitleStyle = styled.h3`
  margin-top: 0;
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

function Column({ column, tasks, miles }) {
  // console.log("Rendering Column...");

  const taskManipulatorContext = useContext(TaskManipulatorContext);

  // const [column, setColumn] = useState(_column);
  // const [tasks, setTasks] = useState(_tasks);

  // console.log(column);

  // const t1 = [
  //   {
  //     id: "task10",
  //     content:
  //       "Battery - Check for clean terminals (no corrosion), properly mounted housing and no damage; replace if necessary.",
  //   },
  // ];

  // const c1 = {
  //   id: "column1",
  //   title: "Complete",
  //   taskIds: ["task10"],
  // };

  // const temp = () => {
  //   setTasks(t1);
  //   setColumn(c1);
  // };

  // console.log(column);

  return (
    <ContainerStyle>
      <TitleStyle>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
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
          <button>-</button>
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
              />
            ))}
            {/* {tasks.map((task, index) => (
              <Task
                key={task.id + "2"}
                task={{ ...task, id: task.id + "2" }}
                index={index + 5}
                column={column.title}
              />
            ))} */}
            {provided.placeholder}
          </TaskListStyle>
        )}
      </Droppable>
    </ContainerStyle>
  );
}

export default React.memo(Column);
