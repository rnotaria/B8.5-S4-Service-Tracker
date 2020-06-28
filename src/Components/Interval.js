import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import styles from "../Styles/Interval.module.css";
import Collapsible from "react-collapsible";
import Board from "./DragDrop_Components/Board";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

function Interval({ miles, serviceData, open, handleSetOpenBox }) {
  // console.log("Rendering milagebox");
  const newTaskId = useRef(0);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const [data, setData] = useState({ ...serviceData });

  console.log(JSON.stringify(dataContext, null, 2));

  // Render new task if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.status === "addTask" &&
      maintenanceTrackerContext.state.container.miles === miles
    ) {
      newTaskId.current = newTaskId.current + 1;

      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          ["newTask" + newTaskId.current]: {
            id: "newTask" + newTaskId.current,
            title: maintenanceTrackerContext.state.container.newTask,
            info: {
              subtitle: null,
              instructions: null,
              links: null,
              videos: null,
              notes: null,
              completionInfo: {
                complete: false,
                date: "",
                miles: "",
                notes: "",
              },
            },
          },
        },
        columns: {
          ...prevData.columns,
          [maintenanceTrackerContext.state.container.column.id]: {
            ...prevData.columns[
              maintenanceTrackerContext.state.container.column.id
            ],
            taskIds: ["newTask" + newTaskId.current].concat(
              prevData.columns[
                maintenanceTrackerContext.state.container.column.id
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
      maintenanceTrackerContext.state.status === "deleteTask" &&
      maintenanceTrackerContext.state.container.miles === miles
    ) {
      var newData = JSON.parse(JSON.stringify(data));

      delete newData.tasks[maintenanceTrackerContext.state.container.taskId];

      var newTaskIdsArray =
        newData.columns[maintenanceTrackerContext.state.container.columnId]
          .taskIds;

      newTaskIdsArray.splice(
        newTaskIdsArray.indexOf(
          maintenanceTrackerContext.state.container.taskId
        ),
        1
      );

      maintenanceTrackerContext.dispatch({ type: "reset" });

      setData(newData);
    }
  }, [maintenanceTrackerContext, miles, data]);

  // Edit task properties if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.status === "editInfo" &&
      maintenanceTrackerContext.state.container.id.miles === miles
    ) {
      const taskId = maintenanceTrackerContext.state.container.id.id;
      const newInfo = JSON.parse(
        JSON.stringify(maintenanceTrackerContext.state.container.info)
      );

      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: {
            ...prevData.tasks[taskId],
            info: {
              ...prevData.tasks[taskId].info,
              ...newInfo,
            },
          },
        },
      }));
    }
  }, [maintenanceTrackerContext.state, miles]);

  // Edit completion properties if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.status === "addCompletionInfo.2" &&
      maintenanceTrackerContext.state.container.intervalMiles === miles
    ) {
      const complete = maintenanceTrackerContext.state.container.complete;
      const taskId = maintenanceTrackerContext.state.container.taskId;
      const date = maintenanceTrackerContext.state.container.date;
      const miles = maintenanceTrackerContext.state.container.miles;
      const notes = maintenanceTrackerContext.state.container.notes;

      setData((prevData) => ({
        ...prevData,
        tasks: {
          ...prevData.tasks,
          [taskId]: {
            ...prevData.tasks[taskId],
            info: {
              ...prevData.tasks[taskId].info,
              completionInfo: {
                ...prevData.tasks[taskId].completionInfo,
                complete,
                date,
                miles,
                notes,
              },
            },
          },
        },
      }));
    }
  }, [maintenanceTrackerContext.state, miles]);

  // Update overall data
  useEffect(() => {
    dataContext.dispatch({
      type: "update",
      value: { miles, ...data },
    });
  }, [data, miles]);

  // Update data state when task is moved between columns. Passed as prop to <Board/>
  const updateData = useCallback((data) => {
    setData(data);
  }, []);

  return (
    <div className={styles.container}>
      <Collapsible
        trigger={
          <div className={styles.title}>
            <h2>{miles + " Miles"}</h2>
          </div>
        }
        transitionTime={250}
        onOpening={() => handleSetOpenBox(miles)}
        open={open}
        triggerDisabled={open}
        triggerStyle={!open ? { cursor: "pointer" } : null}
      >
        <Board prop_data={data} miles={miles} updateData={updateData} />
      </Collapsible>
    </div>
  );
}

export default React.memo(Interval);
