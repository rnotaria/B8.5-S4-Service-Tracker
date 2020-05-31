import React from "react";
import { render } from "@testing-library/react";

export default function CarInfo() {
  // filler, get props from login
  const carInfo = {
    make: "Audi",
    model: "S4",
    year: "2016",
    VIN: "WAUBGAFL1GA010906",
    milage: 56000,
    image:
      "https://avantgardewheels.com/wp-content/uploads/2017/08/DSC04778.jpg",
  };

  return (
    <React.Fragment>
      <div className="profile-pic">
        <img src={carInfo.image} alt="picture of car" />
      </div>
      <div className="carInfo">
        <h1>
          {carInfo.year + " "}
          {carInfo.make + " "}
          {carInfo.model}
        </h1>
      </div>
    </React.Fragment>
  );
}
