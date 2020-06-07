import React from "react";
import RenderXMilageBoxes from "./Components/RenderXMilageBoxes"

function App() {
  const currentMiles = 5001;
  
  return (
    <React.Fragment>
      <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1>
      <RenderXMilageBoxes currentMiles={currentMiles}/>
    </React.Fragment>
  );
}

export default App;
