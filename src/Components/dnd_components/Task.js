import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash, FaTools } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { TaskManipulatorContext } from "../../Contexts/TaskManipulatorContext";

const MainContainer = styled.div`
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
`;

const Ellipsis = styled.div`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const TrashStyle = {
  color: "rgb(225,0,0)",
  cursor: "pointer",
  padding: "4px",
};

const iconStyle = {
  paddingLeft: "16px",
  paddingRight: "16px",
};

function Task({ task, index, column, columnId, deleteTask, miles }) {
  const [bgColor, setBgColor] = useState("#A9A9A9");
  const taskManipulatorContext = useContext(TaskManipulatorContext);

  useEffect(
    (bgColor) => {
      if (column === "Complete") {
        setBgColor("green");
      }
    },
    [column, bgColor]
  );

  return (
    <MainContainer>
      {deleteTask === true ? (
        <FaTrash
          style={TrashStyle}
          onClick={() =>
            taskManipulatorContext.dispatch({
              type: "deleteTask",
              value: {
                miles,
                taskId: task.id,
                columnId,
              },
            })
          }
        />
      ) : null}
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={deleteTask || column === "Complete"}
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
            <div>
              <FaTools style={iconStyle} />
            </div>
            <Ellipsis>{task.content}</Ellipsis>
            <div>
              <GoInfo style={iconStyle} />
            </div>
          </TaskContainer>
        )}
      </Draggable>
    </MainContainer>
  );
}

export default React.memo(Task);
