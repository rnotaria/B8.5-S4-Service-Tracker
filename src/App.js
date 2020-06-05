import React, { useEffect } from "react";
import MilageBox from "./Components/MilageBox";

function App() {
  const currentMiles = 56123;
  return (
    <React.Fragment>
      <h1 style={{ color: "red", "text-align": "center" }}>
        Current Miles: {currentMiles}
      </h1>
      <MilageBox currentMiles={currentMiles} />
    </React.Fragment>
  );
}

export default App;
