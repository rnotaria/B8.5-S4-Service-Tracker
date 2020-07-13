import React, { useState, useContext } from "react";
import { auth } from "../../Firebase/firebase";
import Help from "./Help_Components/Help";
import styles from "./_NavBarStyles.module.css";
import { AiFillGithub } from "react-icons/ai";
import { IoMdHelp } from "react-icons/io";
import { DataContext } from "../../Contexts/DataContext";
import SaveData from "./SaveData";

function Options({ children }) {
  const divider = <h5 className={styles.divider}>|</h5>;

  var renderArray = [...children]
    .map((elem, i) => (i < children.length - 1 ? [elem, divider] : [elem]))
    .reduce((a, b) => a.concat(b));

  return (
    <div className={styles.options}>
      {renderArray.map((component, i) => (
        <React.Fragment key={i}>{component}</React.Fragment>
      ))}
    </div>
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
  const [openHelp, setOpenHelp] = useState(dataContext.state.isNew);

  const handleOnClose = () => {
    setOpenHelp(false);
    dataContext.dispatch({ type: "setUsed" });
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
      <Options>
        <AiFillGithub className={styles.githubIcon} onClick={()=>window.open('https://github.com/rnotaria/B8.5-S4-Service-Tracker')}/>
        <SaveData />
        <React.Fragment>
          <Help open={openHelp} handleOnClose={handleOnClose} />
          <IoMdHelp
            className={styles.helpIcon}
            onClick={() => setOpenHelp(true)}
          />
        </React.Fragment>
        <h5 className={styles.logout} onClick={() => handleLogout()}>
          {dataContext.state.container.user === "guest" ? "Sign In" : "Logout"}
        </h5>
      </Options>
    </div>
  );
}

export default React.memo(NavBar);
