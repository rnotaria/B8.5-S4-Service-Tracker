import React from "react";
import "./index.css";
// import { auth } from "./Firebase/firebase";
import { MaintenanceTrackerContextProvider } from "./Contexts/MaintenanceTrackerContext";
import { DataContextProvider } from "./Contexts/DataContext";
import MaintenanceTracker from "./Components/MaintenanceTracker";
// import { db } from "./Firebase/firebase";

export default function App() {
  // auth.createUserWithEmailAndPassword("email123@g.com", "password123");
  // auth.signOut().then(() => {
  //   console.log("user signed out");
  // });

  // auth
  //   .signInWithEmailAndPassword("email123@g.com", "password123")
  //   .then((cred) => {
  //     console.log(cred.user);
  //   });

  // // Retreiving data
  // db.collection("AudiServiceSchedule")
  //   .get()
  //   .then((snapshot) => {
  //     snapshot.docs.forEach((doc) => {
  //       console.log(doc.data());
  //     });
  //   });

  // Saving data
  // db.collection("AudiServiceSchedule").add({
  //   temp: { miles: 25000, task: "DSG" },
  // });

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
