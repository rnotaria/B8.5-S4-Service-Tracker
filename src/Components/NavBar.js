import React, { useState, useContext } from "react";
import Help from "./Help_Components/Help";
import styles from "../Styles/NavBar.module.css";
import { MdSettings } from "react-icons/md";
import { IoMdHelp } from "react-icons/io";

import { DataContext } from "../Contexts/DataContext";

function NavBar() {
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

  const [openHelp, setOpenHelp] = useState(false);
  const handleOnClose = () => {
    setOpenHelp(false);
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
        <Help open={openHelp} handleOnClose={handleOnClose} />
        <IoMdHelp
          className={styles.helpIcon}
          onClick={() => setOpenHelp(true)}
        />
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

export default React.memo(NavBar);
