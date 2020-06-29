import React, { useContext } from "react";
import styles from "../Styles/InfoBar.module.css";
import { MdSettings } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";
import { DataContext } from "../Contexts/DataContext";

function InfoBar() {
  const dataContext = useContext(DataContext);
  const vehicle =
    dataContext.state.container.vehicle.year +
    " " +
    dataContext.state.container.vehicle.make +
    " " +
    dataContext.state.container.vehicle.model;

  const handleLogout = () => {
    dataContext.dispatch({ type: "logout" });
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
        <IoMdHelp className={styles.help} />
        <h5 className={styles.divider}>|</h5>
        <MdSettings className={styles.settings} />
        <h5 className={styles.divider}>|</h5>
        <h5 className={styles.logout} onClick={() => handleLogout()}>
          Logout
        </h5>
      </div>
    </div>
  );
}

export default React.memo(InfoBar);
