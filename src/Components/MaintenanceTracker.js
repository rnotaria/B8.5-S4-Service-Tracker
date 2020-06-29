import React, { useContext } from "react";
import IntervalList from "./IntervalList";
import Panel from "./Panel_Components/Panel";
import InfoBar from "./InfoBar";
import LoginPage from "./Login_Components/LoginPage";
import NewUserInfo from "./Login_Components/NewUserInfo";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

export default function MaintenanceTracker() {
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);

  if (dataContext.state.container.user === null) {
    return <LoginPage />;
  } else {
    if (dataContext.state.container.miles === null) {
      return <NewUserInfo />;
    }
  }

  return (
    <div>
      <InfoBar />
      <IntervalList />
      <Panel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
