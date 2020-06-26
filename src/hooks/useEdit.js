import { useState, useContext } from "react";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";

export default function useEdit(id, info) {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const [edit, setEdit] = useState(false);

  const handleEdit = () => {
    if (edit === true) {
      maintenanceTrackerContext.dispatch({
        type: "editInfo",
        value: {
          id,
          info,
        },
      });
    }
    setEdit(!edit);
  };

  return [edit, handleEdit];
}
