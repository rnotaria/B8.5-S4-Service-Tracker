import React, { useState, useContext, useEffect } from "react";
import { auth, db } from "../../Firebase/firebase";
import IntervalList from "./IntervalList";
import Panel from "../Panel_Components/MainPanel_Components/Panel";
import NavBar from "../NavBar_Components/NavBar";
import AuthPage from "../Auth_Components/AuthPage";
import NewUserInfo from "../Auth_Components/NewUserInfo";
import { MaintenanceTrackerContext } from "../../Contexts/MaintenanceTrackerContext";
import { DataContext } from "../../Contexts/DataContext";
import ReactLoading from "react-loading";
import loadingStyles from "../../Styles/loading.module.css";

export default function MaintenanceTracker() {
  const [currentUser, setCurrentUser] = useState("authenticating");
  const maintenanceTrackerContext = useContext(MaintenanceTrackerContext);
  const dataContext = useContext(DataContext);

  useEffect(() => {
    if (dataContext.state.container.user === "guest") {
      setCurrentUser("guest");
    } else if (!dataContext.state.status) {
      auth.onAuthStateChanged((user) => {
        if (user === null) {
          // User is logged out
          setCurrentUser(null);
        } else {
          // User is logged in, check if vehicle data is in database
          db.collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
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
    // Reason: We only want to rerender this component when the user
    // or status changes. Look into this in the future.
    // eslint-disable-next-line
  }, [dataContext.state.container.user, dataContext.state.status]);

  /* * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
   * If still fetching auth, render loading
   * If no user logged in render AuthPage to allow user to log in.
   * If user is logged in but no vehicle info is recorded, render NewUserInfo
   * Else, render main components
   * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */
  if (currentUser === "authenticating") {
    return (
      <div className={loadingStyles.loading}>
        <ReactLoading type={"spinningBubbles"} />
      </div>
    );
  } else if (!currentUser) {
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
