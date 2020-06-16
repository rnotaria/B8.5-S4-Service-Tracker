import React, { useState, useContext, useEffect, useRef } from "react";
// import "@atlaskit/css-reset";  Do I need this??
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Board({ prop_data, miles }) {
  // console.log("rendering Board");

  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);

  const [data, setData] = useState(prop_data);

  const newTaskId = useRef(0);

  // Render new task if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.newTask === true &&
      maintenanceTrackerContext.state.taskContainer.miles === miles
    ) {
      newTaskId.current = newTaskId.current + 1;

      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          ["newTask" + newTaskId.current]: {
            id: "newTask" + newTaskId.current,
            content: maintenanceTrackerContext.state.taskContainer.newTask,
          },
        },
        columns: {
          ...prevData.columns,
          [maintenanceTrackerContext.state.taskContainer.column.id]: {
            ...prevData.columns[
              maintenanceTrackerContext.state.taskContainer.column.id
            ],
            taskIds: ["newTask" + newTaskId.current].concat(
              prevData.columns[
                maintenanceTrackerContext.state.taskContainer.column.id
              ].taskIds
            ),
          },
        },
      }));
    }
  }, [maintenanceTrackerContext, miles]);

  // Delete task if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.deleteTask === true &&
      maintenanceTrackerContext.state.taskContainer.miles === miles
    ) {
      console.log(miles);
      var newData = JSON.parse(JSON.stringify(data));

      delete newData.tasks[
        maintenanceTrackerContext.state.taskContainer.taskId
      ];

      var newTaskIdsArray =
        newData.columns[maintenanceTrackerContext.state.taskContainer.columnId]
          .taskIds;

      newTaskIdsArray.splice(
        newTaskIdsArray.indexOf(
          maintenanceTrackerContext.state.taskContainer.taskId
        ),
        1
      );

      maintenanceTrackerContext.dispatch({ type: "reset" });

      setData(newData);
    }
  }, [maintenanceTrackerContext, miles, data]);

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // User picked up and dropped item at same location, don't do anything
      return;
    }

    const startColumn = data.columns[source.droppableId];
    const endColumn = data.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newColumn.id]: newColumn,
        },
      };

      setData(newData);
    } else {
      const startColumnTaskIds = Array.from(startColumn.taskIds);
      startColumnTaskIds.splice(source.index, 1);
      const newStartColumn = {
        ...startColumn,
        taskIds: startColumnTaskIds,
      };

      const endColumnTaskIds = Array.from(endColumn.taskIds);
      endColumnTaskIds.splice(destination.index, 0, draggableId);
      const newEndColumn = {
        ...endColumn,
        taskIds: endColumnTaskIds,
      };

      const newData = {
        ...data,
        columns: {
          ...data.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      };

      setData(newData);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {data.columnOrder.map((columnId) => {
          const column = data.columns[columnId];
          const tasks = column.taskIds.map((taskId) => data.tasks[taskId]);
          return (
            <Column
              key={column.id}
              column={column}
              tasks={tasks}
              miles={miles}
            />
          );
        })}
      </Container>
    </DragDropContext>
  );
}

export default React.memo(Board);
