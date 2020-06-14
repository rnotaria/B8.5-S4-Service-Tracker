import React from "react";
import "./index.css";
import { TaskManipulatorContextProvider } from "./Contexts/TaskManipulatorContext";
import MaintenancePage from "./Components/MaintenancePage";

export default function App() {
  return (
    <div>
      <TaskManipulatorContextProvider>
        <MaintenancePage />
      </TaskManipulatorContextProvider>
    </div>
  );
}
