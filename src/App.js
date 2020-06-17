import React from "react";
// import "./index.css";
import { MaintenanceTrackerContextProvider } from "./Contexts/MaintenanceTrackerContext";
import MaintenancePage from "./Components/MaintenancePage";

export default function App() {
  return (
    <div>
      <MaintenanceTrackerContextProvider>
        <MaintenancePage />
      </MaintenanceTrackerContextProvider>
    </div>
  );
}
