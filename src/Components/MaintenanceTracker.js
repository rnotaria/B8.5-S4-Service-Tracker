import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "../Firebase/firebase";
import IntervalList from "./IntervalList";
import Panel from "./Panel_Components/Panel";
import NavBar from "./NavBar";
import AuthPage from "./Auth_Components/AuthPage";
import NewUserInfo from "./Auth_Components/NewUserInfo";
import { MaintenanceTrackerContext } from "../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../Contexts/DataContext";

export default function MaintenanceTracker() {
  const [currentUser, setCurrentUser] = useState("authenticating");
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);

  useEffect(() => {
    if (dataContext.state.container.user === "guest") {
      setCurrentUser("guest");
    } else {
      auth.onAuthStateChanged((user) => {
        if (user === null) {
          // User is logged out
          console.log("User is Logged Out");
          setCurrentUser(null);
        } else {
          // User is logged in
          console.log("User is Logged In");

          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              console.log(doc.data());
              setCurrentUser(user.uid);
              dataContext.dispatch({ type: "setUser", value: user.uid });
              if (doc.data().vehicle) {
                const make = doc.data().vehicle.make;
                const model = doc.data().vehicle.model;
                const year = doc.data().vehicle.year;
                const miles = doc.data().miles;

                dataContext.dispatch({
                  type: "setVehicleInfo",
                  value: { make, model, year, miles },
                });
              } else {
                console.log("No vehicle info...");
              }
            });
        }
      });
    }
  }, [auth.onAuthStateChanged, dataContext.state.container.user]);

  console.log(currentUser);
  if (currentUser === "authenticating") {
    // Loading
    return <div style={{ color: "white" }}>Loading</div>;
  } else if (!currentUser) {
    // User is not logged in
    return <AuthPage />;
  }

  if (dataContext.state.container.vehicle === null) {
    return <NewUserInfo />;
  }

  return (
    <div>
      <NavBar />
      <IntervalList />
      <Panel panelData={maintenanceTrackerContext.state.panelData} />
    </div>
  );
}
