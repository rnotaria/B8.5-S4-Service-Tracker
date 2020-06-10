import React from "react";
import "./index.css";
// import RenderXMilageBoxes from "./Components/RenderXMilageBoxes";
import BottomPane from "./Components/BottomPane";

function App() {
  // const currentMiles = 5001;

  return (
    <React.Fragment>
      {/* <h1 style={{ color: "red", textAlign: "center" }}>
        Current Miles: {currentMiles}
      </h1> */}
      {/* <RenderXMilageBoxes currentMiles={currentMiles}/> */}

      <BottomPane height={80} />
    </React.Fragment>
  );
}

export default App;
