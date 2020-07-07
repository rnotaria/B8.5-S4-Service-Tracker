import React, { useState, useContext } from "react";
import { auth, db } from "../../Firebase/firebase";
import Help from "../Help_Components/Help";
import styles from "./_NavBarStyles.module.css";
import { MdSettings } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";
import { FaRegSave } from "react-icons/fa";
import { DataContext } from "../../Contexts/DataContext";

function Options() {}

function SaveData() {
  const dataContext = useContext(DataContext);
  const [status, setStatus] = useState(null);

  const handleSave = () => {
    setStatus("saving");
    const user = dataContext.state.container.user;
    if (user !== "guest") {
      db.collection("users")
        .doc(user)
        .update({
          data: dataContext.state.data,
        })
        .then(() => {
          setStatus("saved");
        })
        .catch((e) => {
          console.log("Error: ", e);
        });
    }
  };

  console.log(status);

  return (
    <FaRegSave
      className={
        status === "saving"
          ? styles.saving
          : status === "saved"
          ? styles.saved
          : styles.saveIcon
      }
      onClick={() => {
        handleSave();
      }}
    />
  );
}

function NavBar() {
  const dataContext = useContext(DataContext);
  const vehicle =
    dataContext.state.container.vehicle.year +
    " " +
    dataContext.state.container.vehicle.make +
    " " +
    dataContext.state.container.vehicle.model;
  const [openHelp, setOpenHelp] = useState(false);
  const handleOnClose = () => {
    setOpenHelp(false);
  };

  const handleLogout = () => {
    auth.signOut().then(() => {
      dataContext.dispatch({ type: "logout" });
      window.location.reload(false);
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.car}>
        <h4>{vehicle}</h4>
      </div>
      <div className={styles.miles}>
        <h2>{dataContext.state.container.miles}</h2>
        <h5> mi</h5>
      </div>
      <div className={styles.options}>
        <SaveData />
        <h5 className={styles.divider}>|</h5>

        <React.Fragment>
          <Help open={openHelp} handleOnClose={handleOnClose} />
          <IoMdHelp
            className={styles.helpIcon}
            onClick={() => setOpenHelp(true)}
          />
        </React.Fragment>
        <h5 className={styles.divider}>|</h5>

        <MdSettings className={styles.settings} />
        <h5 className={styles.divider}>|</h5>

        <h5 className={styles.logout} onClick={() => handleLogout()}>
          {dataContext.state.container.user === "guest" ? "Sign In" : "Logout"}
        </h5>
      </div>
    </div>
  );
}

export default React.memo(NavBar);
