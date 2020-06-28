import React, { useState } from "react";
import Task from "./Task";
import styles from "../../Styles/Column.module.css";
import { Droppable } from "react-beautiful-dnd";
import AddTaskButton from "./AddTaskButton";
import DeleteTaskButton from "./DeleteTaskButton";

function Column({ column, tasks, miles }) {
  // console.log("Rendering Column...");
  const [deleteTask, setDeleteTask] = useState(false);

  const toggleDeleteTask = () => {
    setDeleteTask(!deleteTask);
  };

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <AddTaskButton miles={miles} tasks={tasks} column={column} />
        {column.title}
        <DeleteTaskButton
          deleteTask={deleteTask}
          toggleDeleteTask={toggleDeleteTask}
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
                deleteTask={deleteTask}
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
