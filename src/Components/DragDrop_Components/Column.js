import React, { useState } from "react";
import Task from "./Task";
import styles from "../../Styles/DragDrop_Styles/Column.module.css";
import { Droppable } from "react-beautiful-dnd";
import AddTaskButton from "./AddTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

function Column({ column, tasks, miles }) {
  // console.log("Rendering Column...");
  const [activateDelete, setActivateDelete] = useState(false);

  const toggleActivateDelete = () => {
    setActivateDelete(!activateDelete);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <AddTaskButton miles={miles} tasks={tasks} column={column} />
        {column.title}
        <DeleteTaskButton
          activateDelete={activateDelete}
          toggleActivateDelete={toggleActivateDelete}
        />
      </div>
      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            className={styles.taskList}
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
