import React, { useState, useEffect, useRef, useContext } from "react";
import styles from "../../Styles/Task.module.css";
import { Draggable } from "react-beautiful-dnd";
import { FaTrash, FaTools } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

function Task({ task, index, column, columnId, deleteTask, miles }) {
  // console.log(task);
  const [bgColor, setBgColor] = useState("#A9A9A9");
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const isComplete = useRef(false);

  // Side Effect on Task Complete
  useEffect(() => {
    if (isComplete.current === false && column === "Complete") {
      isComplete.current = true;
      setBgColor("green");

      maintenanceTrackerContext.dispatch({
        type: "addCompletionInfo.1",
        value: { taskId: task.id, miles },
      });
    }
  }, [maintenanceTrackerContext, column, task.id, miles]); //ignore dependency warning for now

  return (
    <div className={styles.mainContainer}>
      {deleteTask === true ? (
        <FaTrash
          className={styles.trash}
          onClick={() =>
            maintenanceTrackerContext.dispatch({
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
          <div
            className={
              columnId === "column1"
                ? styles.taskContainer1
                : styles.taskContainer2
            }
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div>
              <FaTools className={styles.icon} />
            </div>
            <div className={styles.ellipsis}>{task.title}</div>
            <div>
              <GoInfo
                className={styles.info}
                onClick={() =>
                  maintenanceTrackerContext.dispatch({
                    type: "viewInfo",
                    value: {
                      ...task,
                      miles: miles,
                    },
                  })
                }
              />
            </div>
          </div>
        )}
      </Draggable>
    </div>
  );
}

export default React.memo(Task);
