import React, { useContext } from "react";
import styles from "./styles.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";

export default function NewUserInfo() {
  const dataContext = useContext(DataContext);
  const [year, yearInput] = useInput("2016", "Year", undefined, styles.year);
  const [make, makeInput] = useInput("Audi", "Make", undefined, styles.make);
  const [model, modelInput] = useInput("S4", "Model", undefined, styles.model);
  const [miles, milesInput] = useInput(
    "57000",
    "Miles",
    undefined,
    styles.miles
  );

  const handleContinue = () => {
    const user = dataContext.state.container.user;
    console.log(user);
    dataContext.dispatch({
      type: "setVehicleInfo",
      value: { make, model, year, miles },
    });
  };

  return (
    <div className={styles.main}>
      <div className={styles.box}>
        <div className={styles.title}>
          <h3>VEHICLE INFO</h3>
        </div>
        <div className={styles.vehicle_info}>
          <div className={styles.vehicle}>
            {yearInput}
            {makeInput}
            {modelInput}
          </div>
          <div className={styles.miles}>{milesInput}</div>
        </div>
        <div className={styles.continue_btn}>
          <button onClick={() => handleContinue()}>Continue</button>
        </div>
      </div>
    </div>
  );
}
