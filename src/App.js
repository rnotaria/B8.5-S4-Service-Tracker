import React from "react";
import MilageBox from "./Components/MilageBox";

function App() {
  const currentMiles = 57123;
  return (
    <React.Fragment>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1>
      <MilageBox currentMiles={currentMiles} />
    </React.Fragment>
  );
}

export default App;
