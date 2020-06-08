import React, {useState, useRef} from "react";
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
  background-color: grey;
  border: 2px solid lightgrey;
  border-radius: 10px;
  overflow: hidden;
`;
const Title = styled.h3`
  margin-top: 0;
  padding: 8px;
  padding-left: 16px;
  padding-right: 16px;
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
  // const newTaskId = useRef(0)

  // pass info back to Board.js to update data and then pass that back as props to this component

  console.log(tasks)
  const addTask = () => {
  //   newTaskId.current=newTaskId.current+1;
  //   // console.log(column.id+"."+newTaskId.current)
  //   // console.log(column)

  //   // const newTasks = {
  //   //   id: "column2"
  //   //   taskIds: []
  //   //   title: "Complete"
  //   // }
    
  }
  
  return (
    <Container>
      <Title>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <button onClick={addTask}>+</button>
          <div>{column.title}</div>
          <button>-</button>
        </div>
      </Title>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <TaskList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {window.setTimeout(()=>"hi", 5)}
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