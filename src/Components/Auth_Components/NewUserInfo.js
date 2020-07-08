import React, { useState, useContext } from "react";
import styles from "./_AuthStyles.module.css";
import useInput from "../../hooks/useInput";
import useDropDown from "../../hooks/useDropDown";
import { yearList } from "../../utils/getLists";
import { DataContext } from "../../Contexts/DataContext";
import PageContainer from "./PageContainer";

export default function NewUserInfo() {
  const dataContext = useContext(DataContext);
  const [year, yearDropDown] = useDropDown(
    yearList(1900, new Date().getFullYear() + 1)
  );
  const [make, makeDropDown] = useDropDown(["Audi", "BMW", "Genesis"]);
  const [model, modelDropDown] = useDropDown(["S4"]);
  const [miles, milesInput] = useInput(57000, "Miles", undefined, styles.miles);
  const [error, setError] = useState(null);

  const handleContinue = () => {
    if (Number.isInteger(parseInt(miles)) && parseInt(miles) >= 0) {
      dataContext.dispatch({
        type: "setVehicleInfo",
        value: { make, model, year, miles: parseInt(miles) },
      });
    } else {
      setError("Please enter a valid number for miles.");
    }
  };

  return (
    <PageContainer title={"VEHICLE INFO"} error={error}>
      <div className={styles.vehicle_info}>
        <div className={styles.vehicle}>
          {yearDropDown}
          {makeDropDown}
          {modelDropDown}
        </div>
        <div className={styles.miles}>{milesInput}</div>
      </div>
      <div className={styles.continue_btn}>
        <button onClick={() => handleContinue()}>Continue</button>
      </div>
    </PageContainer>
  );
}
