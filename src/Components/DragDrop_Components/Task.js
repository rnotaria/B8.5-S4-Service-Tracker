import React, { useEffect, useRef, useContext } from "react";
import styles from "../../Styles/DragDrop_Styles/Task.module.css";
import { Draggable } from "react-beautiful-dnd";
import { FaTools } from "react-icons/fa";
import { GoInfo } from "react-icons/go";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";

function Task({ task, index, column, columnId, activateDelete, miles }) {
  // console.log(task);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const isComplete = useRef(false);

  const handleDelete = () => {
    maintenanceTrackerContext.dispatch({
      type: "deleteTask",
      value: {
        miles,
        taskId: task.id,
        columnId,
      },
    });
  };

  // Side Effect on Task Complete
  useEffect(() => {
    if (isComplete.current === false && column === "Complete") {
      isComplete.current = true;
      maintenanceTrackerContext.dispatch({
        type: "addCompletionInfo.1",
        value: { taskId: task.id, miles },
      });
    }
  }, [maintenanceTrackerContext, column, task.id, miles]); //ignore dependency warning for now

  return (
    <div className={styles.mainContainer}>
      <Draggable
        draggableId={task.id}
        index={index}
        isDragDisabled={activateDelete || column === "Complete"}
      >
        {(provided, snapshot) => (
          <div
            className={`
              ${
                columnId === "column1"
                  ? styles.taskContainer1
                  : styles.taskContainer2
              } ${activateDelete === true ? styles.deleteActive : null}
            `}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            onClick={activateDelete === true ? () => handleDelete() : null}
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
