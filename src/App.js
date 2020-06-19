import React from "react";
// import "./index.css";
import { MaintenanceTrackerContextProvider } from "./Contexts/MaintenanceTrackerContext";
import { DataContextProvider } from "./Contexts/DataContext";
import MaintenancePage from "./Components/MaintenancePage";

export default function App() {
  return (
    <div>
      <MaintenanceTrackerContextProvider>
        <DataContextProvider>
          <MaintenancePage />
        </DataContextProvider>
      </MaintenanceTrackerContextProvider>
    </div>
  );
}
