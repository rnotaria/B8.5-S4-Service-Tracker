import React, { useState } from "react";
import Task from "./Task";
import styles from "./_DragDropStyles.module.css";
import { Droppable } from "react-beautiful-dnd";
import CreateTaskButton from "./CreateTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

function Column({ column, tasks, miles }) {
  // console.log("Rendering Column...");
  const [activateDelete, setActivateDelete] = useState(false);

  const toggleActivateDelete = () => {
    setActivateDelete(!activateDelete);
  };

  return (
    <div className={styles.column_container}>
      <div className={styles.column_title}>
        <CreateTaskButton miles={miles} tasks={tasks} column={column} />
        {column.title}
        <DeleteTaskButton
          activateDelete={activateDelete}
          toggleActivateDelete={toggleActivateDelete}
        />
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={styles.column_taskList}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {tasks.map((task, index) => (
              <Task
                key={task.id}
                task={task}
                index={index}
                column={column.title}
                columnId={column.id}
                miles={miles}
                activateDelete={activateDelete}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
}

export default React.memo(Column);
