import React from "react";
import "./index.css";
import { MaintenanceTrackerContextProvider } from "./Contexts/MaintenanceTrackerContext";
import { DataContextProvider } from "./Contexts/DataContext";
import MaintenanceTracker from "./Components/Main_Components/MaintenanceTracker";

export default function App() {
  return (
    <div>
      <MaintenanceTrackerContextProvider>
        <DataContextProvider>
          <MaintenanceTracker />
        </DataContextProvider>
      </MaintenanceTrackerContextProvider>
    </div>
  );
}
