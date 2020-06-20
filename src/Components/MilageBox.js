import React, {
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import styled from "styled-components";
import "../index.css";
import Collapsible from "react-collapsible";
import Board from "./dnd_components/Board";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

const MilageBoxContainer = styled.div`
  // background-color: black;
  // border: 1px solid lightgrey;
  // border-radius: 10px;
  padding: 10px;

  // margin-top: 10px;
  margin-left: 50px;
  margin-right: 50px;
  // margin-bot: 10px;
`;

const MilageBarContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  line-height: 0;

  background-color: grey;
  border: 2px solid lightgrey;
  border-radius: 10px;

  overflow: hidden;
  user-select: none;
`;

function MilageBox({ miles, serviceData, open, handleSetOpenBox }) {
  // console.log("Rendering milagebox");
  const newTaskId = useRef(0);
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);
  const [data, setData] = useState({ ...serviceData });

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

  // Edit task if any
  useEffect(() => {
    if (
      maintenanceTrackerContext.state.status === "completionInfo-submitInfo" &&
      maintenanceTrackerContext.state.container.miles === miles
    ) {
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
            completionInfo: {
              ...prevData.tasks[taskId].completionInfo,
              date,
              miles,
              notes,
            },
          },
        },
      }));
    }
  }, [maintenanceTrackerContext.state]);

  // Update data state when task is moved between columns
  const updateData = useCallback((data) => {
    setData(data);
  }, []);

  // Update overall data
  useEffect(() => {
    dataContext.dispatch({
      type: "update",
      value: { miles, ...data },
    });
  }, [data, miles]);

  return (
    <MilageBoxContainer>
      <Collapsible
        trigger={
          <MilageBarContainer>
            <h2 className="MilageBarText">{miles + " Miles"}</h2>
          </MilageBarContainer>
        }
        transitionTime={250}
        onOpening={() => handleSetOpenBox(miles)}
        open={open}
        triggerDisabled={open}
        triggerStyle={!open ? { cursor: "pointer" } : null}
      >
        <Board prop_data={data} miles={miles} updateData={updateData} />
      </Collapsible>
    </MilageBoxContainer>
  );
}

export default React.memo(MilageBox);
