import React, { useContext } from "react";
import styles from "../../Styles/Login_styles/NewUserInfo.module.css";
import useInput from "../../hooks/useInput";
import { DataContext } from "../../Contexts/DataContext";

export default function NewUserInfo() {
  const [year, yearInput] = useInput("", "Year", styles.year);
  const [make, makeInput] = useInput("", "Make", styles.make);
  const [model, modelInput] = useInput("", "Model", styles.model);
  const [miles, milesInput] = useInput("", "Miles", styles.miles);
  const dataContext = useContext(DataContext);

  const handleContinue = () => {
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
