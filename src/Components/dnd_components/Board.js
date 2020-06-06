import React, { useState } from "react";
import { getServiceList } from "../../utils/getMaintenanceInfo";
// import "@atlaskit/css-reset";  Do I need this??
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./Column";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

function Board({ milage, currentMiles }) {
  console.log("rendering Board")
  var init_maintenance = getServiceList(milage);

  const onDragEnd = (result) => {
    document.body.style.color = "inherit";
    document.body.style.backgroundColor = "inherit";

    const { destination, source, draggableId } = result;

    if (!destination) {
      console.log("No destination");
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      // User picked up and dropped item at same location, don't do anything
      return;
    }

    const startColumn = maintenance.columns[source.droppableId];
    const endColumn = maintenance.columns[destination.droppableId];

    if (startColumn === endColumn) {
      const newTaskIds = Array.from(startColumn.taskIds);

      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...startColumn,
        taskIds: newTaskIds,
      };

      const newmaintenance = {
        ...maintenance,
        columns: {
          ...maintenance.columns,
          [newColumn.id]: newColumn,
        },
      };

      setMaintenance(newmaintenance);
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

      const newmaintenance = {
        ...maintenance,
        columns: {
          ...maintenance.columns,
          [newStartColumn.id]: newStartColumn,
          [newEndColumn.id]: newEndColumn,
        },
      };

      setMaintenance(newmaintenance);
    }
  };

  // If previous service, set tasks to complete
  if (milage < currentMiles) {
    init_maintenance = {
      ...init_maintenance,
      columns: {
        ...init_maintenance.columns,
        column1: {
          ...init_maintenance.columns.column1,
          taskIds: [],
        },
        column2: {
          ...init_maintenance.columns.column2,
          taskIds: init_maintenance.columns.column1.taskIds,
        },
      },
    };
  }

  const [maintenance, setMaintenance] = useState(init_maintenance);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Container>
        {maintenance.columnOrder.map((columnId) => {
          const column = maintenance.columns[columnId];
          const tasks = column.taskIds.map(
            (taskId) => maintenance.tasks[taskId]
          );
          return <Column key={column.id} column={column} tasks={tasks} />;
        })}
      </Container>
    </DragDropContext>
  );
}

export default React.memo(Board)